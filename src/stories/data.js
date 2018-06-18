export const menu = {
  '-KozJjWRsw0zSLP_trFd':
    {
      avail: { all: true },
      cat: 'Appetizers',
      desc: 'Deep fried mild chillies coated with mildly spiced chick pea batter served with coconut and coriander chutney',
      mods:
        [{
          name: 'Extra Side Dish',
          options:
            [{ name: 'Sambhar', price: 1 },
              { name: 'Chutney', price: 0.5 }]
        }],
      name: 'Chilli Bajji (Pakora) (4)',
      price: 5,
      subcat: 'FINGER FOODS',
      tags: ['vegetarian', 'extra-spicy', 'specials', 'vegan', 'gluten-free'],
      type: ''
    },
  '-KozK22uRZOE9eGryCka':
    {
      avail: { all: true },
      cat: 'Appetizers',
      desc: 'Deep fried potato ball fritters served with coconut chutney',
      mods:
        [{
          name: 'Extra Side Dish',
          options:
            [{ name: 'Sambhar', price: 1 },
              { name: 'Chutney', price: 0.5 }]
        }],
      name: 'Potato Bonda (3)',
      price: 5,
      subcat: 'FINGER FOODS',
      tags: ['gluten-free', 'vegan'],
      type: ''
    },
  '-KozKEs05mxom5SOJdR2':
    {
      avail: { all: true },
      cat: 'Appetizers',
      desc: 'Fried Indian pastry stuffed with flavoured potatoes served with coriander and tamarind chutney',
      mods:
        [{
          name: 'Extra Side Dish',
          options:
            [{ name: 'Sambhar', price: 1 },
              { name: 'Chutney', price: 0.5 }]
        }],
      name: 'Samosa Plate (2)',
      price: 3.5,
      subcat: 'FINGER FOODS',
      type: ''
    },
  '-KozKMxPPvAjKWXAIrUH':
    {
      avail: { all: false, timings: { 4: true, 6: true } },
      cat: 'Appetizers',
      desc: 'Traditional South Indian light meal made with suji/rava (semolina) and spices, served with sambar, coconut and sugar',
      mods:
        [{
          name: 'Extra Side Dish',
          options:
            [{ name: 'Sambhar', price: 1 },
              { name: 'Chutney', price: 0.5 }]
        }],
      name: 'Rava Upma',
      price: 7.5,
      subcat: 'FINGER FOODS',
      type: ''
    },
  '-KozKyu_nnrDOdk1PpyW':
    {
      avail: { all: true, timings: { 4: false, 6: false } },
      cat: 'Appetizers',
      desc: 'A classic South Indian snack - Fried lentil flour doughnuts mildly spiced served with coconut and tomatoe chutney and sambhar',
      mods:
        [{
          name: 'Extra Side Dish',
          options:
            [{ name: 'Sambhar', price: 1 },
              { name: 'Chutney', price: 0.5 }]
        }],
      name: 'Medhu Vada (2)',
      price: 4.5,
      subcat: 'VADA',
      type: ''
    },
  '-KozL9i5gzyNArspxWte':
    {
      avail: { all: true },
      cat: 'Appetizers',
      desc: 'Fried lentil flour doughnuts dipped in sambhar, topped with ghee, fresh onions, coriander, and coconut chutney',
      name: 'Sambhar Vada (2)',
      price: 5,
      subcat: 'VADA',
      type: ''
    },
  '-KozMKvSC_gPsr9vJux8':
    {
      avail: { all: true },
      cat: 'KIDS DOSA',
      desc: 'Rich melted chocolate spread on dosa rolled and dusted with powdered sugar',
      name: 'Kids Chocolate Dosa *May contain nuts*',
      price: 5,
      type: ''
    },
  '-KozMQGAObfA0qPkzkIO':
    {
      avail: { all: true },
      cat: 'KIDS DOSA',
      desc: 'Kids dosa cooked with ghee and sugar, topped with powdered sugar',
      name: 'Kids Sweet Ghee Dosa',
      price: 5,
      type: ''
    },
  '-KozMlPfSdfQy4vKINpc':
    {
      avail: { all: true },
      cat: 'KIDS DOSA',
      desc: 'Kids dosa cooked with ghee and sugar, topped with powdered sugar',
      mods:
        [{
          name: 'Choose Sambhar',
          options: [{ name: 'No Sambhar' }, { name: 'Sambhar', price: 0.5 }]
        }],
      name: 'Kids Plain Dosa',
      price: 4.5,
      type: ''
    },
  '-KozN7QUVviWOT8_Jh2P':
    {
      avail: { all: true },
      cat: 'KIDS DOSA',
      desc: 'Kids size plain dosa with potato stuffing, served with coconut chutney and mild sambhar',
      name: 'Kids Aloo Masala Dosa',
      price: 5,
      type: ''
    }
}

