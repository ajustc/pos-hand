import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';
import { formatPrice, calculateCartTotal, calculateTax, calculateOrderTotal } from '../../utils/cart';
import CartItem from './CartItem';

interface CartSidebarProps {
  items: CartItemType[];
  orderType: 'takeaway' | 'dine-in';
  tableNumber?: string;
  customerName?: string;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOrderTypeChange: (type: 'takeaway' | 'dine-in') => void;
  onTableNumberChange: (tableNumber: string) => void;
  onCustomerNameChange: (customerName: string) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  items,
  orderType,
  tableNumber,
  customerName,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderTypeChange,
  onTableNumberChange,
  onCustomerNameChange,
  onCheckout
}: CartSidebarProps) {
  const subtotal = calculateCartTotal(items);
  const tax = calculateTax(subtotal);
  const total = calculateOrderTotal(subtotal);

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingCart size={20} />
            Cart ({items.length})
          </h2>
          {items.length > 0 && (
            <button
              onClick={onClearCart}
              className="p-1 hover:bg-red-100 text-red-600 rounded-full"
              title="Clear cart"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {/* Order Type Selection */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => onOrderTypeChange('takeaway')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                orderType === 'takeaway'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Takeaway
            </button>
            <button
              onClick={() => onOrderTypeChange('dine-in')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                orderType === 'dine-in'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dine In
            </button>
          </div>

          {orderType === 'dine-in' && (
            <input
              type="text"
              placeholder="Table number"
              value={tableNumber || ''}
              onChange={(e) => onTableNumberChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            type="text"
            placeholder="Customer name (optional)"
            value={customerName || ''}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Cart is empty</p>
              <p className="text-sm">Add items from the menu</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary */}
      {items.length > 0 && (
        <div className="border-t border-gray-200 p-4 space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total:</span>
              <span className="text-green-600">{formatPrice(total)}</span>
            </div>
          </div>

          <button
            onClick={onCheckout}
            disabled={items.length === 0 || (orderType === 'dine-in' && !tableNumber)}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}