export const house = {
  name: 'Non Solo Pane',
  phone: '514.631.2000',
  phoneHref: 'tel:+15146312000',
  email: 'info@nonsolopane.ca',
  addressLines: ['455 Chemin du Bord-du-Lac-Lakeshore', 'Dorval, QC'],
  postal: 'H9S 2A9',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=455+Chemin+du+Bord-du-Lac-Lakeshore+Dorval+QC',
  instagram: 'https://www.instagram.com/nonsolopanedorval/',
  facebook: 'https://www.facebook.com/NSPDORVAL/',
  orderUrl:
    'https://www.ubereats.com/ca/store/boulangerie-non-solopane/9ljPjonGTKyCEYyX5Pzu6w',
  founded: 2002,
  hours: {
    weekdays: {
      en: 'Tuesday to Friday, 10:30 to 18:00',
      fr: 'Mardi au vendredi, 10 h 30 à 18 h',
      it: 'Martedì a venerdì, 10:30–18:00',
    },
    weekend: {
      en: 'Saturday and Sunday, 10:30 to 17:00',
      fr: 'Samedi et dimanche, 10 h 30 à 17 h',
      it: 'Sabato e domenica, 10:30–17:00',
    },
    closed: { en: 'Closed Monday', fr: 'Fermé lundi', it: 'Chiuso lunedì' },
    note: {
      en: 'Some listings say 9:00. Call 514.631.2000 if you are coming first thing.',
      fr: 'Certaines listes disent 9 h. Appelez le 514.631.2000 si vous venez tôt.',
      it: 'Alcune liste dicono le 9:00. Chiamate il 514.631.2000 se venite di prima mattina.',
    },
  },
};

