"use client";

import * as React from "react";
import QRCode from "qrcode";

const websiteDomain: string =
  process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "schafe-vorm-fenster.de";
const qrCodeBaseUrl: string =
  process.env.NEXT_PUBLIC_QR_BASE_URL || "https://svf.li/";
const qrCodeBasePath: string =   "c/";

export default function QrCodeImage({ slug }: { slug: string }) {
  const qrCodeUrl: string = qrCodeBaseUrl + qrCodeBasePath + slug;
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>("");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrCodeUrl, {
        width: 900,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF"
        },
        errorCorrectionLevel: "Q"
      })
        .catch(err => {
          console.error("Error generating QR code:", err);
        });
    }
  }, [qrCodeUrl]);

  const downloadCode = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode_${slug}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="block">
      <p className="mb-4">
        URL:{" "}
        <a href={qrCodeUrl} target="_blank" rel="noreferrer">
          {qrCodeUrl}
        </a>
        <br />
        Click the qr code to download as PNG.
      </p>
      <button onClick={() => downloadCode()}>
        <canvas
          ref={canvasRef}
          className="cursor-pointer"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </button>
    </div>
  );
}
