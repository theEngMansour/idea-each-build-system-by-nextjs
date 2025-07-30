import React from "react";

async function GetUser() {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await fetch("http://localhost:3000/api/users/1").then(user => user.json());
    return (
            <div>Fetch All Users {response.name}
                <span className="p-2 bg-blue-700 rounded-md text-white"> {response.status}</span>
            </div>
    );
}

export default GetUser;