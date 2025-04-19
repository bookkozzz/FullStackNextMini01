import { getSession } from "@/utils/loginUser";

export default async function CheckToken() {
    let session: Record<string, unknown> | null = null; // ประกาศ session ให้รองรับค่าเป็น Record<string, unknown> หรือ null
    try {
        session = await getSession();
        console.log("Session: ", session); // ตรวจสอบข้อมูลที่ได้จาก session
    }
    catch (e) {
        console.log("Error: ", e);
    }

    // เช็คและจัดการค่า session ที่ไม่สามารถเป็น null ได้
    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="text-center p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-xl text-red-500 font-semibold mb-4">No session found</h2>
                    <p className="text-gray-600">Please log in to access this page.</p>
                </div>
            </div>
        );
    }

    // ตรวจสอบให้แน่ใจว่า session มี role และแคสต์ role ให้เป็น string
    const role: string | undefined = (session as Record<string, any>)?.role; // แคสต์ session เป็น Record<string, any>

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="w-full sm:w-96 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Session Info</h2>
                <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto text-sm">{JSON.stringify(session, null, 2)}</pre>

                <div className="mt-6">
                    <h2 className="text-lg font-medium text-gray-700">Role Information:</h2>
                    {role ? (
                        <p className="text-lg text-green-500 font-semibold mt-2">{role}</p>
                    ) : (
                        <p className="text-lg text-red-500 mt-2">No role available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
