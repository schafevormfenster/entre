"use client";

import * as React from "react";
import QRCode from "qrcode";

const websiteDomain: string =
  process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "schafe-vorm-fenster.de";
const qrCodeBaseUrl: string =
  process.env.NEXT_PUBLIC_QR_BASE_URL || "https://svf.li/";
const qrCodeBasePath: string =
  process.env.NEXT_PUBLIC_QR_CODE_BASE_PATH || "q/";

export default function Label({ slug }: { slug: string }) {
  const qrCodeUrl: string = qrCodeBaseUrl + qrCodeBasePath + slug;
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>("");

  React.useEffect(() => {
    QRCode.toDataURL(qrCodeUrl, {
      width: 116,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      },
      errorCorrectionLevel: "Q"
    })
      .then(url => {
        setQrCodeDataUrl(url);
      })
      .catch(err => {
        console.error("Error generating QR code:", err);
      });
  }, [qrCodeUrl]);

  return (
    <div className="relative block pt-2 text-center h-40mm w-40mm">
      {qrCodeDataUrl && (
        <img
          src={qrCodeDataUrl}
          alt={`QR Code for ${qrCodeUrl}`}
          width={116}
          height={116}
          className="mx-auto"
        />
      )}
      {/* <p className="absolute block w-full leading-tight text-center text-black text-xxs top-5 font-title">
        {websiteDomain}
      </p> */}
      <div className="absolute bottom-0 block w-full text-center">
        <p className="relative block w-2/3 mx-auto leading-none text-center text-black whitespace-normal text-s font-title">
          {slug.replaceAll("-", "‐")}
        </p>
      </div>
    </div>
  );
}
