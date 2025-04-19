"use client"

import STYLE from "@/constants/style";
import login from "../_actions/login";
import { useActionState } from "react";
import { redirect } from "next/navigation";

export default function Login() {

    const [state, action] = useActionState(login, { error: "", message: "" })

    if (state.error !== "") {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="p-6 bg-white shadow-lg rounded-md w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                    <p className="text-red-500 text-center">{state.error}</p>
                </div>
            </div>
        )
    }

    if (state.message !== "") {
        redirect("/simple_db")
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <form action={action} className="p-6 bg-white shadow-lg rounded-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="email" 
                        type="email" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="password" 
                        type="password" 
                        required 
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <input 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500" 
                        name="remember" 
                        type="checkbox" 
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}
