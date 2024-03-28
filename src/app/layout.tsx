import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";
import Provider from "@/redux/StoreProvider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/styles/globals.scss";
import 'react-quill/dist/quill.snow.css';

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
      <Provider>
        <AuthGuard>
          <body>{children}</body>
        </AuthGuard>
      </Provider>
    </html>
  );
}
