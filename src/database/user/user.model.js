import mongoose, { Schema } from 'mongoose';
import Crypto from 'crypto';

const UserSchema = new Schema(
    {
        guid: {
            type: String,
            default: function () {
                return Crypto.randomUUID();
            },
        },
        name: { type: String, trim: true },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
        },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

export const UserModel = mongoose.model('User', UserSchema);