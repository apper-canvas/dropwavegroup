import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const UploadCloud = getIcon('UploadCloud');
  const History = getIcon('History');
  const Menu = getIcon('Menu');
  const X = getIcon('X');

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-surface-800 shadow-sm fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <UploadCloud className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-surface-900 dark:text-surface-100">DropWave</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer relative z-20 ${isActive('/') ? 'text-primary' : 'text-surface-700 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100'}`}>
              Home
            </Link>
            <Link to="/upload-history" className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer relative z-20 ${isActive('/upload-history') ? 'text-primary' : 'text-surface-700 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100'}`}>
              Upload History
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-surface-800 shadow-md">
          <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer relative z-20 ${isActive('/') ? 'text-primary' : 'text-surface-700 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100'}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/upload-history" className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer relative z-20 ${isActive('/upload-history') ? 'text-primary' : 'text-surface-700 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100'}`} onClick={() => setIsOpen(false)}>Upload History</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;