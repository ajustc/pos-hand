import React, { useState } from 'react';
import { X, CreditCard, DollarSign, Smartphone } from 'lucide-react';
import type { Order } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onPaymentComplete: (paymentMethod: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  order,
  onPaymentComplete
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [cashReceived, setCashReceived] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    if (!selectedPaymentMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onPaymentComplete(selectedPaymentMethod);
    setIsProcessing(false);
  };

  const cashAmount = parseFloat(cashReceived) || 0;
  const change = cashAmount - order.total;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'cash', name: 'Cash', icon: DollarSign },
    { id: 'mobile', name: 'Mobile Payment', icon: Smartphone }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Payment</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            disabled={isProcessing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Order #{order.id}</span>
              <span>{order.type === 'dine-in' ? `Table ${order.tableNumber}` : 'Takeaway'}</span>
            </div>
            {order.customerName && (
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{order.customerName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Items:</span>
              <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Payment Method</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`w-full p-3 border rounded-lg flex items-center space-x-3 transition-colors ${
                    selectedPaymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  disabled={isProcessing}
                >
                  <Icon className="w-5 h-5" />
                  <span>{method.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cash Payment Details */}
        {selectedPaymentMethod === 'cash' && (
          <div className="mb-6 p-4 border rounded-lg">
            <label className="block text-sm font-medium mb-2">
              Cash Received
            </label>
            <input
              type="number"
              step="0.01"
              min={order.total}
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Minimum: $${order.total.toFixed(2)}`}
              disabled={isProcessing}
            />
            {cashAmount >= order.total && (
              <div className="mt-2 p-2 bg-green-50 rounded">
                <div className="flex justify-between text-sm">
                  <span>Change:</span>
                  <span className="font-bold text-green-600">
                    ${change.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={
              !selectedPaymentMethod ||
              (selectedPaymentMethod === 'cash' && cashAmount < order.total) ||
              isProcessing
            }
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : `Pay $${order.total.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;