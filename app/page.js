import Link from "next/link";
import Navigation from "./_components/Navigation";
import Image from "next/image";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        placeholder="blur"
        fill
        quality={80}
        alt="Mountains and forests with two  cabins"
        className="object-cover object-top"
      />
      <div className="relative text-center z-10">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 py-6 px-8 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
