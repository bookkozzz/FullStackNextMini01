"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { getSession } from "@/utils/loginUser"

export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()
            if (session && typeof session.role === "string") {
                setRole(session.role)
            } else {
                setRole(null) // หากไม่มี session กำหนด role เป็น null
            }
        }

        // เรียก fetchSession เมื่อโหลดหน้า
        fetchSession()

        // ตั้ง interval เพื่อเช็ค session ใหม่ทุกๆ 5 วินาที (สามารถปรับเวลาได้)
        const intervalId = setInterval(fetchSession, 100)

        // เคลียร์ interval เมื่อ component ถูก unmount
        return () => clearInterval(intervalId)
    }, []) // empty dependency array to run only once when the component mounts

    return (
        <header className="bg-blue-600 p-4 shadow-md">
            <nav className="flex justify-between items-center">
                {/* Left side */}
                <div className="flex space-x-4">
                    <Link href="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link href="/simple_db" className="text-white hover:text-gray-300">Check-Weather</Link>
                    <Link href="/simple_db/weather-crud" className="text-white hover:text-gray-300">Crud-Weather</Link>

                    {/* แสดงเมนู Login และ Register เฉพาะเมื่อไม่มี session */}
                    {!role && (
                        <>
                            <Link href="/simple_db/login" className="text-white hover:text-gray-300">Login</Link>
                            <Link href="/simple_db/register" className="text-white hover:text-gray-300">Register</Link>
                        </>
                    )}
                </div>

                {/* Right side */}
                <div className="relative">
                    <button
                        className="text-white hover:text-gray-300 flex items-center"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <span className="mr-2">User</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <Link
                                href="/simple_db/check"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Check
                            </Link>
                            <Link
                                href="/simple_db/logout"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </Link>

                            {/* ✅ แสดงเมนูสำหรับ ADMIN */}
                            {role === "ADMIN" && (
                                <Link
                                    href="/simple_db/admin"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Backend
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}
