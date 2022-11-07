import QrCodeImage from "./qrcode";

export default async function QrCode({ params }: { params: { slug: string } }) {
  return <QrCodeImage slug={params.slug}></QrCodeImage>;
}
