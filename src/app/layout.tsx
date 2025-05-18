import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";

export const metadata: Metadata = {
  title: "러닝 페이스 계산기",
  description:
    "구간별 페이스로 완주 기록과 페이스 변화를 시각화하는 러닝 계산기",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className + " bg-gray-50 min-h-screen"}>
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm py-3 px-4 flex items-center gap-3">
          <Image
            src="/favicon.ico"
            alt="favicon"
            width={28}
            height={28}
            className="rounded"
          />
          <div>
            <div className="text-lg font-bold tracking-tight">
              러닝 페이스 계산기
            </div>
            <div className="text-xs text-gray-500">
              구간별 페이스로 완주 기록과 페이스 변화를 시각화
            </div>
          </div>
        </header>
        <main className="max-w-2xl mx-auto w-full px-2 sm:px-4 pt-8 pb-16">
          {children}
        </main>
      </body>
    </html>
  );
}
