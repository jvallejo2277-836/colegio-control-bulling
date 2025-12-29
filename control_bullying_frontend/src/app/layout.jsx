import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Control Bullying",
  description: "Sistema convivencia escolar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} app-body`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
