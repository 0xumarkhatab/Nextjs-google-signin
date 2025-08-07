import "./globals.css";
import type { Metadata } from "next";
import SessionProviderWrapper from "./components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "Google Sign-In App",
  description: "Demo app with Google Auth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
