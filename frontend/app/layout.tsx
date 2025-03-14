import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poplaria",
  description: "Poblaria is a digital platform combating rural depopulation by centralizing housing, jobs, and community resources. Features real-time updates, remote/local job boards, and integration tools. Launches in Catalonia with free access, partnerships, and grants to attract urban migrants and boost sustainable rural growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        {children}
      </body>
    </html>
  );
}
