import { gql } from "@apollo/client";

export const CHARACTERS_QUERY = gql`
  query CharactersQuery($pageID: Int) {
    characters(page: $pageID) {
      info {
        count
        pages
        next
        prev
      }
      results {
        name
        id
        type
        gender
        image
        status
        species
        origin {
          name
          dimension
        }
        location {
          name
        }
      }
    }
  }
`;

export const CHARACTER_QUERY = gql`
  query CharacterQuery($id: ID!) {
    character(id: $id) {
      name
      id
      type
      gender
      image
      status
      species
      origin {
        name
        dimension
      }
      location {
        name
      }
    }
  }
`;