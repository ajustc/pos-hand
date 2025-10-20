import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';
import { formatPrice, getItemDisplayName } from '../../utils/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border-b border-gray-200 last:border-b-0">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-gray-900 truncate">
          {item.menuItem.name}
        </h4>
        {item.customizations.length > 0 && (
          <p className="text-xs text-gray-600 mt-1">
            {item.customizations.map(c => c.name).join(', ')}
          </p>
        )}
        <p className="text-sm font-semibold text-green-600 mt-1">
          {formatPrice(item.totalPrice)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded-full"
          disabled={item.quantity <= 1}
        >
          <Minus size={14} />
        </button>
        
        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>
        
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <Plus size={14} />
        </button>
        
        <button
          onClick={() => onRemove(item.id)}
          className="p-1 hover:bg-red-100 text-red-600 rounded-full ml-2"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}