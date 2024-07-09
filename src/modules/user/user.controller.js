import { UserModel } from '../../database/user/user.model';
import httpStatus from 'http-status';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
/**
 * It registers a user
 * @param req - The request object.
 * @param res - The response object.
 */
export const registerUser = async (req, res) => {
    try {

        // Extract email and password from request body
        const { email, password } = req.body;
        console.log('in register user', email, password);
        // Check if user with the same email already exists
        const existingUser = await UserModel.findOne({ email });
        console.log("existingUser", existingUser);
        if (existingUser) {
          return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword", hashedPassword);
        // Create new user
        const newUser = new UserModel({
          email,
          password: hashedPassword
        });

        // Save user to database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};


/**
 * It logs in a user
 * @param req - The request object.
 * @param res - The response object.
 */
export const loginUser = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });

        // If user does not exist or password does not match, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token to client
        res.status(200).json({ message: "User logged in successfully!!!", token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
