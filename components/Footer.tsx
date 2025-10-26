
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
             <svg className="h-7 w-auto text-white" viewBox="0 0 293.4 103.3" fill="currentColor">
               <path d="M281.3,12.5c-20.9-10.3-43.2-12.2-64.6-12.2c-42.3,0-76.3,13.4-76.3,42.9c0,23,22,34.8,55,34.8c22.3,0,40.4-4,52-7.8
                 l-1.9-18.2c-11,3.4-26.6,6.3-42.9,6.3c-14.7,0-29-4.2-29-18.4c0-13.4,18.4-19.1,34.4-19.1c11.7,0,21.8,1.3,31.2,3.8L281.3,12.5z
                 M293.4,103.3L293.4,103.3C216.9,103.3,158,48.2,158,0l26.2,0c0,35.3,46.1,81.7,109.2,81.7V103.3z"/>
             </svg>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help</a></li>
              <li><a href="#" className="hover:text-white">Order Status</a></li>
              <li><a href="#" className="hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Nike</a></li>
              <li><a href="#" className="hover:text-white">News</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Investors</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Nike, Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
