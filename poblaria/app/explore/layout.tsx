import type { Metadata } from "next";
import { Nunito } from "next/font/google";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Explore",
  description: "map",
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
