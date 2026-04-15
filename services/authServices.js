import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

export const registerUser = async ({ name, email, password }) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, email, password: hashed },
    });

    return user;
};

export const loginUser = async ({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    return { 
        token, 
        user: { id: user.id, name: user.name, email: user.email } 
    };
};