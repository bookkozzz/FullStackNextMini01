'use client';

import { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser } from '../_actions/userActions';
import { getSession } from '@/utils/loginUser';
import { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]); 
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession(); // ใช้ getSession จาก utils

      if (!session || session.role !== 'ADMIN') {
        setIsAuthorized(false);
        router.push('/'); // redirect ไปหน้าแรกหรือหน้าที่ต้องการ
        return;
      }

      setIsAuthorized(true);

      const allUsers = await getUsers(); // ดึงข้อมูลผู้ใช้จาก API
      setUsers(allUsers);
    };

    fetchData();
  }, [router]);

  if (isAuthorized === false) {
    return <div className="p-6">Unauthorized. Redirecting...</div>;
  }

  if (isAuthorized === null) {
    return <div className="p-6">Loading...</div>; // ระหว่างรอ session
  }

  // ฟังก์ชันการแก้ไข
  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  // ฟังก์ชันการลบผู้ใช้
  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);  // เรียกฟังก์ชันในการลบผู้ใช้จาก API
      setUsers(users.filter(user => user.id !== userId));  // รีเฟรชลิสต์ผู้ใช้
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // ฟังก์ชันการอัพเดตผู้ใช้
  const handleUpdate = async () => {
    if (editingUser) {
      try {
        // ส่ง id และข้อมูลที่ต้องการอัปเดตไป
        await updateUser(editingUser.id, {
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
        });
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? editingUser : user
          )
        ); // รีเฟรชข้อมูลผู้ใช้
        setEditingUser(null); // ปิดฟอร์มการแก้ไข
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Admin Panel - User Management</h1>

      {/* แสดงข้อมูลผู้ใช้ */}
      {users.map((user) => (
        <div key={user.id} className="border p-4 mb-3 rounded-md shadow-sm bg-white">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <div className="mt-2 flex gap-2">
            <button
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              onClick={() => handleEdit(user)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {editingUser && (
        <div className="mt-6 border-t pt-6 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Edit User</h2>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold">Name</label>
              <input
                id="name"
                className="border px-3 py-2 rounded-md"
                type="text"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                placeholder="Enter Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input
                id="email"
                className="border px-3 py-2 rounded-md"
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                placeholder="Enter Email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="role" className="text-sm font-semibold">Role</label>
              <select
                id="role"
                className="border px-3 py-2 rounded-md"
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as Role })}
              >
                {Object.values(Role).map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
