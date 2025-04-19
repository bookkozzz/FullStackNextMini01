import Link from "next/link";

export default function FetcherLink() {
    return (
        <div>
            <h1 className="text-xl font-bold">FetcherLink</h1>
            <div className="flex justify-center mt-4 border-2 border-black m-2 p-2 rounded-xl shadow-lg">
                <div className="mr-2  hover:text-blue-500">
                    <Link href="/fetch1">Fetch-Server</Link>
                    <span> | </span>
                </div>
                
                <div className="mr-2 hover:text-blue-500">
                    <Link href="/fetch2">Fetch-Client</Link>
                    <span> | </span>
                </div>
                
                <div className="mr-2  hover:text-blue-500">
                    <Link href="/fetch3">Change User</Link>
                </div>
            </div>
        </div>
    )
}