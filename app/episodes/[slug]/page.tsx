"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Episode, Resident } from "@/types";

const EPISODE_QUERY = gql`
  query EpisodeQuery($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        name
      }
    }
  }
`;

export default function LocationsDetailPage() {
  const params = useParams<{ slug: string }>();
  const episodeId = params.slug;

  const { loading, data } = useQuery(EPISODE_QUERY, {
    variables: { id: episodeId },
  });

  const episode: Episode = data?.episode;

  return (
    <main className="flex pt-20 flex-col w-[1000px] gap-10 m-auto mb-20">
      <Link href="/episodes">{"<"} Episodes</Link>
      <div>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <h1 className="font-extrabold text-2xl capitalize">
              {episode?.name}
            </h1>
            <div className="flex mt-10 w-[1200px]">
              <div className="flex gap-20 ml-10">
                <div>
                  <p className="font-bold mt-3">Episode</p>
                  <p className="capitalize">{episode?.episode}</p>
                  <p className="font-bold mt-3">Air Date</p>
                  <p className="capitalize">{episode?.air_date}</p>
                </div>
                <div>
                  <p className="font-bold mt-3">Characters</p>
                  <div className="flex flex-col gap-2">
                    {episode.characters.map((resident: Resident) => (
                      <Link
                        className="capitalize text-center block text-green-700 font-bold py-2 px-4 border-2 border-green-700 rounded"
                        href={`/characters/${resident.id}`}
                      >
                        {resident.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
