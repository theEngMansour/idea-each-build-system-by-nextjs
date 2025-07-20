"use client"
import { Document, Page, pdfjs } from "react-pdf"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
).toString();


export default function ViewPdfPage() {
    const [file, setFile] = useState<File | null>(null)
    const [numPages, setNumPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState(1)

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files[0]) {
            setFile(files[0])
        }
    }
    const onDocumentLoadSuccess = ({numPages}: { numPages: number }) => {
        setNumPages(numPages)
    }
    return (
            <div>
                <Input
                        type="file"
                        accept=".pdf"
                        onChange={onFileChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                {file && (
                        <Document file={file}
                                  onLoadSuccess={onDocumentLoadSuccess}
                                  className="flex flex-col items-center"
                        >
                            <Page pageNumber={currentPage} width={600}/>
                        </Document>
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
