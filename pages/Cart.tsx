import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useToast } from '../hooks/useToast';
import GlassContainer from '../components/GlassContainer';
import Button from '../components/Button';
import { CartItem, Product } from '../types';
import ImageWithLoader from '../components/ImageWithLoader';
import ConfirmationModal from '../components/ConfirmationModal';

// Sub-component for a saved item row
const SavedItemRow: React.FC<{
  item: Product;
  onMoveToCart: () => void;
  onRemove: () => void;
}> = ({ item, onMoveToCart, onRemove }) => {
  const finalPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
  const formatPrice = (price: number) => price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="flex items-start justify-between gap-4 p-4 bg-[var(--bg-primary)] dark:bg-[var(--glass-bg)] rounded-xl border border-[var(--glass-border)]">
      <div className="flex items-start gap-4 flex-grow">
        <Link to={`/product/${item.id}`} className="flex-shrink-0">
            <ImageWithLoader src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg" imgClassName="object-cover rounded-lg" />
        </Link>
        <div>
          <Link to={`/product/${item.id}`} className="hover:underline">
            <h3 className="font-semibold">{item.name}</h3>
          </Link>
          <p className="text-sm text-[var(--text-secondary)]">{item.brand}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="font-semibold">{formatPrice(finalPrice)}</p>
            {item.discount && <p className="text-xs text-[var(--text-secondary)] line-through">{formatPrice(item.price)}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <Button onClick={onMoveToCart} className="py-2 px-5 text-sm w-full">Move to Cart</Button>
        <button
          onClick={onRemove}
          className="text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/10 px-3 py-1 rounded-full transition-colors duration-200"
          aria-label={`Remove ${item.name} from saved items`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

// Sub-component for a cart item row
const CartItemRow: React.FC<{
    item: CartItem;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    onSaveForLater: () => void;
}> = ({ item, updateQuantity, removeFromCart, onSaveForLater }) => {
  const finalPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
  const [quantityInput, setQuantityInput] = useState(item.quantity.toString());
  
  const formatPrice = (price: number) => price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

  useEffect(() => {
    setQuantityInput(item.quantity.toString());
  }, [item.quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
        setQuantityInput(value);
    }
  };

  const handleQuantityBlur = () => {
    const newQuantity = parseInt(quantityInput, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
    } else {
      setQuantityInput(item.quantity.toString());
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="flex items-start justify-between gap-4 p-4 bg-[var(--bg-primary)] dark:bg-[var(--glass-bg)] rounded-xl border border-[var(--glass-border)]">
      <div className="flex items-start gap-4">
        <Link to={`/product/${item.id}`} className="flex-shrink-0">
            <ImageWithLoader src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg" imgClassName="object-cover rounded-lg" />
        </Link>
        <div>
           <Link to={`/product/${item.id}`} className="hover:underline">
            <h3 className="font-semibold">{item.name}</h3>
          </Link>
          <p className="text-sm text-[var(--text-secondary)]">{item.brand}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="font-semibold">{formatPrice(finalPrice * item.quantity)}</p>
            {item.discount && <p className="text-xs text-[var(--text-secondary)] line-through">{formatPrice(item.price * item.quantity)}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center rounded-full bg-black/5 dark:bg-black/20 overflow-hidden border border-[var(--glass-border)] group focus-within:border-[var(--focus-ring-color)] focus-within:shadow-[0_0_15px_var(--glass-border)] transition-all duration-300 h-10">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
            className="px-4 h-full text-lg text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)] transition-colors duration-200" 
            aria-label={`Decrease quantity of ${item.name}`}
          >
            &minus;
          </button>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={quantityInput}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            onKeyDown={handleKeyDown}
            className="w-12 h-full text-center bg-transparent focus:outline-none border-x border-[var(--glass-border)]"
            aria-label={`Quantity for ${item.name}`}
          />
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
            className="px-4 h-full text-lg text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)] transition-colors duration-200" 
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-2 mt-1">
            <button
                onClick={onSaveForLater}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 px-3 py-1 rounded-full transition-colors duration-200"
                aria-label={`Save ${item.name} for later`}
            >
                Save for Later
            </button>
            <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/10 px-3 py-1 rounded-full transition-colors duration-200"
                aria-label={`Remove ${item.name} from cart`}
            >
                Remove
            </button>
        </div>
      </div>
    </div>
  )
}

const Cart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => {
    const discountAmount = item.discount ? (item.price * (item.discount / 100)) * item.quantity : 0;
    return acc + discountAmount;
  }, 0);

  const handleConfirmClearCart = () => {
    clearCart();
    setIsConfirmModalOpen(false);
  };
  
  const handleSaveForLater = (item: CartItem) => {
    addToWishlist(item);
    removeFromCart(item.id);
    showToast(`'${item.name}' saved for later.`);
  };

  const handleMoveToCart = (item: Product) => {
    addToCart(item);
    removeFromWishlist(item.id);
    showToast(`'${item.name}' moved to cart.`);
  };

  const formatPrice = (price: number) => price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold animation-fade-in-up">Your Cart</h1>
            {cartCount > 0 && (
                <button
                    onClick={() => setIsConfirmModalOpen(true)}
                    className="text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-full transition-colors duration-200 animation-fade-in-up"
                    aria-label="Clear all items from cart"
                >
                    Clear All
                </button>
            )}
        </div>
        
        {cartCount === 0 && wishlistItems.length === 0 ? (
          <GlassContainer className="p-8 animation-fade-in-up text-center py-12">
            <p className="text-xl text-[var(--text-secondary)] mb-6">Your cart is empty.</p>
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </GlassContainer>
        ) : (
          <>
            {cartCount > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <GlassContainer className="p-6 animation-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <div className="space-y-4">
                      {cartItems.map(item => (
                        <CartItemRow key={item.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} onSaveForLater={() => handleSaveForLater(item)} />
                      ))}
                    </div>
                  </GlassContainer>
                </div>
                {/* Price Details */}
                <div className="lg:col-span-1 sticky top-40 animation-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <GlassContainer className="p-6">
                    <h2 className="text-xl font-bold mb-4">Price Details</h2>
                    <div className="space-y-2 text-[var(--text-primary)]">
                      <div className="flex justify-between">
                        <span>Price ({cartCount} items)</span>
                        <span>{formatPrice(cartSubtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="text-green-400">-{formatPrice(totalDiscount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span>FREE</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[var(--glass-border)]">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Amount</span>
                        <span>{formatPrice(cartSubtotal - totalDiscount)}</span>
                      </div>
                    </div>
                    <Link to="/checkout" className="block mt-6">
                      <Button className="w-full py-4 text-lg">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </GlassContainer>
                </div>
              </div>
            ) : (
               wishlistItems.length > 0 && (
                 <GlassContainer className="p-8 animation-fade-in-up text-center py-12">
                    <p className="text-xl text-[var(--text-secondary)] mb-6">Your cart is empty.</p>
                    <Link to="/shop">
                        <Button>Continue Shopping</Button>
                    </Link>
                 </GlassContainer>
              )
            )}
            
            {/* Saved for Later Section */}
            {wishlistItems.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-3xl font-bold mb-8 animation-fade-in-up">Saved for Later ({wishlistItems.length})</h2>
                    <GlassContainer className="p-6 animation-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <div className="space-y-4">
                            {wishlistItems.map(item => (
                                <SavedItemRow
                                    key={item.id}
                                    item={item}
                                    onMoveToCart={() => handleMoveToCart(item)}
                                    onRemove={() => removeFromWishlist(item.id)}
                                />
                            ))}
                        </div>
                    </GlassContainer>
                </div>
            )}
          </>
        )}
      </div>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmClearCart}
        title="Clear Cart"
        message="Are you sure you want to remove all items from your cart?"
      />
    </>
  );
};

export default Cart;