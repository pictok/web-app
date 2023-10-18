import FileUploader from "@/components/design/FileUploader";

export const dynamic = "force-dynamic";
export default function UploadPage() {
  return (
    <div className="mx-auto max-w-xl">
      <FileUploader />
    </div>
  );
}
