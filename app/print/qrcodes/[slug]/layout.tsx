import "../../../../styles/globals.css";

export default function QrCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="absolute block m-0 h-a4 w-a4 py-10mm px-13mm">
        <div>{children}</div>
      </body>
    </html>
  );
}
