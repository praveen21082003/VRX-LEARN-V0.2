import { useDropzone } from "react-dropzone";
import { Icon } from "@/components/ui";
// import { useToast } from "@/context/ToastProvider";



export default function DropZone({ label, files, multipleFiles, maxFilesAllowed, onFilesChange, heightClass, UploadedFiles }) {

  //  const { addToast } = useToast();



  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "application/pdf": [],
      "application/zip": [],
    },
    maxSize: 50 * 1024 * 1024,
    multiple: multipleFiles,
    maxFiles: maxFilesAllowed,
    onDrop: (acceptedFiles) => {
      onFilesChange(acceptedFiles);
    },

  });



  return (
    <div className={`flex flex-col gap-2 w-full`}>
      {label && (
        <label className="text-h5">
          {label}
        </label>
      )}

      {files.length === 0 && (
        <div
          {...getRootProps()}
          className={`relative noise-overlay flex ${heightClass} w-full  flex-col  items-center border border-dashed bg-surface justify-center `}
        >
          <input {...getInputProps()} className="hidden" />

          <Icon
            name="mdi:cloud-upload-outline"
            height="113px"
            width="155px"
            className="text-primary/70"
          />

          <p className="text-h4">
            Drag and Drop your files here
          </p>
          <p className="text-body">or Click to browse computer</p>
          <p className="text-body">
            Supported Formats: PDF, ZIP. Max Size: 50MB.
          </p>
        </div>
      )}

      {files.length > 0 && (
        <div className="w-full space-y-3">
          {UploadedFiles}
        </div>
      )}
      {fileRejections.length > 0 && (
        <div className="text-red-500 mt-2">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name}>
              {errors.map((e) => (
                <p key={e.code}>
                  {e.code === "file-too-large" && "File exceeds 5MB"}
                  {e.code === "file-invalid-type" && "Invalid file type"}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
