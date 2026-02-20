import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "FieldScribe — AI Inspection Report Software";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          {/* Scaled up Logo */}
          <svg
            width="200"
            height="200"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="8" fill="#4F46E5" />
            <path
              d="M21.3333 10.6667H10.6667C9.93029 10.6667 9.33333 11.2636 9.33333 12V24H22.6667V12C22.6667 11.2636 22.0697 10.6667 21.3333 10.6667Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 8V10.6667"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.3333 16H18.6667"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.3333 20H18.6667"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "#111827",
            fontFamily: "sans-serif",
          }}
        >
          FieldScribe
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#6B7280",
            marginTop: 20,
            fontFamily: "sans-serif",
          }}
        >
          AI-Powered Inspection Reports
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
