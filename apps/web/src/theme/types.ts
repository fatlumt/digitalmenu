export type MenuItem = {
  name: string;
  description: string;
  price: number;
  tags: string[];
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export type MenuData = {
  restaurant: string;
  description: string;
  categories: MenuCategory[];
};
