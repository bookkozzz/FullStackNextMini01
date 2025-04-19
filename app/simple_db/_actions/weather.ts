'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ดึงข้อมูลทั้งหมดของ Weather
export async function getWeatherList() {
  return await prisma.weather.findMany({
    orderBy: { createdAt: 'desc' }, // เรียงลำดับจากวันที่สร้างใหม่สุด
  })
}

// เพิ่มข้อมูล Weather
export async function addWeather(data: {
  city: string
  description: string
  temp: number
  humidity: number
  wind: number
}) {
  return await prisma.weather.create({ data })
}

// อัปเดตข้อมูล Weather โดยใช้ id
export async function updateWeather(
  id: number,
  data: {
    city: string
    description: string
    temp: number
    humidity: number
    wind: number
  }
) {
  return await prisma.weather.update({
    where: { id },
    data,
  })
}

// ลบข้อมูล Weather โดยใช้ id
export async function deleteWeather(id: number) {
  await prisma.weather.delete({
    where: { id },
  })
}
