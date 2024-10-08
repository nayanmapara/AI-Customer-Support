import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from 'next/image';
import RobotImage from './Robot.png'; //Importing the png file and plugging in as image source

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout-container">
          <div className="content">
            {children}
          </div>
          <div className="image-container">
          <Image src={RobotImage} alt="Robot" />
          </div>
        </div>
      </body>
    </html>
  );
}
