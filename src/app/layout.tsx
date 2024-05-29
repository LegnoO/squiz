import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";

import { Suspense } from "react";
import Provider from "@/redux/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/styles/globals.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
          <body>
            {children}
            <ToastContainer />
          </body>
        </AuthGuard>
      </Provider>
    </html>
  );
}
