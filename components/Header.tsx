"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { getSession } from "@/utils/loginUser"

export default function Header() {
    const [role, setRole] = useState<string | null>(null)
    const [isHovered, setIsHovered] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()
            if (session && typeof session.role === "string") {
                setRole(session.role)
            } else {
                setRole(null)
            }
        }

        fetchSession()
        const intervalId = setInterval(fetchSession, 1000)
        return () => clearInterval(intervalId)
    }, [])

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false)
        }, 200) // ปรับ delay ตามความเหมาะสม เช่น 200ms
    }

    return (
        <header className="bg-blue-700 p-4 shadow-xl">
            <nav className="flex justify-between items-center">
                <div className="flex space-x-8">
                    <Link href="/" className="text-white hover:text-blue-200 transition duration-300 ease-in-out transform hover:scale-105">
                        Home
                    </Link>
                    <Link href="/simple_db" className="text-white hover:text-blue-200 transition duration-300 ease-in-out transform hover:scale-105">
                        Check-Weather
                    </Link>
                    <Link href="/simple_db/weather-crud" className="text-white hover:text-blue-200 transition duration-300 ease-in-out transform hover:scale-105">
                        Crud-Weather
                    </Link>

                    {!role && (
                        <>
                            <Link href="/simple_db/login" className="text-white hover:text-blue-200 transition duration-300 ease-in-out transform hover:scale-105">
                                Login
                            </Link>
                            <Link href="/simple_db/register" className="text-white hover:text-blue-200 transition duration-300 ease-in-out transform hover:scale-105">
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Hover dropdown */}
                {role && (
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="text-white hover:text-blue-200 flex items-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                            <span className="mr-2">User</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isHovered && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transform transition duration-300 ease-in-out opacity-100">
                                <Link
                                    href="/simple_db/check"
                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Check
                                </Link>
                                <Link
                                    href="/simple_db/logout"
                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Logout
                                </Link>

                                {role === "ADMIN" && (
                                    <Link
                                        href="/simple_db/admin"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Backend
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    )
}
