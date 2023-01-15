"use client";

import * as React from "react";
import { QRCode } from "react-qrcode-logo";

const websiteDomain: string =
  process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "schafe-vorm-fenster.de";
const qrCodeBaseUrl: string =
  process.env.NEXT_PUBLIC_QR_BASE_URL || "https://svf.li/";
const qrCodeBasePath: string =
  process.env.NEXT_PUBLIC_QR_CODE_BASE_PATH || "q/";

export default function Label({ slug }: { slug: string }) {
  const qrCodeUrl: string = qrCodeBaseUrl + qrCodeBasePath + slug;

  return (
    <div className="relative block pt-5 text-center h-40mm w-40mm">
      <QRCode
        size={95}
        value={qrCodeUrl}
        fgColor="black"
        qrStyle="dots"
        // logoImage="/Schafe-vorm-Fenster-UG_Logo.png"
        // removeQrCodeBehindLogo={true}
        ecLevel="M"
        // logoHeight={20}
        // logoWidth={20}
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
      {/* <p className="absolute block w-full leading-tight text-center text-black text-xxs top-5 font-title">
        {websiteDomain}
      </p> */}
      <div className="absolute block w-full text-center top-34mm">
        <p className="relative block w-2/3 mx-auto leading-none text-center text-black whitespace-normal text-s font-title">
          {slug.replaceAll("-", "‐")}
        </p>
      </div>
    </div>
  );
}
