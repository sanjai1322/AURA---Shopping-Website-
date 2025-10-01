
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GlassContainer from '../components/GlassContainer';
import Button from '../components/Button';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

interface ConfettiPiece {
  id: number;
  style: React.CSSProperties;
}

const OrderSuccess: React.FC = () => {
    const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        const generateConfetti = () => {
            const newConfetti: ConfettiPiece[] = Array.from({ length: 50 }).map((_, i) => ({
                id: i,
                style: {
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 3 + 4}s`, // 4s to 7s
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
                },
            }));
            setConfetti(newConfetti);
        };
        generateConfetti();
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
                {confetti.map(c => (
                    <div
                        key={c.id}
                        className="absolute top-0 w-2 h-2 bg-[var(--text-primary)] rounded-full animate-confetti-fall"
                        style={c.style}
                    ></div>
                ))}
            </div>
            
            <div className="max-w-md w-full mx-auto px-4 text-center z-10">
                <GlassContainer className="p-8 md:p-12 animation-zoom-in">
                    <div className="flex flex-col items-center">
                        <CheckCircleIcon className="w-20 h-20 text-green-500/90 animate-pulse-glow mb-6" />
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Thank You for Your Order!
                        </h1>
                        <p className="text-[var(--text-secondary)] mb-8">
                            Your order has been placed successfully. A confirmation email has been sent to you.
                        </p>
                        <Link to="/shop">
                            <Button className="px-8 py-3 text-lg">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </GlassContainer>
            </div>
        </div>
    );
};

export default OrderSuccess;
