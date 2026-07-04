export type MenuItem = {
  name: string;
  description?: string;
  price: number;
  veg?: boolean;
};
export type MenuCategory = {
  title: string;
  blurb?: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    title: "North Indian",
    blurb: "Rich gravies, tandoor classics, and slow-cooked favourites.",
    items: [
      { name: "Paneer Lababdar", description: "Cashew-tomato gravy, house paneer", price: 320, veg: true },
      { name: "Paneer Butter Masala", description: "Buttery tomato gravy, soft paneer", price: 310, veg: true },
      { name: "Kaju Curry", description: "Whole cashews in mild onion gravy", price: 340, veg: true },
      { name: "Rajwadi Handi", description: "Royal mixed vegetable handi", price: 330, veg: true },
      { name: "Dal Makhani", description: "Slow-cooked black lentils, cream finish", price: 280, veg: true },
      { name: "Dal Baati Churma", description: "The Rajasthani classic thali plate", price: 360, veg: true },
      { name: "Shahi Paneer", description: "Royal saffron-scented gravy", price: 320, veg: true },
      { name: "Chole Bhature", description: "Fluffy bhature with spiced chickpeas", price: 260, veg: true },
    ],
  },
  {
    title: "Chinese",
    items: [
      { name: "Veg Manchurian", description: "Gravy or dry", price: 260, veg: true },
      { name: "Chilli Paneer", description: "Bell peppers, garlic soy toss", price: 290, veg: true },
      { name: "Hakka Noodles", description: "Wok-tossed with vegetables", price: 240, veg: true },
      { name: "Schezwan Fried Rice", price: 250, veg: true },
      { name: "Honey Chilli Potato", price: 230, veg: true },
    ],
  },
  {
    title: "Continental",
    items: [
      { name: "Grilled Vegetable Platter", description: "Herb butter, lemon", price: 340, veg: true },
      { name: "Mushroom Stroganoff", description: "Creamy mushroom, rice pilaf", price: 380, veg: true },
      { name: "Baked Vegetables au Gratin", description: "Cheesy bake, garlic bread", price: 320, veg: true },
      { name: "Cottage Cheese Steak", description: "Peppercorn sauce, mash", price: 360, veg: true },
    ],
  },
  {
    title: "Pizza",
    items: [
      { name: "Margherita", description: "San Marzano, mozzarella, basil", price: 280, veg: true },
      { name: "Farmhouse", description: "Onion, capsicum, tomato, mushroom", price: 340, veg: true },
      { name: "Paneer Tikka Pizza", description: "Tandoori paneer, onion", price: 360, veg: true },
      { name: "Cheese Overload", description: "Four-cheese blend", price: 380, veg: true },
    ],
  },
  {
    title: "Pasta",
    items: [
      { name: "Penne Arrabbiata", description: "Spicy tomato, garlic, chilli", price: 290, veg: true },
      { name: "Alfredo Fettuccine", description: "Cream, parmesan, herbs", price: 320, veg: true },
      { name: "Pesto Pasta", description: "Basil pesto, olive oil", price: 310, veg: true },
    ],
  },
  {
    title: "Burgers",
    items: [
      { name: "Classic Veg Burger", price: 180, veg: true },
      { name: "Paneer Tikka Burger", price: 220, veg: true },
      { name: "Cheese Overload Burger", price: 240, veg: true },
    ],
  },
  {
    title: "Sandwiches",
    items: [
      { name: "Bombay Grilled Sandwich", price: 160, veg: true },
      { name: "Paneer Tikka Sandwich", price: 200, veg: true },
      { name: "Cheese Corn Sandwich", price: 190, veg: true },
    ],
  },
  {
    title: "Rice & Biryani",
    items: [
      { name: "Veg Biryani", description: "Long-grain basmati, whole spices", price: 280, veg: true },
      { name: "Paneer Biryani", price: 320, veg: true },
      { name: "Jeera Rice", price: 180, veg: true },
      { name: "Veg Pulao", price: 220, veg: true },
    ],
  },
  {
    title: "Starters",
    items: [
      { name: "Paneer Tikka", description: "Charcoal tandoor, mint chutney", price: 320, veg: true },
      { name: "Hara Bhara Kabab", price: 260, veg: true },
      { name: "Dahi Ke Kabab", price: 290, veg: true },
      { name: "Tandoori Mushroom", price: 300, veg: true },
    ],
  },
  {
    title: "Snacks",
    items: [
      { name: "Samosa (2 pcs)", price: 80, veg: true },
      { name: "Aloo Tikki Chaat", price: 140, veg: true },
      { name: "Pav Bhaji", price: 220, veg: true },
      { name: "Masala Papad", price: 90, veg: true },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Gulab Jamun (2 pcs)", price: 120, veg: true },
      { name: "Brownie with Ice Cream", price: 220, veg: true },
      { name: "Rasmalai (2 pcs)", price: 160, veg: true },
      { name: "Kulfi Falooda", price: 180, veg: true },
    ],
  },
  {
    title: "Hot Beverages",
    items: [
      { name: "Masala Chai", price: 60, veg: true },
      { name: "Filter Coffee", price: 80, veg: true },
      { name: "Cappuccino", price: 140, veg: true },
      { name: "Hot Chocolate", price: 160, veg: true },
    ],
  },
  {
    title: "Cold Beverages",
    items: [
      { name: "Fresh Lime Soda", price: 80, veg: true },
      { name: "Iced Tea", price: 120, veg: true },
      { name: "Cold Coffee", price: 160, veg: true },
      { name: "Aerated Drink", price: 60, veg: true },
    ],
  },
  {
    title: "Shakes",
    items: [
      { name: "Chocolate Shake", price: 180, veg: true },
      { name: "Strawberry Shake", price: 180, veg: true },
      { name: "Oreo Shake", price: 200, veg: true },
      { name: "Kesar Pista Shake", price: 200, veg: true },
    ],
  },
  {
    title: "Mocktails",
    items: [
      { name: "Virgin Mojito", price: 180, veg: true },
      { name: "Blue Lagoon", price: 190, veg: true },
      { name: "Peach Iced Tea", price: 180, veg: true },
      { name: "Kalash Signature Cooler", price: 210, veg: true },
    ],
  },
  {
    title: "Kids Specials",
    items: [
      { name: "Cheese Pizza", price: 220, veg: true },
      { name: "French Fries", price: 140, veg: true },
      { name: "Cheese Sandwich", price: 160, veg: true },
      { name: "Chocolate Sundae", price: 180, veg: true },
    ],
  },
];
