import { useDropzone } from "react-dropzone";
import { Icon,Button } from "@/components/ui";



export default function DropZone({ files, onFilesChange }) {

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [],
      "application/zip": [],
    },
    maxSize: 50 * 1024 * 1024,
    multiple: false,
    onDrop: (acceptedFiles) => {
      onFilesChange(acceptedFiles);
    },

  });

  const handleRemoveFile = (indexToRemove) => {
    onFilesChange(files.filter((_, index) => index !== indexToRemove));
  };


  return (
    <>
      {files.length === 0 && (
        <div
          {...getRootProps()}
          className="w-full h-full flex flex-col items-center border border-dashed bg-surface justify-center"
        >
          <input {...getInputProps()} className="hidden" />

          <Icon
            name="mdi:cloud-upload-outline"
            height="113px"
            width="155px"
            className="text-primary/70"
          />

          <p className="font-semibold text-[28px]">
            Drag and Drop your files here
          </p>
          <p className="text-base">or Click to browse computer</p>
          <p className="text-base">
            Supported Formats: PDF, ZIP. Max Size: 50MB.
          </p>
        </div>
      )}

      {files.length > 0 && (
        <div className="h-10 w-80 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            <Icon name="ri:file-list-3-line" height="18px" width="18px" />
            <span>Selected File </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {files.map((file, index) => {
              const fileSize =
                file.size > 1024 * 1024
                  ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                  : `${(file.size / 1024).toFixed(1)} KB`;

              return (
                <div
                  key={`${file.name}-${index}`}
                  className="group flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon
                        name="bi:file-earmark-text"
                        height="24px"
                        width="24px"
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {fileSize}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="p-2 bg-primary/10 hover:bg-primary hover:text-white rounded-full text-primary transition-colors"
                  >
                    <Icon
                      name="material-symbols:close-rounded"
                      height="20px"
                      width="20px"
                    />
                  </button>
                </div>
              );
            })}
          </div>
          <Button
            buttonName="Submit"
            bgClass="bg-primary"
          // onClick={handleSubmit}
          />
        </div>
      )}
    </>
  );
}
