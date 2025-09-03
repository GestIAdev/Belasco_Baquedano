import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen -z-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/placeholder-vineyard.webp')" }}
    >
      {/* Optional: Add an overlay for better text readability on top */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default HeroSection;
