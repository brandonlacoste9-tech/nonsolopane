import { house, menu } from '@/content/house';

export type MarioLocale = 'en' | 'fr' | 'it';

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

function say(locale: MarioLocale, lines: Record<MarioLocale, string>): string {
  return lines[locale];
}

function shopAsk(locale: MarioLocale): string {
  return say(locale, {
    en: 'ask in the shop',
    fr: 'demander en boutique',
    it: 'chiedere in bottega',
  });
}

function priced(locale: MarioLocale, sectionId: string): string {
  const section = menu.find((s) => s.id === sectionId);
  if (!section) return '';
  return section.items
    .map((item) => {
      const name = item.name[locale];
      const price = 'price' in item && item.price ? item.price : shopAsk(locale);
      return `${name}, ${price}`;
    })
    .join('. ');
}

export function openingMario(locale: MarioLocale): string {
  return say(locale, {
    en: 'Buongiorno. I am Mario, maître d’ at Non Solo Pane. Wood-oven pizza, pastry, gelato — ask me anything about the house.',
    fr: 'Buongiorno. Je suis Mario, maître d’hôtel chez Non Solo Pane. Pizza au four à bois, pâtisserie, gelato — demandez-moi ce que vous voulez sur la maison.',
    it: 'Buongiorno. Sono Mario, maître di Non Solo Pane. Pizza al forno a legna, pasticceria, gelato — chiedetemi quello che volete sulla casa.',
  });
}

