import { getSession } from "@/utils/loginUser"

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
            <div>
                <h2>No session found</h2>
            </div>
        );
    }

    // ตรวจสอบให้แน่ใจว่า session มี role และแคสต์ role ให้เป็น string
    const role: string | undefined = (session as Record<string, any>)?.role; // แคสต์ session เป็น Record<string, any>

    return (
        <div>
            {/* แสดงข้อมูล session ทั้งหมด */}
            <h2>Session Info:</h2>
            <pre>{JSON.stringify(session, null, 2)}</pre>

            {/* แสดงเฉพาะ role จาก session ถ้ามี */}
            <h2>Role: </h2>
            {role ? (
                <p>{role}</p>
            ) : (
                <p>No role available</p>
            )}
        </div>
    );
}
