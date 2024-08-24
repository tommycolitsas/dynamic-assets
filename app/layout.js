// app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ElevenLabs",
  description: "Bring your content to life with ElevenLabs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white flex justify-center items-center min-h-screen`}>
        {children}
      </body>
    </html>
  );
}