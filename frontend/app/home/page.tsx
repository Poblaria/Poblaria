import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, BriefcaseIcon, UsersIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div>
      <header className="pt-16">
        <div className="container mx-auto px-4 pt-20 pb-30 rounded-3xl">
          <div className="overflow-hidden h-[550px] w-full relative rounded-3xl">
            <Image
              src="/images/fam-happy.png"
              alt="Countryside Living"
              fill
              className="object-cover"
              priority
            />
        </div>
      </div>
    </header>

    {/* Search Section */}
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
          Discover Your Perfect Rural Escape
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-full shadow-lg p-2 flex">
            <input
              type="text"
              placeholder="Search villages, jobs, housing..."
              className="flex-1 px-6 py-3 rounded-full focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
            <div className="bg-green-100 w-fit p-4 rounded-xl mb-4">
              <HomeIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-3">Find Your Home</h3>
            <p className="text-gray-600 mb-4">Browse traditional stone houses, modern apartments, and community-supported housing options</p>
            <Link href="/housing" className="text-green-800 font-medium hover:underline">
              View Properties →
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
            <div className="bg-green-100 w-fit p-4 rounded-xl mb-4">
              <BriefcaseIcon className="h-8 w-8 text-green-800" />
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-3">Local Employment</h3>
            <p className="text-gray-600 mb-4">Discover opportunities in agriculture, tourism, and traditional crafts</p>
            <Link href="/jobs" className="text-green-800 font-medium hover:underline">
              Browse Jobs →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
            <div className="bg-green-100 w-fit p-4 rounded-xl mb-4">
              <UsersIcon className="h-8 w-8 text-green-800" />
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-3">Community Hub</h3>
            <p className="text-gray-600 mb-4">Connect with locals, join cultural events, and access relocation support</p>
            <Link href="/community" className="text-green-800 font-medium hover:underline">
              Meet the Community →
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
      <section className="py-16 bg-white text-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your New Beginning?</h2>
            <p className="text-lg mb-8 opacity-90">Join us today and take the first step towards discovering a new way of living.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-green-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition flex items-center gap-2"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                Contact Our Team
              </Link>
            </div>
          </div>
          </div>
      </section>
    </div>
  );
}