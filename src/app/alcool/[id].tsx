import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

import { CreditPhoto } from '../../components/FicheView';
import { CarteMaisons } from '../../components/CarteMaisons';
import { Bulles, Degrade } from '../../components/fx';
import { Bouteille } from '../../components/Illustrations';
import { Flux, Frise } from '../../components/visuels';
import { Card, Chip, Chips, GrandTitre, P, Page, Rubriques, Tag, Titre } from '../../components/ui';
import { ALCOOL_PAR_ID } from '../../data/alcools';
import { COCKTAIL_PAR_ID } from '../../data/cocktails';
import { MAISONS, MARQUES } from '../../data/maisons';
import { PHOTOS } from '../../data/photos';
import { NIVEAUX, choisirNiveauDetail, useNiveauDetail, type NiveauDetail } from '../../lib/store';
import { C, DEGRADE_SCENE, S } from '../../theme';

export default function FicheAlcool() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const a = ALCOOL_PAR_ID[id];
  const niveau = useNiveauDetail();
  const standard = niveau !== 'essentiel';
  const complet = niveau === 'complet';

  if (!a) {
    return (
      <Page>
        <Card>
          <P>Fiche introuvable.</P>
        </Card>
      </Page>
    );
  }

  const photo = PHOTOS[`p-${a.id}`];

  return (
    <Page>
      <Stack.Screen options={{ title: '', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' }, headerTintColor: '#FFFFFF' }} />
      <View style={s.scene}>
        <Degrade couleurs={DEGRADE_SCENE} style={StyleSheet.absoluteFill} />
        {photo ? (
          <>
            <Image source={photo.image} style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]} resizeMode="cover" accessibilityLabel={`Photo : ${a.nom}`} />
            <Degrade couleurs={['rgba(0,0,0,0.38)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.25)']} style={StyleSheet.absoluteFill} />
          </>
        ) : (
          <>
            <Bulles nombre={7} />
            <View style={s.halo} />
            <View>
              <Bouteille couleur={a.couleur} taille={96} />
            </View>
          </>
        )}
      </View>
      {photo ? <CreditPhoto cle={`p-${a.id}`} /> : null}
      <View style={{ gap: S.md, alignItems: 'flex-start' }}>
        <Tag>{a.famille}</Tag>
        <GrandTitre sousTitre={a.accroche}>{a.nom}</GrandTitre>
      </View>

      <View style={{ gap: S.sm }}>
        <Chips<NiveauDetail> valeur={niveau} onChange={(n) => void choisirNiveauDetail(n)} options={NIVEAUX} />
        <Text style={s.label}>
          {niveau === 'essentiel'
            ? 'L’essentiel pour le service : repères, arômes, à savoir.'
            : niveau === 'standard'
              ? 'Avec la dégustation, la frise, l’élaboration, les catégories et la conservation.'
              : 'Tout : histoire, régions, lecture d’étiquette, idées reçues, autres classiques.'}
        </Text>
      </View>

      {a.aromes?.length ? (
        <Card>
          <Titre>Arômes typiques</Titre>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
            {a.aromes.map((x) => (
              <Tag key={x}>{x}</Tag>
            ))}
          </View>
        </Card>
      ) : null}

      <Card>
        <Titre>Repères</Titre>
        {a.reperes.map(([l, v]) => (
          <View key={l} style={{ gap: 2 }}>
            <Text style={s.label}>{l}</Text>
            <Text style={s.valeur}>{v}</Text>
          </View>
        ))}
      </Card>

      {MAISONS[a.id] ? (
        <Card>
          <Titre droite={<Tag>{MAISONS[a.id].length} lieux</Tag>}>Carte des maisons</Titre>
          {standard ? (
            <CarteMaisons maisons={MAISONS[a.id]} />
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
              {MAISONS[a.id].map((x) => (
                <Tag key={x.nom}>{x.nom}</Tag>
              ))}
            </View>
          )}
          {MARQUES[a.id]?.length ? (
            <>
              <Text style={s.sensTitre}>Autres marques de référence</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
                {MARQUES[a.id].map((x) => (
                  <Tag key={x} ton="neutre">
                    {x}
                  </Tag>
                ))}
              </View>
            </>
          ) : null}
          <P muted>
            Sélection de maisons de référence, non exhaustive ; emplacements approximatifs. {standard ? 'Touchez un repère pour lire son histoire.' : 'Passez en niveau Standard pour afficher la carte.'}
          </P>
        </Card>
      ) : null}

      {standard && a.degustation ? (
        <Card>
          <Titre>Dégustation</Titre>
          {(
            [
              ['eye', 'L’œil', a.degustation.oeil],
              ['flower', 'Le nez', a.degustation.nez],
              ['restaurant', 'La bouche', a.degustation.bouche],
            ] as const
          ).map(([icone, titre, texte]) => (
            <View key={titre} style={s.sens}>
              <View style={s.sensIcone}>
                <Ionicons name={icone} size={17} color={C.accent} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={s.sensTitre}>{titre}</Text>
                <Text style={s.valeur}>{texte}</Text>
              </View>
            </View>
          ))}
        </Card>
      ) : null}

      {standard && a.dates?.length ? (
        <Card>
          <Titre>Frise</Titre>
          <Frise dates={a.dates} />
        </Card>
      ) : null}

      {complet ? (
        <Card>
          <Titre>Histoire</Titre>
          {a.histoire.map((p) => (
            <P key={p}>{p}</P>
          ))}
        </Card>
      ) : null}

      {standard ? (
        <Card>
          <Titre>Élaboration</Titre>
          {a.etapes?.length ? <Flux etapes={a.etapes} /> : null}
          {(complet ? a.elaboration : a.elaboration.slice(0, 1)).map((p) => (
            <P key={p}>{p}</P>
          ))}
        </Card>
      ) : null}

      {standard ? (
        <Card>
          <Titre>Catégories et mentions</Titre>
          <Rubriques items={a.categories} />
        </Card>
      ) : null}

      <Card>
        <Titre>À savoir</Titre>
        {a.aSavoir.map((p) => (
          <View key={p} style={{ flexDirection: 'row', gap: S.sm }}>
            <Text style={{ color: C.accent, fontSize: 15 }}>•</Text>
            <Text style={s.puce}>{p}</Text>
          </View>
        ))}
      </Card>

      {complet && a.regions?.length ? (
        <Card>
          <Titre>Régions et terroirs</Titre>
          <Rubriques items={a.regions} />
        </Card>
      ) : null}

      {complet && a.etiquette?.length ? (
        <Card>
          <Titre>Lire l’étiquette</Titre>
          <Rubriques items={a.etiquette} />
        </Card>
      ) : null}

      {complet && a.ideesRecues?.length ? (
        <Card>
          <Titre>Idées reçues</Titre>
          <Rubriques items={a.ideesRecues} />
        </Card>
      ) : null}

      {standard && a.conservation ? (
        <Card>
          <Titre>Conservation</Titre>
          <P>{a.conservation}</P>
        </Card>
      ) : null}

      {complet && a.classiques?.length ? (
        <Card>
          <Titre>Autres classiques à connaître</Titre>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
            {a.classiques.map((x) => (
              <Tag key={x} ton="neutre">
                {x}
              </Tag>
            ))}
          </View>
          <P muted>Cocktails hors socle, cités pour la culture : leurs recettes ne figurent pas dans l’application.</P>
        </Card>
      ) : null}

      {a.service ? (
        <Card style={{ backgroundColor: C.accentDark, boxShadow: 'none' }}>
          <Titre>Service et usage au bar</Titre>
          <P>{a.service}</P>
        </Card>
      ) : null}

      {a.cocktails.length ? (
        <Card>
          <Titre>Dans le socle</Titre>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.sm }}>
            {a.cocktails.map((cid) => (
              <Chip key={cid} label={COCKTAIL_PAR_ID[cid].nom} onPress={() => router.push(`/cocktail/${cid}`)} />
            ))}
          </View>
        </Card>
      ) : null}

      <P muted>L’abus d’alcool est dangereux pour la santé, à consommer avec modération.</P>
    </Page>
  );
}

const s = StyleSheet.create({
  sens: { flexDirection: 'row', gap: S.md, alignItems: 'flex-start' },
  sensIcone: { width: 34, height: 34, borderRadius: 17, backgroundColor: C.accentDark, alignItems: 'center', justifyContent: 'center' },
  sensTitre: { color: C.accent, fontSize: 14, fontWeight: '700' },
  scene: {
    height: 290,
    marginHorizontal: -(S.lg + 2),
    marginTop: -(S.lg + 2),
    paddingTop: 40,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: { position: 'absolute', width: 230, height: 230, borderRadius: 115, backgroundColor: '#FFFFFF', opacity: 0.07, top: 46 },
  label: { color: C.muted, fontSize: 12 },
  valeur: { color: C.text, fontSize: 15, lineHeight: 21 },
  puce: { color: C.text, fontSize: 15, lineHeight: 22, flex: 1 },
});
