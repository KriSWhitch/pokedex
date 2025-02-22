"use client";
import { Sigmar_One, Kdam_Thmor_Pro } from "next/font/google";
import { ErrorProvider } from "../context/ErrorContext";
import ErrorModal from '../components/common/modal/ErrorModal';
import "@/styles/globals.scss";

export const sigmarOne = Sigmar_One({ subsets: ["latin"], weight: "400", variable: "--font-sigmar-one" });
export const kdamThmorPro = Kdam_Thmor_Pro({ subsets: ["latin"], weight: "400", variable: "--font-kdam-thmor-pro" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ErrorProvider>
        <body id="root" className={`${sigmarOne.className} ${sigmarOne.variable} ${kdamThmorPro.variable}`}>
          <ErrorModal />
          <main className="h-screen flex flex-col justify-center items-center">
            {children}
          </main>
        </body>
      </ErrorProvider>
    </html>
  );
}
