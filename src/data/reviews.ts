export type ReviewTag =
  | "family"
  | "atmosphere"
  | "dishes"
  | "google";

export type Review = {
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  tall?: boolean;
  tags: ReviewTag[];
};

export const REVIEWS: Review[] = [
  {
    name: "Aakanksha Sharma",
    initials: "AS",
    rating: 5,
    date: "2 weeks ago",
    text:
      "Hands down the best family dining experience in Mansarovar. The Paneer Lababdar was outstanding and the staff made our anniversary feel truly special.",
    tall: true,
    tags: ["family", "dishes", "google"],
  },
  {
    name: "Rohit Agarwal",
    initials: "RA",
    rating: 5,
    date: "1 month ago",
    text: "Warm hospitality and rich, authentic flavours. Perfect spot for a kitty party.",
    tags: ["atmosphere", "google"],
  },
  {
    name: "Priya Choudhary",
    initials: "PC",
    rating: 5,
    date: "3 weeks ago",
    text:
      "We celebrated my daughter's birthday here. The team decorated the table beautifully and the food was hot, fresh and delicious.",
    tags: ["family", "atmosphere", "google"],
  },
  {
    name: "Vikram Singh",
    initials: "VS",
    rating: 5,
    date: "1 week ago",
    text:
      "Dal Baati Churma tastes just like home — rich, ghee-heavy, perfectly spiced. The ambience is elegant without feeling stiff.",
    tall: true,
    tags: ["dishes", "atmosphere", "google"],
  },
  {
    name: "Neha Jain",
    initials: "NJ",
    rating: 5,
    date: "2 months ago",
    text: "Loved the Continental menu too. Baked veg au gratin was creamy and comforting.",
    tags: ["dishes", "google"],
  },
  {
    name: "Anirudh Mehta",
    initials: "AM",
    rating: 4,
    date: "3 days ago",
    text:
      "Consistent quality, quick service, and a genuinely welcoming team. Our go-to for family dinners on the weekend.",
    tags: ["family", "google"],
  },
];

