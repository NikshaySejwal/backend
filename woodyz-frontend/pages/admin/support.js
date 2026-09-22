import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AdminSupport() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'ADMIN') {
        router.push('/');
      } else {
        fetchTickets();
      }
    }
  }, [user, loading]);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/support', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(response.data);
    } catch (error) {
      console.error('Failed to fetch tickets', error);
    } finally {
      setFetching(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/support/${id}/status`, newStatus, {
        headers: { 
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${token}`
        }
      });
      setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const filteredTickets = tickets.filter(t => filter === 'All' || t.status === filter);

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-pulse flex flex-col items-center">
          <iconify-icon icon="ph:horse-bold" class="text-6xl text-cedar mb-4"></iconify-icon>
          <p className="font-display text-2xl font-black text-charcoal/40">Loading Help Desk...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Support Management | Woodyz Admin</title>
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
            <Link href="/admin/support" className="flex items-center gap-4 p-4 bg-cedar text-white border-2 border-charcoal rounded-2xl font-black text-xs uppercase tracking-widest no-underline shadow-[4px_4px_0px_0px_#3A322B]">
              <iconify-icon icon="ph:chat-circle-dots-bold" class="text-xl"></iconify-icon>
              Support
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-4 p-4 hover:bg-cream border-2 border-transparent hover:border-charcoal rounded-2xl font-black text-xs uppercase tracking-widest no-underline text-charcoal/60 hover:text-charcoal transition-all">
              <iconify-icon icon="ph:shopping-cart-bold" class="text-xl"></iconify-icon>
              Orders
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
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="font-display text-5xl font-black text-3d mb-2">Support Tickets</h1>
              <p className="text-lg font-bold text-charcoal/40">Help our explorers on their journey.</p>
            </div>
            <div className="flex bg-white border-4 border-charcoal rounded-2xl p-2 shadow-[4px_4px_0px_0px_#3A322B]">
              {['All', 'Open', 'Resolved'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${filter === s ? 'bg-cedar text-white' : 'text-charcoal/40 hover:text-charcoal'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </header>

          <div className="grid gap-8">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-20 bg-white border-4 border-dashed border-charcoal/20 rounded-[40px]">
                <iconify-icon icon="ph:confetti-bold" class="text-6xl text-charcoal/10 mb-4"></iconify-icon>
                <p className="font-display text-2xl font-black text-charcoal/20">All quiet on the help front!</p>
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div key={ticket.id} className="relative group">
                  <div className={`absolute -inset-1 bg-charcoal rounded-[36px] -rotate-1 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative bg-white border-4 border-charcoal rounded-[32px] p-8 shadow-[6px_6px_0px_0px_#3A322B]">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 ${ticket.status === 'Open' ? 'bg-orange/10 text-orange border-orange/20' : 'bg-sage/10 text-sage border-sage/20'}`}>
                            {ticket.status}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">
                            Ticket #{ticket.id} • {new Date(ticket.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl font-black mb-3">{ticket.subject}</h3>
                        <p className="text-charcoal/70 font-bold leading-relaxed mb-6 italic">"{ticket.message}"</p>
                        <div className="flex items-center gap-3 text-xs font-black">
                          <div className="w-8 h-8 bg-maple rounded-lg border-2 border-charcoal flex items-center justify-center text-white">
                            {ticket.username ? ticket.username.charAt(0).toUpperCase() : '?'}
                          </div>
                          <span>{ticket.username || 'Anonymous'}</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(ticket.id, 'Open')}
                            className={`p-3 rounded-xl border-2 border-charcoal transition-all ${ticket.status === 'Open' ? 'bg-orange text-white' : 'bg-white text-charcoal/40 hover:border-orange hover:text-orange'}`}
                            title="Mark as Open"
                          >
                            <iconify-icon icon="ph:hourglass-bold" class="text-xl"></iconify-icon>
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(ticket.id, 'Resolved')}
                            className={`p-3 rounded-xl border-2 border-charcoal transition-all ${ticket.status === 'Resolved' ? 'bg-sage text-white' : 'bg-white text-charcoal/40 hover:border-sage hover:text-sage'}`}
                            title="Mark as Resolved"
                          >
                            <iconify-icon icon="ph:check-bold" class="text-xl"></iconify-icon>
                          </button>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/20">Actions</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}
