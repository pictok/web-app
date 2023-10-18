"use client";

interface SendPhotoButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isSending: boolean;
}

export default function SendPhotoButton({
  isSending,
  ...props
}: SendPhotoButtonProps) {
  return (
    <button
      disabled={isSending}
      {...props}
      className={
        " mb-5 rounded-xl p-5 text-white " +
        (isSending
          ? "cursor-not-allowed bg-gray-600 opacity-50"
          : "bg-blue-500")
      }
    >
      {isSending ? "Sending..." : "Send Photo"}
    </button>
  );
}
