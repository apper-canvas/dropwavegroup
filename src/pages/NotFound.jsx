import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const HomeIcon = getIcon('Home');
  const AlertCircleIcon = getIcon('AlertCircle');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"></div>
            <div className="relative bg-white dark:bg-surface-800 rounded-full p-5 shadow-lg">
              <AlertCircleIcon className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        
        <Link 
          to="/" 
          className="btn-primary rounded-full px-6 py-3 inline-flex items-center justify-center"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </motion.div>
      
      {/* Background Elements */}
      <div className="absolute top-[10%] right-[15%] w-40 h-40 rounded-full bg-secondary/10 dark:bg-secondary/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-[20%] left-[10%] w-60 h-60 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl -z-10"></div>
    </motion.div>
  );
};

export default NotFound;