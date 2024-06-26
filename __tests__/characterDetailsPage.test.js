import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { CHARACTER_QUERY } from "../queries/characterQueries";
import CharactersDetailPage from "../app/characters/[slug]/page";
import { useParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useParams: jest.fn(),
}));

describe("mock params returned value", () => {
  useParams.mockReturnValue({ slug: 1 });
});

const mocks = [
  {
    request: {
      query: CHARACTER_QUERY,
      variables: {
        id: 1,
      },
    },
    result: {
      data: {
        character: {
          name: "Rick Sanchez",
          id: "1",
          type: "",
          gender: "Male",
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          status: "Alive",
          species: "Human",
          origin: {
            name: "Earth (C-137)",
            dimension: "Dimension C-137",
          },
          location: {
            name: "Citadel of Ricks",
          },
        },
      },
    },
  },
];

it("renders without error", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharactersDetailPage />
    </MockedProvider>
  );

  expect(await screen.findByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByTestId("character-name")).toHaveTextContent(
      "Rick Sanchez"
    );
    expect(screen.getByTestId("character-location")).toHaveTextContent(
      "Citadel of Ricks"
    );
    expect(screen.getByTestId("character-status")).toHaveTextContent("Alive");
    expect(screen.getByTestId("character-origin")).toHaveTextContent(
      "Earth (C-137)"
    );
    expect(screen.getByTestId("character-dimension")).toHaveTextContent(
      "Dimension C-137"
    );
  });
});
