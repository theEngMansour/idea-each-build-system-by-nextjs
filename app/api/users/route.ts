import { users } from "@/constens/users";

export async function GET() {
    return Response.json(users)
}