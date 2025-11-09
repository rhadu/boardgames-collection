import * as React from "react";
const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>{"BoardGameGeek"}</title>
    <rect x="0" y="0" width="24" height="24" rx="4" fill="transparent" />
    <path
      d="m19.7 4.44-2.38.64L19.65 0 4.53 5.56l.83 6.67-1.4 1.34L8.12 24l8.85-3.26 3.07-7.22-1.32-1.27z"
      fill="#ff5a1f"
    />
  </svg>
);
export default SVGComponent;


