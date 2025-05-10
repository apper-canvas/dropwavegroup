import { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const FolderSystem = ({ currentPath = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get icons
  const FolderIcon = getIcon('Folder');
  const FolderPlusIcon = getIcon('FolderPlus');
  const FileIcon = getIcon('File');
  const FileTextIcon = getIcon('FileText');
  const ImageIcon = getIcon('Image');
  const VideoIcon = getIcon('Video');
  const FileAudioIcon = getIcon('FileAudio');
  const FilesIcon = getIcon('Files');
  const ChevronRightIcon = getIcon('ChevronRight');
  const UploadIcon = getIcon('Upload');
  const UploadCloudIcon = getIcon('UploadCloud');
  const LinkIcon = getIcon('Link');
  const CopyIcon = getIcon('Copy');
  const TrashIcon = getIcon('Trash');
  const HomeIcon = getIcon('Home');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  
  // States
  const [folders, setFolders] = useState(() => {
    // Mock folder structure with some initial data
    return {
      'root': {
        id: 'root',
        name: 'Home',
        type: 'folder',
        children: ['documents', 'images', 'media'],
        createdAt: new Date()
      },
      'documents': {
        id: 'documents',
        name: 'Documents',
        type: 'folder',
        children: ['work-documents', 'resume.pdf', 'notes.txt'],
        createdAt: new Date()
      },
      'work-documents': {
        id: 'work-documents',
        name: 'Work Documents',
        type: 'folder',
        children: ['project-plan.docx'],
        createdAt: new Date()
      },
      'images': {
        id: 'images',
        name: 'Images',
        type: 'folder',
        children: ['vacation.jpg', 'profile.png'],
        createdAt: new Date()
      },
      'media': {
        id: 'media',
        name: 'Media',
        type: 'folder',
        children: ['music', 'videos'],
        createdAt: new Date()
      },
      'music': {
        id: 'music',
        name: 'Music',
        type: 'folder',
        children: ['song.mp3'],
        createdAt: new Date()
      },
      'videos': {
        id: 'videos',
        name: 'Videos',
        type: 'folder',
        children: ['vacation.mp4'],
        createdAt: new Date()
      },
      'project-plan.docx': {
        id: 'project-plan.docx',
        name: 'Project Plan',
        type: 'file',
        fileType: 'document',
        size: '245 KB',
        createdAt: new Date()
      },
      'resume.pdf': {
        id: 'resume.pdf',
        name: 'Resume',
        type: 'file',
        fileType: 'document',
        size: '1.2 MB',
        createdAt: new Date()
      },
      'notes.txt': {
        id: 'notes.txt',
        name: 'Notes',
        type: 'file',
        fileType: 'document',
        size: '4 KB',
        createdAt: new Date()
      },
      'vacation.jpg': {
        id: 'vacation.jpg',
        name: 'Vacation Photo',
        type: 'file',
        fileType: 'image',
        size: '2.7 MB',
        createdAt: new Date()
      },
      'profile.png': {
        id: 'profile.png',
        name: 'Profile Picture',
        type: 'file',
        fileType: 'image',
        size: '1.5 MB',
        createdAt: new Date()
      },
      'song.mp3': {
        id: 'song.mp3',
        name: 'Favorite Song',
        type: 'file',
        fileType: 'audio',
        size: '3.2 MB',
        createdAt: new Date()
      },
      'vacation.mp4': {
        id: 'vacation.mp4',
        name: 'Vacation Video',
        type: 'file',
        fileType: 'video',
        size: '28.6 MB',
        createdAt: new Date()
      }
    };
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef(null);
  
  // Parse current path
  const pathSegments = currentPath ? currentPath.split('/').filter(Boolean) : [];
  const currentFolderId = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'root';
  const currentFolder = folders[currentFolderId];
  
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
  
  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      handleFileUpload(files);
    }
  }, [currentFolderId]);
  
  // Handle file input change
  const handleFileInputChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  }, [currentFolderId]);
  
  // Open file selector
  const openFileSelector = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  
  // Handle file upload
  const handleFileUpload = useCallback((files) => {
    // Create file entries and add them to the current folder
    const newFiles = {};
    const newFileIds = [];
    
    files.forEach(file => {
      const fileId = `${Date.now()}-${file.name}`;
      let fileType = 'document';
      
      if (file.type.startsWith('image/')) fileType = 'image';
      else if (file.type.startsWith('video/')) fileType = 'video';
      else if (file.type.startsWith('audio/')) fileType = 'audio';
      
      newFiles[fileId] = {
        id: fileId,
        name: file.name,
        type: 'file',
        fileType,
        size: formatFileSize(file.size),
        createdAt: new Date()
      };
      
      newFileIds.push(fileId);
    });
    
    // Update folder structure
    setFolders(prev => {
      const updatedFolders = { ...prev, ...newFiles };
      updatedFolders[currentFolderId] = {
        ...updatedFolders[currentFolderId],
        children: [...updatedFolders[currentFolderId].children, ...newFileIds]
      };
      return updatedFolders;
    });
    
    toast.success(`${files.length} file${files.length > 1 ? 's' : ''} uploaded successfully`);
  }, [currentFolderId]);
  
  // Create new folder
  const createNewFolder = useCallback(() => {
    if (!newFolderName.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }
    
    const folderId = `${Date.now()}-${newFolderName.toLowerCase().replace(/\s+/g, '-')}`;
    
    setFolders(prev => {
      const updatedFolders = { ...prev };
      
      // Create new folder
      updatedFolders[folderId] = {
        id: folderId,
        name: newFolderName,
        type: 'folder',
        children: [],
        createdAt: new Date()
      };
      
      // Add to current folder's children
      updatedFolders[currentFolderId] = {
        ...updatedFolders[currentFolderId],
        children: [...updatedFolders[currentFolderId].children, folderId]
      };
      
      return updatedFolders;
    });
    
    setNewFolderName('');
    setShowNewFolderModal(false);
    toast.success(`Folder "${newFolderName}" created`);
  }, [newFolderName, currentFolderId]);
  
  // Navigate to folder
  const navigateToFolder = useCallback((folderId) => {
    const newPath = pathSegments.length > 0
      ? `${pathSegments.join('/')}/${folderId}`
      : folderId;
    
    navigate(`/folders/${newPath}`);
  }, [navigate, pathSegments]);
  
  // Navigate to path level
  const navigateToPathLevel = useCallback((index) => {
    if (index === -1) {
      navigate('/folders');
    } else {
      const newPath = pathSegments.slice(0, index + 1).join('/');
      navigate(`/folders/${newPath}`);
    }
  }, [navigate, pathSegments]);
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get file icon
  const getFileIcon = (fileType) => {
    switch(fileType) {
      case 'image': return <ImageIcon className="w-5 h-5 text-primary" />;
      case 'audio': return <FileAudioIcon className="w-5 h-5 text-secondary" />;
      case 'video': return <VideoIcon className="w-5 h-5 text-accent" />;
      default: return <FileTextIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />;
    }
  };
  
  // Delete item
  const deleteItem = useCallback((itemId) => {
    setFolders(prev => {
      const updatedFolders = { ...prev };
      
      // Remove from parent's children array
      updatedFolders[currentFolderId] = {
        ...updatedFolders[currentFolderId],
        children: updatedFolders[currentFolderId].children.filter(id => id !== itemId)
      };
      
      // If it's a folder, we'd need to recursively delete all children too
      // But for simplicity in this demo, we'll just remove the direct references
      
      // Optional: delete the item itself
      // delete updatedFolders[itemId];
      
      return updatedFolders;
    });
    
    toast.info(`${folders[itemId].type === 'folder' ? 'Folder' : 'File'} deleted`);
  }, [currentFolderId, folders]);
  
  // Share item
  const shareItem = useCallback((item) => {
    setSelectedItem(item);
    setShareModalOpen(true);
  }, []);
  
  // Copy share link
  const copyShareLink = useCallback(() => {
    let shareLink;
    
    if (selectedItem.type === 'folder') {
      // Create folder path
      const folderPathSegments = [...pathSegments];
      if (selectedItem.id !== 'root' && selectedItem.id !== currentFolderId) {
        folderPathSegments.push(selectedItem.id);
      }
      shareLink = `${window.location.origin}/folders/${folderPathSegments.join('/')}`;
    } else {
      // File share link
      shareLink = `${window.location.origin}/share/${currentFolderId}/${selectedItem.id}`;
    }
    
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Link copied to clipboard");
  }, [selectedItem, currentFolderId, pathSegments]);
  
  if (!currentFolder) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-surface-600 dark:text-surface-400">Folder not found</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 overflow-x-auto py-2">
        <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
          <button
            onClick={() => navigateToPathLevel(-1)}
            className="flex items-center hover:text-primary"
          >
            <HomeIcon className="w-4 h-4 mr-1" />
            Root
          </button>
          
          {pathSegments.length > 0 && (
            <ChevronRightIcon className="w-4 h-4 text-surface-400 dark:text-surface-600" />
          )}
          
          {pathSegments.map((segment, index) => (
            <div key={segment} className="flex items-center">
              <button
                onClick={() => navigateToPathLevel(index)}
                className={`hover:text-primary ${index === pathSegments.length - 1 ? 'font-medium text-primary' : ''}`}
              >
                {folders[segment]?.name || segment}
              </button>
              
              {index < pathSegments.length - 1 && (
                <ChevronRightIcon className="w-4 h-4 mx-2 text-surface-400 dark:text-surface-600" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={() => setShowNewFolderModal(true)}
          className="btn-primary flex items-center"
        >
          <FolderPlusIcon className="w-5 h-5 mr-2" />
          New Folder
        </button>
        
        <button
          onClick={openFileSelector}
          className="btn-outline flex items-center"
        >
          <UploadIcon className="w-5 h-5 mr-2" />
          Upload Files
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileInputChange}
        />
      </div>
      
      {/* Drop Zone */}
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
        <div className="py-6 px-6 flex flex-col items-center justify-center text-center">
          <div className={`mb-3 rounded-full p-3 ${
            isDragging ? 'bg-primary/20 text-primary' : 'bg-surface-100 dark:bg-surface-700'
          }`}>
            <UploadCloudIcon className="w-6 h-6" />
          </div>
          
          <h3 className="text-lg font-semibold mb-1">
            {isDragging ? 'Drop files to upload here' : 'Drag & drop files here'}
          </h3>
          
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Files will be uploaded to the current folder
          </p>
        </div>
      </motion.div>
      
      {/* Folder Contents */}
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4">
        {currentFolder.children.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentFolder.children.map(itemId => {
              const item = folders[itemId];
              if (!item) return null;
              
              return (
                <motion.div
                  key={itemId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg p-2 bg-surface-100 dark:bg-surface-600 text-surface-700 dark:text-surface-300">
                      {item.type === 'folder' 
                        ? <FolderIcon className="w-6 h-6 text-primary" /> 
                        : getFileIcon(item.fileType)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {item.type === 'folder' ? (
                        <button
                          onClick={() => navigateToFolder(itemId)}
                          className="font-medium text-left truncate text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary transition-colors"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <p className="font-medium truncate">{item.name}</p>
                      )}
                      
                      <div className="flex items-center text-xs text-surface-500 dark:text-surface-500 mt-1">
                        <span>
                          {item.type === 'folder' 
                            ? `Folder · ${new Date(item.createdAt).toLocaleDateString()}`
                            : `${item.size} · ${new Date(item.createdAt).toLocaleDateString()}`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => shareItem(item)}
                        className="p-2 rounded-full text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary transition-colors"
                        aria-label={`Share ${item.type}`}
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteItem(itemId)}
                        className="p-2 rounded-full text-surface-600 hover:text-accent dark:text-surface-400 dark:hover:text-accent transition-colors"
                        aria-label={`Delete ${item.type}`}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FilesIcon className="w-12 h-12 text-surface-400 dark:text-surface-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">This folder is empty</h3>
            <p className="text-surface-500 dark:text-surface-500 max-w-md">
              Start by creating a new folder or uploading files.
            </p>
          </div>
        )}
      </div>
      
      {/* New Folder Modal */}
      <AnimatePresence>
        {showNewFolderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewFolderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg max-w-md w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Create New Folder</h3>
                <button
                  onClick={() => setShowNewFolderModal(false)}
                  className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <label htmlFor="folderName" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Folder Name
                </label>
                <input
                  type="text"
                  id="folderName"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  className="input"
                  autoFocus
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  className="btn-outline"
                  onClick={() => setShowNewFolderModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={createNewFolder}
                >
                  Create Folder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && selectedItem && (
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
                <h3 className="text-xl font-bold">Share {selectedItem.type === 'folder' ? 'Folder' : 'File'}</h3>
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-surface-700 dark:text-surface-300 mb-2">
                  Share link for <strong>{selectedItem.name}</strong>
                </p>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-surface-100 dark:bg-surface-700 rounded-lg px-3 py-2.5 text-sm truncate">
                    {selectedItem.type === 'folder'
                      ? `${window.location.origin}/folders/${pathSegments.join('/')}${selectedItem.id !== currentFolderId && selectedItem.id !== 'root' ? `/${selectedItem.id}` : ''}`
                      : `${window.location.origin}/share/${currentFolderId}/${selectedItem.id}`}
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

export default FolderSystem;