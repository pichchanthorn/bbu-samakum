import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#142E28",
          backgroundImage:
            "linear-gradient(135deg, #142E28 0%, #1B3B32 60%, #2A4A3C 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 22,
              background: "linear-gradient(135deg, #E4BD74 0%, #3F6652 100%)",
              color: "#FBF9F2",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            BBU
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#D9AE5C", fontWeight: 600 }}>
            IT DEPARTMENT
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#FBF9F2",
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          BBU Samakum
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            color: "#B9C9C1",
            maxWidth: 900,
          }}
        >
          The verified community for Build Bright University&apos;s IT Department
        </div>
      </div>
    ),
    { ...size }
  );
}
