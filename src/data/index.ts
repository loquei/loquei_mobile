type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
};

export const ALL_PRODUCTS = [
  {
    section_title: "Popular",
    data: [
      {
        id: 1,
        product_title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "Eletronics",
      },
      {
        id: 2,
        product_title: "Mens Casual Premium Slim Fit T-Shirts ",
        price: 22.3,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
        category: "Clothing",
      },
      {
        id: 3,
        product_title: "Smart Watch",
        price: 64.98,
        description:
          "Smart Watch for Android iOS Phone, Fitness Tracker with Heart Rate Blood Pressure Blood Oxygen Monitor, Smartwatch Activity Tracker Sleep Monitor",
        category: "Eletronics",
      },
      // Exemplos adicionais
      {
        id: 4,
        product_title: "Portable Bluetooth Speaker",
        price: 39.99,
        description:
          "Portable Bluetooth Speaker, IPX7 Waterproof Speaker with 20W Stereo Sound, Bluetooth 5.0, Built-in Mic, for Home, Outdoor, Travel",
        category: "Eletronics",
      },
      {
        id: 5,
        product_title: "Women's Casual Summer Dress",
        price: 29.99,
        description:
          "Women's Casual Summer Dress, Sleeveless Mini Floral Print Sundress with Pockets, Beach Swing Dress",
        category: "Clothing",
      },
      {
        id: 6,
        product_title: "Wireless Charging Pad",
        price: 19.99,
        description:
          "Wireless Charging Pad, Qi-Certified Fast Wireless Charger Compatible with iPhone 12/11/11 Pro/XR/XS Max/XS/X/8/8 Plus, Galaxy S20/S10/S9/S8, Note 20/10/9",
        category: "Eletronics",
      },
    ]
  },
  {
    section_title: "New",
    data: [
      {
        id: 7,
        product_title: "Mens Casual Premium Slim Fit T-Shirts ",
        price: 22.3,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
        category: "Clothing",
      },
      {
        id: 8,
        product_title: "Mens Casual Premium Slim Fit T-Shirts ",
        price: 22.3,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
        category: "Clothing",
      },
      {
        id: 9,
        product_title: "Mens Casual Premium Slim Fit T-Shirts ",
        price: 22.3,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
        category: "Clothing",
      },
    ]
  },
  {
    section_title: "Trending",
    data: [
      {
        id: 10,
        product_title: "Gaming Mouse",
        price: 49.99,
        description:
          "Gaming Mouse with 12 Programmable Buttons, RGB Backlit, High Precision Sensor, Adjustable DPI, Ergonomic Design for PC Gamers",
        category: "Gaming",
      },
      {
        id: 11,
        product_title: "Travel Backpack",
        price: 79.99,
        description:
          "Travel Backpack with USB Charging Port, Water Resistant Laptop Backpack, Business Daypack for Men and Women, Fits 15.6 Inch Laptop",
        category: "Travel",
      },
      {
        id: 12,
        product_title: "Cookware Set",
        price: 129.99,
        description:
          "Nonstick Cookware Set, Pots and Pans Set with Cooking Utensils, Induction Cookware Set, Dishwasher Safe, Black",
        category: "Kitchen",
      },
    ]
  }
];


let ALL_CATEGORIES: string[] = [];

ALL_PRODUCTS.forEach((section) => {
  section.data.forEach((item) => {
    if (!ALL_CATEGORIES.includes(item.category)) {
      ALL_CATEGORIES.push(item.category);
    }
  });
});

const ALL_SECTIONS: string[] = ALL_PRODUCTS.map((product) => product.section_title);
const PRODUCTS = ALL_PRODUCTS.map((item) => item.data).flat()

export { ALL_CATEGORIES, ALL_SECTIONS, PRODUCTS };