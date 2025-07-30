import React from "react";
import { revalidateTag } from "next/cache";
import Form from "next/form";

async function revalidateTagAction() {
    "use server"
    console.log("Revalidating tag... w");
    revalidateTag("users")
}

async function Page() {
    return (
            <div>
                <Form action={revalidateTagAction}>
                    <button className="p-2 text-white bg-blue-700 m-4 rounded-md" type="submit">revalidate tage
                    </button>
                </Form>
            </div>
    );
}

export default Page;