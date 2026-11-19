// Point d'accès commun aux cocktails du socle et aux classiques hors socle (IBA).

import { COCKTAILS } from './cocktails';
import { COCKTAILS_HS } from './cocktailsHorsSocle';
import type { Fiche } from './types';

export const TOUS_COCKTAILS: Fiche[] = [...COCKTAILS, ...COCKTAILS_HS];

export const FICHE_PAR_ID: Record<string, Fiche> = Object.fromEntries(TOUS_COCKTAILS.map((c) => [c.id, c]));
