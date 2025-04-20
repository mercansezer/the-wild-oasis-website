import Header from "./_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservartionProvider } from "./_contexts/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],

  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },

  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header>
          <Logo />
          <Navigation />
        </Header>
        <div className="px-8 py-12 flex-1 grid">
          <main className="max-w-7xl  w-full mx-auto ">
            <ReservartionProvider>{children}</ReservartionProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
