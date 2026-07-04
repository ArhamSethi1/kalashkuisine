import rajwadi from "@/assets/dish-rajwadi-handi.jpg";
import lababdar from "@/assets/dish-paneer-lababdar.jpg";
import tikka from "@/assets/dish-paneer-tikka.jpg";
import dalBaati from "@/assets/dish-dal-baati.jpg";
import kaju from "@/assets/dish-kaju-curry.jpg";
import brownie from "@/assets/dish-brownie.jpg";

export type Dish = {
  name: string;
  description: string;
  image: string;
  chefPick?: boolean;
};

export const SIGNATURE_DISHES: Dish[] = [
  {
    name: "Rajwadi Handi",
    description: "Slow-cooked mixed vegetables in a rich royal Rajasthani gravy.",
    image: rajwadi,
    chefPick: true,
  },
  {
    name: "Paneer Lababdar",
    description: "Silky tomato-cashew gravy with soft house-made paneer.",
    image: lababdar,
  },
  {
    name: "Paneer Tikka Masala",
    description: "Char-grilled paneer tossed in a smoky, buttery masala.",
    image: tikka,
    chefPick: true,
  },
  {
    name: "Dal Baati Churma",
    description: "The Rajasthani classic — crisp baatis, ghee-rich dal, sweet churma.",
    image: dalBaati,
    chefPick: true,
  },
  {
    name: "Kaju Curry",
    description: "Whole cashews simmered in a fragrant, mildly spiced onion gravy.",
    image: kaju,
  },
  {
    name: "Brownie with Ice Cream",
    description: "Warm chocolate brownie, cold vanilla scoop, molten sauce.",
    image: brownie,
  },
];
