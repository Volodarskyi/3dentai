import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import {User} from "@/models/User";
import {sendResSuccess} from "@/utils/responseUtils";
import {AppError} from "@/utils/errorUtils";
import {EUserRole} from "@/types/enums/UserEnums";

// Define the shape of the request body
interface RegisterRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: number;
}

// 'api/auth/signup'
const signup = async (
  req: Request<object, object, RegisterRequestBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {

    const { firstName, lastName, email, password, birthDate } =
      req.body;

    // Check if a user with this email already exists
    const candidate = await User.findOne({ email });

    if (candidate) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      email,
      auth:{password: hashedPass},
      firstName,
      lastName,
      role: EUserRole.NEW_USER,
      phone: `PHONE FOR ${email}`,
      birthDate,
    });

    // Save the new user to the database
    const saveRes = await newUser.save();
    console.log('saveRes:', saveRes);

    sendResSuccess(res,`Account ${firstName} ${lastName} successfully created`,{userID:saveRes._id})
  } catch (e) {
    console.error('ERROR | Auth.route-register |):', e);
    next(e);
  }
};

// 'api/auth/signin'
const signin = async (req: Request, res: Response, next: NextFunction,): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('Login body:', req.body);

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError('User is not found', 400);
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.auth.password);
    console.log('Login pass match:', isMatch);

    if (!isMatch) {
      throw new AppError('Wrong e-mail or password', 400);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '48h' },
    );

    // Create Refresh Token
    const refreshToken = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET_REFRESH as string,
        { expiresIn: '7d' },
    );

    // 🔐 Hash and store refresh token
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    user.auth.refreshTokenHash = refreshTokenHash;
    user.auth.expireRefreshToken = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await user.save();

    const data = {
      token,
      refreshToken,
      userId: user.id,
    };

    sendResSuccess(res, 'Auth complete', data);
  } catch (e) {
    console.error('ERROR | login |', e);
    next(e);
  }
};

export default {
  signup,
  signin,
};
