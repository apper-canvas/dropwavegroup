import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [isDragging, setIsDragging] = useState(false);
  
  const LogoIcon = getIcon('Cloud');
  const UploadIcon = getIcon('Upload');
  const ShieldIcon = getIcon('Shield');
  const ShareIcon = getIcon('Share2');
  const OrganizeIcon = getIcon('FolderTree');
  const ArrowDownIcon = getIcon('ChevronDown');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const scrollToFeature = () => {
    document.getElementById('main-feature').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://burst.shopifycdn.com/photos/abstract-geometric-pattern.jpg?width=1850&format=pjpg&exif=0&iptc=0')] opacity-[0.03] dark:opacity-[0.05] bg-cover bg-center"></div>
        
        {/* Abstract Shape Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[15%] w-64 h-64 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full bg-secondary/10 dark:bg-secondary/5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 pt-8 pb-16 relative z-10">
          {/* Header */}
          <header className="flex items-center justify-between py-4 mb-12 md:mb-16">
            <div className="flex items-center gap-2">
              <LogoIcon className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">DropWave</span>
            </div>
          </header>
          
          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 md:pt-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight">
                Share files <span className="gradient-text">securely</span> and <span className="gradient-text">efficiently</span>
              </h1>
              <p className="text-lg md:text-xl text-surface-700 dark:text-surface-300 max-w-lg">
                Upload, organize, and share your files with confidence using DropWave's intuitive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button 
                  onClick={scrollToFeature}
                  className="btn-primary group rounded-full px-6 py-3.5 text-lg"
                >
                  <UploadIcon className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Start Uploading
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative p-4">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-[2px]">
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-surface-800 overflow-hidden">
                    <img 
                      src="https://burst.shopifycdn.com/photos/laptop-from-above.jpg?width=1000&format=pjpg&exif=0&iptc=0" 
                      alt="DropWave in action" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 rounded-xl p-4 bg-white dark:bg-surface-800 shadow-soft">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                      <ShieldIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-medium">Secure Transfers</span>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 rounded-xl p-4 bg-white dark:bg-surface-800 shadow-soft">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                      <ShareIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium">Easy Sharing</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-sm text-surface-600 dark:text-surface-400 mb-2">Scroll to try</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-surface-200 dark:bg-surface-700 rounded-full p-2"
            >
              <ArrowDownIcon className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Feature Section */}
      <section id="main-feature" className="py-16 md:py-24 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              Upload & Share Your Files
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-surface-700 dark:text-surface-300 max-w-2xl mx-auto">
              Drag and drop files to upload them instantly, or use the file browser to select multiple files.
            </motion.p>
          </motion.div>
          
          <MainFeature />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="card hover:shadow-lg transition-shadow">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 dark:bg-primary/20 mb-4">
                <UploadIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Effortless Uploads</h3>
              <p className="text-surface-700 dark:text-surface-300">
                Drag and drop functionality with real-time progress tracking and notifications.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="card hover:shadow-lg transition-shadow">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-secondary/10 dark:bg-secondary/20 mb-4">
                <OrganizeIcon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Organized Storage</h3>
              <p className="text-surface-700 dark:text-surface-300">
                Keep your files neatly organized with custom folders and intuitive file management.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="card hover:shadow-lg transition-shadow">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-accent/10 dark:bg-accent/20 mb-4">
                <ShareIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Sharing</h3>
              <p className="text-surface-700 dark:text-surface-300">
                Generate secure links with expiration dates and custom permissions for sharing.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-surface-200 dark:bg-surface-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <LogoIcon className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">DropWave</span>
            </div>
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              © {new Date().getFullYear()} DropWave. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;