import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { CHARACTERS_QUERY } from "../app/characters/page";
import CharactersPage from "../app/characters/page";

const mocks = [
  {
    request: {
      query: CHARACTERS_QUERY,
    },
    result: {
      data: {
        characters: {
          info: {
            count: 826,
            pages: 42,
            next: 2,
            prev: null,
          },
          results: [
            {
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
          ],
        },
      },
    },
  },
];

it("renders without error", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharactersPage />
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(`Rick Sanchez`)).toBeInTheDocument();
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
  });
});

it("next button should be disabled on page 42", async () => {
  mocks[0].result.data.characters.info.next = null;
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharactersPage />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId("next-characters-page")).toHaveAttribute(
      "disabled"
    );
  });
});

it("previous button should be disabled on page 1", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharactersPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByTestId("previous-characters-page")).toHaveAttribute(
      "disabled"
    );
  });
});
