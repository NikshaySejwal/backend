import '../styles/globals.css';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import SupportBubble from '../components/SupportBubble';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        <SupportBubble />
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
