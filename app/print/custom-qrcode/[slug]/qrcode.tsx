"use client";

import * as React from "react";
import { QRCode } from "react-qrcode-logo";

const websiteDomain: string =
  process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "schafe-vorm-fenster.de";
const qrCodeBaseUrl: string =
  process.env.NEXT_PUBLIC_QR_BASE_URL || "https://svf.li/";
const qrCodeBasePath: string =   "c/";

export default function QrCodeImage({ slug }: { slug: string }) {
  const qrCodeUrl: string = qrCodeBaseUrl + qrCodeBasePath + slug;
  const qrCodeHtmlId: string = "qr-code-" + slug;

  const downloadCode = () => {
    const canvas: any = document.getElementById(qrCodeHtmlId);
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
        <QRCode
          id={qrCodeHtmlId}
          size={900}
          value={qrCodeUrl}
          fgColor="black"
          qrStyle="dots"
          logoImage="/Schafe-vorm-Fenster-UG_Logo.png"
          removeQrCodeBehindLogo={true}
          ecLevel="Q"
          logoHeight={200}
          logoWidth={200}
          eyeRadius={[
            {
              // top/left eye
              outer: [10, 3, 3, 3],
              inner: [5, 5, 5, 5],
            },
            {
              // top/right eye
              outer: [3, 10, 3, 3],
              inner: [5, 5, 5, 5],
            },
            {
              // bottom/left
              outer: [3, 3, 3, 10],
              inner: [5, 5, 5, 5],
            },
          ]}
          eyeColor="#222"
        />
      </button>
    </div>
  );
}
