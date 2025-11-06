import React, { useState, useRef } from 'react';
import { useOS } from '../context/OSContext';
import { getResponsiveWindowPosition, getResponsiveWindowSize } from '../utils/windowUtils';

interface DesktopIconProps {
  id: string;
  title: string;
  emoji: string;
  component: string;
  customImage: string | null;
  gridPosition: number;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  id, 
  title, 
  emoji, 
  component, 
  customImage, 
  gridPosition 
}) => {
  const { dispatch } = useOS();
  const [currentImage, setCurrentImage] = useState<string | null>(customImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    const windowSize = getResponsiveWindowSize(800, 600);
    const windowPosition = getResponsiveWindowPosition(windowSize.width, windowSize.height);
    
    dispatch({
      type: 'OPEN_WINDOW',
      payload: {
        title,
        component,
        isMinimized: false,
        isMaximized: false,
        position: windowPosition,
        size: windowSize,
      },
    });
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center group">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <div
        className="relative cursor-pointer transition-all duration-200 hover:scale-105"
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleRightClick}
        title="Right-click to change icon image"
      >
        {/* Icon container */}
        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg flex items-center justify-center mb-2 hover:bg-white/20 transition-all duration-200">
          {currentImage ? (
            <img 
              src={currentImage} 
              alt={title}
              className="w-8 h-8 object-cover rounded-lg"
            />
          ) : (
            <span className="text-2xl">{emoji}</span>
          )}
        </div>
        
        {/* Selection indicator */}
        <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
      </div>
      
      {/* Icon label */}
      <span className="text-white text-xs font-medium text-center max-w-16 truncate bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon;