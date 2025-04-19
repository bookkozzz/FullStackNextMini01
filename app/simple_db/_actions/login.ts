"use server"

import prisma from "@/utils/db"
import hashPassword from "@/utils/hashPassword"
import { loginUser } from "@/utils/loginUser"

export default async function login(prevState: unknown, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const remember = (formData.get("remember") === "on") ? true : false

    console.log(email, password, remember)

    // Fetch the user from the database by email
    const user = await prisma.user.findFirst({ where: { email } })

    if (!user) {
        return {
            error: "User not found",
            message: ""
        }
    }

    // Compare the provided password with the stored hash
    if (user.password !== await hashPassword(password)) {
        return {
            error: "Invalid password",
            message: ""
        }
    }
    
    // Send user data including the role to the loginUser function
    const userInput = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role  // Add the role here from the user object
    }

    // Log in the user with the given data and remember flag
    await loginUser(userInput, remember)
    
    console.log("User: ", user)
    
    return {
        error: "",
        message: "User logged in successfully"
    }
}
