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
        " text-white p-5 rounded-xl mb-5 " +
        (isConverting
          ? "bg-gray-600 opacity-50 cursor-not-allowed"
          : "bg-blue-500")
      }
    >
      {isConverting ? "Converting..." : "Convert to sound"}
    </button>
  );
}
