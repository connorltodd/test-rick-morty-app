"use client";

import { Episode } from "@/types";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const EPISODES_QUERY = gql`
  query EpisodesQuery($pageID: Int) {
    episodes(page: $pageID) {
      info {
        count
        pages
        next
        prev
      }
      results {
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
  }
`;

export default function EpisodesPage() {
  const { loading, data, refetch } = useQuery(EPISODES_QUERY);

  return (
    <main className="flex pt-20 flex-col w-[1000px] gap-10 m-auto mb-20">
      <Link href="/">{"<"} Home</Link>
      <h1 className="font-extrabold text-2xl">Episodes</h1>
      <div>
        {loading ? (
          "Loading..."
        ) : (
          <div className="relative">
            <table className="table-fixed w-full mb-10 overflow-scroll h-[400px]">
              <thead>
                <tr className="border-2 border-slate-700 h-20">
                  <th className="text-left font-bold pl-5">Name</th>
                  <th className="text-left font-bold">Episode</th>
                  <th className="text-left font-bold">Air Date</th>
                  <th className="text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
                {data?.episodes.results.map((episode: Episode) => (
                  <tr
                    key={episode.id}
                    className="border-2 border-slate-700 h-20"
                  >
                    <td className="capitalize pl-5">{episode.name}</td>
                    <td className="capitalize">{episode.episode}</td>
                    <td className="capitalize">{episode.air_date}</td>
                    <td className="flex justify-center items-center h-[100%]">
                      <Link
                        href={`/episodes/${episode.id}`}
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
                {data?.episodes.info.prev == null
                  ? 1
                  : data?.episodes.info.prev + 1}{" "}
                of {data?.episodes.info.pages}
              </h2>
              <div className="flex gap-2 items-center">
                <button
                  className="text-green-700 font-bold py-2 px-4 border-2 border-green-700 rounded"
                  onClick={() =>
                    refetch({
                      pageID: data?.episodes.info.prev,
                    })
                  }
                  disabled={data?.episodes.info.prev === null}
                >
                  Previous
                </button>
                <button
                  className="text-green-700 font-bold py-2 px-4 border-2 border-green-700 rounded"
                  onClick={() =>
                    refetch({
                      pageID: data?.episodes.info.next,
                    })
                  }
                  disabled={data?.episodes.info.next === null}
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
