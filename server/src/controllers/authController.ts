// Import necessary utilities and types
import { Request, Response } from "express";
import { generateRes, sendErrorLog } from "../utils/api";
import bcrypt from 'bcryptjs';
import User from '../models/User';


// Define the shape of the request body
interface RegisterRequestBody {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
    avatar?: string;
}

// Controller to handle photo upload
const registerController = async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> => {
    try {
        // const errors = validationResult(req); // Uncomment if using validation
        // if (!errors.isEmpty()) {
        //   res.status(400).json({
        //     result: 'ERROR',
        //     data: null,
        //     message: 'Register ERROR!',
        //     details: 'Check e-mail, password, and other data'
        //   });
        //   return;
        // }

        const { firstName, secondName, email, password, avatar } = req.body;

        // Check if a user with this email already exists
        const candidate = await User.findOne({ email });
        console.log("AUTH_REGISTER_candidate:", candidate);

        if (candidate) {
            res.status(400).json({
                result: "ERROR",
                data: null,
                message: "Register ERROR!",
                details: "User with this email already exists",
            });
            return;
        }

        // Hash the password
        const hashedPass = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPass,
            firstName,
            secondName,
            role: "user",
            phone: `PHONE FOR ${email}`,
            avatar,
            accessTo: [],
        });

        // Save the new user to the database
        const saveRes = await newUser.save();
        console.log("saveRes:", saveRes);

        // Send a success response
        res.status(201).json({
            result: "SUCCESS",
            data: saveRes,
            message: "New user added",
            details: `${firstName} ${secondName} saved to DB`,
        });
    } catch (e) {
        console.error("ERROR (Auth.route-register):", e);
        sendErrorLog({
            res,
            url: "POST api/auth/register",
            error: (e as Error).message,
        });
        res.status(500).json({
            result: "ERROR",
            data: null,
            message: "Server ERROR!",
            details: "In route: post register",
        });
    }
};

export default {
    registerController,
};
