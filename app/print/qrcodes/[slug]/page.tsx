import QrCodeImage from "./qrcode";

export default async function QrCode({ params }: { params: Promise<{ slug: string }>}) {
  const { slug } = await params
  return <QrCodeImage slug={slug}></QrCodeImage>;
}



