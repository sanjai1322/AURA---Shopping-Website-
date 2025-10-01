import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlassContainer from '../components/GlassContainer';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { useToast } from '../hooks/useToast';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showToast('Passwords do not match.');
            return;
        }
        // Simulate signup
        console.log('Signing up with:', { name, email, password });
        showToast('Account created successfully!');
        // Redirect to login page after a short delay
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-350px)]">
            <GlassContainer className="w-full max-w-md p-8 animation-zoom-in">
                <h1 className="text-3xl font-bold text-center mb-8">Create an Account</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextInput
                        id="signup-name"
                        label="Full Name"
                        type="text"
                        placeholder=" "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextInput
                        id="signup-email"
                        label="Email Address"
                        type="email"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextInput
                        id="signup-password"
                        label="Password"
                        type="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                     <TextInput
                        id="signup-confirm-password"
                        label="Confirm Password"
                        type="password"
                        placeholder=" "
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full py-3 text-lg">
                        Sign Up
                    </Button>
                </form>
                <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-[var(--text-primary)] hover:underline">
                        Login
                    </Link>
                </p>
            </GlassContainer>
        </div>
    );
};

export default Signup;