export const menu = [
  {
    id: 'pizza',
    items: [
      {
        name: {
          en: 'Wood-oven Napoletana',
          fr: 'Napoletana au four à bois',
          it: 'Napoletana al forno a legna',
        },
        note: {
          en: 'In the shop. Order ahead if you can.',
          fr: 'En boutique. Commandez d’avance si possible.',
          it: 'In bottega. Ordinate prima, se potete.',
        },
      },
      { name: { en: 'Roman pizza', fr: 'Pizza romaine', it: 'Pizza romana' } },
    ],
  },
  {
    id: 'pasta',
    items: [
      {
        name: {
          en: 'Tortellini, cheese, rose sauce',
          fr: 'Tortellini fromage, sauce rosée',
          it: 'Tortellini al formaggio, salsa rosa',
        },
        price: '$12.95',
        note: {
          en: 'Their most-liked plate on Uber Eats.',
          fr: 'Le plat le plus aimé sur Uber Eats.',
          it: 'Il piatto più amato su Uber Eats.',
        },
      },
      {
        name: {
          en: '3 cheese manicotti, tomato sauce',
          fr: '3 manicotti fromage, sauce tomate',
          it: '3 manicotti al formaggio, salsa di pomodoro',
        },
        price: '$12.95',
      },
      {
        name: {
          en: '3 meat cannelloni, tomato sauce',
          fr: '3 cannelloni viande, sauce tomate',
          it: '3 cannelloni di carne, salsa di pomodoro',
        },
        price: '$12.95',
      },
      {
        name: {
          en: 'Ravioli, meat tomato sauce',
          fr: 'Ravioli, sauce tomate à la viande',
          it: 'Ravioli, salsa di pomodoro alla carne',
        },
        price: '$12.95',
      },
      {
        name: {
          en: 'Fresh pasta, tomato sauce',
          fr: 'Pâtes fraîches, sauce tomate',
          it: 'Pasta fresca, salsa di pomodoro',
        },
        price: '$12.95',
      },
    ],
  },
  {
    id: 'panini',
    items: [
      {
        name: { en: 'Italian sausage', fr: 'Saucisse italienne', it: 'Salsiccia italiana' },
        price: '$12.50',
        note: {
          en: 'Peppers, onions, coleslaw.',
          fr: 'Poivrons, oignons, salade de chou.',
          it: 'Peperoni, cipolle, insalata di cavolo.',
        },
      },
      {
        name: { en: 'Italian cold cuts', fr: 'Viandes italiennes', it: 'Salumi italiani' },
        price: '$12.50',
        note: {
          en: 'Mortadella, salami, capicollo, eggplant, hot peppers.',
          fr: 'Mortadelle, salami, capicollo, aubergines, piments.',
          it: 'Mortadella, salame, capocollo, melanzane, peperoncini.',
        },
      },
      {
        name: { en: 'Chicken cutlet', fr: 'Poulet pané', it: 'Cotoletta di pollo' },
        price: '$10.50',
        note: {
          en: 'Cheese, lettuce, tomato, mayonnaise.',
          fr: 'Fromage, laitue, tomate, mayonnaise.',
          it: 'Formaggio, lattuga, pomodoro, maionese.',
        },
      },
      {
        name: { en: 'Vegetarian focaccia', fr: 'Focaccia végétarienne', it: 'Focaccia vegetariana' },
        price: '$10.50',
        note: {
          en: 'Grilled eggplant and zucchini, roasted peppers, melted cheese.',
          fr: 'Aubergines et zucchini grillés, poivrons rôtis, fromage fondu.',
          it: 'Melanzane e zucchine grigliate, peperoni arrosto, formaggio fuso.',
        },
      },
    ],
  },
  {
    id: 'salads',
    items: [
      {
        name: { en: 'Greek salad', fr: 'Salade grecque', it: 'Insalata greca' },
        price: '$6.75',
      },
      { name: { en: 'Chef’s salad', fr: 'Salade du chef', it: 'Insalata dello chef' }, price: '$6.75' },
      { name: { en: 'Crab salad', fr: 'Salade de goberge', it: 'Insalata di granchio' }, price: '$6.75' },
      {
        name: {
          en: 'Coleslaw, white balsamic',
          fr: 'Salade de chou, balsamique blanc',
          it: 'Insalata di cavolo, balsamico bianco',
        },
        price: '$6.00',
      },
    ],
  },
  {
    id: 'bakery',
    items: [
      {
        name: { en: 'Cannoli, ricotta', fr: 'Cannoli, ricotta', it: 'Cannoli alla ricotta' },
        price: '$3.95',
      },
      { name: { en: 'Chocolate cannoli', fr: 'Cannoli au chocolat', it: 'Cannoli al cioccolato' }, price: '$4.50' },
      { name: { en: 'Tiramisu', fr: 'Tiramisu', it: 'Tiramisù' }, price: '$5.95' },
      { name: { en: 'Cheesecake', fr: 'Gâteau au fromage', it: 'Cheesecake' }, price: '$5.95' },
      {
        name: {
          en: 'Zeppole — rum custard or cannoli cream',
          fr: 'Zeppole — crème au rhum ou crème cannoli',
          it: 'Zeppole — crema al rum o crema cannoli',
        },
      },
    ],
  },
  {
    id: 'gelato',
    items: [
      { name: { en: '½ litre chocolate', fr: '½ litre chocolat', it: '½ litro cioccolato' }, price: '$8.50' },
      { name: { en: '½ litre strawberry', fr: '½ litre fraise', it: '½ litro fragola' }, price: '$8.50' },
      { name: { en: '½ litre vanilla', fr: '½ litre vanille', it: '½ litro vaniglia' }, price: '$8.50' },
      {
        name: {
          en: '½ litre lemon sorbet, dairy-free',
          fr: '½ litre sorbet citron, sans lactose',
          it: '½ litro sorbetto al limone, senza lattosio',
        },
        price: '$8.50',
      },
    ],
  },
  {
    id: 'coffee',
    items: [
      { name: { en: 'Espresso', fr: 'Espresso', it: 'Espresso' }, price: '$2.50' },
      { name: { en: 'Espresso lungo', fr: 'Espresso allongé', it: 'Espresso lungo' }, price: '$3.00' },
      { name: { en: 'Cappuccino, 10 oz', fr: 'Cappuccino, 10 oz', it: 'Cappuccino, 10 oz' }, price: '$4.50' },
      { name: { en: 'Caffè latte, 12 oz', fr: 'Caffè latte, 12 oz', it: 'Caffè latte, 12 oz' }, price: '$5.00' },
      { name: { en: 'Caffè latte grande, 16 oz', fr: 'Caffè latte grande, 16 oz', it: 'Caffè latte grande, 16 oz' }, price: '$6.00' },
      {
        name: {
          en: 'House arabica coffee, 12 oz',
          fr: 'Café arabica maison, 12 oz',
          it: 'Caffè arabica della casa, 12 oz',
        },
        price: '$2.25',
      },
    ],
  },
] as const;
