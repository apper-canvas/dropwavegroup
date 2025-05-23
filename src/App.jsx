import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import UploadHistory from './pages/UploadHistory';
import NotFound from './pages/NotFound';
import FolderExplorer from './pages/FolderExplorer';
import getIcon from './utils/iconUtils';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const Sun = getIcon('Sun');
  const Moon = getIcon('Moon');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300 flex flex-col">
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed z-10 p-2.5 rounded-full bottom-6 right-6 bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-200 shadow-lg hover:bg-surface-300 dark:hover:bg-surface-600 transition-all"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      <Navbar />
     
      <main className="flex-grow pt-16"> {/* Add padding top to account for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload-history" element={<UploadHistory />} />
          <Route path="/folders" element={<FolderExplorer />} />
          <Route path="/folders/:folderPath*" element={<FolderExplorer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
      
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        className="mt-16 md:mt-20"
        toastClassName="bg-surface-50 dark:bg-surface-800 text-surface-900 dark:text-surface-100 shadow-card rounded-xl"
      />
    </div>
  );
}

export default App;