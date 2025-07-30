import React, { Suspense } from "react";
import FetchUser from "./get-user"

export const experimental_ppr = true

async function Page({
                        params,
                    }: {
    params: Promise<{ id: number }>
}) {
    const {id} = await params
    return (
            <>
                <h1>Hello word</h1>
                <Suspense fallback={<span>Loading...</span>}>
                    <div>
                        <FetchUser/>
                    </div>
                </Suspense>
            </>

    );
}

export default Page;

/*

"use client"

import { unstable_ViewTransition as ViewTransition } from "react"

export default function BlogPost() {

    return (
            <ViewTransition>
                <article className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-blue-500 hover:underline">
                            ← Back to blog
                        </p>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <ViewTransition name={`date-1`}>
                                <time className="text-gray-600">545</time>
                            </ViewTransition>
                            {/!* Add a div to hack the transition from Link to h1 on safari, where it needs to be a inline-block *!/}
                            <div>
                                <ViewTransition name={`title-2}`}>
                                    <h1 className="text-5xl font-bold tracking-tight mt-8 mb-16 inline-block">5</h1>
                                </ViewTransition>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-gray-600">Posted by</h2>
                            <ViewTransition name={`authors-3`}>

                            </ViewTransition>
                        </div>

                    </div>
                </article>
            </ViewTransition>
    )
}*/
