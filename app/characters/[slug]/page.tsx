"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Character } from "@/types";
import { CHARACTER_QUERY } from "@/queries/characterQueries";

export default function CharactersDetailPage() {
  const params = useParams<{ slug: string }>();
  const characterId = params.slug;

  const { loading, data } = useQuery(CHARACTER_QUERY, {
    variables: { id: characterId },
  });

  const character: Character = data?.character;

  return (
    <main className="flex pt-20 flex-col w-[1000px] gap-10 m-auto mb-20">
      <Link href="/characters">{"<"} Characters</Link>
      <div>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <h1
              data-testid="character-name"
              className="font-extrabold text-2xl"
            >
              {character?.name}
            </h1>
            <div className="flex mt-10 w-[1200px]">
              <div>
                <Image
                  data-testid="character-image"
                  src={data?.character.image}
                  width={300}
                  height={300}
                  alt="rick and morty"
                />
              </div>
              <div className="flex gap-20 ml-10">
                <div>
                  <p className="font-bold mt-3">Location</p>
                  <p className="capitalize" data-testid="character-location">
                    {character?.location.name}
                  </p>
                  <p className="font-bold mt-3">Status</p>
                  <p className="capitalize" data-testid="character-status">
                    {character?.status}
                  </p>
                  <p className="font-bold mt-3">Origin</p>
                  <p className="capitalize" data-testid="character-origin">
                    {character?.origin.name}
                  </p>
                  <p className="font-bold mt-3">Dimension</p>
                  <p data-testid="character-dimension">
                    {character?.origin.dimension
                      ? character?.origin.dimension
                      : "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="font-bold mt-3">Species</p>
                  <p>{character?.species}</p>
                  <p className="font-bold mt-3">Gender</p>
                  <p>{character?.gender}</p>
                </div>
              </div>
              <div></div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
