import React from 'react';
import { CheckCircle, Printer, ArrowLeft } from 'lucide-react';
import type { Order } from '../types';

interface OrderConfirmationProps {
  order: Order;
  paymentMethod: string;
  onNewOrder: () => void;
  onPrintReceipt: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  paymentMethod,
  onNewOrder,
  onPrintReceipt
}) => {
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'cash':
        return 'Cash';
      case 'mobile':
        return 'Mobile Payment';
      default:
        return method;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600">
          Order #{order.id} has been processed
        </p>
      </div>

      {/* Order Details */}
      <div className="border-t border-b py-4 mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Order Type:</span>
            <span>{order.type === 'dine-in' ? `Dine In - Table ${order.tableNumber}` : 'Takeaway'}</span>
          </div>
          {order.customerName && (
            <div className="flex justify-between">
              <span className="font-medium">Customer:</span>
              <span>{order.customerName}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-medium">Payment Method:</span>
            <span>{formatPaymentMethod(paymentMethod)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date & Time:</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Order Items</h3>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                {item.customizations && item.customizations.length > 0 && (
                  <div className="text-gray-500 text-xs">
                    {item.customizations.map(c => `${c.name}: ${c.selectedOption}`).join(', ')}
                  </div>
                )}
                <div className="text-gray-500">Qty: {item.quantity}</div>
              </div>
              <div className="font-medium">
                ${item.totalPrice.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Total */}
      <div className="border-t pt-4 mb-6">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onPrintReceipt}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>
        
        <button
          onClick={onNewOrder}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Order</span>
        </button>
      </div>

      {/* Estimated Time */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-center">
        <p className="text-sm text-yellow-800">
          <span className="font-medium">Estimated preparation time:</span>
          <br />
          {order.type === 'takeaway' ? '10-15 minutes' : '15-20 minutes'}
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;