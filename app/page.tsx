import Link from "next/link";

export default async function Homepage() {
  return (
    <div>
      <main className="prose prose-base">
        <h1 className="pb-4 text-2xl">Labels and Links</h1>
        <h2 className="pb-4 text-xl">Labels</h2>
        <div className="pl-4 mb-4 border-l-8 border-gray-300">
          <h4 className="text-lg">qr code labels, square, 40mm</h4>
          <p className="text-sm">
            AVERY Zweckform L7105-25, 24 pc. 40mm on A4 paper
          </p>
          <Link
            href={`/print/labels/avery-a4-l7105-25/schlatkow`}
            className="text-sm"
          >
            {`/print/labels/avery-a4-l7105-25/`}
            <span className="text-red-500">{`[community slug]`}</span>
          </Link>
        </div>
        <h2 className="pb-4 text-xl">QR Codes</h2>
        <div className="pl-4 mb-4 border-l-8 border-gray-300">
          <h4 className="text-lg">qr code as image</h4>
          <p className="text-sm">png to download</p>
          <Link href={`/print/qrcodes/schlatkow`} className="text-sm">
            {`/print/qrcodes/`}
            <span className="text-red-500">{`[community slug]`}</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
