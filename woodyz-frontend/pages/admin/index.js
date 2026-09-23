import { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingScreen from '../../components/ui/LoadingScreen';
import api from '../../lib/api';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [stats, setStats] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', imageUrl: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, statsRes] = await Promise.all([
        api.get('/api/products'),
        api.get('/api/analytics/summary')
      ]);
      setProducts(productsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setFetching(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${id}`);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProduct,
        price: parseFloat(newProduct.price)
      };
      
      let response;
      if (newProduct.id) {
        response = await api.put(`/api/products/${newProduct.id}`, payload);
        setProducts(products.map(p => p.id === newProduct.id ? response.data : p));
      } else {
        response = await api.post('/api/products/', payload);
        setProducts([...products, response.data]);
      }
      
      setIsModalOpen(false);
      setNewProduct({ name: '', description: '', price: '', category: '', imageUrl: '' });
    } catch (error) {
      alert('Failed to save product');
    }
  };

  if (fetching) return <LoadingScreen message="Securing Dashboard..." />;

  return (
    <>
      <Head>
        <title>Admin Dashboard | WOODYZ Admin</title>
      </Head>

      <AdminLayout activeTab="inventory" isReady={!fetching}>
        <main>
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="font-display text-5xl font-black text-3d mb-2">Inventory Management</h1>
              <p className="text-lg font-bold text-charcoal/40">Manage your handcrafted treasures and stock levels.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-pop bg-maple text-charcoal border-4 border-charcoal px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3"
            >
              <iconify-icon icon="ph:plus-bold"></iconify-icon>
              Add New Product
            </button>
          </header>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border-4 border-charcoal rounded-3xl p-6 shadow-[6px_6px_0px_0px_#3A322B]">
              <p className="text-xs font-black uppercase tracking-widest text-charcoal/40 mb-1">Total Products</p>
              <p className="text-4xl font-black text-cedar">{products.length}</p>
            </div>
            <div className="bg-white border-4 border-charcoal rounded-3xl p-6 shadow-[6px_6px_0px_0px_#3A322B]">
              <p className="text-xs font-black uppercase tracking-widest text-charcoal/40 mb-1">Total Revenue</p>
              <p className="text-4xl font-black text-orange">${stats?.totalRevenue?.toFixed(2)}</p>
            </div>
            <div className="bg-white border-4 border-charcoal rounded-3xl p-6 shadow-[6px_6px_0px_0px_#3A322B]">
              <p className="text-xs font-black uppercase tracking-widest text-charcoal/40 mb-1">Total Orders</p>
              <p className="text-4xl font-black text-sage">{stats?.totalOrders}</p>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white border-4 border-charcoal rounded-[32px] overflow-hidden shadow-[8px_8px_0px_0px_#3A322B]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-charcoal text-white uppercase text-[10px] tracking-[0.2em] font-black">
                  <th className="px-8 py-6">Product</th>
                  <th className="px-8 py-6">Price</th>
                  <th className="px-8 py-6">Category</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-charcoal/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cream rounded-xl border-2 border-charcoal/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={`WOODYZ ${product.name}`} className="w-full h-full object-cover" />
                          ) : (
                            <iconify-icon icon="ph:cube-bold" class="text-2xl text-cedar/30"></iconify-icon>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-sm">{product.name}</p>
                          <p className="text-xs font-bold text-charcoal/40 truncate max-w-xs">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-cedar">${product.price.toFixed(2)}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-sage/20 text-sage border-2 border-sage/30 px-3 py-1 rounded-full text-[10px] font-black uppercase">{product.category || 'Wooden Toy'}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => {
                            setNewProduct(product);
                            setIsModalOpen(true);
                          }}
                          className="p-2 hover:bg-cedar/10 rounded-lg text-cedar transition-colors" 
                          title="Edit"
                        >
                          <iconify-icon icon="ph:pencil-simple-bold" class="text-xl"></iconify-icon>
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors" 
                          title="Delete"
                        >
                          <iconify-icon icon="ph:trash-bold" class="text-xl"></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Add/Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-charcoal/40 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-2xl my-auto">
              <div className="absolute -inset-3 bg-maple rounded-[48px] border-4 border-charcoal -rotate-2 -z-10 shadow-[10px_10px_0px_0px_#3A322B]"></div>
              <div className="bg-white border-4 border-charcoal rounded-[40px] p-8 lg:p-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-display text-3xl font-black">{newProduct.id ? 'Update Treasure' : 'Add Treasure'}</h2>
                  <button onClick={() => {
                    setIsModalOpen(false);
                    setNewProduct({ name: '', description: '', price: '', category: '', imageUrl: '' });
                  }} className="text-3xl hover:text-cedar transition-colors">
                    <iconify-icon icon="ph:x-bold"></iconify-icon>
                  </button>
                </div>
                
                <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Product Name</label>
                    <input 
                      type="text" 
                      required 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border-3 border-charcoal bg-cream font-bold" 
                      placeholder="e.g. Magic Wand"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      required 
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border-3 border-charcoal bg-cream font-bold" 
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Category</label>
                    <select 
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border-3 border-charcoal bg-cream font-bold appearance-none"
                    >
                      <option value="">Select Category</option>
                      <option value="Wooden Blocks">Wooden Blocks</option>
                      <option value="Puzzles">Puzzles</option>
                      <option value="Toys">Toys</option>
                      <option value="Educational">Educational</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Image URL</label>
                    <input 
                      type="text" 
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border-3 border-charcoal bg-cream font-bold" 
                      placeholder="/images/example.png"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Description</label>
                    <textarea 
                      required 
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border-3 border-charcoal bg-cream font-bold h-24" 
                      placeholder="Tell us about this treasure..."
                    />
                  </div>
                  <button type="submit" className="md:col-span-2 btn-pop bg-cedar text-white border-4 border-charcoal px-8 py-5 rounded-[24px] font-black text-lg uppercase tracking-widest mt-4">
                    {newProduct.id ? 'Update Product' : 'Create Product'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
}
