import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { Suspense } from "react";
import Link from "next/link";
import LoadingIndicator from "@/components/loading-indicator";

type User = {
    id: number;
    name: string;
    status: "active" | "unactive";
};

export async function AllUser() {
    "use cache"
    cacheTag("users")
    const users: User[] = await fetch("http://localhost:3000/api/users").then((res) => res.json())
    return <>
        <Suspense fallback={<>Loading {">>"}</>}>

            <table dir={"rtl"} className="table-auto w-full text-center border">
                <thead>
                <tr className="border-b">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user: User) => {
                    return <tr key={user.id} className="*:border hover:bg-gray-100">
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.status}</td>
                        <td>
                            <Link href={`/directive-cache/${user.id}`} prefetch={false}>
                                <button className="p-2 text-white bg-blue-700 rounded-md">View
                                    <LoadingIndicator/>
                                </button>
                            </Link>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </Suspense>
    </>
}


export default function User() {
    return <>
        <AllUser/>
    </>
}