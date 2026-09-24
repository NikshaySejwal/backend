import { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingScreen from '../../components/ui/LoadingScreen';
import api from '../../lib/api';
import { useAuthGuard } from '../../hooks/useAuthGuard';

export default function AdminCoupons() {
  const { isReady: authReady } = useAuthGuard({ requiredRole: 'ADMIN', redirectTo: '/' });
  const [coupons, setCoupons] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [newCoupon, setNewCoupon] = useState({ code: '', discountPercent: '', expiresAt: '' });

  useEffect(() => {
    if (!authReady) return;
    fetchCoupons();
  }, [authReady]);

  const fetchCoupons = async () => {
    try {
      const response = await api.get('/api/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Failed to fetch coupons', error);
    } finally {
      setFetching(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newCoupon,
        discountPercent: parseFloat(newCoupon.discountPercent),
        expiresAt: newCoupon.expiresAt ? new Date(newCoupon.expiresAt).toISOString() : null
      };
      const response = await api.post('/api/coupons', payload);
      setCoupons([...coupons, response.data]);
      setNewCoupon({ code: '', discountPercent: '', expiresAt: '' });
    } catch (error) {
      alert('Failed to create coupon');
    }
  };

  const toggleCoupon = async (coupon) => {
    try {
      const response = await api.put(`/api/coupons/${coupon.id}`, { ...coupon, active: !coupon.active });
      setCoupons(coupons.map(item => item.id === coupon.id ? response.data : item));
    } catch (error) {
      alert('Failed to update coupon');
    }
  };

  const deleteCoupon = async (coupon) => {
    if (!confirm(`Delete ${coupon.code}?`)) return;
    try {
      await api.delete(`/api/coupons/${coupon.id}`);
      setCoupons(coupons.filter(item => item.id !== coupon.id));
    } catch (error) {
      alert('Failed to delete coupon');
    }
  };

  if (fetching) return <LoadingScreen message="Loading Coupons..." />;

  return (
    <>
      <Head>
        <title>Coupons | WOODYZ Admin</title>
      </Head>

      <AdminLayout activeTab="coupons">
        <main>
          <header className="mb-12">
            <h1 className="font-display text-5xl font-black text-3d mb-2">Discount Coupons</h1>
            <p className="text-lg font-bold text-charcoal/40">Manage store discounts and promotions.</p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-4 border-charcoal rounded-[32px] p-8 shadow-[8px_8px_0px_0px_#3A322B] h-fit">
              <h2 className="font-display text-2xl font-black mb-6">Create New Coupon</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Coupon Code</label>
                  <input 
                    type="text" 
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                    placeholder="e.g. SUMMER20"
                    className="w-full px-4 py-3 rounded-xl border-2 border-charcoal bg-cream font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Discount %</label>
                  <input 
                    type="number" 
                    min="1" max="100"
                    value={newCoupon.discountPercent}
                    onChange={(e) => setNewCoupon({...newCoupon, discountPercent: e.target.value})}
                    placeholder="20"
                    className="w-full px-4 py-3 rounded-xl border-2 border-charcoal bg-cream font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Expires At</label>
                  <input 
                    type="datetime-local" 
                    value={newCoupon.expiresAt}
                    onChange={(e) => setNewCoupon({...newCoupon, expiresAt: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-charcoal bg-cream font-bold"
                    required
                  />
                </div>
                <button type="submit" className="w-full btn-pop bg-orange text-white py-3 rounded-xl font-black text-sm uppercase tracking-widest border-2 border-charcoal mt-4">
                  Create Coupon
                </button>
              </form>
            </div>

            <div className="bg-white border-4 border-charcoal rounded-[32px] overflow-hidden shadow-[8px_8px_0px_0px_#3A322B]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-charcoal text-white uppercase text-[10px] tracking-[0.2em] font-black">
                    <th className="px-6 py-4">Code</th>
                    <th className="px-6 py-4">Discount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-charcoal/10">
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className="hover:bg-cream/30">
                      <td className="px-6 py-4 font-black">{coupon.code}</td>
                      <td className="px-6 py-4 font-bold text-orange">{coupon.discountPercent}%</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase border-2 ${coupon.active ? 'bg-sage/10 text-sage border-sage/20' : 'bg-charcoal/10 text-charcoal/40 border-charcoal/20'}`}>
                          {coupon.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => toggleCoupon(coupon)} className="px-3 py-2 rounded-lg border-2 border-charcoal text-[10px] font-black uppercase" title="Toggle coupon status">
                            {coupon.active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button onClick={() => deleteCoupon(coupon)} className="px-3 py-2 rounded-lg border-2 border-red-500 text-red-500 text-[10px] font-black uppercase" title="Delete coupon">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {coupons.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-charcoal/40 font-bold">No coupons found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
