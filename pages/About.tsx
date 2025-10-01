import React from 'react';
import GlassContainer from '../components/GlassContainer';
import Card from '../components/Card';
import { TEAM_MEMBERS } from '../constants';
import ImageWithLoader from '../components/ImageWithLoader';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 space-y-20">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-8">About AURA</h1>
        <GlassContainer className="p-8 md:p-12">
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            AURA was born from a simple yet profound idea: technology should not only be functional but also beautiful and calming. In a world saturated with digital noise, we seek to create objects that bring a sense of peace and wonder into your space. Our design philosophy marries futuristic liquid glassmorphism with minimalist principles, resulting in products that are both visually stunning and intuitively useful. Each piece in our collection is meticulously crafted to be an experience, a conversation starter, and a quiet companion in your daily life.
          </p>
        </GlassContainer>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map(member => (
            <Card key={member.id}>
              <div className="p-6 text-center">
                <ImageWithLoader
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-[var(--glass-border)]"
                  imgClassName="object-cover rounded-full"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-[var(--text-secondary)]">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;