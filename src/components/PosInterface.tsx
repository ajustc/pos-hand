import React, { useState, useMemo } from 'react';
import type { MenuItem, CartItem, SelectedCustomization, Order } from '../types';
import { menuItems, categories } from '../data/menu';
import { createCartItem, updateCartItemQuantity, removeCartItem, clearCart } from '../utils/cart';

import CategorySelector from './menu/CategorySelector';
import MenuGrid from './menu/MenuGrid';
import CustomizationModal from './menu/CustomizationModal';
import CartSidebar from './cart/CartSidebar';
import PaymentModal from './PaymentModal';
import OrderConfirmation from './OrderConfirmation';

export default function PosInterface() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<'takeaway' | 'dine-in'>('takeaway');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customizationModal, setCustomizationModal] = useState<{
    isOpen: boolean;
    item?: MenuItem;
  }>({ isOpen: false });
  const [paymentModal, setPaymentModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{
    order: Order;
    paymentMethod: string;
  } | null>(null);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  // Filter menu items based on selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return menuItems;
    }
    return menuItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (item: MenuItem) => {
    if (item.customizations && item.customizations.length > 0) {
      // Open customization modal
      setCustomizationModal({ isOpen: true, item });
    } else {
      // Add directly to cart without customizations
      const cartItem = createCartItem(item, []);
      setCartItems(prev => [...prev, cartItem]);
    }
  };

  const handleAddToCartWithCustomizations = (
    item: MenuItem, 
    customizations: SelectedCustomization[], 
    quantity: number
  ) => {
    const cartItem = createCartItem(item, customizations, quantity);
    setCartItems(prev => [...prev, cartItem]);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? updateCartItemQuantity(item, newQuantity)
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => removeCartItem(prev, itemId));
  };

  const handleClearCart = () => {
    setCartItems(clearCart());
  };

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) return;

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxRate = 0.0875; // 8.75% tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    // Create order
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      type: orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
      customerName: customerName || undefined,
      subtotal,
      tax,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setCurrentOrder(order);
    setPaymentModal(true);
  };

  const handlePaymentComplete = (paymentMethod: string) => {
    if (!currentOrder) return;

    const completedOrder = {
      ...currentOrder,
      status: 'completed' as const,
      paymentMethod
    };

    setCompletedOrder({ order: completedOrder, paymentMethod });
    setPaymentModal(false);
    setCurrentOrder(null);
  };

  const handleNewOrder = () => {
    setCartItems([]);
    setOrderType('takeaway');
    setTableNumber('');
    setCustomerName('');
    setCompletedOrder(null);
  };

  const handlePrintReceipt = () => {
    if (!completedOrder) return;
    
    // Create a simple receipt format
    const receipt = `
BREW & BITE COFFEE
Receipt #${completedOrder.order.id}
${new Date(completedOrder.order.createdAt).toLocaleString()}

Order Type: ${completedOrder.order.type === 'dine-in' ? `Dine In - Table ${completedOrder.order.tableNumber}` : 'Takeaway'}
${completedOrder.order.customerName ? `Customer: ${completedOrder.order.customerName}` : ''}

ITEMS:
${completedOrder.order.items.map(item => 
  `${item.quantity}x ${item.name} - $${item.totalPrice.toFixed(2)}`
).join('\n')}

Subtotal: $${completedOrder.order.subtotal.toFixed(2)}
Tax: $${completedOrder.order.tax.toFixed(2)}
TOTAL: $${completedOrder.order.total.toFixed(2)}

Payment: ${completedOrder.paymentMethod}

Thank you for your business!
    `.trim();

    // Print receipt (in a real app, this would connect to a printer)
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Receipt</title></head>
          <body style="font-family: monospace; white-space: pre-line; padding: 20px;">
            ${receipt}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="pos-layout flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="mobile-header bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Brew & Bite Coffee POS</h1>
          </div>
        </header>

        {/* Category Selector */}
        <div className="mobile-categories">
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mobile-menu-grid tablet-menu-grid">
            <MenuGrid
              items={filteredItems}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {/* Desktop Cart Sidebar */}
      <div className="hidden md:block">
        <CartSidebar
          items={cartItems}
          orderType={orderType}
          tableNumber={tableNumber}
          customerName={customerName}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onOrderTypeChange={setOrderType}
          onTableNumberChange={setTableNumber}
          onCustomerNameChange={setCustomerName}
          onCheckout={handleProceedToPayment}
        />
      </div>

      {/* Mobile Cart Toggle Button */}
      <button
        className="mobile-cart-toggle md:hidden"
        onClick={() => setIsMobileCartOpen(true)}
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>
      </button>

      {/* Mobile Cart Modal */}
      {isMobileCartOpen && (
        <div className="mobile-cart md:hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Cart</h2>
            <button
              onClick={() => setIsMobileCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(50vh - 60px)' }}>
            <CartSidebar
              items={cartItems}
              orderType={orderType}
              tableNumber={tableNumber}
              customerName={customerName}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onOrderTypeChange={setOrderType}
              onTableNumberChange={setTableNumber}
              onCustomerNameChange={setCustomerName}
              onCheckout={(e) => {
                handleProceedToPayment();
                setIsMobileCartOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Mobile Cart Backdrop */}
      {isMobileCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileCartOpen(false)}
        />
      )}

      {/* Customization Modal */}
      <CustomizationModal
        item={customizationModal.item!}
        isOpen={customizationModal.isOpen}
        onClose={() => setCustomizationModal({ isOpen: false })}
        onAddToCart={handleAddToCartWithCustomizations}
      />

      {/* Payment Modal */}
      {currentOrder && (
        <PaymentModal
          isOpen={paymentModal}
          onClose={() => setPaymentModal(false)}
          order={currentOrder}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {/* Order Confirmation */}
      {completedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <OrderConfirmation
            order={completedOrder.order}
            paymentMethod={completedOrder.paymentMethod}
            onNewOrder={handleNewOrder}
            onPrintReceipt={handlePrintReceipt}
          />
        </div>
      )}
    </div>
  );
}