"use client";

import { Location } from "@/types";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const LOCATIONS_QUERY = gql`
  query LocationsQuery($pageID: Int) {
    locations(page: $pageID) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        dimension
        residents {
          name
          id
        }
      }
    }
  }
`;

export default function LocationsPage() {
  const { loading, data, refetch } = useQuery(LOCATIONS_QUERY);

  return (
    <main className="flex pt-20 flex-col w-[1000px] gap-10 m-auto mb-20">
      <Link href="/">{"<"} Home</Link>
      <h1 className="font-extrabold text-2xl">Locations</h1>
      <div>
        {loading ? (
          "Loading..."
        ) : (
          <div className="relative">
            <table className="table-fixed w-full mb-10 overflow-scroll h-[400px]">
              <thead>
                <tr className="border-2 border-slate-700 h-20">
                  <th className="text-left font-bold pl-5">Name</th>
                  <th className="text-left font-bold">Type</th>
                  <th className="text-left font-bold">Dimension</th>
                  <th className="text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
                {data?.locations.results.map((location: Location) => (
                  <tr className="border-2 border-slate-700 h-20">
                    <td className="capitalize pl-5">{location.name}</td>
                    <td className="capitalize">{location.type}</td>
                    <td className="capitalize">{location.dimension}</td>
                    <td className="flex justify-center items-center h-[100%]">
                      <Link
                        href={`/locations/${location.id}`}
                        className="capitalize block text-green-700 font-bold py-2 px-4 border-2 border-green-700 rounded"
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
                {data?.locations.info.prev == null
                  ? 1
                  : data?.locations.info.prev + 1}{" "}
                of {data?.locations.info.pages}
              </h2>
              <div className="flex gap-2 items-center">
                <button
                  className="text-green-700 font-bold py-2 px-4 border-2 border-green-700 rounded"
                  onClick={() =>
                    refetch({
                      pageID: data?.locations.info.prev,
                    })
                  }
                  disabled={data?.locations.info.prev === null}
                >
                  Previous
                </button>
                <button
                  className="text-green-700 font-bold py-2 px-4 border-2 border-green-700 rounded"
                  onClick={() =>
                    refetch({
                      pageID: data?.locations.info.next,
                    })
                  }
                  disabled={data?.locations.info.next === null}
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
