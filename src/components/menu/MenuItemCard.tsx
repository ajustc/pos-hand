import React from 'react';
import { Plus } from 'lucide-react';
import type { MenuItem } from '../../types';
import { formatPrice } from '../../utils/cart';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow touch-menu-item mobile-menu-item">
      {item.image && (
        <div className="h-32 bg-gray-200 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-green-600 ml-2">
            {formatPrice(item.price)}
          </span>
        </div>
        
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${
            item.available 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {item.available ? 'Available' : 'Out of Stock'}
          </span>
          
          <button
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors touch-add-btn ${
              item.available
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}