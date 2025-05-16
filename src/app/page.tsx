import Layout from '@/components/Layout';
import HeroSection from '@/components/sections/HeroSection';
import WhySection from '@/components/sections/WhySection';
import GameplaySection from '@/components/sections/GameplaySection';
import EconomySection from '@/components/sections/EconomySection'; // Import the Scrolls of Girthonomics
import CommunitySection from '@/components/sections/CommunitySection'; // Import the GigaChode Ethos
import Footer from '@/components/sections/Footer'; // Import the Footer of Girth
import FloatingMusicButton from '@/components/FloatingMusicButton'; // Import the Chode Transducer
// import styles from "./page.module.css"; // We'll use SCSS modules per component later

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <WhySection />
      <GameplaySection />
      <EconomySection /> {/* The Scrolls are unrolled! */}
      <CommunitySection /> {/* The Ethos is preached! */}
      <Footer /> {/* The Monolith is CROWNED (or rather, FOOTED) */}
      <FloatingMusicButton /> {/* Let the Girth Anthem play! */}
      {/* GigaChode Ethos & Community section next... */}
      {/* 
      <h1>Welcome to CHODE Tapper: Girth to Earn!</h1>
      <p>The GigaChode Proclamation will soon appear here...</p>
      */}
    </Layout>
  );
}
