import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import '@ant-design/v5-patch-for-react-19';

const lato = Lato({
  subsets: ["latin"],
  weight: ['400','700'],
  variable: '--font-lato'
});


export const metadata: Metadata = {
  title: "Stafframe",
  description: "Stafframe allows you to create time based tasks to your growing amount of employees. With ease add users and tasks. Review leave requests. Grafikuj.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className}`}>
        <Navbar/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
