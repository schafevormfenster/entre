import Link from "next/link";

export default async function Homepage() {
  return (
    <div>
      <main className="prose prose-base">
        <h1 className="pb-4 text-2xl">Labels and Links</h1>
        <section id="qr-code-labels">
          <h2 className="pb-4 text-xl">Labels</h2>
          <div className="pl-4 mb-4 border-l-8 border-gray-300">
            <h4 className="text-lg">qr code labels, circle, 40mm</h4>
            <p className="text-sm">
              AVERY Zweckform L7105-25, 24 pc. 40mm circle, on A4 paper
            </p>
            <Link
              href={`/print/labels/avery-a4-l7105-25/schlatkow`}
              className="text-sm"
            >
              {`/print/labels/avery-a4-l7105-25/`}
              <span className="text-red-500">{`[community slug]`}</span>
            </Link>
          </div>
          <div className="pl-4 mb-4 border-l-8 border-gray-300">
            <h4 className="text-lg">qr code labels, square, 40mm</h4>
            <p className="text-sm">
              HERMA Special 9642, 24 pc. 40mm square, on A4 paper
            </p>
            <Link
              href={`/print/labels/herma-a4-9542/schlatkow`}
              className="text-sm"
            >
              {`/print/labels/herma-a4-9542/`}
              <span className="text-red-500">{`[community slug]`}</span>
            </Link>
          </div>
        </section>
        <section id="qr-codes">
          <h2 className="pb-4 text-xl">QR Codes</h2>
          <div className="pl-4 mb-4 border-l-8 border-gray-300">
            <h4 className="text-lg">qr code as image</h4>
            <p className="text-sm">png to download</p>
            <Link href={`/print/qrcodes/schlatkow`} className="text-sm">
              {`/print/qrcodes/`}
              <span className="text-red-500">{`[community slug]`}</span>
            </Link>
          </div>
        </section>
        <section id="showcase-poster">
          <h2 className="pb-4 text-xl">Showcase Poster</h2>
          <div className="pl-4 mb-4 border-l-8 border-gray-300">
            <h4 className="text-lg">Poster PDF</h4>
            <p className="text-sm">
              Showcase poster with QR code and community name
            </p>
            <Link href={`/api/print/showcase/poster/?slug=schlatko&community=Schlatkow`} className="text-sm">
              {`/print/showcase/poster/`}
              <span className="text-red-500">{`[community slug]`}</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
