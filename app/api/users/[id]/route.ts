import { users } from "@/constens/users";

export async function GET(
        request: Request,
        {params}: { params: Promise<{ id: number }> }
) {
    const {id} = await params

    return Response.json(users.find(user => user.id == id) || {error: "User not found"})
}