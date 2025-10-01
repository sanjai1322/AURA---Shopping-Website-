import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlassContainer from '../components/GlassContainer';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { useToast } from '../hooks/useToast';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        console.log('Logging in with:', { email, password });
        showToast('Login successful! Welcome back.');
        // Redirect to homepage after a short delay
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-350px)]">
            <GlassContainer className="w-full max-w-md p-8 animation-zoom-in">
                <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextInput
                        id="login-email"
                        label="Email Address"
                        type="email"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextInput
                        id="login-password"
                        label="Password"
                        type="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="text-right">
                        <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                            Forgot Password?
                        </a>
                    </div>
                    <Button type="submit" className="w-full py-3 text-lg">
                        Login
                    </Button>
                </form>
                <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-[var(--text-primary)] hover:underline">
                        Sign Up
                    </Link>
                </p>
            </GlassContainer>
        </div>
    );
};

export default Login;
