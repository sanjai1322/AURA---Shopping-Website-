import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlassContainer from '../components/GlassContainer';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import OrderStatusTracker from '../components/OrderStatusTracker';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import ImageWithLoader from '../components/ImageWithLoader';
import ErrorMessage from '../components/ErrorMessage';

// Mock order data
interface MockOrder {
  id: string;
  status: 'ordered' | 'shipped' | 'out_for_delivery' | 'delivered';
  orderDate: string;
  shippedDate?: string;
  deliveryDate?: string;
  estimatedDelivery: string;
  items: (Product & { quantity: number })[];
  total: number;
}

const MOCK_ORDERS: { [key: string]: MockOrder } = {
  'AURA-12345': {
    id: 'AURA-12345',
    status: 'shipped',
    orderDate: 'October 26, 2023',
    shippedDate: 'October 27, 2023',
    estimatedDelivery: 'October 31, 2023',
    items: [
      { ...PRODUCTS[0], quantity: 1 }, // iPhone 15 Pro
      { ...PRODUCTS[18], quantity: 1 }, // Logitech Mouse
    ],
    total: PRODUCTS[0].price + PRODUCTS[18].price,
  },
  'AURA-67890': {
    id: 'AURA-67890',
    status: 'delivered',
    orderDate: 'October 20, 2023',
    shippedDate: 'October 21, 2023',
    deliveryDate: 'October 24, 2023',
    estimatedDelivery: 'October 24, 2023',
    items: [{ ...PRODUCTS[4], quantity: 1 }], // MacBook Air M2
    total: PRODUCTS[4].price,
  }
};

const OrderTracking: React.FC = () => {
  const { orderId: urlOrderId } = useParams<{ orderId?: string }>();
  const navigate = useNavigate();
  const [orderIdInput, setOrderIdInput] = useState(urlOrderId || '');
  const [order, setOrder] = useState<MockOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = (idToTrack: string) => {
    setIsLoading(true);
    setError(null);
    setOrder(null);
    
    setTimeout(() => {
      const upperId = idToTrack.toUpperCase();
      if (upperId === 'AURA-FAIL') {
        setError("We couldn't connect to our servers. Please check your connection and try again.");
      } else {
        const foundOrder = MOCK_ORDERS[upperId];
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError(`We couldn't find an order with the ID "${idToTrack}". Please double-check the ID for any typos.`);
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (urlOrderId) {
      handleTrackOrder(urlOrderId);
    }
  }, [urlOrderId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      navigate(`/track-order/${orderIdInput.trim()}`);
    }
  };

  const isNetworkError = error?.includes('connect');
  const formatPrice = (price: number) => price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });


  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12 animation-fade-in-up">Track Your Order</h1>
      
      <GlassContainer className="p-8 mb-12 animation-fade-in-up">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="w-full sm:flex-grow">
            <TextInput
              id="orderId"
              label="Enter Order ID (e.g., AURA-12345 or AURA-FAIL)"
              type="text"
              placeholder=" "
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto px-8 py-3.5" disabled={isLoading}>
            {isLoading ? 'Tracking...' : 'Track Order'}
          </Button>
        </form>
      </GlassContainer>

      {isLoading && (
        <div className="text-center p-8 text-[var(--text-secondary)]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--focus-ring-color)] mx-auto"></div>
            <p className="mt-4">Searching for your order...</p>
        </div>
      )}

      {error && !isLoading && (
        <ErrorMessage
          title="Tracking Error"
          message={error}
          onRetry={isNetworkError ? () => handleTrackOrder(orderIdInput) : undefined}
        />
      )}

      {order && !isLoading && (
        <GlassContainer className="p-8 animation-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Order Details</h2>
                <div className="space-y-4">
                    {order.items.map(item => (
                        <div key={item.id} className="flex items-start gap-4 p-4 bg-[var(--bg-primary)] dark:bg-[var(--glass-bg)] rounded-xl border border-[var(--glass-border)]">
                             <ImageWithLoader src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg flex-shrink-0" imgClassName="object-cover rounded-lg" />
                             <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-[var(--text-secondary)]">Qty: {item.quantity}</p>
                             </div>
                             <p className="ml-auto font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-6">Status</h2>
                <OrderStatusTracker 
                    status={order.status}
                    orderDate={order.orderDate}
                    shippedDate={order.shippedDate}
                    deliveryDate={order.deliveryDate}
                    estimatedDelivery={order.estimatedDelivery}
                />
            </div>
          </div>
        </GlassContainer>
      )}
    </div>
  );
};

export default OrderTracking;