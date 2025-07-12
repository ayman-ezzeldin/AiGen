import React from "react";
import logo from "../assets/Icons/AICON.png";
import appleIcon from "../assets/Icons/mac-os-logo.png";
import windowsIcon from "../assets/Icons/menu.png";

const Footer = () => {
  return (
    <footer className="footer bg-gradient-to-b from-gray-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <NewsletterSection />
      <FooterMain />
      <FooterBottom />
    </footer>
  );
};

const NewsletterSection = () => (
  <div className="newsletter-section max-w-4xl mx-auto mb-12 text-center animate-fadeIn bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg">
    <h2 className="newsletter-title text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
      Join Our Newsletter
    </h2>
    <p className="newsletter-description text-gray-600 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
      Get AI news, tips, and exclusive content delivered to your inbox.
    </p>
    <div className="newsletter-container">
      <div className="newsletter-input-wrapper flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          className="newsletter-input flex-1 p-3 border border-gray-300 rounded-full outline-none transition-all duration-300 focus:border-blue-600 focus:shadow-[0_0_8px_rgba(37,99,235,0.5)] text-sm sm:text-base"
          placeholder="Enter your email"
          aria-label="Email for newsletter"
        />
        <button
          className="newsletter-button p-3 bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-700 hover:scale-105"
          aria-label="Subscribe to newsletter"
        >
          Subscribe
        </button>
      </div>
    </div>
  </div>
);

const FooterMain = () => (
  <div className="footer-main max-w-4xl mx-auto flex flex-col sm:flex-row gap-8 sm:gap-12 mb-12">
    <FooterAbout />
    <FooterLinks />
  </div>
);

const FooterAbout = () => (
  <div className="footer-about flex-1 text-center sm:text-left animate-fadeIn">
    <div className="footer-logo-wrapper flex items-center justify-center sm:justify-start gap-3 mb-4">
      <img src={logo} alt="AINO Logo" className="footer-logo w-12 h-12 object-contain" />
      <h4 className="footer-title text-xl font-semibold text-gray-900">AINO</h4>
    </div>
    <p className="footer-description text-gray-600 text-sm sm:text-base mb-4">
      AINO   makes building, training, and deploying AI models accessible to everyone.
    </p>
    {/* <div className="footer-icons flex justify-center sm:justify-start gap-4">
      <img src={appleIcon} alt="Apple App Store" className="footer-icon-image w-6 h-6 object-contain" />
      <img src={windowsIcon} alt="Windows Store" className="footer-icon-image w-6 h-6 object-contain" />
    </div> */}
    </div>
);

const FooterLinks = () => (
  <div className="footer-links-group flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 text-center sm:text-left">
    <FooterLinksColumn title="Home" links={["Overview", "Features", "Problems", "Case Studies"]} />
    <FooterLinksColumn title="Company" links={["Help Center", "About Us", "Blog", "FAQ"]} />
    <FooterLinksColumn title="Resources" links={["Docs", "Database", "Models", "Learn"]} />
  </div>
);

const FooterLinksColumn = ({ title, links }) => (
  <div className="footer-links">
    <h5 className="footer-subtitle text-lg font-semibold text-gray-900 mb-3">{title}</h5>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={`#${link.toLowerCase().replace(" ", "-")}`}
            className="text-gray-600 text-sm sm:text-base hover:text-blue-600 transition-colors duration-300"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const FooterBottom = () => (
  <div className="footer-bottom max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center border-t border-gray-300 pt-6">
    <p className="footer-copyright text-gray-600 text-sm sm:text-base">
      @AINO  2025. All Rights Reserved.
    </p>
    <SocialIcons />
  </div>
);

const SocialIcons = () => (
  <div className="footer-social-icons flex gap-4 mt-4 sm:mt-0">
    <SocialIcon
      iconClass="github"
      href="https://github.com/AINO" 
      label="GitHub"
    />
    <SocialIcon
      iconClass="linkedin"
      href="https://linkedin.com/company/AINO" 
      label="LinkedIn"
    />
    <SocialIcon
      iconClass="facebook"
      href="https://www.facebook.com/share/16hfjPipe5/"
      label="Facebook"
    />
  </div>
);

const SocialIcon = ({ iconClass, href, label }) => (
  <a
    href={href}
    className={`social-icon ${iconClass} text-gray-600 text-lg hover:text-blue-600 hover:scale-110 transition-all duration-300`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Follow us on ${label}`}
  >
    <i className={`fab fa-${iconClass}`}></i>
  </a>
);

export default Footer;