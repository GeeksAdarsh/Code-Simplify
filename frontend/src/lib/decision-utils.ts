import { generateRandomInt } from "@/lib/random-utils";

export function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = generateRandomInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface SecretSantaPair {
  giver: string;
  receiver: string;
}

/**
 * Assigns each participant another participant to gift, guaranteeing no one is
 * assigned to themselves. For 3+ participants it also avoids mutual pairs
 * (A -> B and B -> A) so two people can't immediately deduce each other's match.
 */
export function generateSecretSantaPairs(names: string[]): SecretSantaPair[] {
  const n = names.length;
  if (n < 2) return [];

  const indices = Array.from({ length: n }, (_, i) => i);
  let assignment: number[] = indices;
  let attempts = 0;

  do {
    assignment = shuffleArray(indices);
    attempts++;
  } while (
    attempts < 2000 &&
    (assignment.some((receiverIdx, giverIdx) => receiverIdx === giverIdx) ||
      (n > 2 && assignment.some((receiverIdx, giverIdx) => assignment[receiverIdx] === giverIdx)))
  );

  return names.map((giver, i) => ({ giver, receiver: names[assignment[i]] }));
}

export function splitIntoTeams(names: string[], teamCount: number): string[][] {
  const shuffled = shuffleArray(names);
  const teams: string[][] = Array.from({ length: teamCount }, () => []);
  shuffled.forEach((name, i) => {
    teams[i % teamCount].push(name);
  });
  return teams;
}
