'use client';

import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white text-black text-sm">
      <div className="lg:w-[90%] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 space-y-3 lg:space-y-0">
        {/* Left */}
        <div className="py-8">
          <Link href="/" className="block mb-4 space-x-2">
            <Image
              src="https://tudelu.com/hubfs/raw_assets/public/Tudelu/images/favicon-orange.svg"
              alt="Icon"
              className="inline h-14 w-8"
              width={50}
              height={50}
            />
            <Image
              src="https://tudelu.com/hubfs/raw_assets/public/Tudelu/images/logo-text-orange.svg"
              alt="Tudelu"
              className="inline h-12 w-54"
              width={50}
              height={50}
            />
          </Link>
          <p className="font-medium leading-tight text-xl md:text-4xl">
            Tudelü makes<br />The Statement
          </p>
        </div>

        {/* Middle */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="flex flex-col items-center lg:items-start">
            <h5 className="text-[#ff5100] font-semibold mb-2 text-lg lg:text-2xl">Our Industry</h5>
            <ul className="space-y-3 text-left">
              <li><Link href="/industries_we_partner_with" className="hover:text-orange-500 text-base lg:text-2xl">Industries We Partner With</Link></li>
              <li><Link href="/sign-up-aia" className="hover:text-orange-500 text-base lg:text-2xl">AIA Certification</Link></li>
              <li><a href="https://www.arcat.com/company/tudel%C3%BC-51492" className="hover:text-orange-500 text-base lg:text-2xl">ARCAT Partnership</a></li>
              <li><Link href="/news" className="hover:text-orange-500 text-base lg:text-2xl">News + Events</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h5 className="text-[#ff5100] font-semibold mb-2 text-lg lg:text-2xl">Quick Clicks</h5>
            <ul className="space-y-3">
              {[
                'closure', 'private', 'secluded', 'about', 'process', 'resources',
                'installations', 'measure', 'blog', 'contact',
              ].map((slug) => (
                <li key={slug}>
                  <Link href={`/${slug}`} className="hover:text-orange-500 text-base lg:text-2xl capitalize">{slug}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="text-[#ff5100] font-semibold mb-2 text-lg lg:text-2xl">Office</h5>
              <p>
                <a href="https://goo.gl/maps/L91sZerA8W7NqYFR7" target="_blank" rel="noreferrer" className="hover:text-orange-500 text-base lg:text-2xl">
                  100 Industrial Avenue<br />
                  Little Ferry, NJ 07643
                </a>
              </p>
            </div>
            <div>
              <h5 className="text-[#ff5100] font-semibold mb-2 text-lg lg:text-2xl">Contact</h5>
              <p>
                <a href="tel:7187827882" className="hover:text-orange-500 block text-base lg:text-2xl">718.782.7882</a>
                <a href="mailto:info@tudelu.com" className="hover:text-orange-500 block text-base lg:text-2xl">info@tudelu.com</a>
                <Link href="/service_call" className="hover:text-orange-500 block text-base lg:text-2xl">Service Call?</Link>
              </p>
            </div>
            <p className="pt-2">
              <Link href="/calendar" className="hover:text-orange-500 text-lg lg:text-2xl">Calendar</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom logos */}
      <div className="w-[90%] mx-auto">
        <div className="flex items-center space-x-4 border-b border-b-[#ff5100] py-4">
          <Link href="https://www.aiany.org/resources/continuing-education/" target="_blank" rel="noreferrer">
            <Image className="lg:h-24 w-32"
            src="https://res.cloudinary.com/dd3wigmdk/image/upload/v1741010699/AIA-Partner_fpmxxd.png" alt="AIA" width={50} height={50} />
          </Link>
          <Link href="https://www.arcat.com/arcatcos/cos51/arc51492.html" target="_blank" rel="noreferrer">
            <Image className="lg:h-20 w-32"
             src="https://res.cloudinary.com/dd3wigmdk/image/upload/v1741010621/ARCATLogo_ax4zbr.png" alt="ARCAT"  width={50} height={50} />
          </Link>
          <Image className="lg:h-24 w-28" 
          src="https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/pngkey.com-eco-friendly-png-465219.png" alt="Eco-Friendly" width={50} height={50} />
          <Image className="lg:h-24 w-28"
          src="https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/MadeInUSA.png" alt="Made in USA" width={50} height={50} />
        </div>

        <div className="py-4 mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© {year} Tudelü Holdings, LLC</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-500">Back to top</a>
            <a href="https://tudelu.com/sitemap.xml" className="hover:text-orange-500">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
