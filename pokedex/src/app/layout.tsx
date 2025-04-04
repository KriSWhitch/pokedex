"use client";
import { Nunito, Press_Start_2P } from 'next/font/google';
import "@/styles/globals.scss";
import Nav from '../components/layout/Nav';

export const fontRoboto = Nunito({ subsets: ["latin"], weight: "400", variable: "--font-nunito" });
export const fontPressStart2P = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-press-start-2p" });

const fontVariables = `${fontRoboto.variable} ${fontPressStart2P.variable}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body id="root" className={`${fontRoboto.className} ${fontVariables}`} suppressHydrationWarning>
          <Nav />
          <main className="h-screen w-4/5 m-auto flex flex-col justify-center items-center">
            {children}
          </main>
        </body>
    </html>
  );
}
