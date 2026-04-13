import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-low border-t border-outline pt-20 pb-10 px-6 md:px-12 mt-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-1">
          <Link href="/" className="text-3xl font-logo text-primary tracking-wider block mb-4">
            Shop.AI
          </Link>
          <p className="text-text-muted text-sm leading-relaxed">
            Smarter Decisions. Backed by Data.
          </p>
        </div>

        <div>
          <h4 className="font-accent text-xs tracking-widest text-text mb-6">PRODUCT</h4>
          <ul className="space-y-4 text-sm text-text-muted">
            <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
            <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-accent text-xs tracking-widest text-text mb-6">COMPANY</h4>
          <ul className="space-y-4 text-sm text-text-muted">
            <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-accent text-xs tracking-widest text-text mb-6">RESOURCES</h4>
          <ul className="space-y-4 text-sm text-text-muted">
            <li><Link href="#" className="hover:text-primary transition-colors">Docs</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">API Reference</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-1">
          <h4 className="font-accent text-xs tracking-widest text-text mb-6">NEWSLETTER</h4>
          <p className="text-sm text-text-muted mb-4">Stay in the loop.</p>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-surface border border-outline rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button className="bg-surface-top hover:bg-primary hover:text-on-primary text-text border border-outline rounded-lg px-4 py-2 text-sm font-medium transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-outline flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <p>© 2025 Shop.AI</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
