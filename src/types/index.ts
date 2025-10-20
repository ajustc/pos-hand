// Core data types for the Coffee Shop POS System

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  customizations?: Customization[];
}

export interface Customization {
  id: string;
  name: string;
  type: 'size' | 'milk' | 'syrup' | 'extra' | 'temperature';
  options: CustomizationOption[];
  required: boolean;
  maxSelections?: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  priceModifier: number; // Additional cost (can be negative for discounts)
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: SelectedCustomization[];
  totalPrice: number;
}

export interface SelectedCustomization {
  customizationId: string;
  optionId: string;
  name: string;
  priceModifier: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  type: 'takeaway' | 'dine-in';
  tableNumber?: string;
  customerName?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  displayOrder: number;
  color?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'card' | 'digital';
  enabled: boolean;
}

export interface PosSettings {
  storeName: string;
  taxRate: number;
  currency: string;
  orderNumberPrefix: string;
  enableTableService: boolean;
  enableCustomerNames: boolean;
}

// UI State types
export interface CartState {
  items: CartItem[];
  total: number;
  orderType: 'takeaway' | 'dine-in';
  tableNumber?: string;
  customerName?: string;
}

export interface AppState {
  cart: CartState;
  currentOrder?: Order;
  selectedCategory: string;
  isCheckingOut: boolean;
}