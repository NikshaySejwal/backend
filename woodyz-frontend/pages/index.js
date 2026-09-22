import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import Bestsellers from '../components/Bestsellers';
import TrustSection from '../components/TrustSection';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <Bestsellers />
      <TrustSection />
      <Newsletter />
    </>
  );
}
