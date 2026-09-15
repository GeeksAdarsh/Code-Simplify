import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#000000",
          fontSize: 44,
          fontWeight: 900,
          letterSpacing: "-0.12em",
          fontFamily: "Arial Black, Arial, sans-serif",
          lineHeight: 1,
        }}
      >
        Cs
      </div>
    ),
    { ...size },
  );
}
