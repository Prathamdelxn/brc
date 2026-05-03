import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import { MenuProvider } from "../context/MenuContext";
import { TableProvider } from "../context/TableContext";
import { StaffProvider } from "../context/StaffContext";
import { OrderProvider } from "../context/OrderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aura Apparels - Shop Management",
  description: "Modern Clothes Shop Management Desktop Application",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex h-screen overflow-hidden">
        <MenuProvider>
          <StaffProvider>
            <OrderProvider>
              <TableProvider>
                <Sidebar />
                <main className="flex-1 h-full overflow-y-auto p-6 relative">
                  {children}
                </main>
              </TableProvider>
            </OrderProvider>
          </StaffProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
