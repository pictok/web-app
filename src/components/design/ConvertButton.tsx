"use client";

interface ConvertButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isConverting: boolean;
}

export default function ConvertButton({
  isConverting,
  ...props
}: ConvertButtonProps) {
  return (
    <button
      disabled={isConverting}
      {...props}
      className={
        " mb-5 rounded-xl p-5 text-white " +
        (isConverting
          ? "cursor-not-allowed bg-gray-600 opacity-50"
          : "bg-blue-500")
      }
    >
      {isConverting ? "Converting..." : "Convert to sound"}
    </button>
  );
}
