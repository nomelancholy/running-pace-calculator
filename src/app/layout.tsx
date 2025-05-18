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
      <body
        className={inter.className + " bg-gray-50 min-h-screen flex flex-col"}
      >
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
        <main className="max-w-2xl mx-auto w-full px-2 sm:px-4 pt-8 pb-16 flex-1">
          {children}
        </main>
        <footer className="w-full border-t border-gray-200 bg-white/80 py-6 px-4 flex flex-col items-center gap-2 text-sm">
          <div className="font-semibold mb-1">Contact me</div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <div className="flex items-center gap-1">
              {/* mail icon */}
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a3 3 0 003.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-700">starmekey@naver.com</span>
            </div>
            <div className="flex items-center gap-1">
              {/* instagram icon */}
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-gray-500"
              >
                <rect
                  width="18"
                  height="18"
                  x="3"
                  y="3"
                  rx="5"
                  strokeWidth={2}
                />
                <circle cx="12" cy="12" r="4" strokeWidth={2} />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
              <a
                href="https://www.instagram.com/takeknowledge/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700"
              >
                @takeknowledge
              </a>
            </div>
            <a
              href="https://www.youtube.com/@nomelancholy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              {/* youtube icon */}
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-red-500"
              >
                <path d="M21.8 8.001a2.752 2.752 0 00-1.936-1.948C18.2 6 12 6 12 6s-6.2 0-7.864.053A2.752 2.752 0 002.2 8.001 28.6 28.6 0 002 12a28.6 28.6 0 00.2 3.999 2.752 2.752 0 001.936 1.948C5.8 18 12 18 12 18s6.2 0 7.864-.053a2.752 2.752 0 001.936-1.948A28.6 28.6 0 0022 12a28.6 28.6 0 00-.2-3.999zM10 15V9l6 3-6 3z" />
              </svg>
              <span className="text-gray-700 font-semibold">
                Take Knowledge
              </span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
