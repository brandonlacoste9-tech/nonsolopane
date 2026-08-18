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
    weekdays: { en: 'Tuesday to Friday, 10:30 to 18:00', fr: 'Mardi au vendredi, 10 h 30 à 18 h' },
    weekend: { en: 'Saturday and Sunday, 10:30 to 17:00', fr: 'Samedi et dimanche, 10 h 30 à 17 h' },
    closed: { en: 'Closed Monday', fr: 'Fermé lundi' },
    note: {
      en: 'Some listings say 9:00. Call 514.631.2000 if you are coming first thing.',
      fr: 'Certaines listes disent 9 h. Appelez le 514.631.2000 si vous venez tôt.',
    },
  },
};

export const menu = [
  {
    id: 'pizza',
    items: [
      {
        name: { en: 'Wood-oven Napoletana', fr: 'Napoletana au four à bois' },
        note: {
          en: 'In the shop. Order ahead if you can.',
          fr: 'En boutique. Commandez d’avance si possible.',
        },
      },
      { name: { en: 'Roman pizza', fr: 'Pizza romaine' } },
    ],
  },
  {
    id: 'pasta',
    items: [
      {
        name: { en: 'Tortellini, cheese, rose sauce', fr: 'Tortellini fromage, sauce rosée' },
        price: '$12.95',
        note: {
          en: 'Their most-liked plate on Uber Eats.',
          fr: 'Le plat le plus aimé sur Uber Eats.',
        },
      },
      {
        name: { en: '3 cheese manicotti, tomato sauce', fr: '3 manicotti fromage, sauce tomate' },
        price: '$12.95',
      },
      {
        name: { en: '3 meat cannelloni, tomato sauce', fr: '3 cannelloni viande, sauce tomate' },
        price: '$12.95',
      },
      {
        name: { en: 'Ravioli, meat tomato sauce', fr: 'Ravioli, sauce tomate à la viande' },
        price: '$12.95',
      },
      {
        name: { en: 'Fresh pasta, tomato sauce', fr: 'Pâtes fraîches, sauce tomate' },
        price: '$12.95',
      },
    ],
  },
  {
    id: 'panini',
    items: [
      {
        name: { en: 'Italian sausage', fr: 'Saucisse italienne' },
        price: '$12.50',
        note: {
          en: 'Peppers, onions, coleslaw.',
          fr: 'Poivrons, oignons, salade de chou.',
        },
      },
      {
        name: { en: 'Italian cold cuts', fr: 'Viandes italiennes' },
        price: '$12.50',
        note: {
          en: 'Mortadella, salami, capicollo, eggplant, hot peppers.',
          fr: 'Mortadelle, salami, capicollo, aubergines, piments.',
        },
      },
      {
        name: { en: 'Chicken cutlet', fr: 'Poulet pané' },
        price: '$10.50',
        note: {
          en: 'Cheese, lettuce, tomato, mayonnaise.',
          fr: 'Fromage, laitue, tomate, mayonnaise.',
        },
      },
      {
        name: { en: 'Vegetarian focaccia', fr: 'Focaccia végétarienne' },
        price: '$10.50',
        note: {
          en: 'Grilled eggplant and zucchini, roasted peppers, melted cheese.',
          fr: 'Aubergines et zucchini grillés, poivrons rôtis, fromage fondu.',
        },
      },
    ],
  },
  {
    id: 'salads',
    items: [
      {
        name: { en: 'Greek salad', fr: 'Salade grecque' },
        price: '$6.75',
      },
      { name: { en: 'Chef’s salad', fr: 'Salade du chef' }, price: '$6.75' },
      { name: { en: 'Crab salad', fr: 'Salade de goberge' }, price: '$6.75' },
      { name: { en: 'Coleslaw, white balsamic', fr: 'Salade de chou, balsamique blanc' }, price: '$6.00' },
    ],
  },
  {
    id: 'bakery',
    items: [
      {
        name: { en: 'Cannoli, ricotta', fr: 'Cannoli, ricotta' },
        price: '$3.95',
      },
      { name: { en: 'Chocolate cannoli', fr: 'Cannoli au chocolat' }, price: '$4.50' },
      { name: { en: 'Tiramisu', fr: 'Tiramisu' }, price: '$5.95' },
      { name: { en: 'Cheesecake', fr: 'Gâteau au fromage' }, price: '$5.95' },
      {
        name: {
          en: 'Zeppole — rum custard or cannoli cream',
          fr: 'Zeppole — crème au rhum ou crème cannoli',
        },
      },
    ],
  },
  {
    id: 'gelato',
    items: [
      { name: { en: '½ litre chocolate', fr: '½ litre chocolat' }, price: '$8.50' },
      { name: { en: '½ litre strawberry', fr: '½ litre fraise' }, price: '$8.50' },
      { name: { en: '½ litre vanilla', fr: '½ litre vanille' }, price: '$8.50' },
      {
        name: { en: '½ litre lemon sorbet, dairy-free', fr: '½ litre sorbet citron, sans lactose' },
        price: '$8.50',
      },
    ],
  },
  {
    id: 'coffee',
    items: [
      { name: { en: 'Espresso', fr: 'Espresso' }, price: '$2.50' },
      { name: { en: 'Espresso lungo', fr: 'Espresso allongé' }, price: '$3.00' },
      { name: { en: 'Cappuccino, 10 oz', fr: 'Cappuccino, 10 oz' }, price: '$4.50' },
      { name: { en: 'Caffè latte, 12 oz', fr: 'Caffè latte, 12 oz' }, price: '$5.00' },
      { name: { en: 'Caffè latte grande, 16 oz', fr: 'Caffè latte grande, 16 oz' }, price: '$6.00' },
      { name: { en: 'House arabica coffee, 12 oz', fr: 'Café arabica maison, 12 oz' }, price: '$2.25' },
    ],
  },
] as const;
