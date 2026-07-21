import { pickRandom } from "@/lib/random-utils";
import {
  ANIMALS,
  BIRDS,
  BOOKS,
  CITIES,
  COUNTRIES,
  DINOSAURS,
  DRINKS,
  FOODS,
  FRUITS,
  GAMES,
  MOVIES,
  POKEMON,
  TV_SHOWS,
  VEGETABLES,
  type Country,
} from "@/lib/fun-random-data";

export function generateRandomAnimal(): string {
  return pickRandom(ANIMALS);
}

export function generateRandomCountry(): Country {
  return pickRandom(COUNTRIES);
}

export function generateRandomCity(): string {
  return pickRandom(CITIES);
}

export function generateRandomFood(): string {
  return pickRandom(FOODS);
}

export function generateRandomFruit(): string {
  return pickRandom(FRUITS);
}

export function generateRandomVegetable(): string {
  return pickRandom(VEGETABLES);
}

export function generateRandomDrink(): string {
  return pickRandom(DRINKS);
}

export function generateRandomMovie(): string {
  return pickRandom(MOVIES);
}

export function generateRandomTvShow(): string {
  return pickRandom(TV_SHOWS);
}

export function generateRandomBook(): string {
  return pickRandom(BOOKS);
}

export function generateRandomGame(): string {
  return pickRandom(GAMES);
}

export function generateRandomPokemon(): string {
  return pickRandom(POKEMON);
}

export function generateRandomDinosaur(): string {
  return pickRandom(DINOSAURS);
}

export function generateRandomBird(): string {
  return pickRandom(BIRDS);
}

/** Converts an ISO 3166-1 alpha-2 country code into its Unicode flag emoji. */
export function countryCodeToFlagEmoji(code: string): string {
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function generateRandomFlag(): { country: string; code: string; emoji: string } {
  const country = generateRandomCountry();
  return { country: country.name, code: country.code, emoji: countryCodeToFlagEmoji(country.code) };
}
