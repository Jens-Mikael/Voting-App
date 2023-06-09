import Header from "@/components/Header";
import "./globals.css";
import { Ubuntu } from "next/font/google";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Online Voting App",
};

const ubuntu = Ubuntu({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-lato",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${ubuntu.variable} font-ubuntu h-screen relative text-[#0f172a] bg-neutral-100 dark:bg-slate-950 dark:text-[#e2e8f0] border-slate-900`}
        >
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  );
}
