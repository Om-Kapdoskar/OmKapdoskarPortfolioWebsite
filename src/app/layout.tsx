import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Om Kapdoskar | Data Science, Business Intelligence & Product Strategy",
  description:
    "Personal portfolio of Om Kapdoskar — Virginia Tech M.S. Business Administration (3.92 GPA, Summa Cum Laude). Available for Data Analyst, Business Analyst, and Associate Product Manager roles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${montserrat.className} bg-[#030712] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
