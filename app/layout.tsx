import "./globals.css";
import SideBar from "./Components/SideBar";
import { ImageProvider } from "./contexts/ImageContext";
import { MetadataProvider } from "./contexts/MetadataContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Skin Cancer Analysis App</title>
      </head>
      <body>
        {/* Context Providers */}
        <ImageProvider>
          <MetadataProvider>
            <div className="flex h-full">
              {/* Sidebar */}
              <SideBar />

              {/* Main Content */}
              <main className="flex-1">{children}</main>
            </div>
          </MetadataProvider>
        </ImageProvider>
      </body>
    </html>
  );
}
