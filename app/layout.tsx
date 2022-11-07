import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Entré</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="p-8 border-4 min-h-screen w-full border-yellow-400">
        {children}
      </body>
    </html>
  );
}
