"use client"
import dynamic from "next/dynamic"

const PDFView = dynamic(() => import("./pdf-view"), {ssr: false})

export default function Page() {
    return (
            <div>
                <PDFView/>
            </div>
    )
}
