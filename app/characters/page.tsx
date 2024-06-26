"use client";

import { CHARACTERS_QUERY } from "@/queries/characterQueries";
import { Character } from "@/types";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function CharactersPage() {
  const { loading, data, refetch } = useQuery(CHARACTERS_QUERY);

  return (
    <main className="flex pt-20 flex-col w-[1000px] gap-10 m-auto mb-20">
      <Link href="/">{"<"} Home</Link>
      <h1 className="font-extrabold text-2xl">Characters</h1>
      <div>
        {loading ? (
          "Loading..."
        ) : (
          <div className="relative">
            <table className="table-fixed w-full mb-10 overflow-scroll h-[400px]">
              <thead>
                <tr className="border-2 border-slate-700 h-20">
                  <th className="text-left font-bold pl-5">Name</th>
                  <th className="text-left font-bold">Species</th>
                  <th className="text-left font-bold">Origin</th>
                  <th className="text-left font-bold">Location</th>
                  <th className="text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
                {data?.characters.results.map((character: Character) => (
                  <tr
                    key={character.id}
                    className="border-2 border-slate-700 h-20"
                  >
                    <td className="capitalize pl-5">{character.name}</td>
                    <td className="capitalize">{character.species}</td>
                    <td className="capitalize">{character.origin.name}</td>
                    <td className="capitalize">{character.location.name}</td>
                    <td className="flex justify-center items-center h-[100%]">
                      <Link
                        href={`/characters/${character.id}`}
                        className="block text-green-700 font-bold py-2 px-4 border-2 border-green-700 rounded"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center">
              <h2>
                Page{" "}
                {data?.characters.info.prev == null
                  ? 1
                  : data?.characters.info.prev + 1}{" "}
                of {data?.characters.info.pages}
              </h2>
              <div className="flex gap-2 items-center">
                <button
                  className="text-green-700 font-bold py-2 px-4 border-2 border-green-700 rounded"
                  onClick={() =>
                    refetch({
                      pageID: data?.characters.info.prev,
                    })
                  }
                  data-testid="previous-characters-page"
                  disabled={data?.characters.info.prev === null}
                >
                  Previous
                </button>
                <button
                  className="text-green-700 font-bold py-2 px-4 border-2 border-green-700 rounded"
                  onClick={() =>
                    refetch({
                      pageID: data?.characters.info.next,
                    })
                  }
                  data-testid="next-characters-page"
                  disabled={data?.characters.info.next === null}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
