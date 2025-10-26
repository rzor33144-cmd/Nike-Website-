
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
             <img src="https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo-500x281.png" alt="Nike Logo" className="h-7 w-auto filter invert" />
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
