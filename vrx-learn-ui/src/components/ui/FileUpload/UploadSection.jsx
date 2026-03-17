import { Icon } from '@/components/ui'
import DropZone from "./DropZone";
import UploadButton from "./UploadButton";

export default function UploadSection({
    files,
    setFiles,
    onUpload,
    label = "Your Work"
}) {

    const handleRemoveFile = (indexToRemove) => {
        onFilesChange(files.filter((_, index) => index !== indexToRemove));
    };


    function UploadedFiles() {
        return (
            <div className="grid grid-cols-1 gap-2">
                {files.map((file, index) => {
                    const fileSize =
                        file.size > 1024 * 1024
                            ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                            : `${(file.size / 1024).toFixed(1)} KB`;

                    return (
                        <div
                            key={`${file.name}-${index}`}
                            className="group flex items-center justify-between p-3  border border-gray-200 rounded shadow-sm hover:border-primary/40 dark:hover:border-text-main-dark transition-colors"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 text-primary dark:text-text-main-dark rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Icon
                                        name="bi:file-earmark-text"
                                        height="24px"
                                        width="24px"
                                    />
                                </div>

                                <div className="flex flex-col min-w-0">
                                    <span className="text-h5 font-medium text-muted truncate">
                                        {file.name}
                                    </span>
                                    <span className="text-body text-dark-gray">
                                        {fileSize}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleRemoveFile(index)}
                                className=" hover:bg-primary/80 p-1 rounded-full text-primary dark:text-text-main-dark transition-colors"
                            >
                                <Icon
                                    name="material-symbols:close-rounded"
                                    height="30"
                                    width="30"
                                />
                            </button>
                        </div>
                    );
                })}
            </div>
        )
    }

    return (
        <>

            <div className="hidden lg:block">
                <DropZone
                    label={label}
                    files={files}
                    multipleFiles={false}
                    onFilesChange={setFiles}
                    heightClass="h-74"
                    handleRemoveFile
                    UploadedFiles={<UploadedFiles />}
                />

                <UploadButton files={files} onUpload={onUpload} />
            </div>


            <div className="lg:hidden flex flex-col gap-2.5 fixed bottom-0 left-0 right-0 bg-primary-16 border-t rounded-t-2xl border-default p-3 z-50">

                <p className="text-h5 font-medium mb-2">{label}</p>

                {files.length === 0 ? (
                    <label className="block border border-primary rounded-md text-center py-2 cursor-pointer">
                        + Add File
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => setFiles([...e.target.files])}
                        />
                    </label>
                ) : (
                    <>
                        <UploadedFiles />
                    </>
                )}

                <UploadButton files={files} onUpload={onUpload} />
            </div>
        </>
    );
}