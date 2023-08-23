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
    <div className="relative block pt-2 text-center h-40mm w-40mm">
      <QRCode
        size={116}
        value={qrCodeUrl}
        fgColor="black"
        qrStyle="dots"
        logoImage="/Schafe-vorm-Fenster-UG_Logo.png"
        removeQrCodeBehindLogo={true}
        ecLevel="Q"
        logoHeight={25}
        logoWidth={25}
        eyeRadius={[
          {
            // top/left eye
            outer: [8, 3, 3, 3],
            inner: [3, 3, 3, 3],
          },
          {
            // top/right eye
            outer: [3, 8, 3, 3],
            inner: [3, 3, 3, 3],
          },
          {
            // bottom/left
            outer: [3, 3, 3, 8],
            inner: [3, 3, 3, 3],
          },
        ]}
        eyeColor="#111"
      />
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
