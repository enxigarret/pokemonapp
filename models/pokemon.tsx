export class PokemonDetail {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }[];
  height: number;
  id: number;
  name: string;
  order: number;
  species: {
    name: string;
    url: string;
  };
  weight: number;
  constructor(
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
    }[],
    height: number,
    id: number,
    name: string,
    order: number,
    species: {
      name: string;
      url: string;
    },
    weight: number
  ) {
    this.abilities = abilities;
    this.height = height;
    this.id = id;
    this.name = name;
    this.order = order;
    this.species = species;
    this.weight = weight;
  }
}
