import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';
import TruckIcon from './icons/TruckIcon';

interface StepProps {
  title: string;
  date?: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isLast?: boolean;
  icon: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ title, date, isCompleted, isCurrent, isLast = false, icon }) => {
  const statusColor = isCompleted || isCurrent ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]';
  const iconBgColor = isCompleted ? 'bg-green-500/30 text-green-300' : isCurrent ? 'bg-blue-500/30 text-blue-300 animate-pulse' : 'bg-[var(--glass-bg)] text-[var(--text-secondary)]';
  
  return (
    <div className="relative flex items-start">
      {!isLast && (
        <div className={`absolute top-10 left-6 h-[calc(100%-2.5rem)] w-0.5 ${isCompleted ? 'bg-green-400' : 'bg-[var(--glass-border)]'}`}></div>
      )}
      <div className="flex flex-col items-center mr-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border border-[var(--glass-border)] ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      <div className={`pt-2 ${statusColor}`}>
        <p className="font-bold">{title}</p>
        {date && <p className="text-sm">{date}</p>}
      </div>
    </div>
  );
};


interface OrderStatusTrackerProps {
  status: 'ordered' | 'shipped' | 'out_for_delivery' | 'delivered';
  orderDate: string;
  shippedDate?: string;
  deliveryDate?: string;
  estimatedDelivery: string;
}

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ status, orderDate, shippedDate, deliveryDate, estimatedDelivery }) => {
  const statuses = ['ordered', 'shipped', 'out_for_delivery', 'delivered'];
  const currentStatusIndex = statuses.indexOf(status);

  const steps = [
    { id: 'ordered', title: 'Order Confirmed', date: orderDate, icon: <CheckCircleIcon className="w-6 h-6" /> },
    { id: 'shipped', title: 'Shipped', date: shippedDate, icon: <TruckIcon className="w-6 h-6" /> },
    { id: 'out_for_delivery', title: 'Out for Delivery', date: undefined, icon: <TruckIcon className="w-6 h-6" /> },
    { id: 'delivered', title: `Delivered`, date: deliveryDate || `Est. ${estimatedDelivery}`, icon: <CheckCircleIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <Step
          key={step.id}
          title={step.title}
          date={step.date}
          isCompleted={index < currentStatusIndex}
          isCurrent={index === currentStatusIndex}
          isLast={index === steps.length - 1}
          icon={step.icon}
        />
      ))}
    </div>
  );
};

export default OrderStatusTracker;