import React from 'react';
import GlassContainer from '../components/GlassContainer';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly. (This is a demo)');
    // Here you would typically handle form submission
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12 animation-fade-in-up">Get In Touch</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <GlassContainer className="p-8 animation-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput id="contact-name" label="Full Name" type="text" placeholder=" " required />
            <TextInput id="contact-email" label="Email Address" type="email" placeholder=" " required />
            <div className="relative group">
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl backdrop-blur-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] transition-all duration-300 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="message"
                className="absolute left-4 -top-2.5 text-[var(--text-secondary)] text-sm bg-[var(--bg-primary)] px-1 transition-all duration-300
                           peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--text-secondary)]
                           peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[var(--text-primary)]"
              >
                Your Message
              </label>
               <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-focus-within:border-[var(--focus-ring-color)] group-focus-within:shadow-[0_0_15px_var(--glass-border)] transition-all duration-300 pointer-events-none"></div>
            </div>
            <Button type="submit" className="w-full py-3">
              Send Message
            </Button>
          </form>
        </GlassContainer>

        <div className="space-y-8 animation-fade-in-up" style={{ animationDelay: '200ms' }}>
            <GlassContainer className="p-8">
                 <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                 <div className="space-y-2 text-[var(--text-secondary)]">
                     <p>Email: contact@aura.design</p>
                     <p>Phone: (555) 123-4567</p>
                     <p>Address: 123 Glass St, Future City, 98765</p>
                 </div>
            </GlassContainer>
            <GlassContainer className="p-2 h-80">
              {/* Map Placeholder */}
              <div className="w-full h-full bg-[var(--surface-color)] rounded-xl flex items-center justify-center text-[var(--text-secondary)]">
                <p>Embedded Map Placeholder</p>
              </div>
            </GlassContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;