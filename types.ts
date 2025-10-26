export interface Shoe {
  id: number;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  videoUrl?: string;
  audience: 'Men' | 'Women' | 'Kids' | 'Unisex';
}

export interface CartItem extends Shoe {
  quantity: number;
}
