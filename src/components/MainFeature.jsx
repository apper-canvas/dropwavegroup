import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icon declarations
  const UploadIcon = getIcon('Upload');
  const UploadCloudIcon = getIcon('UploadCloud');
  const FileIcon = getIcon('File');
  const FileTextIcon = getIcon('FileText');
  const ImageIcon = getIcon('Image');
  const VideoIcon = getIcon('Video');
  const FileAudioIcon = getIcon('FileAudio');
  const FilesIcon = getIcon('Files');
  const AlertCircleIcon = getIcon('AlertCircle');
  const CheckCircleIcon = getIcon('CheckCircle');
  const XIcon = getIcon('X');
  const LinkIcon = getIcon('Link');
  const CopyIcon = getIcon('Copy');
  const CheckIcon = getIcon('Check');
  const TrashIcon = getIcon('Trash');

  // States
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processingFiles, setProcessingFiles] = useState([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef(null);

  // Handle drag events
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  // Process file upload
  const processFiles = useCallback((files) => {
    const newProcessingFiles = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading',
      file
    }));
    
    setProcessingFiles(prev => [...prev, ...newProcessingFiles]);
    
    // Simulate file upload process
    newProcessingFiles.forEach(file => {
      simulateFileUpload(file);
    });
  }, []);

  // Simulate file upload with progress
  const simulateFileUpload = useCallback((file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Move file from processing to uploaded
        setProcessingFiles(prev => prev.filter(f => f.id !== file.id));
        setUploadedFiles(prev => [
          ...prev, 
          { ...file, progress: 100, status: 'completed', uploadedAt: new Date() }
        ]);
        
        toast.success(`"${file.name}" uploaded successfully`);
      } else {
        // Update progress
        setProcessingFiles(prev => 
          prev.map(f => f.id === file.id ? { ...f, progress: Math.round(progress) } : f)
        );
      }
    }, 300);
  }, []);

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  // Handle file input change
  const handleFileInputChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  // Open file selector
  const openFileSelector = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Delete file
  const deleteFile = useCallback((id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    toast.info("File deleted");
  }, []);

  // Share file
  const shareFile = useCallback((file) => {
    setSelectedFile(file);
    setShareModalOpen(true);
  }, []);

  // Copy share link
  const copyShareLink = useCallback(() => {
    const shareLink = `https://dropwave.app/share/${selectedFile?.id}`;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Link copied to clipboard");
  }, [selectedFile]);

  // Get icon by file type
  const getFileIcon = useCallback((type) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-6 h-6" />;
    if (type.startsWith('video/')) return <VideoIcon className="w-6 h-6" />;
    if (type.startsWith('audio/')) return <FileAudioIcon className="w-6 h-6" />;
    if (type.startsWith('text/')) return <FileTextIcon className="w-6 h-6" />;
    return <FileIcon className="w-6 h-6" />;
  }, []);

  // Format file size
  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* File Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 mb-8 ${
          isDragging 
            ? 'bg-primary/10 dark:bg-primary/20 shadow-lg border-2 border-primary' 
            : 'bg-white dark:bg-surface-800 shadow-card border-2 border-dashed border-surface-300 dark:border-surface-600'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="py-12 px-6 md:px-12 flex flex-col items-center justify-center text-center">
          <div className={`mb-4 rounded-full p-4 ${
            isDragging ? 'bg-primary/20 text-primary' : 'bg-surface-100 dark:bg-surface-700'
          }`}>
            <UploadCloudIcon className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            {isDragging ? 'Drop your files here' : 'Drag & Drop your files here'}
          </h3>
          
          <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md">
            or click to browse your device
          </p>
          
          <button
            onClick={openFileSelector}
            className="btn-primary rounded-full flex items-center"
          >
            <UploadIcon className="w-5 h-5 mr-2" />
            Select Files
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileInputChange}
          />
          
          <p className="text-xs text-surface-500 dark:text-surface-500 mt-4">
            Maximum file size: 1GB per file
          </p>
        </div>
      </motion.div>
      
      {/* Files Section */}
      <div className="space-y-6">
        {/* Processing Files Section */}
        <AnimatePresence>
          {processingFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <UploadIcon className="w-5 h-5 mr-2" />
                Uploading
              </h3>
              
              <div className="space-y-3">
                {processingFiles.map(file => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg p-2 bg-surface-100 dark:bg-surface-700">
                        {getFileIcon(file.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                          <p className="font-medium truncate">{file.name}</p>
                          <span className="text-sm text-surface-500 dark:text-surface-500">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                        
                        <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-surface-500 dark:text-surface-500">
                            {file.progress}% complete
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Uploaded Files Section */}
        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FilesIcon className="w-5 h-5 mr-2" />
                Uploaded Files
              </h3>
              
              <div className="space-y-3">
                {uploadedFiles.map(file => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg p-2 bg-surface-100 dark:bg-surface-700">
                        {getFileIcon(file.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <p className="font-medium truncate">{file.name}</p>
                          <span className="text-sm text-surface-500 dark:text-surface-500">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-xs text-surface-500 dark:text-surface-500 mt-1">
                          <CheckCircleIcon className="w-3.5 h-3.5 mr-1 text-green-500" />
                          <span>Uploaded {new Date(file.uploadedAt).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => shareFile(file)}
                          className="p-2 rounded-full text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary transition-colors"
                          aria-label="Share file"
                        >
                          <LinkIcon className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="p-2 rounded-full text-surface-600 hover:text-accent dark:text-surface-400 dark:hover:text-accent transition-colors"
                          aria-label="Delete file"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Empty State */}
        {uploadedFiles.length === 0 && processingFiles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <FilesIcon className="w-16 h-16 text-surface-400 dark:text-surface-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No files uploaded yet</h3>
            <p className="text-surface-500 dark:text-surface-500 max-w-md">
              Start uploading files by dragging and dropping them above or using the select button.
            </p>
          </motion.div>
        )}
      </div>
      
      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg max-w-md w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Share File</h3>
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-surface-700 dark:text-surface-300 mb-2">
                  Share link for <strong>{selectedFile.name}</strong>
                </p>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-surface-100 dark:bg-surface-700 rounded-lg px-3 py-2.5 text-sm truncate">
                    https://dropwave.app/share/{selectedFile.id}
                  </div>
                  <button
                    onClick={copyShareLink}
                    className={`p-2.5 rounded-lg ${
                      copied 
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary'
                    }`}
                  >
                    {copied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div className="bg-surface-100 dark:bg-surface-700 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircleIcon className="w-5 h-5 text-primary mt-0.5" />
                  <p className="text-sm text-surface-700 dark:text-surface-300">
                    Anyone with this link can view and download this file. For additional security options, 
                    consider setting an expiration date or password protection.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  className="btn-primary"
                  onClick={() => setShareModalOpen(false)}
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;