import React, { useState, useEffect, useRef } from 'react'
import { Button, Input } from "@/components/ui"
import PDFViewer from './PDFViewer';

function DocumentControls({
    title,
    fileUrl,
    key
}) {

    console.log(fileUrl);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1);


    const containerRef = useRef();
    const hideTimerRef = useRef();
    const isHoveringControlsRef = useRef(false);


    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };


    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight") {
                setCurrentPage((p) => Math.min(p + 1, totalPages));
            }
            if (e.key === "ArrowLeft") {
                setCurrentPage((p) => Math.max(p - 1, 1));
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [totalPages]);


    useEffect(() => {
        const handleMouseMove = () => {
            setShowControls(true);

            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
            }

            hideTimerRef.current = setTimeout(() => {
                if (!isHoveringControlsRef.current) {
                    setShowControls(false);
                }
            }, 1000);
        };


        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(hideTimerRef.current);
        }
    }, []);


    return (
        <div ref={containerRef} key={key} className={`relative group flex flex-col h-[80vh] w-full max-w-5xl overflow-hidden select-none transition-all duration-300 
            ${isFullscreen ? "bg-black" : "bg-[#525659]"}
            `}>
            <header className="flex-shrink-0 flex items-center justify-between px-4 h-12 bg-[#323639] text-white shadow-md shrink-0 z-20">


                <h2 className="text-sm font-medium truncate max-w-[20%]">
                    {title}
                </h2>


                <div className="flex items-center gap-10">

                    <div className="flex items-center gap-2 bg-[#2A2E2F] px-2 py-1 rounded-md">

                        <Button
                            frontIconName="mingcute:left-fill"
                            frontIconHeight="18"
                            frontIconWidth="18"
                            textClass="text-white"
                            bgClass=""
                            className="p-1 hover:bg-white/10 rounded-full"
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                        />

                        <div className="flex items-center gap-1 text-xs">
                            <Input
                                widthClass="w-10"
                                bgClass="bg-[#191B1C]"
                                textClass="text-white"
                                paddingClass="px-1 py-[2px]"
                                value={currentPage}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= 1 && value <= totalPages) {
                                        setCurrentPage(value);
                                    }
                                }}
                            />
                            <p className="text-gray-400">/{totalPages}</p>
                        </div>

                        <Button
                            frontIconName="mingcute:right-fill"
                            frontIconHeight="18"
                            frontIconWidth="18"
                            textClass="text-white"
                            bgClass=""
                            className="p-1 hover:bg-white/10 rounded-full"
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                        />
                    </div>

                    <div className="flex items-center gap-2 bg-[#2A2E2F] px-2 py-1 rounded-md">

                        <Button
                            frontIconName="tabler:zoom-out"
                            frontIconHeight="18"
                            frontIconWidth="18"
                            textClass="text-white"
                            bgClass=""
                            className="p-1 hover:bg-white/10 rounded-full"
                            onClick={() =>
                                setScale((prev) => Math.max(prev - 0.2, 0.6))
                            }
                        />

                        <div className="text-xs w-12 text-center bg-[#191B1C] py-1 rounded">
                            {Math.round(scale * 100)}%
                        </div>

                        <Button
                            frontIconName="tabler:zoom-in"
                            frontIconHeight="18"
                            frontIconWidth="18"
                            textClass="text-white"
                            bgClass=""
                            className="p-1 hover:bg-white/10 rounded-full"
                            onClick={() =>
                                setScale((prev) => Math.min(prev + 0.2, 2))
                            }
                        />
                    </div>

                    <Button
                        frontIconName="material-symbols:fit-page-width-outline-rounded"
                        frontIconHeight="18"
                        frontIconWidth="18"
                        textClass="text-white"
                        bgClass=""
                        className="p-2 hover:bg-white/10 rounded-full"
                    />
                </div>

                <Button
                    frontIconName={
                        isFullscreen
                            ? "mingcute:fullscreen-exit-fill"
                            : "mingcute:fullscreen-fill"
                    }
                    frontIconHeight="18"
                    frontIconWidth="18"
                    textClass="text-white"
                    bgClass=""
                    className="p-2 hover:bg-white/10 rounded-full"
                    onClick={toggleFullScreen}
                />

            </header>
            {/* <div className="flex-1 overflow-hidden"> */}

                <PDFViewer
                    url={fileUrl}
                    scale={scale}
                    currentPage={currentPage}
                    setTotalPages={setTotalPages}
                    pdfDoc={pdfDoc}
                    setPdfDoc={setPdfDoc}
                />
            {/* </div> */}
            <div

                onMouseEnter={() => {
                    isHoveringControlsRef.current = true;
                }}

                onMouseLeave={() => {
                    isHoveringControlsRef.current = false;
                }}

                className={`absolute left-1/2 -translate-x-1/2 bottom-6 
                    bg-black/70 text-white flex items-center gap-4 
                    px-3 py-1 rounded-md shadow-xl 
                    transition-opacity duration-300 z-50
                    ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
            >
                <Button
                    frontIconName="mingcute:left-fill"
                    frontIconHeight="18"
                    frontIconWidth="18"
                    textClass="text-white"
                    bgClass=""
                    className="p-1 hover:bg-white/10 rounded-full"
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                />

                <span className="text-xs font-medium">
                    Page {currentPage} / {totalPages}
                </span>

                <Button
                    frontIconName="mingcute:right-fill"
                    frontIconHeight="18"
                    frontIconWidth="18"
                    textClass="text-white"
                    bgClass=""
                    className="p-1 hover:bg-white/10 rounded-full"
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                />

            </div>

        </div>
    )
}

export default DocumentControls
