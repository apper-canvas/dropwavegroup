import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const UploadHistory = () => {
  const File = getIcon('File');
  const Search = getIcon('Search');
  const FileText = getIcon('FileText');
  const FileImage = getIcon('FileImage');
  const FileAudio = getIcon('FileAudio');
  const FileVideo = getIcon('FileVideo');
  const Download = getIcon('Download');
  
  // Sample upload history data
  const [uploadHistory] = useState([
    {
      id: 1,
      fileName: 'project_presentation.pptx',
      fileType: 'document',
      fileSize: '2.4 MB',
      uploadDate: new Date(2023, 9, 15, 14, 30),
      status: 'completed'
    },
    {
      id: 2,
      fileName: 'vacation_photo.jpg',
      fileType: 'image',
      fileSize: '3.7 MB',
      uploadDate: new Date(2023, 9, 14, 9, 15),
      status: 'completed'
    },
    {
      id: 3,
      fileName: 'quarterly_report.pdf',
      fileType: 'document',
      fileSize: '1.2 MB',
      uploadDate: new Date(2023, 9, 12, 16, 45),
      status: 'completed'
    },
    {
      id: 4,
      fileName: 'product_demo.mp4',
      fileType: 'video',
      fileSize: '28.6 MB',
      uploadDate: new Date(2023, 9, 10, 11, 20),
      status: 'completed'
    },
    {
      id: 5,
      fileName: 'podcast_interview.mp3',
      fileType: 'audio',
      fileSize: '18.2 MB',
      uploadDate: new Date(2023, 9, 8, 13, 10),
      status: 'completed'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredHistory = uploadHistory.filter(item => 
    item.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (fileType) => {
    switch(fileType) {
      case 'image': return <FileImage className="h-5 w-5 text-primary" />;
      case 'audio': return <FileAudio className="h-5 w-5 text-secondary" />;
      case 'video': return <FileVideo className="h-5 w-5 text-accent" />;
      default: return <FileText className="h-5 w-5 text-surface-600 dark:text-surface-400" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto pt-24 px-4 pb-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-4 md:mb-0">
          <File className="h-7 w-7 text-primary" />
          Upload History
        </h1>
        <div className="w-full md:w-64 relative">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-surface-500" />
        </div>
      </div>
      
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
            <thead className="bg-surface-100 dark:bg-surface-800">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">File</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Size</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Upload Date</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getFileIcon(item.fileType)}
                        <span className="ml-2 text-sm font-medium text-surface-900 dark:text-surface-100">{item.fileName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">
                      {item.fileType.charAt(0).toUpperCase() + item.fileType.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">
                      {item.fileSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">
                      {format(item.uploadDate, 'MMM d, yyyy - h:mm a')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        className="text-primary hover:text-primary-dark dark:hover:text-primary-light"
                        aria-label={`Download ${item.fileName}`}
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-surface-600 dark:text-surface-400">
                    No files found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadHistory;