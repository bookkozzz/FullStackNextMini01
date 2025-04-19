'use client'; // Add this directive at the top

import { useRouter } from 'next/navigation'; // ใช้ useRouter จาก next/navigation
import STYLE from '@/constants/style';
import { logoutUser } from '@/utils/loginUser';

export default function Page() {
  const router = useRouter(); // useRouter hook

  const handleLogout = async () => {
    await logoutUser(); // Call logoutUser function
    router.push('/'); // Redirect to homepage after logout
  };

  return (
    <div>
      <button className={STYLE} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
