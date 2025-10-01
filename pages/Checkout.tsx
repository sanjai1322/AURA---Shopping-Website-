import React, { useState } from 'react';
import GlassContainer from '../components/GlassContainer';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { useCart } from '../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd process payment here
        console.log(`Order placed successfully with ${paymentMethod}!`);
        clearCart();
        navigate('/order-success');
    };
    
    if (cartItems.length === 0) {
        return (
             <div className="max-w-2xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-8">Checkout</h1>
                 <GlassContainer className="p-8">
                     <p className="text-xl text-[var(--text-secondary)] mb-6">Your cart is empty. Nothing to checkout.</p>
                    <Link to="/shop">
                        <Button>Go to Shop</Button>
                    </Link>
                 </GlassContainer>
            </div>
        )
    }

    const formatPrice = (price: number) => price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const PaymentOption: React.FC<{ value: string; label: string; current: string; onChange: (val: string) => void; }> = ({ value, label, current, onChange }) => (
        <label className="flex items-center p-4 bg-[var(--glass-bg)] rounded-2xl border border-[var(--glass-border)] cursor-pointer transition-all duration-300 has-[:checked]:border-[var(--focus-ring-color)] has-[:checked]:bg-[var(--glass-bg)] hover:border-[var(--text-secondary)] group">
            <input 
                type="radio" 
                name="payment" 
                value={value} 
                checked={current === value} 
                onChange={e => onChange(e.target.value)} 
                className="custom-radio"
            />
            <span className="ml-4 font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">{label}</span>
        </label>
    );

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-12 animation-fade-in-up">Checkout</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        {/* Shipping Info */}
                        <GlassContainer className="p-8 animation-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                            <div className="space-y-6">
                                <TextInput id="name" label="Full Name" type="text" placeholder=" " required />
                                <TextInput id="email" label="Email Address" type="email" placeholder=" " required />
                                <TextInput id="address" label="Street Address" type="text" placeholder=" " required />
                                <div className="flex gap-4">
                                    <TextInput id="city" label="City" type="text" placeholder=" " required />
                                    <TextInput id="zip" label="ZIP Code" type="text" placeholder=" " required />
                                </div>
                            </div>
                        </GlassContainer>

                        {/* Payment Options */}
                        <GlassContainer className="p-8 animation-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-2xl font-bold mb-6">Payment Options</h2>
                            <div className="space-y-4">
                               <PaymentOption value="card" label="Credit / Debit Card" current={paymentMethod} onChange={setPaymentMethod} />
                               <PaymentOption value="upi" label="UPI" current={paymentMethod} onChange={setPaymentMethod} />
                               <PaymentOption value="cod" label="Cash on Delivery" current={paymentMethod} onChange={setPaymentMethod} />
                            </div>
                        </GlassContainer>
                    </div>

                    {/* Order Summary */}
                    <GlassContainer className="p-8 h-fit sticky top-40 animation-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-[var(--text-primary)]">
                                    <span className="flex-1 truncate pr-4">{item.name} x {item.quantity}</span>
                                    <span>{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-[var(--glass-border)]">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                        </div>
                        <Button type="submit" className="w-full py-4 mt-6 text-lg">
                            Place Order ({formatPrice(cartTotal)})
                        </Button>
                    </GlassContainer>
                </div>
            </form>
        </div>
    );
};

export default Checkout;