import { house, menu } from '@/content/house';

export type MarioLocale = 'en' | 'fr';

function fold(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function has(text: string, ...needles: string[]): boolean {
  return needles.some((n) => text.includes(n));
}

function priced(locale: MarioLocale, sectionId: string): string {
  const section = menu.find((s) => s.id === sectionId);
  if (!section) return '';
  return section.items
    .map((item) => {
      const name = item.name[locale];
      const price = 'price' in item && item.price ? item.price : locale === 'fr' ? 'demander en boutique' : 'ask in the shop';
      return `${name}, ${price}`;
    })
    .join('. ');
}

export function openingMario(locale: MarioLocale): string {
  if (locale === 'fr') {
    return 'Buongiorno. Je suis Mario, maître d’hôtel chez Non Solo Pane. Pizza au four à bois, pâtisserie, gelato — demandez-moi ce que vous voulez sur la maison.';
  }
  return 'Buongiorno. I am Mario, maître d’ at Non Solo Pane. Wood-oven pizza, pastry, gelato — ask me anything about the house.';
}

export function answerMario(raw: string, locale: MarioLocale): string {
  const q = fold(raw);
  const fr = locale === 'fr';

  if (!q) {
    return fr ? 'Dites-moi, prego.' : 'Tell me, prego.';
  }

  if (has(q, 'thank', 'merci', 'grazie', 'perfect', 'parfait')) {
    return fr
      ? 'Prego. On vous attend sur le Bord-du-Lac.'
      : 'Prego. We will see you on the Lakeshore.';
  }

  if (has(q, 'bye', 'goodbye', 'ciao', 'au revoir', 'a bientot')) {
    return fr ? 'Arrivederci. À bientôt à la casa.' : 'Arrivederci. See you at the house.';
  }

  if (has(q, 'who are you', 'your name', 'tu es qui', 't es qui', 'comment tu t', 'maitre', 'mario')) {
    return fr
      ? 'Mario, maître d’hôtel de Non Solo Pane. Je connais la carte, les heures, et comment venir. Le reste, on le confirme en boutique.'
      : 'Mario, maître d’ of Non Solo Pane. I know the card, the hours, and how to find us. Anything else, we confirm in the shop.';
  }

  if (has(q, 'hour', 'heure', 'open', 'close', 'ferme', 'ouvert', 'horaire', 'what time')) {
    return fr
      ? `${house.hours.weekdays.fr}. ${house.hours.weekend.fr}. ${house.hours.closed.fr}. ${house.hours.note.fr}`
      : `${house.hours.weekdays.en}. ${house.hours.weekend.en}. ${house.hours.closed.en}. ${house.hours.note.en}`;
  }

  if (has(q, 'where', 'address', 'ou etes', 'ou es', 'direction', 'map', 'lakeshore', 'bord du lac', 'parking')) {
    return fr
      ? `On est au ${house.addressLines[0]}, ${house.addressLines[1]} ${house.postal}, dans le village de Dorval. Appelez le ${house.phone} si vous vous perdez.`
      : `We are at ${house.addressLines[0]}, ${house.addressLines[1]} ${house.postal}, in Dorval village. Call ${house.phone} if you get turned around.`;
  }

  if (has(q, 'phone', 'call', 'appel', 'telephone', 'numero', 'email', 'courriel', 'contact')) {
    return fr
      ? `Le magasin : ${house.phone}. Le courriel : ${house.email}. Pour le traiteur, écrivez ou téléphonez — ils cotent selon la date.`
      : `The shop is ${house.phone}. Email ${house.email}. For catering, call or write — they quote by the date.`;
  }

  if (has(q, 'reserv', 'book a table', 'table', 'reservation')) {
    return fr
      ? 'C’est le comptoir, pas un resto avec des tables réservées. Venez, prenez un numéro dans la file à midi. Pour un groupe ou le traiteur, appelez le 514.631.2000.'
      : 'It is the counter, not a reserved dining room. Come in — there is a line at noon. For a group or catering, call 514.631.2000.';
  }

  if (has(q, 'uber', 'deliver', 'livr', 'order online', 'commander')) {
    return fr
      ? 'Uber Eats livre pâtes, sandwichs, salades, pâtisserie et gelato. La pizza reste en boutique — four à bois. Les heures de livraison y sont plus courtes que la boulangerie.'
      : 'Uber Eats carries pasta, sandwiches, salads, pastry, and gelato. Pizza stays in the shop — wood oven. Delivery hours there are shorter than the bakery.';
  }

  if (has(q, 'cater', 'traiteur', 'platter', 'plateau', 'office', 'bureau', 'party', 'fete', 'wedding', 'mariage')) {
    return fr
      ? 'Oui, ils font du traiteur depuis Dorval : pizza, pâtes, panini, pâtisserie, gelato. Pas de carte de prix publique — ils cotent selon la date et le nombre. Appelez le 514.631.2000 ou écrivez à info@nonsolopane.ca.'
      : 'Yes, they cater from Dorval: pizza, pasta, panini, pastry, gelato. No public price card — they quote by the date and the headcount. Call 514.631.2000 or email info@nonsolopane.ca.';
  }

  if (has(q, 'pizza', 'napolet', 'roman', 'four a bois', 'wood oven', 'oven')) {
    return fr
      ? 'La pizza est la fierté de la casa : Napoletana et romaine, au four à bois, en boutique seulement. Pas de prix affiché — commandez d’avance si vous pouvez. Ce n’est pas sur Uber Eats.'
      : 'Pizza is the pride of the house: Napoletana and Roman, wood oven, in the shop only. No listed price — order ahead if you can. It is not on Uber Eats.';
  }

  if (has(q, 'cannoli', 'tiramisu', 'zeppole', 'cheesecake', 'pastr', 'patiss', 'cake', 'gateau', 'cookie', 'biscuit', 'dessert')) {
    return fr
      ? `La pâtisserie : ${priced('fr', 'bakery')}. Les zeppole, demander en boutique — crème au rhum ou crème cannoli.`
      : `Pastry: ${priced('en', 'bakery')}. Zeppole, ask in the shop — rum custard or cannoli cream.`;
  }

  if (has(q, 'gelato', 'sorbet', 'glace', 'ice cream')) {
    return fr
      ? `Gelato au demi-litre : ${priced('fr', 'gelato')}.`
      : `Gelato by the half-litre: ${priced('en', 'gelato')}.`;
  }

  if (has(q, 'coffee', 'cafe', 'espresso', 'cappuccino', 'latte')) {
    return fr
      ? `Le bar : ${priced('fr', 'coffee')}.`
      : `The bar: ${priced('en', 'coffee')}.`;
  }

  if (has(q, 'salad', 'salade', 'coleslaw', 'chou')) {
    return fr
      ? `Les salades : ${priced('fr', 'salads')}.`
      : `Salads: ${priced('en', 'salads')}.`;
  }

  if (has(q, 'sandwich', 'panini', 'focaccia', 'sausage', 'saucisse', 'cutlet', 'poulet', 'cold cut', 'mortadell')) {
    return fr
      ? `Les sandwichs : ${priced('fr', 'panini')}.`
      : `Sandwiches: ${priced('en', 'panini')}.`;
  }

  if (has(q, 'pasta', 'pate', 'tortellini', 'manicotti', 'cannelloni', 'ravioli')) {
    return fr
      ? `Les pâtes sont à 12,95 $ : ${priced('fr', 'pasta')}. Le tortellini fromage, sauce rosée, est le plus aimé sur Uber Eats.`
      : `Pasta is 12.95: ${priced('en', 'pasta')}. The cheese tortellini in rose sauce is the most-liked plate on Uber Eats.`;
  }

  if (has(q, 'vegetarian', 'vegetarien', 'vegan', 'vege')) {
    return fr
      ? 'Il y a la focaccia végétarienne à 10,50 $, les pâtes sauce tomate, les salades, le sorbet citron sans lactose, et beaucoup de pâtisserie. Pour les allergies, demandez en boutique — je n’invente pas la carte des allergènes.'
      : 'There is the vegetarian focaccia at 10.50, pasta with tomato sauce, the salads, dairy-free lemon sorbet, and plenty of pastry. For allergies, ask in the shop — I will not invent an allergen card.';
  }

  if (has(q, 'price', 'prix', 'cost', 'combien', 'how much', 'cher')) {
    return fr
      ? 'Les prix que j’ai viennent d’Uber Eats : pâtes 12,95 $, sandwichs 10,50 à 12,50 $, salades 6 à 6,75 $, cannoli 3,95 ou 4,50 $, tiramisu 5,95 $, gelato 8,50 $ le demi-litre. La pizza, demander en boutique.'
      : 'The prices I have are from Uber Eats: pasta 12.95, sandwiches 10.50 to 12.50, salads 6 to 6.75, cannoli 3.95 or 4.50, tiramisu 5.95, gelato 8.50 the half-litre. Pizza, ask in the shop.';
  }

  if (has(q, 'menu', 'eat', 'food', 'manger', 'carte', 'what do you have', 'quoi')) {
    return fr
      ? 'La casa : pizza au four à bois en boutique, pâtes, panini, salades, pâtisserie, gelato, espresso. Ce n’est pas seulement du pain. Voulez-vous la pizza, les pâtes, ou les douceurs ?'
      : 'The house: wood-oven pizza in the shop, pasta, panini, salads, pastry, gelato, espresso. Not just bread. Do you want pizza, pasta, or the sweets?';
  }

  if (has(q, 'grocery', 'epicerie', 'sauce', 'italian shop')) {
    return fr
      ? 'Il y a une petite épicerie italienne — sauces, pâtes, les choses de la casa. Demandez au comptoir ce qu’il y a aujourd’hui.'
      : 'There is a small Italian grocery — sauces, pasta, things of the house. Ask at the counter what is in today.';
  }

  if (has(q, 'terrace', 'patio', 'outside', 'exterieur')) {
    return fr
      ? 'Il y a une terrasse quand le lac est chaud. Service au comptoir.'
      : 'There is a terrace when the lake is warm. Counter service.';
  }

  if (has(q, 'family', 'famille', 'since', 'depuis', '2002', 'about', 'propos', 'histoire', 'story')) {
    return fr
      ? 'Non solo pane — pas seulement du pain. Boulangerie de famille sur le Bord-du-Lac depuis 2002. Ils cuisent, ils enfournent la pizza, ils garnissent cannoli et zeppole. Les habitués reviennent pour la croûte et les biscuits.'
      : 'Non solo pane — not just bread. A family bakery on the Lakeshore since 2002. They bake, they fire pizza, they fill cannoli and zeppole. Regulars come back for the crust and the cookies.';
  }

  if (has(q, 'instagram', 'facebook', 'social')) {
    return fr
      ? 'Instagram : nonsolopanedorval. Facebook : NSPDORVAL.'
      : 'Instagram is nonsolopanedorval. Facebook is NSPDORVAL.';
  }

  return fr
    ? `Je reste sur ce que la casa publie. Pour ça, le mieux est d’appeler le ${house.phone} ou d’écrire à ${house.email}. Je peux vous parler du menu, des heures, du traiteur, ou comment venir.`
    : `I stay with what the house publishes. For that, best to call ${house.phone} or write ${house.email}. I can tell you the menu, the hours, catering, or how to find us.`;
}
