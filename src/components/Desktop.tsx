import React, { useEffect, useState } from 'react';
import DesktopIcon from './DesktopIcon';

const Desktop = () => {
  const icons = [
    { 
      id: 'love-letters', 
      title: 'Love Letters', 
      emoji: '💌', 
      component: 'LoveLetters',
      customImage: null
    },
    { 
      id: 'photos', 
      title: 'Our Memories', 
      emoji: '📸', 
      component: 'PhotoGallery',
      customImage: null
    },
    { 
      id: 'music', 
      title: 'Our Playlist', 
      emoji: '🎵', 
      component: 'MusicPlayer',
      customImage: null
    },
    { 
      id: 'notepad', 
      title: 'Love Notes', 
      emoji: '📝', 
      component: 'Notepad',
      customImage: null
    },
    { 
      id: 'calendar', 
      title: 'Special Dates', 
      emoji: '📅',
      component: 'Calendar',
      customImage: null
    },
    { 
      id: 'timeline', 
      title: 'Memory Lane', 
      emoji: '⏳',
      component: 'Timeline',
      customImage: null
    },
    { 
      id: 'quotes', 
      title: 'Love Quotes', 
      emoji: '💬',
      component: 'Quotes',
      customImage: null
    },
    { 
      id: 'file-manager', 
      title: 'File Manager', 
      emoji: '📁',
      component: 'FileManager',
      customImage: null
    },
  ];

  // Calculate how many icons can fit in one column based on screen height
  const [iconsPerColumn, setIconsPerColumn] = useState(5);
  
  useEffect(() => {
    const updateIconsPerColumn = () => {
      const screenHeight = window.innerHeight;
      const iconHeight = 80; // Approx height of icon + gap
      const safeMargin = 200; // For taskbar and other UI elements
      const availableHeight = screenHeight - safeMargin;
      const maxIcons = Math.max(3, Math.floor(availableHeight / iconHeight));
      setIconsPerColumn(maxIcons);
    };
    
    updateIconsPerColumn();
    window.addEventListener('resize', updateIconsPerColumn);
    
    return () => {
      window.removeEventListener('resize', updateIconsPerColumn);
    };
  }, []);
  
  // Split icons into columns
  const columnCount = Math.ceil(icons.length / iconsPerColumn);
  const columns = [...Array(columnCount)].map((_, colIndex) => {
    const startIndex = colIndex * iconsPerColumn;
    return icons.slice(startIndex, startIndex + iconsPerColumn);
  });

  return (
    <div className="h-full p-8 flex gap-16">
      {columns.map((columnIcons, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-6 items-start">
          {columnIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              {...icon}
              gridPosition={icons.findIndex(i => i.id === icon.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Desktop;