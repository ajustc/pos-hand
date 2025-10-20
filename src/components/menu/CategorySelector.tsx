import React from 'react';
import type { Category } from '../../types';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export default function CategorySelector({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: CategorySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-b mobile-categories">
      <button
        onClick={() => onCategorySelect('all')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors mobile-category-btn ${
          selectedCategory === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        All Items
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors mobile-category-btn ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          style={{
            backgroundColor: selectedCategory === category.id 
              ? category.color || '#2563eb'
              : undefined
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}