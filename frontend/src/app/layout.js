import { Inter } from "next/font/google";
import "./globals.css";
import ClientSideProvider from "@/components/clientSideProviderTest";
import NavBar from "@/components/navbar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "RecipeCorner Homepage",
    template: "%s | RecipeCorner",
  },
  description: "RecipeCorner App description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSideProvider>
          <div className="container">
            <NavBar />
            {children}
          </div>
        </ClientSideProvider>
      </body>
    </html>
  );
}
