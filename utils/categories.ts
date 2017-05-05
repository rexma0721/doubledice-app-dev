export type CategoryId = 'sports' | 'esports' | 'politics' | 'entertainment' | 'crypto' | 'other';

export interface CategoryData {
  id: CategoryId;
  title: string;
  logoImageSrc: string;
  backgroundImageSrc: string;
  backgroundColor: string;
  overlayColor: string;
  subcategories: SubcategoryData[],
}

export interface SubcategoryData {
  subid: string;
  title: string;
}

export const CATEGORIES: Record<CategoryId, CategoryData> = {
  sports: {
    id: 'sports',
    title: 'Sports',
    logoImageSrc: "/imgs/categories/logo-sports.png",
    backgroundImageSrc: '/imgs/categories/background-sports.jpg',
    backgroundColor: "linear-gradient(172.75deg, #FF7373 8.74%, #D6212C 94.36%)",
    overlayColor: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(68, 1, 1, 0.88) 100%)",
    subcategories: [
      { subid: 'american-football', title: 'American Football' },
      { subid: 'baseball', title: 'Baseball' },
      { subid: 'basketball', title: 'Basketball' },
      { subid: 'combat', title: 'Boxing/MMA' },
      { subid: 'cricket', title: 'Cricket' },
      { subid: 'cycling', title: 'Cycling' },
      { subid: 'formula-1', title: 'Formula 1' },
      { subid: 'golf', title: 'Golf' },
      { subid: 'horse-racing', title: 'Horse racing' },
      { subid: 'ice-hockey', title: 'Ice hockey' },
      { subid: 'nascar', title: 'NASCAR' },
      { subid: 'olympic', title: 'Olympic sports' },
      { subid: 'rugby', title: 'Rugby' },
      { subid: 'sailing', title: 'Sailing' },
      { subid: 'soccer', title: 'Soccer/Football' },
      { subid: 'table-tennis', title: 'Table Tennis' },
      { subid: 'tennis', title: 'Tennis' },
      { subid: 'volleyball', title: 'Volleyball' },
      { subid: 'winter', title: 'Winter sports' },
      { subid: 'other', title: 'Other' },
      { subid: 'test', title: 'Test' },
    ],
  },
  esports: {
    id: 'esports',
    title: 'eSports',
    logoImageSrc: "/imgs/categories/logo-esports.png",
    backgroundImageSrc: '/imgs/categories/background-esports.jpg',
    backgroundColor: " linear-gradient(180deg, #F45F30 0%, #FF8181 100%)",
    overlayColor: "linear-gradient(182.79deg, rgba(0, 0, 0, 0) 2.06%, rgba(79, 16, 16, 0.93) 83.46%)",
    subcategories: [
      { subid: 'moba', title: 'MOBAs' },
      { subid: 'shooters', title: 'Shooters' },
      { subid: 'fighting', title: 'Fighting' },
      { subid: 'other', title: 'Other' },
      { subid: 'test', title: 'Test' },
    ],
  },
  politics: {
    id: 'politics',
    title: 'Politics',
    logoImageSrc: "/imgs/categories/logo-politics.png",
    backgroundImageSrc: '/imgs/categories/background-politics.jpg',
    backgroundColor: "linear-gradient(172.75deg, #4F4BFF 8.74%, #7673FF 94.36%)",
    overlayColor: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(12, 11, 79, 0.88) 100%)",
    subcategories: [
      { subid: 'africa', title: 'Africa' },
      { subid: 'asia', title: 'Asia' },
      { subid: 'europe', title: 'Europe' },
      { subid: 'geopolitics', title: 'Geopolitics' },
      { subid: 'india', title: 'India' },
      { subid: 'south-america', title: 'South America' },
      { subid: 'uk', title: 'UK' },
      { subid: 'usa', title: 'USA' },
      { subid: 'other', title: 'ROW/Other' },
      { subid: 'test', title: 'Test' },
    ],
  },
  entertainment: {
    id: 'entertainment',
    title: 'Entertainment',
    logoImageSrc: "/imgs/categories/logo-entertainment.png",
    backgroundImageSrc: '/imgs/categories/background-entertainment.jpg',
    backgroundColor: "linear-gradient(172.75deg, #FFBE15 8.74%, #FFE814 94.36%)",
    overlayColor: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(160, 129, 19, 0.88) 100%)",
    subcategories: [
      { subid: 'movie-awards', title: 'Movie awards' },
      { subid: 'music-awards', title: 'Music awards' },
      { subid: 'reality-shows', title: 'Reality shows' },
      { subid: 'box-office', title: 'Box-office/Rankings' },
      { subid: 'other', title: 'Other' },
      { subid: 'test', title: 'Test' },
    ],
  },
  crypto: {
    id: 'crypto',
    title: 'Crypto projects',
    logoImageSrc: "/imgs/categories/logo-crypto.png",
    backgroundImageSrc: '/imgs/categories/background-crypto.jpg',
    backgroundColor: "linear-gradient(180deg, #C2B5FA 0%, #7DA3F5 100%)",
    overlayColor: "linear-gradient(182.79deg, rgba(0, 0, 0, 0) 2.06%, #716A9B 83.46%)",
    subcategories: [
      { subid: 'price', title: 'Price race' },
      { subid: 'hashrate', title: 'Hashrate' },
      { subid: 'other', title: 'Other' },
      { subid: 'test', title: 'Test' },
    ],
  },
  other: {
    id: 'other',
    title: 'Other',
    logoImageSrc: "/imgs/categories/logo-other.png",
    backgroundImageSrc: '/imgs/categories/background-other.jpg',
    backgroundColor: "linear-gradient(172.75deg, #FF7373 8.74%, #D6212C 94.36%)",
    overlayColor: "linear-gradient(180deg, #373638 0%, #161616 100%)",
    subcategories: [
      { subid: 'other', title: 'Other' },
      { subid: 'test', title: 'Test' },
    ],
  },
};

export function getKnownCategoryTitle(categoryId: string): string | null {
  return categoryId in CATEGORIES
    ? CATEGORIES[categoryId as CategoryId].title
    : null;
}

export function getKnownSubcategoryTitle(categoryId: string, subcategorySubid: string): string | null {
  if (categoryId in CATEGORIES) {
    const { subcategories } = CATEGORIES[categoryId as CategoryId];
    const subcategory = subcategories.find(({ subid }) => subid === subcategorySubid);
    return subcategory?.title || null;
  } else {
    return null;
  }
}
