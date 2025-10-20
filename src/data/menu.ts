import type { MenuItem, Category, Customization, PosSettings } from '../types';

// Customizations
export const sizeCustomization: Customization = {
  id: 'size',
  name: 'Size',
  type: 'size',
  required: true,
  maxSelections: 1,
  options: [
    { id: 'small', name: 'Small (8oz)', priceModifier: 0 },
    { id: 'medium', name: 'Medium (12oz)', priceModifier: 0.5 },
    { id: 'large', name: 'Large (16oz)', priceModifier: 1.0 }
  ]
};

export const milkCustomization: Customization = {
  id: 'milk',
  name: 'Milk Type',
  type: 'milk',
  required: false,
  maxSelections: 1,
  options: [
    { id: 'whole', name: 'Whole Milk', priceModifier: 0 },
    { id: 'skim', name: 'Skim Milk', priceModifier: 0 },
    { id: 'oat', name: 'Oat Milk', priceModifier: 0.6 },
    { id: 'almond', name: 'Almond Milk', priceModifier: 0.5 },
    { id: 'soy', name: 'Soy Milk', priceModifier: 0.5 },
    { id: 'coconut', name: 'Coconut Milk', priceModifier: 0.5 }
  ]
};

export const syrupCustomization: Customization = {
  id: 'syrup',
  name: 'Syrup',
  type: 'syrup',
  required: false,
  maxSelections: 3,
  options: [
    { id: 'vanilla', name: 'Vanilla', priceModifier: 0.5 },
    { id: 'caramel', name: 'Caramel', priceModifier: 0.5 },
    { id: 'hazelnut', name: 'Hazelnut', priceModifier: 0.5 },
    { id: 'cinnamon', name: 'Cinnamon', priceModifier: 0.5 },
    { id: 'pumpkin', name: 'Pumpkin Spice', priceModifier: 0.6 }
  ]
};

export const temperatureCustomization: Customization = {
  id: 'temperature',
  name: 'Temperature',
  type: 'temperature',
  required: true,
  maxSelections: 1,
  options: [
    { id: 'hot', name: 'Hot', priceModifier: 0 },
    { id: 'iced', name: 'Iced', priceModifier: 0 }
  ]
};

export const extrasCustomization: Customization = {
  id: 'extras',
  name: 'Extras',
  type: 'extra',
  required: false,
  maxSelections: 5,
  options: [
    { id: 'extra-shot', name: 'Extra Shot', priceModifier: 0.75 },
    { id: 'decaf', name: 'Decaf', priceModifier: 0 },
    { id: 'whipped-cream', name: 'Whipped Cream', priceModifier: 0.5 },
    { id: 'extra-hot', name: 'Extra Hot', priceModifier: 0 },
    { id: 'half-caff', name: 'Half Caff', priceModifier: 0 }
  ]
};

// Categories
export const categories: Category[] = [
  { id: 'coffee', name: 'Coffee', displayOrder: 1, color: '#8B4513' },
  { id: 'espresso', name: 'Espresso Drinks', displayOrder: 2, color: '#654321' },
  { id: 'tea', name: 'Tea', displayOrder: 3, color: '#228B22' },
  { id: 'cold-drinks', name: 'Cold Drinks', displayOrder: 4, color: '#4169E1' },
  { id: 'pastries', name: 'Pastries', displayOrder: 5, color: '#DAA520' },
  { id: 'sandwiches', name: 'Sandwiches', displayOrder: 6, color: '#CD853F' }
];

