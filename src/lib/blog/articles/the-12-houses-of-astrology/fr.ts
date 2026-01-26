/**
 * Les 12 maisons de l'astrologie - FR
 */
import type { BlogPostTranslation } from '../../types';

export const fr: BlogPostTranslation = {
  title: "🏠 Les 12 maisons de l'astrologie : Le décor de votre vie",
  excerpt: "Perdu face à cette roue numérotée dans votre thème natal ? Découvrez ce que signifient réellement les 12 maisons de l'astrologie et comment elles façonnent tout, de votre carrière à vos secrets les plus profonds.",
  category: "Les bases",
  metaDescription: "Guide complet des 12 maisons astrologiques. Comprenez ce que chaque maison représente dans votre thème natal, de l'identité (1ère maison) au subconscient (12ème maison).",
  keywords: "12 maisons astrologie, maisons astrologiques, première maison, septième maison, milieu du ciel, ascendant, thème natal expliqué",
  quickSummary: [
    "Le thème natal est divisé en 12 secteurs appelés 'maisons', semblables à des parts de pizza.",
    "Les maisons représentent le 'OÙ' des événements de votre vie (le décor).",
    "Les maisons angulaires (1, 4, 7, 10) sont les plus puissantes et définissent votre structure de vie.",
    "Avoir des maisons vides (sans planètes) est normal et ne signifie pas que ce domaine de la vie est vide."
  ],
  keyTakeaways: [
    "La 1ère Maison (Ascendant) est votre masque et votre physique.",
    "La 7ème Maison est le miroir de vos relations et de vos ennemis déclarés.",
    "La 10ème Maison (Milieu du Ciel) représente votre réputation et votre carrière publique.",
    "La mystérieuse 12ème Maison garde vos secrets, votre karma et votre potentiel spirituel."
  ],
  tableOfContents: [
    { id: 'introduction', title: "Le décor : Pourquoi les maisons sont importantes" },
    { id: 'house-systems', title: "Systèmes de maisons : Placidus vs Signes Entiers" },
    { id: 'houses-1-6', title: "Maisons personnelles (1-6)" },
    { id: 'houses-7-12', title: "Maisons transpersonnelles (7-12)" }
  ],
  content: `
      <h2 id="introduction">Le décor : Pourquoi les maisons sont importantes</h2>
      <p>Si vous avez déjà regardé votre thème natal et que vous vous êtes senti dépassé par les lignes, les symboles et les formes géométriques, vous n'êtes pas seul. L'astrologie est un langage composé de trois éléments principaux : les signes, les planètes et les maisons. Tandis que les <strong>planètes</strong> représentent les 'acteurs' (ce qui se passe) et les <strong>signes</strong> représentent les 'costumes' (comment cela se passe), les <strong>12 maisons de l'astrologie</strong> représentent le 'décor' (où cela se passe).</p>
      
      <p>Imaginez votre vie comme une pièce de théâtre. Mars peut être l'acteur — plein de dynamisme et d'agressivité. S'il porte le 'costume' du Bélier, il sera rapide, impulsif et audacieux. Mais où joue-t-il ? S'il se trouve dans la 10ème maison de la carrière, c'est un entrepreneur dynamique. S'il se trouve dans la 4ème maison du foyer, il s'agira sans doute de quelqu'un qui investit son énergie dans la rénovation de sa maison ou qui vit des conflits au sein de la famille. Sans les maisons, l'astrologie est de la pure psychologie ; avec les maisons, elle devient pratique et prévisible.</p>

      <h2 id="house-systems">Systèmes de maisons : Placidus vs Signes Entiers</h2>
      <p>Avant de plonger dans les significations spécifiques, nous devons aborder le sujet des systèmes de maisons. Il existe des dizaines de façons de diviser le ciel. Les deux plus courantes sont :</p>
      <ul>
        <li><strong>Placidus :</strong> Le système standard moderne. Basé sur le temps. Les maisons peuvent être de tailles différentes. Excellent pour la psychologie profonde.</li>
        <li><strong>Signes Entiers (Whole Sign) :</strong> Le système antique. Chaque signe du zodiaque équivaut à une maison entière. Excellent pour des prédictions claires et concrètes. Astralo utilise ce système par défaut pour une plus grande clarté.</li>
      </ul>

      <h2 id="houses-1-6">Les maisons personnelles : Le développement du 'Soi'</h2>
      
      <h3>1ère Maison : La maison de Soi (L'Ascendant)</h3>
      <p><strong>Mots-clés :</strong> Identité, corps, apparence, première impression.<br>
      C'est la maison la plus importante. Elle marque le début de votre vie. Les planètes qui s'y trouvent ont un impact massif sur votre personnalité et votre vitalité.</p>

      <h3>2ème Maison : La maison des valeurs</h3>
      <p><strong>Mots-clés :</strong> Argent, possessions, estime de soi, talents.<br>
      Pas seulement combien vous gagnez, mais comment vous le gagnez et ce que vous appréciez vraiment. Elle montre votre relation avec le monde matériel.</p>

      <h3>3ème Maison : La maison de la communication</h3>
      <p><strong>Mots-clés :</strong> Esprit, fratrie, courts trajets, voisins.<br>
      C'est là que nous apprenons à parler et à réfléchir. Elle régit l'éducation précoce, les potins, les réseaux sociaux et votre environnement immédiat.</p>

      <h3>4ème Maison : La maison du foyer (Imum Coeli)</h3>
      <p><strong>Mots-clés :</strong> Famille, racines, père/mère, vie privée, immobilier.<br>
      Les fondations de votre thème. Elle montre d'où vous venez et à quoi ressemble votre vie quand personne ne vous regarde.</p>

      <h3>5ème Maison : La maison du plaisir</h3>
      <p><strong>Mots-clés :</strong> Créativité, romance, enfants, jeu, risque.<br>
      La maison du fun ! C'est là que nous exprimons notre joie. Elle régit les loisirs, le sexe occasionnel, les projets artistiques et votre 'enfant intérieur'.</p>

      <h3>6ème Maison : La maison de la routine</h3>
      <p><strong>Mots-clés :</strong> Santé, travail quotidien, animaux domestiques, service.<br>
      Il ne s'agit pas de votre carrière (c'est la 10ème maison), mais de votre travail au jour le jour. Comment vous organisez votre journée, ce que vous mangez et comment vous servez les autres.</p>

      <h2 id="houses-7-12">Les maisons transpersonnelles : L'interaction avec le monde</h2>

      <h3>7ème Maison : La maison du partenariat (Le Descendant)</h3>
      <p><strong>Mots-clés :</strong> Mariage, partenaires commerciaux, ennemis déclarés.<br>
      À l'opposé de la 1ère Maison. C'est là que nous cessons d'être 'je' pour devenir 'nous'. Elle régit tous les contrats légaux et les engagements à long terme.</p>

      <h3>8ème Maison : La maison de la transformation</h3>
      <p><strong>Mots-clés :</strong> Sexe, mort, impôts, argent d'autrui, occultisme.<br>
      La maison la plus mystérieuse. Elle traite de ce que nous partageons profondément avec les autres (intimité et ressources) et des crises qui nous transforment.</p>

      <h3>9ème Maison : La maison de la philosophie</h3>
      <p><strong>Mots-clés :</strong> Longs trajets, éducation supérieure, religion, publication.<br>
      La quête de sens. C'est là que nous élargissons nos horizons par l'étude ou le voyage dans des contrées lointaines.</p>

      <h3>10ème Maison : La maison du statut (Milieu du Ciel)</h3>
      <p><strong>Mots-clés :</strong> Carrière, réputation publique, héritage, autorité.<br>
      Le point culminant de la carte. Elle montre comment le monde nous voit et notre plus grande ambition. C'est votre 'gloire'.</p>

      <h3>11ème Maison : La maison de la communauté</h3>
      <p><strong>Mots-clés :</strong> Amis, groupes, espoirs, rêves, technologie.<br>
      Où nous trouvons notre 'tribu'. Elle régit les médias de masse, les organisations humanitaires et les gains professionnels.</p>

      <h3>12ème Maison : La maison du subconscient</h3>
      <p><strong>Mots-clés :</strong> Secrets, karma, solitude, spiritualité, autosabotage.<br>
      La fin du cycle. C'est là que nous nous dissolvons. Elle régit les rêves, l'intuition psychique, mais aussi les hôpitaux et les prisons (lieux d'isolement).</p>

      <div class="cta-box" style="background: linear-gradient(135deg, #FF9966 0%, #FF5E62 100%); padding: 2rem; border-radius: 1rem; color: white; text-align: center; margin-top: 2rem;">
          <h3 style="margin-top:0;">Quelles maisons sont actives dans VOTRE vie ?</h3>
          <p>Savoir quelles planètes habitent vos maisons est la clé pour déverrouiller votre destin. Obtenez votre analyse complète dès aujourd'hui.</p>
          <a href="/" style="background: white; color: #FF5E62; padding: 10px 20px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 10px;">Voir mon thème natal</a>
      </div>
    `
};
