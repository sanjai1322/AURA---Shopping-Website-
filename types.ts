
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  brand: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

export interface NavLink {
    name: string;
    path: string;
}