"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Location, Resident } from "@/types";

const LOCATION_QUERY = gql`
  query LocationQuery($id: ID!) {
    location(id: $id) {
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
`;

export default function LocationsDetailPage() {
  const params = useParams<{ slug: string }>();
  const locationId = params.slug;

  const { loading, data } = useQuery(LOCATION_QUERY, {
    variables: { id: locationId },
  });

  const location: Location = data?.location;

  return (
    <main className="flex pt-20 flex-col w-[1000px] gap-10 m-auto mb-20">
      <Link href="/locations">{"<"} Locations</Link>
      <div>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <h1 className="font-extrabold text-2xl capitalize">
              {location?.name}
            </h1>
            <div className="flex mt-10 w-[1200px]">
              <div className="flex gap-20 ml-10">
                <div>
                  <p className="font-bold mt-3">Type</p>
                  <p className="capitalize">{location?.type}</p>
                  <p className="font-bold mt-3">Dimension</p>
                  <p className="capitalize">{location?.dimension}</p>
                </div>
                <div>
                  <p className="font-bold mt-3">Residents</p>
                  <div className="flex flex-col gap-2">
                    {location.residents.map((resident: Resident) => (
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
