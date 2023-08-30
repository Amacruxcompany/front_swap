import "./globals.css";
import { GlobalContextProvider } from "@/provider/contextProvider";

export const metadata = {
  title: "Amacrux",
  description: "amacrux swap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalContextProvider>
        <body>{children}</body>
      </GlobalContextProvider>
    </html>
  );
}
