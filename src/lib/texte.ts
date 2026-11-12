/** Minuscules sans accents, pour une recherche tolérante (« pina » trouve « Piña »). */
export const normaliser = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, ' ')
    .trim();
