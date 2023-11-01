export default function LoadSpinnerSVG() {
  return (
    <svg
      version="1.1"
      width="500"
      height="500"
      className="z-11"
      viewBox="-7 -7 35 35"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="0" id="gradient-1">
          <stop stopColor="#00A0E4" offset="0%" />
          <stop stopColor="#00A0E4" offset="63.1%" stopOpacity=".631" />
          <stop stopColor="#00A0E4" offset="100%" stopOpacity=".5" />
        </linearGradient>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="0" id="gradient-2">
          <stop stopColor="#00A0E4" offset="0%" stopOpacity=".5" />
          <stop stopColor="#00A0E4" offset="63.1%" stopOpacity=".12" />
          <stop stopColor="#00A0E4" offset="100%" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none">
        <g transform="translate(1 1)">
          <path
            d="M 10.5 10.5 m -10.5 0a 10.5 10.5 0 1 0 21 0a"
            stroke="url(#gradient-1)"
            strokeWidth="2"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 10.5 10.5"
            to="360 10.5 10.5"
            dur="1s"
            repeatCount="indefinite"
          />
        </g>
        <g transform="translate(1 1)">
          <path
            d="M 10.5 10.5 m -10.5 0a 10.5 10.5 0 1 0 21 0a"
            stroke="url(#gradient-2)"
            strokeWidth="2"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="-180 10.5 10.5"
            to="180 10.5 10.5"
            dur="1s"
            repeatCount="indefinite"
          />
        </g>
      </g>
    </svg>
  );
}
