import Link from "next/link";
import Image from "next/image";
import rickAndMortyLogo from "@/assets/images/rick-and-morty-logo.png";

export default function Home() {
  return (
    <main className="flex justify-center items-center pt-20 flex-col gap-20">
      <Image
        src={rickAndMortyLogo}
        width={200}
        height={200}
        alt="rick and morty"
      />
      <h1 className="text-lg w-[40rem] text-center">
        Welcome to the Rick and Morty API Explorer, where you can get more
        information on all of your favourite Characters, Episodes and Locations.{" "}
      </h1>
      <ul className="flex justify-center gap-20">
        <li className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
          <Link href="/characters">View Characters</Link>
        </li>
        <li className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
          <Link href="/locations">View Locations</Link>
        </li>
        <li className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
          <Link href="/episodes">View Episodes</Link>
        </li>
      </ul>
    </main>
  );
}
