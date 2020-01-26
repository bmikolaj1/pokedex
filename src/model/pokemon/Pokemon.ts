import { IAbilities } from "./Abilities";
import { IMoves } from "./Moves";
import { ISprites } from "./Sprites";

export interface IPokemon {
  abilities: IAbilities[];
  base_experience: number;
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: true;
  location_area_encounters: string;
  moves: IMoves[];
  name: string;
  order: number;
  species: { name: string; url: string };
  sprites: ISprites;
  stats: [];
  types: [];
  weight: number;
}
