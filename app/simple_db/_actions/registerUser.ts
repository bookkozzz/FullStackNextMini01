"use server"

import prisma from "@/utils/db"
import hashPassword from "@/utils/hashPassword"
import { redirect } from "next/navigation"

export default async function registerUser(_: unknown, formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = await hashPassword(formData.get("password") as string)

    await prisma.user.create({ data: { name, email, password } })
    redirect("/simple_db/login") // หลังจากนี้โค้ดจะไม่ทำงานต่อแล้ว

    // ไม่มี return ใด ๆ
}
