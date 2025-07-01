
import React from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import FeaturesSection from '../components/FeaturesSection';
import UseCaseSection from '../components/UseCaseSection';
import CTASection from '../components/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchSection />
      <FeaturesSection />
      <UseCaseSection />
      <CTASection />
    </div>
  );
};

export default Index;
