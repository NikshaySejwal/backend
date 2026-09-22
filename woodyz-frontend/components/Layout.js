import Head from 'next/head';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import SupportBubble from './SupportBubble';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Grain texture overlay */}
      <div className="fixed inset-0 grain-bg z-[100] pointer-events-none"></div>

      <Head>
        <title>Woodyz | Playful Eco-Toys</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnnouncementBar />
      <Header />

      <main>{children}</main>

      <Footer />
      <SupportBubble />
    </div>
  );
};

export default Layout;
