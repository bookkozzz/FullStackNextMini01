import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-6">ยินดีต้อนรับ รู้ไว่ไม่เปียก</h1>

        <div className="flex justify-center gap-8 mb-6">
          <Image
            src="/next.svg"
            width={200}
            height={200}
            alt="Next.js logo"
            className="rounded-full shadow-lg"
          />
          <Image
            src="https://computing.psu.ac.th/th/wp-content/uploads/2023/09/PSU-CoC-ENG_01_x49.png"
            width={200}
            height={200}
            alt="PSU Logo"
            className="rounded-full shadow-lg"
          />
        </div>

        <p className="bg-blue-100 shadow-xl mt-8 p-6 rounded-lg border-2 border-blue-900 text-center text-lg text-gray-800">
        ค้นหาข้อมูลพยากรณ์อากาศที่แม่นยำและอัพเดทล่าสุด เพื่อเตรียมตัวสำหรับทุกสภาพอากาศ ไม่ว่าฝนจะตกหรือแดดออก
        </p>

        <div className="mt-8">
          <p className="bg-blue-100 shadow-lg p-6 rounded-lg border-2 border-blue-900 text-center text-lg text-gray-800">
          เริ่มต้นด้วยการเช็คสภาพอากาศในพื้นที่ของคุณหรือที่ใดก็ได้ เพื่อให้คุณพร้อมสำหรับวันใหม่!
          </p>
        </div>

      
      </div>
    </>
  );
}
