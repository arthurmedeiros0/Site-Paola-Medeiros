import { ImageResponse } from "next/og";
const size = { width: 1200, height: 630 };
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "90px",
        background: "#F7F4ED",
        color: "#355347",
        borderBottom: "16px solid #8D9B8A",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 5,
          marginBottom: 44,
        }}
      >
        ODONTOLOGIA COM ACOLHIMENTO
      </div>
      <div style={{ display: "flex", fontSize: 74, marginBottom: 22 }}>
        Dra. Paola Medeiros
      </div>
      <div style={{ display: "flex", fontSize: 32 }}>
        Cada sorriso tem uma história.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 22,
          marginTop: 52,
          color: "#58655b",
        }}
      >
        Cirurgiã-dentista · CRO-PR 15593
      </div>
    </div>,
    size,
  );
}
