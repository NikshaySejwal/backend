import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | WOODYZ</title>
        <meta name="description" content="The WOODYZ page you requested could not be found." />
        <meta name="robots" content="noindex,follow" />
      </Head>
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-cedar mb-5">404</p>
          <h1 className="font-display text-5xl md:text-7xl font-black text-3d mb-6">This page wandered off.</h1>
          <p className="text-lg font-bold text-charcoal/60 mb-10">The address does not match a current WOODYZ page. Explore the collection or return home.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-pop bg-cedar text-white border-4 border-charcoal px-7 py-4 rounded-2xl font-black uppercase tracking-widest no-underline">Go home</Link>
            <Link href="/products" className="btn-pop bg-maple text-charcoal border-4 border-charcoal px-7 py-4 rounded-2xl font-black uppercase tracking-widest no-underline">Shop toys</Link>
          </div>
        </div>
      </section>
    </>
  );
}
