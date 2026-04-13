import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Illustration (Lovebirds style) */}
      <div className="hidden lg:flex w-1/2 bg-[#9dbca7] relative items-center justify-center overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center px-12">
          {/* Mock Illustration */}
          <div className="w-64 h-64 relative mb-12">
            <div className="absolute inset-0 bg-[#e89a86] rounded-full transform -rotate-12 scale-y-75" />
            <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-[#4a6b53] rounded-full" />
            </div>
            <div className="absolute -top-8 right-0 w-24 h-24 bg-[#d45d6a] rounded-t-full rounded-br-full transform rotate-45" />
            <div className="absolute bottom-0 -left-8 w-16 h-32 bg-[#4a6b53] rounded-full transform -rotate-45" />
            <div className="absolute -bottom-4 right-8 w-32 h-16 bg-[#8c3b45] rounded-full" />
          </div>
          
          <h2 className="text-3xl font-display font-medium text-white mb-4">
            Maecenas mattis egestas
          </h2>
          <p className="text-white/80 max-w-md text-sm leading-relaxed">
            Erdum et malesuada fames ac ante ipsum primis in faucibus uspendisse porta.
          </p>
          
          <div className="flex gap-2 mt-12">
            <div className="w-6 h-1.5 bg-white rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative">
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-sm">
            <div className="text-center mb-12">
              <Link href="/" className="text-4xl font-logo text-gray-800 tracking-wider inline-block mb-12">
                Shop.AI
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

