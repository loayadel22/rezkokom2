export interface Product {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  rating: number;
  totalReviews: number;
  onSale: boolean;
  inStock: boolean;
  isNew?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BillingDetails {
  firstName: string;
  companyName?: string;
  streetAddress: string;
  apartment?: string;
  townCity: string;
  phoneNumber: string;
  emailAddress: string;
  saveInfo: boolean;
}