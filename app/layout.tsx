import "./globals.css";

import { ImageProvider } from "./contexts/ImageContext";
import { MetadataProvider } from "./contexts/MetadataContext";
import { ThemeProvider } from "@/app/Components/theme-provider";

import { SidebarProvider, SidebarTrigger } from "@/app/Components/sidebar"
import { AppSidebar } from "@/app/Components/app-sidebar";

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
        <title>SkinSense - AI</title>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Context Providers */}
          <ImageProvider>
            <MetadataProvider>
              <SidebarProvider>
                <div className="flex w-full h-full">
                  {/* Sidebar */}
                  <AppSidebar />

                  {/* Main Content */}
                  <main className="w-full bg-primary-background ">
                    <SidebarTrigger className="m-2" />
                    {children}
                  </main>
                </div>
              </SidebarProvider>
            </MetadataProvider>
          </ImageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
