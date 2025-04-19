'use client'; // Add this directive at the top

import { useRouter } from 'next/navigation'; // ใช้ useRouter จาก next/navigation
import STYLE from '@/constants/style'; // นำเข้า style ที่คุณมี
import { logoutUser } from '@/utils/loginUser'; // นำเข้า logoutUser function

export default function Page() {
  const router = useRouter(); // useRouter hook

  const handleLogout = async () => {
    await logoutUser(); // Call logoutUser function
    router.push('/'); // Redirect to homepage after logout
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Are you sure you want to log out?</h2>
        <div className="flex justify-center">
          <button
            className={`${STYLE} text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 p-3 rounded-md transition duration-300`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
