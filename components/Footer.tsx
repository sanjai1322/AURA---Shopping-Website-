import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import TwitterIcon from './icons/TwitterIcon';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto z-10 bg-[var(--surface-color)] backdrop-blur-xl border-t border-[var(--glass-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="space-y-4">
            <h3 className="font-bold text-[var(--text-primary)] tracking-wider">ABOUT</h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li><Link to="/contact" className="hover:text-[var(--text-primary)]">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-[var(--text-primary)]">About Us</Link></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Careers</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-[var(--text-primary)] tracking-wider">HELP</h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--text-primary)]">Payments</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Shipping</a></li>
              <li><Link to="/track-order" className="hover:text-[var(--text-primary)]">Order Tracking</Link></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">FAQ</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-[var(--text-primary)] tracking-wider">POLICY</h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--text-primary)]">Return Policy</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Terms Of Use</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Privacy</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-[var(--text-primary)] tracking-wider">SOCIAL</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><FacebookIcon className="w-6 h-6" /></a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><TwitterIcon className="w-6 h-6" /></a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><InstagramIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-[var(--glass-border)] text-center text-sm text-[var(--text-secondary)]/70">
          &copy; {new Date().getFullYear()} AURA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;