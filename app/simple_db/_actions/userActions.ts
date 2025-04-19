'use server';

import  prisma  from "@/utils/db";
import { Role } from '@prisma/client'; // <-- นำเข้า Enum Role

// ดึงผู้ใช้ทั้งหมด
export async function getUsers() {
  return await prisma.user.findMany();
}

// แก้ไขผู้ใช้
export async function updateUser(id: number, data: { name: string; email: string; role: Role }) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

// ลบผู้ใช้
export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: { id },
  });
}
