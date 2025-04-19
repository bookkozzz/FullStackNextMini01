"use server"

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

const TIMEOUT = 300; // 300 second (default timeout for session)

interface UserInput {
    id: number;
    email: string;
    name: string;
    role: string;  // Added role
}

export async function encrypt(payload: Record<string, unknown>) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${TIMEOUT} sec from now`)
        .sign(key);
}

export async function decrypt(input: string): Promise<Record<string, unknown>> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
        clockTolerance: 300,
    });
    return payload;
}

// Login User - include role in session
export async function loginUser(userInput: UserInput, remember: boolean) {
    const { id, email, name, role } = userInput;

    let timeout = TIMEOUT; // default 5 mins
    if (remember)
        timeout = 24 * 60 * 60; // If remember me, set timeout to 1 day

    // Create the session without role in the payload
    const expires = new Date(Date.now() + timeout * 1000);
    const session = await encrypt({ id, email, name, expires });

    // Save the session in a cookie
    (await cookies()).set("session", session, { expires, httpOnly: true });

    // Save the role in a separate cookie (not encrypted)
    (await cookies()).set("role", role, { expires, httpOnly: true });

    return { message: "Login Success" };
}

// Logout User - clear session and role cookies
export async function logoutUser() {
    // Destroy the session and role cookie
    try {
        console.log("=== before logout ===");
        (await cookies()).delete("session");
        (await cookies()).delete("role");  // delete the role cookie
        console.log("=== after delete logout ===");
    } catch (e) {
        console.log("Error: ", e);
        return { message: "" };
    }

    return { message: "Logout Success" };
}

// Get Session - returns the session payload including role
export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    
    const payload = await decrypt(session);
    
    // Get the role from the separate cookie
    const role = (await cookies()).get("role")?.value;

    return { ...payload, role };  // payload now contains { id, email, name, expires, role }
}

// Update Session - refresh session expiry time
export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + TIMEOUT * 1000);

    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires as Date,
    });

    // No need to update role cookie as it doesn't change
    return res;
}
