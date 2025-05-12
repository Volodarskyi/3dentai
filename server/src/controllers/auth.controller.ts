import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendErrorLog } from '../utils/apiUtils';
import {User} from "../models/User";

// Define the shape of the request body
interface RegisterRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: number;
}

// interface LoginRequestBody {
//   email: string;
//   password: string;
// }

// 'api/auth/register'
const registerController = async (
  req: Request<object, object, RegisterRequestBody>,
  res: Response,
): Promise<void> => {
  try {

    const { firstName, lastName, email, password, birthDate } =
      req.body;

    // Check if a user with this email already exists
    const candidate = await User.findOne({ email });
    console.log('AUTH_REGISTER_candidate:', candidate);

    if (candidate) {
      res.status(400).json({
        result: 'ERROR',
        data: null,
        message: 'Register ERROR!',
        details: 'User with this email already exists',
      });
      return;
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      email,
      auth:{password: hashedPass},
      firstName,
      lastName,
      role: 'user',
      phone: `PHONE FOR ${email}`,
      birthDate,
    });

    // Save the new user to the database
    const saveRes = await newUser.save();
    console.log('saveRes:', saveRes);

    // Send a success response
    res.status(201).json({
      result: 'SUCCESS',
      data: saveRes,
      message: 'New user added',
      details: `${firstName} ${lastName} saved to DB`,
    });
  } catch (e) {
    console.error('ERROR (Auth.route-register):', e);
    sendErrorLog({
      res,
      url: 'POST api/auth/register',
      error: (e as Error).message,
    });
    res.status(500).json({
      result: 'ERROR',
      data: null,
      message: 'Server ERROR!',
      details: 'In route: post register',
    });
  }
};

// 'api/auth/login'
const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('Login body:', req.body);

    // Find user by email
    const user = await User.findOne({ email });
    console.log('Login user:', user);

    if (!user) {
      res.status(400).json({
        result: 'ERROR',
        data: null,
        message: 'Auth ERROR!',
        details: 'User is not found',
      });
      return;
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.auth.password);
    console.log('Login pass match:', isMatch);

    if (!isMatch) {
      res.status(400).json({
        result: 'ERROR',
        data: null,
        message: 'Auth ERROR!',
        details: 'Wrong e-mail or password',
      });
      return;
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
    console.log('Log token:', token);

    const data = { token, refToken: 'ref-token-test', userId: user.id };

    res.status(201).json({
      result: 'SUCCESS',
      data,
      message: 'Auth complete',
      details: `${user.firstName} ${user.lastName} is logged in`,
    });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({
      result: 'ERROR',
      data: null,
      message: 'Server ERROR!',
      details: 'Login problem',
    });
  }
};

export default {
  registerController,
  loginController,
};
