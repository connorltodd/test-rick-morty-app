export type Character = {
  name: string;
  id: number;
  type: string;
  gender: string;
  image: string;
  status: string;
  species: string;
  origin: {
    name: string;
    dimension: string;
  };
  location: {
    name: string;
  };
};

export type Resident = {
    name: string,
    id: number
}

export type Location = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: Resident[]
}

export type Episode = {
  id: number,
  name: string,
  episode: string,
  air_date: string,
  characters: Resident[]
}