import { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingScreen from '../../components/ui/LoadingScreen';
import api from '../../lib/api';
import { useAuthGuard } from '../../hooks/useAuthGuard';

export default function AdminUsers() {
  const { isReady: authReady } = useAuthGuard({ requiredRole: 'ADMIN', redirectTo: '/' });
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [fetching, setFetching] = useState(false);

  const fetchUser = async (e) => {
    e.preventDefault();
    setFetching(true);
    try {
      const response = await api.get(`/api/users/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user', error);
      alert('User not found or access denied');
      setUserData(null);
    } finally {
      setFetching(false);
    }
  };

  const handleBlacklist = async () => {
    if (confirm(`Are you sure you want to blacklist ${username}?`)) {
      try {
        await api.delete(`/api/users/${username}`);
        alert('User blacklisted successfully');
        setUserData({ ...userData, blacklisted: true });
      } catch (error) {
        alert('Failed to blacklist user');
      }
    }
  };

  const handleBlacklistToggle = async () => {
    try {
      await api.put(`/api/users/${username}/blacklist`, { blacklisted: !userData.blacklisted });
      setUserData({ ...userData, blacklisted: !userData.blacklisted });
    } catch (error) {
      alert('Failed to update blacklist status');
    }
  };

  if (!authReady) return <LoadingScreen message="Securing Dashboard..." />;

  return (
    <>
      <Head>
        <title>Users | WOODYZ Admin</title>
      </Head>

      <AdminLayout activeTab="users">
        <main>
          <header className="mb-12">
            <h1 className="font-display text-5xl font-black text-3d mb-2">User Management</h1>
            <p className="text-lg font-bold text-charcoal/40">Look up and manage explorers.</p>
          </header>

          <div className="bg-white border-4 border-charcoal rounded-[32px] p-8 shadow-[8px_8px_0px_0px_#3A322B] mb-8">
            <form onSubmit={fetchUser} className="flex gap-4">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username to look up..."
                className="flex-1 px-6 py-4 rounded-2xl border-3 border-charcoal bg-cream font-bold"
                required
              />
              <button type="submit" className="btn-pop bg-cedar text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border-4 border-charcoal">
                {fetching ? 'Searching...' : 'Search User'}
              </button>
            </form>
          </div>

          {userData && (
            <div className="bg-white border-4 border-charcoal rounded-[32px] p-8 shadow-[8px_8px_0px_0px_#3A322B]">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-charcoal/40 mb-1">User Details</p>
                  <h2 className="font-display text-3xl font-black">{userData.username}</h2>
                </div>
                <button
                  onClick={userData.blacklisted ? handleBlacklistToggle : handleBlacklist}
                  className={`btn-pop ${userData.blacklisted ? 'bg-sage' : 'bg-red-500'} text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest border-4 border-charcoal`}
                >
                  {userData.blacklisted ? 'Remove Blacklist' : 'Blacklist User'}
                </button>
              </div>
              <div className="grid gap-6">
                <div className="flex justify-between items-center py-4 border-b-2 border-charcoal/10">
                  <span className="font-black uppercase tracking-widest text-xs text-charcoal/60">Email</span>
                  <span className="font-bold text-charcoal">{userData.email}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b-2 border-charcoal/10">
                  <span className="font-black uppercase tracking-widest text-xs text-charcoal/60">Role</span>
                  <span className="font-bold text-charcoal">{userData.role}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b-2 border-charcoal/10">
                  <span className="font-black uppercase tracking-widest text-xs text-charcoal/60">Phone</span>
                  <span className="font-bold text-charcoal">{userData.phone || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b-2 border-charcoal/10">
                  <span className="font-black uppercase tracking-widest text-xs text-charcoal/60">Address</span>
                  <span className="font-bold text-charcoal">{userData.address || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="font-black uppercase tracking-widest text-xs text-charcoal/60">Account status</span>
                  <span className="font-bold text-charcoal">{userData.blacklisted ? 'Blacklisted' : 'Active'}</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </AdminLayout>
    </>
  );
}