export const tags = {
  'extra-hot': { icon: 'icon-extra-hot', title: 'extra hot' },
  'extra-spicy': { icon: 'icon-extra-spicy', title: 'extra spicy' },
  'gluten-free': { icon: 'icon-gluten-free', title: 'gluten free' },
  hot: { icon: 'icon-hot', title: 'hot' },
  'non-vegetarian': { icon: 'icon-non-veg', title: 'non-vegetarian' },
  specials: { icon: 'icon-specials', title: 'specials' },
  spicy: { icon: 'icon-spicy', title: 'spicy' },
  vegan: { icon: 'icon-vegan', title: 'vegan' },
  vegetarian: { icon: 'icon-veg', title: 'vegetarian' }
}

export const hotel = {
  message: 'Welcome to Ordaap Hotel! Choose one of the restaurants to start ordering',
  name: 'Ordaap Hotel',
  restaurants: [{
    cuisines: 'Indian, South',
    name: 'Guru Lakshmi',
    rid: '-KottdrFQOQJRnES2zbN',
    timings: {
      fri: '12:00,15:00,17:00,22:00',
      mon: '12:00,15:00,17:00,22:00',
      sat: '12:00,15:00,17:00,22:00',
      sun: '12:00,15:00,17:00,22:00',
      thu: '12:00,15:00,17:00,22:00',
      tue: '12:00,15:00,17:00,22:00'
    },
    images: ['https://firebasestorage.googleapis.com/v0/b/restaurant-36d1e.appspot.com/o/Restaurant%2Fguru-lukshmi.png?alt=media&token=daeaf55b-68c3-461a-8451-8fa4cdfccd9d']
  }, {
    cuisines: 'Portuguese, European',
    name: 'Bairrada Churrasqueira Grill',
    rid: '-KxGQMv6JcGZlfQsURyW',
    timings: {
      fri: '11:30,10:00',
      mon: '11:30,10:00',
      sat: '11:30,10:00',
      sun: '11:30,10:00',
      thu: '11:30,10:00',
      tue: '11:30,10:00',
      wed: '11:30,10:00'
    },
    images: ['https://firebasestorage.googleapis.com/v0/b/restaurant-36d1e.appspot.com/o/Restaurant%2Fbairadda.jpg?alt=media&token=30dd6dce-d17c-44bb-97c3-2d8a4d7651f8']
  }, {
    cuisines: 'Cafe',
    name: 'House #22 Cafe',
    rid: '-L45yLdBR6qK62EOV2nM',
    timings: {
      fri: '11:00,23:00',
      mon: '11:00,23:00',
      sat: '11:00,23:00',
      sun: '11:00,23:00',
      thu: '11:00,23:00',
      tue: '11:00,23:00',
      wed: '11:00,23:00'
    },
    images: ['https://firebasestorage.googleapis.com/v0/b/restaurant-36d1e.appspot.com/o/Restaurant%2Fhouse22.jpeg?alt=media&token=8fbb1ad0-4c54-4a6d-9237-058e78316c4f']
  }]
}

