import { useState, useRef, useEffect } from "react";
import { Icon } from "@/components/ui";
import { usePermission } from "../../../hooks/usePermission";

export default function ZoomControls({
  title,
  children,
  totalPages = 1,
  currentPage,
  setCurrentPage,
  fileUrl,
}) {
  const { can } = usePermission();

  const handleDownload = async () => {
    if (!can("DOWNLOAD_COURSE")) {
      alert("You don't have permission to download this course.");
      return;
    }

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("File download failed");
      }

      // Extract the correct file extension from the URL
      let extension = "pdf"; // Default fallback
      if (fileUrl) {
        const urlParts = fileUrl.split(/[#?]/)[0].split(".");
        if (urlParts.length > 1) {
          extension = urlParts.pop();
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      // Use the dynamically extracted extension
      link.setAttribute("download", `${title || "course"}.${extension}`);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Download failed");
    }
  };

  const rootRef = useRef(null); // For Fullscreen (Header + Content)
  const containerRef = useRef(null); // PDF Scroll Area

  const [scale, setScale] = useState(1);
  const [fitMode, setFitMode] = useState("page");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Hover State

  const DOC_WIDTH = 750;
  const DOC_HEIGHT = 850;

  /* ================= SCALE ================= */
  const calculateScale = (mode) => {
    if (!containerRef.current) return;

    const availableWidth = containerRef.current.clientWidth;
    const availableHeight = containerRef.current.clientHeight;

    if (mode === "width") {
      setScale(availableWidth / DOC_WIDTH);
    } else if (mode === "page") {
      setScale(availableHeight / DOC_HEIGHT);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (fitMode !== "custom") calculateScale(fitMode);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [fitMode]);

  /* ================= FULLSCREEN ================= */
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      rootRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  /* ================= KEYBOARD ================= */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Disable Ctrl+P / Ctrl+S
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "s")) {
        e.preventDefault();
        alert("Printing and Saving are disabled for security.");
      }

      // F → Toggle Fullscreen
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullScreen();
      }

      // LEFT → Previous Page
      if (e.key === "ArrowLeft") {
        setCurrentPage((p) => Math.max(1, p - 1));
      }

      // RIGHT → Next Page
      if (e.key === "ArrowRight") {
        setCurrentPage((p) => Math.min(totalPages, p + 1));
      }

      // UP → Scroll Up
      if (e.key === "ArrowUp") {
        containerRef.current?.scrollBy({ top: -200, behavior: "smooth" });
      }

      // DOWN → Scroll Down
      if (e.key === "ArrowDown") {
        containerRef.current?.scrollBy({ top: 200, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalPages]);

  return (
    <div
      ref={rootRef}
      className={`relative flex flex-col h-full w-full overflow-hidden select-none transition-all duration-300 ${
        isFullScreen ? "bg-black" : "bg-[#525659]"
      }`}
      onContextMenu={(e) => e.preventDefault()}
      // Moved hover state to the root container so the floating nav stays visible
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ================= HEADER ================= */}
      <header className="h-[56px] grid grid-cols-3 items-center px-3 bg-[#323639] text-white shadow-lg shrink-0 z-20">
        <h2 className="text-lg truncate">{title}</h2>

        <div className="flex items-center justify-center gap-4">
          {/* PAGE NAVIGATION */}
          <div className="flex items-center bg-black/30 p-1 h-8">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
              {/* <ChevronLeft className="w-4 h-4" /> */}
              <Icon
                name="mingcute:right-fill"
                width="18"
                height="18"
                className="rotate-180 mb-1 "
              />
            </button>

            <span className="text-xs px-2">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              {/* <ChevronRight className="w-4 h-4" /> */}
              <Icon
                name="mingcute:left-fill"
                width="18"
                height="18"
                className="rotate-180  mb-1"
              />
            </button>
          </div>

          <div className="h-6 w-[1px] bg-white" />

          {/* ZOOM CONTROLS */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setFitMode("custom");
                setScale((s) => Math.max(0.3, s - 0.1));
              }}
            >
              −
            </button>

            <span className="text-xs w-12 text-center bg-black/50 p-1">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={() => {
                setFitMode("custom");
                setScale((s) => Math.min(3, s + 0.1));
              }}
            >
              +
            </button>
          </div>

          <div className="h-6 w-[1px] bg-white" />

          {/* FIT BUTTON */}
          <button
            onClick={() => setFitMode((f) => (f === "page" ? "width" : "page"))}
            title={fitMode === "width" ? "Fit to Page" : "Fit to Width"}
          >
            {fitMode === "width" ? (
              <Icon
                name="material-symbols:fit-page-height-outline"
                height="24px"
                width="24px"
              />
            ) : (
              <Icon
                name="material-symbols:fit-page-width-outline-rounded"
                height="24px"
                width="24px"
              />
            )}
          </button>

          {/* FULLSCREEN */}
          <button onClick={toggleFullScreen} title="FullScreen">
            {isFullScreen ? (
              <Icon name="mage:minimize" height="24" width="24" />
            ) : (
              <Icon name="mage:maximize" height="24" width="24" />
            )}
          </button>
        </div>
        {can("DOWNLOAD_COURSE") && (
          <button
            onClick={handleDownload}
            className="p-2 flex justify-end pr-3 "
            title="Download"
          >
            <Icon name="ooui:download" width="20" height="20" className="cursor-pointer" />
          </button>
        )}
      </header>

      {/* ================= CONTENT ================= */}
      <main
        ref={containerRef}
        className="relative flex-1 overflow-auto flex justify-center items-start"
      >
        {/* WRAPPER */}
        <div className="relative inline-block">
          {/* PDF CONTENT */}
          <div
            className="bg-white shadow-2xl origin-top transition-transform duration-200"
            style={{ transform: `scale(${scale})` }}
          >
            {children}
          </div>
        </div>
      </main>

      {/* FLOATING PAGE CONTROLLER (Moved outside the scrolling main area) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 bottom-6 
        bg-[#323639] text-white flex items-center gap-4 
        px-5 py-2 rounded-md shadow-xl 
        transition-opacity duration-300 z-50
        ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="hover:opacity-70 disabled:opacity-30"
        >
          {/* Added the missing ChevronLeft here */}
          <Icon
            name="mingcute:right-fill"
            width="18"
            height="18"
            className="rotate-180 items-center"
          />
        </button>

        <span className="text-sm font-medium">
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="hover:opacity-70 disabled:opacity-30"
        >
          <Icon
            name="mingcute:left-fill"
            width="18"
            height="18"
            className="rotate-180 items-center"
          />
        </button>
      </div>
    </div>
  );
}
