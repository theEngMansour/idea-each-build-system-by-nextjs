"use client"
import { Document, Page, pdfjs } from "react-pdf"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
).toString();


export default function ViewPdfPage() {
    const [numPages, setNumPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [fileUrl, setFileUrl] = useState<string | null>(null)

    useEffect(() => {
        const pdfPath = "/sample.pdf"
        setFileUrl(pdfPath)
        console.log(fileUrl)
    }, [fileUrl])
    const onDocumentLoadSuccess = ({numPages}: { numPages: number }) => {
        setNumPages(numPages)
    }
    return (
            <div>
                {fileUrl && (
                        <>
                            <Document file={fileUrl}
                                      onLoadSuccess={onDocumentLoadSuccess}
                                      className="flex flex-col items-center"
                            >
                                <Page pageNumber={currentPage} width={600}/>
                            </Document>
                        </>
                )}


                {numPages > 0 && (
                        <div className="mt-4 flex justify-between items-center">
                            <Button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <span>
                              Page {currentPage} of {numPages}
                            </span>
                            <Button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numPages))}
                                    disabled={currentPage === numPages}
                            >
                                Next
                            </Button>
                        </div>
                )}
            </div>
    );
}
