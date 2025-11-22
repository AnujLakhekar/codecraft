import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexProvider from "@/components/provider/ConvexProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MagiCCode",
  description: "developed by AnujLakhekar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b bg-black text-gray-100 flex flex-col`}
        >
          <ConvexProvider>{children}</ConvexProvider>
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toasterId="default"
            toastOptions={{
              className: "",
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: "#1e1e2e",
                color: "#fff",
              },

              success: {
                duration: 3000,
                iconTheme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
