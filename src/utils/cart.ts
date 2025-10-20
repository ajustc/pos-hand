import type { CartItem, MenuItem, SelectedCustomization, Order } from '../types';
import { posSettings } from '../data/menu';

export function calculateItemPrice(menuItem: MenuItem, customizations: SelectedCustomization[]): number {
  const basePrice = menuItem.price;
  const customizationPrice = customizations.reduce((sum, custom) => sum + custom.priceModifier, 0);
  return basePrice + customizationPrice;
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
}

export function calculateTax(subtotal: number): number {
  return subtotal * posSettings.taxRate;
}

export function calculateOrderTotal(subtotal: number): number {
  const tax = calculateTax(subtotal);
  return subtotal + tax;
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `${posSettings.orderNumberPrefix}${timestamp}${random}`;
}

export function createCartItem(
  menuItem: MenuItem, 
  customizations: SelectedCustomization[], 
  quantity: number = 1
): CartItem {
  const totalPrice = calculateItemPrice(menuItem, customizations);
  
  return {
    id: `${menuItem.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    menuItem,
    quantity,
    customizations,
    totalPrice
  };
}

export function updateCartItemQuantity(item: CartItem, newQuantity: number): CartItem {
  return {
    ...item,
    quantity: Math.max(0, newQuantity)
  };
}

export function removeCartItem(cart: CartItem[], itemId: string): CartItem[] {
  return cart.filter(item => item.id !== itemId);
}

export function clearCart(): CartItem[] {
  return [];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: posSettings.currency
  }).format(price);
}

export function createOrder(
  items: CartItem[],
  orderType: 'takeaway' | 'dine-in',
  tableNumber?: string,
  customerName?: string,
  notes?: string
): Order {
  const subtotal = calculateCartTotal(items);
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;
  const now = new Date();

  return {
    id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    orderNumber: generateOrderNumber(),
    type: orderType,
    tableNumber,
    customerName,
    items: [...items],
    subtotal,
    tax,
    total,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    notes
  };
}

export function getItemDisplayName(item: CartItem): string {
  let name = item.menuItem.name;
  
  if (item.customizations.length > 0) {
    const customNames = item.customizations.map(c => c.name).join(', ');
    name += ` (${customNames})`;
  }
  
  return name;
}

export function getOrderStatusColor(status: Order['status']): string {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'preparing': return 'bg-blue-100 text-blue-800';
    case 'ready': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-gray-100 text-gray-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}