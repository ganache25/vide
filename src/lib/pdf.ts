import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

import { LIB_CATEGORIE, LIB_GLACE, LIB_METHODE, LIB_TYPE, type Fiche } from '../data/types';
import { calculer, categorieDe, euro, libelleQuantite, nombre } from './calc';

const e = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function ficheEnHtml(f: Fiche): string {
  const c = calculer(f.ingredients, f.ratio);
  const tav = f.tavOfficiel ?? Math.round(c.tav);
  const lignes = f.ingredients
    .map((i) => `<tr><td class="q">${e(libelleQuantite(i))}</td><td>${e(i.nom)}</td></tr>`)
    .join('');
  const bloc = (titre: string, contenu: string) => (contenu ? `<h2>${titre}</h2>${contenu}` : '');
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${e(f.nom)}</title>
<style>
  @page { size: A4; margin: 16mm; }
  body { font-family: Helvetica, Arial, sans-serif; color: #1b1b1b; font-size: 12pt; line-height: 1.4; }
  h1 { font-size: 26pt; margin: 0; letter-spacing: 1px; text-transform: uppercase; }
  .desc { color: #7a1f3d; font-style: italic; margin: 2pt 0 12pt; }
  h2 { font-size: 10pt; letter-spacing: 1.5px; text-transform: uppercase; color: #7a1f3d;
       border-bottom: 1px solid #e6c9d1; padding-bottom: 2pt; margin: 14pt 0 6pt; }
  .grille { display: flex; gap: 18pt; }
  .grille > div { flex: 1; }
  table { border-collapse: collapse; width: 100%; }
  td { padding: 3pt 0; vertical-align: top; }
  td.q { width: 80pt; font-weight: bold; white-space: nowrap; }
  .meta td:first-child { color: #666; width: 80pt; }
  ol { margin: 0; padding-left: 16pt; } li { margin-bottom: 2pt; }
  .pied { margin-top: 18pt; font-size: 8pt; color: #888; }
</style></head><body>
<h1>${e(f.nom)}</h1>
<div class="desc">${e(f.descripteurs)}</div>
${bloc('Historique', f.historique ? `<p>${e(f.historique)}</p>` : '')}
<div class="grille">
  <div><h2>Ingrédients</h2><table>${lignes}</table></div>
  <div><h2>Fiche</h2><table class="meta">
    <tr><td>Méthode</td><td>${LIB_METHODE[f.methode]}</td></tr>
    <tr><td>Verre</td><td>${e(f.verre)} · ${LIB_GLACE[f.glace].toLowerCase()}</td></tr>
    <tr><td>Garniture</td><td>${e(f.garniture || '/')}</td></tr>
    <tr><td>Catégorie</td><td>${LIB_CATEGORIE[categorieDe(f)]}</td></tr>
    <tr><td>Type</td><td>${LIB_TYPE[f.type]}</td></tr>
    <tr><td>TAV</td><td>${tav} %</td></tr>
    <tr><td>Contenance</td><td>${nombre(c.volume)} ml</td></tr>
    <tr><td>Coût matière</td><td>${euro(c.coutMatiere)} HT</td></tr>
    <tr><td>Prix conseillé</td><td>${euro(c.prixTTC)} TTC (ratio ${nombre(f.ratio)} %)</td></tr>
  </table></div>
</div>
${bloc('Technique', `<ol>${f.technique.map((t) => `<li>${e(t)}</li>`).join('')}</ol>`)}
${bloc(
  'Variantes',
  f.variantes.length
    ? `<table>${f.variantes.map((v) => `<tr><td class="q">${e(v.nom)}</td><td>${e(v.texte)}</td></tr>`).join('')}</table>`
    : '',
)}
${bloc('N.B.', f.nb.map((n) => `<p>${e(n)}</p>`).join(''))}
${bloc('Notes', f.notes ? `<p>${e(f.notes).replace(/\n/g, '<br>')}</p>` : '')}
<div class="pied">${
    f.source === 'socle'
      ? 'Recette du Socle des cocktails de référence (édition 2025). Coûts indicatifs.'
      : 'Fiche technique personnelle.'
  } L’abus d’alcool est dangereux pour la santé, à consommer avec modération.</div>
</body></html>`;
}

export async function exporterFiche(f: Fiche) {
  const html = ficheEnHtml(f);
  if (Platform.OS === 'web') {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
    return;
  }
  const { uri } = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: f.nom, UTI: 'com.adobe.pdf' });
  } else {
    await Print.printAsync({ uri });
  }
}