// Menu Items
export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: 'drip-coffee',
    name: 'Drip Coffee',
    description: 'Fresh brewed coffee from our daily selection',
    price: 2.50,
    category: 'coffee',
    available: true,
    customizations: [sizeCustomization, milkCustomization, extrasCustomization]
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Smooth, cold-steeped coffee served over ice',
    price: 3.25,
    category: 'coffee',
    available: true,
    customizations: [sizeCustomization, milkCustomization, syrupCustomization]
  },
  {
    id: 'french-press',
    name: 'French Press',
    description: 'Rich, full-bodied coffee brewed to perfection',
    price: 4.00,
    category: 'coffee',
    available: true,
    customizations: [milkCustomization, extrasCustomization]
  },

  // Espresso Drinks
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Pure, concentrated coffee shot',
    price: 2.00,
    category: 'espresso',
    available: true,
    customizations: [extrasCustomization]
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espresso with hot water',
    price: 3.00,
    category: 'espresso',
    available: true,
    customizations: [sizeCustomization, temperatureCustomization, milkCustomization, extrasCustomization]
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Espresso with steamed milk and light foam',
    price: 4.50,
    category: 'espresso',
    available: true,
    customizations: [sizeCustomization, temperatureCustomization, milkCustomization, syrupCustomization, extrasCustomization]
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and thick foam',
    price: 4.25,
    category: 'espresso',
    available: true,
    customizations: [sizeCustomization, temperatureCustomization, milkCustomization, syrupCustomization, extrasCustomization]
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description: 'Espresso "marked" with a dollop of steamed milk',
    price: 4.75,
    category: 'espresso',
    available: true,
    customizations: [sizeCustomization, temperatureCustomization, milkCustomization, syrupCustomization, extrasCustomization]
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk',
    price: 5.00,
    category: 'espresso',
    available: true,
    customizations: [sizeCustomization, temperatureCustomization, milkCustomization, extrasCustomization]
  },

  // Tea
  {
    id: 'green-tea',
    name: 'Green Tea',
    description: 'Premium green tea leaves',
    price: 2.75,
    category: 'tea',
    available: true,
    customizations: [sizeCustomization, temperatureCustomization]
  },
  {
    id: 'black-tea',
    name: 'Black Tea',
    description: 'Classic black tea blend',
    price: 2.75,
    category: 'tea',
    available: true,
    customizations: [sizeCustomization, temperatureCustomization, milkCustomization]
  },
  {
    id: 'chai-latte',
    name: 'Chai Latte',
    description: 'Spiced tea with steamed milk',
    price: 4.25,
    category: 'tea',
    available: true,
    customizations: [sizeCustomization, temperatureCustomization, milkCustomization, syrupCustomization]
  },

  // Cold Drinks
  {
    id: 'iced-coffee',
    name: 'Iced Coffee',
    description: 'Chilled coffee served over ice',
    price: 3.00,
    category: 'cold-drinks',
    available: true,
    customizations: [sizeCustomization, milkCustomization, syrupCustomization]
  },
  {
    id: 'frappuccino',
    name: 'Frappuccino',
    description: 'Blended coffee drink with ice',
    price: 5.25,
    category: 'cold-drinks',
    available: true,
    customizations: [sizeCustomization, milkCustomization, syrupCustomization, extrasCustomization]
  },
  {
    id: 'smoothie',
    name: 'Fruit Smoothie',
    description: 'Blended fruit smoothie',
    price: 4.75,
    category: 'cold-drinks',
    available: true,
    customizations: [sizeCustomization]
  },

  // Pastries
  {
    id: 'croissant',
    name: 'Butter Croissant',
    description: 'Flaky, buttery pastry',
    price: 3.50,
    category: 'pastries',
    available: true
  },
  {
    id: 'muffin',
    name: 'Blueberry Muffin',
    description: 'Fresh baked muffin with blueberries',
    price: 3.25,
    category: 'pastries',
    available: true
  },
  {
    id: 'danish',
    name: 'Cheese Danish',
    description: 'Sweet pastry with cream cheese filling',
    price: 3.75,
    category: 'pastries',
    available: true
  },
  {
    id: 'scone',
    name: 'Cranberry Scone',
    description: 'Traditional scone with dried cranberries',
    price: 3.00,
    category: 'pastries',
    available: true
  },

  // Sandwiches
  {
    id: 'breakfast-sandwich',
    name: 'Breakfast Sandwich',
    description: 'Egg, cheese, and bacon on English muffin',
    price: 6.50,
    category: 'sandwiches',
    available: true
  },
  {
    id: 'turkey-sandwich',
    name: 'Turkey & Swiss',
    description: 'Sliced turkey with Swiss cheese on sourdough',
    price: 8.25,
    category: 'sandwiches',
    available: true
  },
  {
    id: 'veggie-wrap',
    name: 'Veggie Wrap',
    description: 'Fresh vegetables in a spinach tortilla',
    price: 7.50,
    category: 'sandwiches',
    available: true
  }
];

// POS Settings
export const posSettings: PosSettings = {
  storeName: 'Brew & Bite Coffee',
  taxRate: 0.0875, // 8.75%
  currency: 'USD',
  orderNumberPrefix: 'BB',
  enableTableService: true,
  enableCustomerNames: true
};