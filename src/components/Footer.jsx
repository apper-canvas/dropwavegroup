import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Get icons
  const UploadCloud = getIcon('UploadCloud');
  const Github = getIcon('Github');
  const Twitter = getIcon('Twitter');
  const Linkedin = getIcon('Linkedin');
  const Instagram = getIcon('Instagram');
  
  return (
    <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <UploadCloud className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-surface-900 dark:text-surface-100">DropWave</span>
            </Link>
            <p className="mt-4 text-surface-600 dark:text-surface-400 text-sm max-w-md">
              DropWave is a powerful file sharing platform designed to make uploading, managing, and sharing files simple and secure.
            </p>
          </div>
          
          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-surface-900 dark:text-surface-100">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/upload-history" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Upload History
                </Link>
              </li>
              <li>
                <Link to="/folders" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Folders
                </Link>
              </li>
              <li>
                <Link to="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-surface-900 dark:text-surface-100">
              Connect
            </h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-surface-500 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-surface-500 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-surface-500 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-surface-500 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-700 text-center text-surface-600 dark:text-surface-400 text-sm">
          <p>© {currentYear} DropWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;