export function answerMario(raw: string, locale: MarioLocale): string {
  const q = fold(raw);

  if (!q) {
    return say(locale, {
      en: 'Tell me, prego.',
      fr: 'Dites-moi, prego.',
      it: 'Ditemi, prego.',
    });
  }

  if (has(q, 'thank', 'merci', 'grazie', 'perfect', 'parfait', 'perfetto')) {
    return say(locale, {
      en: 'Prego. We will see you on the Lakeshore.',
      fr: 'Prego. On vous attend sur le Bord-du-Lac.',
      it: 'Prego. Vi aspettiamo sul Bord-du-Lac.',
    });
  }

  if (has(q, 'bye', 'goodbye', 'ciao', 'au revoir', 'a bientot', 'arrivederci', 'addio')) {
    return say(locale, {
      en: 'Arrivederci. See you at the house.',
      fr: 'Arrivederci. À bientôt à la casa.',
      it: 'Arrivederci. A presto alla casa.',
    });
  }

  if (
    has(
      q,
      'who are you',
      'your name',
      'tu es qui',
      't es qui',
      'comment tu t',
      'maitre',
      'mario',
      'chi sei',
      'come ti chiami',
    )
  ) {
    return say(locale, {
      en: 'Mario, maître d’ of Non Solo Pane. I know the card, the hours, and how to find us. Anything else, we confirm in the shop.',
      fr: 'Mario, maître d’hôtel de Non Solo Pane. Je connais la carte, les heures, et comment venir. Le reste, on le confirme en boutique.',
      it: 'Mario, maître di Non Solo Pane. Conosco la carta, gli orari, e come arrivare. Il resto si conferma in bottega.',
    });
  }

  if (has(q, 'hour', 'heure', 'open', 'close', 'ferme', 'ouvert', 'horaire', 'what time', 'orari', 'aperto', 'chiuso')) {
    return `${house.hours.weekdays[locale]}. ${house.hours.weekend[locale]}. ${house.hours.closed[locale]}. ${house.hours.note[locale]}`;
  }

  if (
    has(
      q,
      'where',
      'address',
      'ou etes',
      'ou es',
      'direction',
      'map',
      'lakeshore',
      'bord du lac',
      'parking',
      'dove',
      'indirizzo',
      'come si arriva',
    )
  ) {
    return say(locale, {
      en: `We are at ${house.addressLines[0]}, ${house.addressLines[1]} ${house.postal}, in Dorval village. Call ${house.phone} if you get turned around.`,
      fr: `On est au ${house.addressLines[0]}, ${house.addressLines[1]} ${house.postal}, dans le village de Dorval. Appelez le ${house.phone} si vous vous perdez.`,
      it: `Siamo al ${house.addressLines[0]}, ${house.addressLines[1]} ${house.postal}, nel villaggio di Dorval. Chiamate il ${house.phone} se vi perdete.`,
    });
  }

  if (has(q, 'phone', 'call', 'appel', 'telephone', 'numero', 'email', 'courriel', 'contact', 'telefono', 'chiam')) {
    return say(locale, {
      en: `The shop is ${house.phone}. Email ${house.email}. For catering, call or write — they quote by the date.`,
      fr: `Le magasin : ${house.phone}. Le courriel : ${house.email}. Pour le traiteur, écrivez ou téléphonez — ils cotent selon la date.`,
      it: `La bottega: ${house.phone}. Email: ${house.email}. Per il catering, chiamate o scrivete — preventivano secondo la data.`,
    });
  }

  if (has(q, 'reserv', 'book a table', 'table', 'reservation', 'prenot', 'tavolo')) {
    return say(locale, {
      en: 'It is the counter, not a reserved dining room. Come in — there is a line at noon. For a group or catering, call 514.631.2000.',
      fr: 'C’est le comptoir, pas un resto avec des tables réservées. Venez, prenez un numéro dans la file à midi. Pour un groupe ou le traiteur, appelez le 514.631.2000.',
      it: 'È il bancone, non una sala con tavoli riservati. Venite — c’è la fila a mezzogiorno. Per un gruppo o il catering, chiamate il 514.631.2000.',
    });
  }

  if (has(q, 'uber', 'deliver', 'livr', 'order online', 'commander', 'consegna', 'domicilio')) {
    return say(locale, {
      en: 'Uber Eats carries pasta, sandwiches, salads, pastry, and gelato. Pizza stays in the shop — wood oven. Delivery hours there are shorter than the bakery.',
      fr: 'Uber Eats livre pâtes, sandwichs, salades, pâtisserie et gelato. La pizza reste en boutique — four à bois. Les heures de livraison y sont plus courtes que la boulangerie.',
      it: 'Uber Eats porta pasta, panini, insalate, pasticceria e gelato. La pizza resta in bottega — forno a legna. Gli orari di consegna lì sono più corti del forno.',
    });
  }

  if (
    has(
      q,
      'cater',
      'traiteur',
      'platter',
      'plateau',
      'office',
      'bureau',
      'party',
      'fete',
      'wedding',
      'mariage',
      'banchetto',
      'festa',
      'ufficio',
    )
  ) {
    return say(locale, {
      en: 'Yes, they cater from Dorval: pizza, pasta, panini, pastry, gelato. No public price card — they quote by the date and the headcount. Call 514.631.2000 or email info@nonsolopane.ca.',
      fr: 'Oui, ils font du traiteur depuis Dorval : pizza, pâtes, panini, pâtisserie, gelato. Pas de carte de prix publique — ils cotent selon la date et le nombre. Appelez le 514.631.2000 ou écrivez à info@nonsolopane.ca.',
      it: 'Sì, fanno catering da Dorval: pizza, pasta, panini, pasticceria, gelato. Non c’è una carta prezzi pubblica — preventivano secondo la data e il numero. Chiamate il 514.631.2000 o scrivete a info@nonsolopane.ca.',
    });
  }

  if (has(q, 'pizza', 'napolet', 'roman', 'four a bois', 'wood oven', 'oven', 'forno a legna', 'forno')) {
    return say(locale, {
      en: 'Pizza is the pride of the house: Napoletana and Roman, wood oven, in the shop only. No listed price — order ahead if you can. It is not on Uber Eats.',
      fr: 'La pizza est la fierté de la casa : Napoletana et romaine, au four à bois, en boutique seulement. Pas de prix affiché — commandez d’avance si vous pouvez. Ce n’est pas sur Uber Eats.',
      it: 'La pizza è l’orgoglio della casa: napoletana e romana, forno a legna, solo in bottega. Nessun prezzo in lista — ordinate prima, se potete. Non è su Uber Eats.',
    });
  }

  if (
    has(
      q,
      'cannoli',
      'tiramisu',
      'zeppole',
      'cheesecake',
      'pastr',
      'patiss',
      'cake',
      'gateau',
      'cookie',
      'biscuit',
      'dessert',
      'pasticceria',
      'dolci',
    )
  ) {
    return say(locale, {
      en: `Pastry: ${priced('en', 'bakery')}. Zeppole, ask in the shop — rum custard or cannoli cream.`,
      fr: `La pâtisserie : ${priced('fr', 'bakery')}. Les zeppole, demander en boutique — crème au rhum ou crème cannoli.`,
      it: `Pasticceria: ${priced('it', 'bakery')}. Le zeppole, chiedere in bottega — crema al rum o crema cannoli.`,
    });
  }

  if (has(q, 'gelato', 'sorbet', 'glace', 'ice cream', 'sorbetto')) {
    return say(locale, {
      en: `Gelato by the half-litre: ${priced('en', 'gelato')}.`,
      fr: `Gelato au demi-litre : ${priced('fr', 'gelato')}.`,
      it: `Gelato al mezzo litro: ${priced('it', 'gelato')}.`,
    });
  }

  if (has(q, 'coffee', 'cafe', 'espresso', 'cappuccino', 'latte', 'caffe')) {
    return say(locale, {
      en: `The bar: ${priced('en', 'coffee')}.`,
      fr: `Le bar : ${priced('fr', 'coffee')}.`,
      it: `Il bar: ${priced('it', 'coffee')}.`,
    });
  }

  if (has(q, 'salad', 'salade', 'coleslaw', 'chou', 'insalata')) {
    return say(locale, {
      en: `Salads: ${priced('en', 'salads')}.`,
      fr: `Les salades : ${priced('fr', 'salads')}.`,
      it: `Insalate: ${priced('it', 'salads')}.`,
    });
  }

  if (
    has(
      q,
      'sandwich',
      'panini',
      'focaccia',
      'sausage',
      'saucisse',
      'cutlet',
      'poulet',
      'cold cut',
      'mortadell',
      'salsiccia',
      'cotoletta',
    )
  ) {
    return say(locale, {
      en: `Sandwiches: ${priced('en', 'panini')}.`,
      fr: `Les sandwichs : ${priced('fr', 'panini')}.`,
      it: `Panini: ${priced('it', 'panini')}.`,
    });
  }

  if (has(q, 'pasta', 'pate', 'tortellini', 'manicotti', 'cannelloni', 'ravioli')) {
    return say(locale, {
      en: `Pasta is 12.95: ${priced('en', 'pasta')}. The cheese tortellini in rose sauce is the most-liked plate on Uber Eats.`,
      fr: `Les pâtes sont à 12,95 $ : ${priced('fr', 'pasta')}. Le tortellini fromage, sauce rosée, est le plus aimé sur Uber Eats.`,
      it: `La pasta è 12,95 $: ${priced('it', 'pasta')}. I tortellini al formaggio, salsa rosa, sono il piatto più amato su Uber Eats.`,
    });
  }

  if (has(q, 'vegetarian', 'vegetarien', 'vegan', 'vege', 'vegetariano', 'vegano')) {
    return say(locale, {
      en: 'There is the vegetarian focaccia at 10.50, pasta with tomato sauce, the salads, dairy-free lemon sorbet, and plenty of pastry. For allergies, ask in the shop — I will not invent an allergen card.',
      fr: 'Il y a la focaccia végétarienne à 10,50 $, les pâtes sauce tomate, les salades, le sorbet citron sans lactose, et beaucoup de pâtisserie. Pour les allergies, demandez en boutique — je n’invente pas la carte des allergènes.',
      it: 'C’è la focaccia vegetariana a 10,50 $, la pasta al pomodoro, le insalate, il sorbetto al limone senza lattosio, e tanta pasticceria. Per le allergie, chiedete in bottega — non invento una carta degli allergeni.',
    });
  }

  if (has(q, 'price', 'prix', 'cost', 'combien', 'how much', 'cher', 'prezzo', 'quanto costa')) {
    return say(locale, {
      en: 'The prices I have are from Uber Eats: pasta 12.95, sandwiches 10.50 to 12.50, salads 6 to 6.75, cannoli 3.95 or 4.50, tiramisu 5.95, gelato 8.50 the half-litre. Pizza, ask in the shop.',
      fr: 'Les prix que j’ai viennent d’Uber Eats : pâtes 12,95 $, sandwichs 10,50 à 12,50 $, salades 6 à 6,75 $, cannoli 3,95 ou 4,50 $, tiramisu 5,95 $, gelato 8,50 $ le demi-litre. La pizza, demander en boutique.',
      it: 'I prezzi che ho sono da Uber Eats: pasta 12,95 $, panini 10,50–12,50 $, insalate 6–6,75 $, cannoli 3,95 o 4,50 $, tiramisù 5,95 $, gelato 8,50 $ il mezzo litro. La pizza, chiedere in bottega.',
    });
  }

  if (has(q, 'menu', 'eat', 'food', 'manger', 'carte', 'what do you have', 'quoi', 'cosa avete', 'cosa c e')) {
    return say(locale, {
      en: 'The house: wood-oven pizza in the shop, pasta, panini, salads, pastry, gelato, espresso. Not just bread. Do you want pizza, pasta, or the sweets?',
      fr: 'La casa : pizza au four à bois en boutique, pâtes, panini, salades, pâtisserie, gelato, espresso. Ce n’est pas seulement du pain. Voulez-vous la pizza, les pâtes, ou les douceurs ?',
      it: 'La casa: pizza al forno a legna in bottega, pasta, panini, insalate, pasticceria, gelato, espresso. Non è solo pane. Volete la pizza, la pasta, o i dolci?',
    });
  }

  if (has(q, 'grocery', 'epicerie', 'sauce', 'italian shop', 'drogheria', 'alimentari')) {
    return say(locale, {
      en: 'There is a small Italian grocery — sauces, pasta, things of the house. Ask at the counter what is in today.',
      fr: 'Il y a une petite épicerie italienne — sauces, pâtes, les choses de la casa. Demandez au comptoir ce qu’il y a aujourd’hui.',
      it: 'C’è una piccola drogheria italiana — salse, pasta, le cose della casa. Chiedete al bancone cosa c’è oggi.',
    });
  }

  if (has(q, 'terrace', 'patio', 'outside', 'exterieur', 'terrazza', 'fuori')) {
    return say(locale, {
      en: 'There is a terrace when the lake is warm. Counter service.',
      fr: 'Il y a une terrasse quand le lac est chaud. Service au comptoir.',
      it: 'C’è una terrazza quando il lago è caldo. Servizio al bancone.',
    });
  }

  if (
    has(
      q,
      'family',
      'famille',
      'since',
      'depuis',
      '2002',
      'about',
      'propos',
      'histoire',
      'story',
      'famiglia',
      'storia',
      'chi siete',
    )
  ) {
    return say(locale, {
      en: 'Non solo pane — not just bread. A family bakery on the Lakeshore since 2002. They bake, they fire pizza, they fill cannoli and zeppole. Regulars come back for the crust and the cookies.',
      fr: 'Non solo pane — pas seulement du pain. Boulangerie de famille sur le Bord-du-Lac depuis 2002. Ils cuisent, ils enfournent la pizza, ils garnissent cannoli et zeppole. Les habitués reviennent pour la croûte et les biscuits.',
      it: 'Non solo pane. Un forno di famiglia sul Bord-du-Lac dal 2002. Cuociono, infornano la pizza, riempiono cannoli e zeppole. I clienti tornano per la crosta e i biscotti.',
    });
  }

  if (has(q, 'instagram', 'facebook', 'social')) {
    return say(locale, {
      en: 'Instagram is nonsolopanedorval. Facebook is NSPDORVAL.',
      fr: 'Instagram : nonsolopanedorval. Facebook : NSPDORVAL.',
      it: 'Instagram: nonsolopanedorval. Facebook: NSPDORVAL.',
    });
  }

  return say(locale, {
    en: `I stay with what the house publishes. For that, best to call ${house.phone} or write ${house.email}. I can tell you the menu, the hours, catering, or how to find us.`,
    fr: `Je reste sur ce que la casa publie. Pour ça, le mieux est d’appeler le ${house.phone} ou d’écrire à ${house.email}. Je peux vous parler du menu, des heures, du traiteur, ou comment venir.`,
    it: `Resto su quello che la casa pubblica. Per questo, meglio chiamare il ${house.phone} o scrivere a ${house.email}. Posso parlarvi del menu, degli orari, del catering, o di come arrivare.`,
  });
}
