import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { MenuItem, SelectedCustomization, Customization } from '../../types';
import { formatPrice, calculateItemPrice } from '../../utils/cart';

interface CustomizationModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customizations: SelectedCustomization[], quantity: number) => void;
}

export default function CustomizationModal({ 
  item, 
  isOpen, 
  onClose, 
  onAddToCart 
}: CustomizationModalProps) {
  const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleCustomizationChange = (
    customization: Customization,
    optionId: string,
    optionName: string,
    priceModifier: number,
    isSelected: boolean
  ) => {
    setSelectedCustomizations(prev => {
      if (isSelected) {
        // Add the customization
        const newCustomization: SelectedCustomization = {
          customizationId: customization.id,
          optionId,
          name: optionName,
          priceModifier
        };

        // If it's a single-selection customization, remove any existing selection for this customization
        if (customization.maxSelections === 1) {
          const filtered = prev.filter(c => c.customizationId !== customization.id);
          return [...filtered, newCustomization];
        }

        // For multi-selection, check if we're at the limit
        const existingCount = prev.filter(c => c.customizationId === customization.id).length;
        if (customization.maxSelections && existingCount >= customization.maxSelections) {
          return prev; // Don't add if at limit
        }

        return [...prev, newCustomization];
      } else {
        // Remove the customization
        return prev.filter(c => !(c.customizationId === customization.id && c.optionId === optionId));
      }
    });
  };

  const isOptionSelected = (customizationId: string, optionId: string) => {
    return selectedCustomizations.some(c => 
      c.customizationId === customizationId && c.optionId === optionId
    );
  };

  const canSelectMore = (customization: Customization) => {
    if (!customization.maxSelections) return true;
    const currentCount = selectedCustomizations.filter(c => c.customizationId === customization.id).length;
    return currentCount < customization.maxSelections;
  };

  const totalPrice = calculateItemPrice(item, selectedCustomizations);

  const handleAddToCart = () => {
    onAddToCart(item, selectedCustomizations, quantity);
    onClose();
    setSelectedCustomizations([]);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-gray-600 mb-4">{item.description}</p>
          <p className="text-lg font-semibold mb-6">Base Price: {formatPrice(item.price)}</p>

          {item.customizations?.map((customization) => (
            <div key={customization.id} className="mb-6">
              <h3 className="font-medium mb-2">
                {customization.name}
                {customization.required && <span className="text-red-500 ml-1">*</span>}
                {customization.maxSelections && customization.maxSelections > 1 && (
                  <span className="text-sm text-gray-500 ml-2">
                    (Max {customization.maxSelections})
                  </span>
                )}
              </h3>

              <div className="space-y-2">
                {customization.options.map((option) => {
                  const isSelected = isOptionSelected(customization.id, option.id);
                  const canSelect = canSelectMore(customization) || isSelected;

                  return (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer transition-colors ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : canSelect 
                            ? 'border-gray-200 hover:border-gray-300' 
                            : 'border-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type={customization.maxSelections === 1 ? 'radio' : 'checkbox'}
                          name={customization.id}
                          checked={isSelected}
                          disabled={!canSelect}
                          onChange={(e) => handleCustomizationChange(
                            customization,
                            option.id,
                            option.name,
                            option.priceModifier,
                            e.target.checked
                          )}
                          className="mr-3"
                        />
                        <span className="text-sm">{option.name}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {option.priceModifier === 0 
                          ? 'Free' 
                          : `+${formatPrice(option.priceModifier)}`
                        }
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold text-green-600">
                {formatPrice(totalPrice * quantity)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}