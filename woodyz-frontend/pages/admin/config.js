import { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingScreen from '../../components/ui/LoadingScreen';
import api from '../../lib/api';
import { useAuthGuard } from '../../hooks/useAuthGuard';

export default function AdminConfig() {
  const { isReady: authReady } = useAuthGuard({ requiredRole: 'ADMIN', redirectTo: '/' });
  const [config, setConfig] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!authReady) return;
    fetchConfig();
  }, [authReady]);

  const fetchConfig = async () => {
    try {
      const response = await api.get('/api/config');
      setConfig(response.data);
    } catch (error) {
      console.error('Failed to fetch config', error);
    } finally {
      setFetching(false);
    }
  };

  if (fetching) return <LoadingScreen message="Loading Configuration..." />;

  return (
    <>
      <Head>
        <title>Configuration | WOODYZ Admin</title>
      </Head>

      <AdminLayout activeTab="config">
        <main>
          <header className="mb-12">
            <h1 className="font-display text-5xl font-black text-3d mb-2">System Configuration</h1>
            <p className="text-lg font-bold text-charcoal/40">Live developer configuration settings.</p>
          </header>

          <div className="bg-white border-4 border-charcoal rounded-[32px] p-8 shadow-[8px_8px_0px_0px_#3A322B]">
            {config ? (
              <div className="grid gap-6">
                {Object.entries(config).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-4 border-b-2 border-charcoal/10 last:border-0">
                    <span className="font-black uppercase tracking-widest text-xs text-charcoal/60">{key}</span>
                    <span className="font-bold text-charcoal bg-cream px-4 py-2 rounded-xl border-2 border-charcoal/20">{String(value)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Failed to load configuration.</p>
            )}
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
