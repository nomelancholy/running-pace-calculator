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
            <a
              href="https://github.com/nomelancholy/running-pace-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              {/* github icon */}
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-gray-700"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="text-gray-700 font-semibold">GitHub</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
