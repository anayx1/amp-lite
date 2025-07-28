import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 text-gray-700">
      {/* Call-to-Action Section */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-lg font-semibold">Post your Advertisement for £10 offs</h2>
        <p className="text-sm mt-2">
          Register now to get the latest updates on promotions & coupons. Don’t worry, we won’t spam! <br />
          By subscribing, you agree to our{' '}
          <a href="#" className="text-blue-600 underline">
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 underline">
            Privacy Policy
          </a>.
        </p>
      </div>

      {/* Footer Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-12">
        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Do You Need Help?</h3>
          <p className="text-sm mb-4">
            Autoseligen syr. Nek diarsak fröbomba. Nör antípol kynoda nynyt. Pressa fåmoska.
          </p>
          <p className="flex items-center gap-2">
            <span className="material-icons">phone</span>
            <span className="font-bold">0 800 300-353</span>
          </p>
          <p className="flex items-center gap-2 mt-2">
            <span className="material-icons">email</span>
            <span>info@example.com</span>
          </p>
        </div>

        {/* Footer Links */}
        <div>
          <h3 className="font-semibold mb-2">Make Money with Us</h3>
          <ul className="space-y-1">
            {['Sell on AMP', 'Sell Your Services on AMP', 'Sell Your Products on AMP', 'Advertise Your Products'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Let Us Help You</h3>
          <ul className="space-y-1">
            {['Accessibility Statement', 'Your Orders', 'Policies', 'Privacy Policy', 'Cookie Settings', 'Help Center'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Get to Know Us</h3>
          <ul className="space-y-1">
            {['Careers for AMP', 'About AMP', 'Investor Relations', 'Customer Reviews', 'Social Responsibility', 'Store Locations'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Media & Download Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-200 mt-8 pt-6 px-4 md:px-12">
        <div className="flex items-center space-x-4">
          <p className="text-sm">Follow us on social media:</p>
          <div className="flex space-x-2">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform, idx) => (
              <a key={idx} href="#" className="text-gray-600 hover:text-gray-800">
                <span className={`fab fa-${platform} text-lg`}></span>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-4 lg:mt-0">
          <p className="text-sm">Download our app:</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-sm text-blue-600 underline">
              Download -10% Discount
            </a>
            <a href="#" className="text-sm text-blue-600 underline">
              Download -20% Discount
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center mt-8 px-4 md:px-12">
        <p className="text-sm text-gray-500">
          Copyright © 2024. All rights reserved. Powered by{' '}
          <a href="#" className="text-blue-600 underline">
            Ingenuitylabs
          </a>.
        </p>
        <div className="flex space-x-4 mt-4 lg:mt-0">
          {['visa', 'paypal', 'skrill', 'klarna'].map((payment, idx) => (
            <img key={idx} src={`/${payment}-logo.svg`} alt={`${payment} logo`} className="h-6" />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
