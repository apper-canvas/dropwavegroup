import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import FolderSystem from '../components/FolderSystem';

const FolderExplorer = () => {
  const { folderPath } = useParams();
  const FolderIcon = getIcon('Folder');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto pt-24 px-4 pb-12"
    >
      <div className="flex items-center mb-8">
        <FolderIcon className="h-8 w-8 text-primary mr-3" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Folder Explorer
          </h1>
          <p className="text-surface-600 dark:text-surface-400 text-sm md:text-base">
            Organize, manage, and share your files and folders
          </p>
        </div>
      </div>
      
      {/* Folder System Component */}
      <FolderSystem currentPath={folderPath} />
    </motion.div>
  );
};

export default FolderExplorer;