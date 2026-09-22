import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AdminAnalytics() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'ADMIN') {
        router.push('/');
      } else {
        fetchStats();
      }
    }
  }, [user, loading]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/analytics/summary', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats', error);
    } finally {
      setFetching(false);
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-pulse flex flex-col items-center">
          <iconify-icon icon="ph:chart-line-up-bold" class="text-6xl text-cedar mb-4"></iconify-icon>
          <p className="font-display text-2xl font-black text-charcoal/40">Gathering Insights...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Analytics | Woodyz Admin</title>
      </Head>

      <div className="min-h-screen bg-cream flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 bg-white border-r-4 border-charcoal p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-cedar border-2 border-charcoal rounded-xl flex items-center justify-center shadow-[3px_3px_0px_0px_#3A322B]">
              <iconify-icon icon="ph:gear-six-bold" class="text-white text-xl"></iconify-icon>
            </div>
            <span className="font-display text-2xl font-black tracking-tighter">Woodyz Admin</span>
          </div>

          <nav className="flex-grow space-y-2">
            <Link href="/admin" className="flex items-center gap-4 p-4 hover:bg-cream border-2 border-transparent hover:border-charcoal rounded-2xl font-black text-xs uppercase tracking-widest no-underline text-charcoal/60 hover:text-charcoal transition-all">
              <iconify-icon icon="ph:cube-bold" class="text-xl"></iconify-icon>
              Inventory
            </Link>
            <Link href="/admin/analytics" className="flex items-center gap-4 p-4 bg-cedar text-white border-2 border-charcoal rounded-2xl font-black text-xs uppercase tracking-widest no-underline shadow-[4px_4px_0px_0px_#3A322B]">
              <iconify-icon icon="ph:chart-line-up-bold" class="text-xl"></iconify-icon>
              Analytics
            </Link>
            <Link href="/admin/support" className="flex items-center gap-4 p-4 hover:bg-cream border-2 border-transparent hover:border-charcoal rounded-2xl font-black text-xs uppercase tracking-widest no-underline text-charcoal/60 hover:text-charcoal transition-all">
              <iconify-icon icon="ph:chat-circle-dots-bold" class="text-xl"></iconify-icon>
              Support
            </Link>
          </nav>

          <div className="mt-auto pt-8 border-t-2 border-charcoal/5">
            <Link href="/" className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-charcoal/40 hover:text-cedar no-underline">
              <iconify-icon icon="ph:arrow-left-bold"></iconify-icon>
              Back to Store
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
          <header className="mb-12">
            <h1 className="font-display text-5xl font-black text-3d mb-2">Platform Performance</h1>
            <p className="text-lg font-bold text-charcoal/40">Real-time snapshots of your enchanted marketplace.</p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white border-4 border-charcoal rounded-[32px] p-8 shadow-[8px_8px_0px_0px_#3A322B]">
              <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center mb-6">
                <iconify-icon icon="ph:currency-dollar-bold" class="text-2xl text-sage"></iconify-icon>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-charcoal/40 mb-1">Total Revenue</p>
              <p className="text-4xl font-black text-charcoal">${stats?.totalRevenue?.toFixed(2)}</p>
            </div>

            <div className="bg-white border-4 border-charcoal rounded-[32px] p-8 shadow-[8px_8px_0px_0px_#3A322B]">
              <div className="w-12 h-12 bg-orange/10 rounded-2xl flex items-center justify-center mb-6">
                <iconify-icon icon="ph:package-bold" class="text-2xl text-orange"></iconify-icon>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-charcoal/40 mb-1">Total Orders</p>
              <p className="text-4xl font-black text-charcoal">{stats?.totalOrders}</p>
            </div>

            <div className="bg-white border-4 border-charcoal rounded-[32px] p-8 shadow-[8px_8px_0px_0px_#3A322B]">
              <div className="w-12 h-12 bg-cedar/10 rounded-2xl flex items-center justify-center mb-6">
                <iconify-icon icon="ph:cube-bold" class="text-2xl text-cedar"></iconify-icon>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-charcoal/40 mb-1">Product Count</p>
              <p className="text-4xl font-black text-charcoal">{stats?.totalProducts}</p>
            </div>

            <div className="bg-white border-4 border-charcoal rounded-[32px] p-8 shadow-[8px_8px_0px_0px_#3A322B]">
              <div className="w-12 h-12 bg-maple/10 rounded-2xl flex items-center justify-center mb-6">
                <iconify-icon icon="ph:star-fill" class="text-2xl text-maple"></iconify-icon>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-charcoal/40 mb-1">Total Reviews</p>
              <p className="text-4xl font-black text-charcoal">{stats?.totalReviews}</p>
            </div>
          </div>

          {/* Detailed Charts (Simplified for now with stylized bars) */}
          <div className="grid lg:grid-cols-2 gap-12">
             <div className="bg-white border-4 border-charcoal rounded-[40px] p-10 shadow-[10px_10px_0px_0px_#3A322B]">
               <h3 className="font-display text-2xl font-black mb-8 flex items-center gap-3">
                 <iconify-icon icon="ph:trend-up-bold" class="text-sage"></iconify-icon>
                 Sales Velocity
               </h3>
               <div className="h-64 flex items-end gap-4">
                  {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                    <div key={i} className="flex-grow bg-sage/20 border-2 border-sage/40 rounded-t-xl transition-all hover:bg-sage/40" style={{ height: `${h}%` }}></div>
                  ))}
               </div>
               <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-charcoal/30">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
               </div>
             </div>

             <div className="bg-white border-4 border-charcoal rounded-[40px] p-10 shadow-[10px_10px_0px_0px_#3A322B]">
               <h3 className="font-display text-2xl font-black mb-8 flex items-center gap-3">
                 <iconify-icon icon="ph:users-three-bold" class="text-orange"></iconify-icon>
                 Recent Explorer Activity
               </h3>
               <div className="space-y-6">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center justify-between py-3 border-b-2 border-charcoal/5 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cream rounded-full border-2 border-charcoal/10"></div>
                        <span className="text-sm font-bold text-charcoal/80">New Order #102{i}</span>
                      </div>
                      <span className="text-[10px] font-black text-charcoal/30 uppercase">2 hours ago</span>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </main>
      </div>
    </>
  );
}
