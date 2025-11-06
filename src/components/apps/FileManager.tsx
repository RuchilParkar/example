import React, { useState } from 'react';
import { ArrowLeft, Home, Grid3X3, List, MoreVertical } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { getResponsiveWindowPosition, getResponsiveWindowSize } from '../../utils/windowUtils';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified?: string;
  emoji: string;
  color?: string;
  children?: FileItem[];
  content?: string;
}

const FileManager = () => {
  const { dispatch } = useOS();
  const [currentPath, setCurrentPath] = useState('/');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [openFile, setOpenFile] = useState<FileItem | null>(null);

  const fileStructure: FileItem[] = [
    {
      id: 'love-letters',
      name: "Love Letters",
      type: 'folder',
      emoji: '💌',
      color: 'bg-rose-500',
      children: [
        { 
          id: 'letter1', 
          name: 'Why I Love You.txt', 
          type: 'file', 
          size: '2.1 KB', 
          modified: '24 days ago', 
          emoji: '📝',
          content: `My Dearest Love,

I'm writing this to remind you of all the reasons why I love you so deeply:

• Your beautiful smile brightens even my darkest days
• The way your eyes light up when you talk about your passions
• Your kindness and compassion for everyone around you
• How you make me laugh like no one else can
• Your strength and resilience through every challenge
• The way you NISHI NIShI 
• How safe I feel when I'm with NISHI

Every day with you is a blessing, and I'm grateful for each moment we share.

Forever yours,
Me ❤️`
        },
        { 
          id: 'letter2', 
          name: 'Our First Date.txt', 
          type: 'file', 
          size: '1.8 KB', 
          modified: '1 week ago', 
          emoji: '📝',
          content: `My Love,

Do you remember our first date? I think about it all the time.

I was so nervous, checking my outfit a dozen times before leaving the house. When I saw you waiting there, my heart skipped a beat. You looked so beautiful.

We talked for hours, discovering our shared passions and dreams. Time seemed to stop when we were together. I knew then that you were someone special.

That magical evening set us on this beautiful journey together, and I wouldn't change a single moment of it.

Always and forever,
Your favorite person ❤️`
        },
        { 
          id: 'letter3', 
          name: 'Future Dreams.txt', 
          type: 'file', 
          size: '2.5 KB', 
          modified: '3 days ago', 
          emoji: '📝',
          content: `My Sweet Love,

When I think about our future together, my heart fills with joy and excitement.

I dream of lazy Sunday mornings making breakfast together, traveling to all the places on our bucket list, building a home filled with laughter and love, and growing old side by side.

I can't wait to create more beautiful memories with you, to support each other through life's challenges, and to celebrate all our victories together.

Whatever the future holds, I know it will be wonderful because we'll face it together.

With all my love,
Your forever person 💖`
        },
      ]
    },
    {
      id: 'memories',
      name: "Our Memories",
      type: 'folder',
      emoji: '🖼️',
      color: 'bg-pink-500',
      children: [
        { id: 'photo1', name: 'First Date.jpg', type: 'file', size: '3.2 MB', modified: '1 month ago', emoji: '📷' },
        { id: 'photo2', name: 'Beach Trip.jpg', type: 'file', size: '4.1 MB', modified: '2 weeks ago', emoji: '📷' },
        { id: 'video1', name: 'Dancing Together.mp4', type: 'file', size: '15.7 MB', modified: '1 week ago', emoji: '🎬' },
      ]
    },
    {
      id: 'music',
      name: "Our Playlist",
      type: 'folder',
      emoji: '🎵',
      color: 'bg-green-500',
      children: [
        { id: 'song1', name: 'Perfect - Ed Sheeran.mp3', type: 'file', size: '4.2 MB', modified: '5 days ago', emoji: '🎧' },
        { id: 'song2', name: 'All of Me - John Legend.mp3', type: 'file', size: '3.8 MB', modified: '1 week ago', emoji: '🎧' },
        { id: 'song3', name: 'Thinking Out Loud.mp3', type: 'file', size: '4.5 MB', modified: '3 days ago', emoji: '🎧' },
      ]
    },
    {
      id: 'special-dates',
      name: "Special Dates",
      type: 'folder',
      emoji: '📅',
      color: 'bg-purple-500',
      children: [
        { 
          id: 'calendar1', 
          name: 'Anniversary Reminders.txt', 
          type: 'file', 
          size: '1.2 KB', 
          modified: '1 day ago', 
          emoji: '📝',
          content: `Our Special Dates ❤️

• First Met: The day our eyes connected and everything changed
• First Date: Our magical evening at that little café by the park
• First Kiss: Under the stars, a moment I'll never forget
• First "I Love You": When words finally expressed what our hearts knew
• Anniversary: A celebration of our beautiful journey together

These dates are etched in my heart forever. Each one marks a precious milestone in our love story.

I'm looking forward to adding many more special dates to our collection!`
        },
        { 
          id: 'calendar2', 
          name: 'Birthday Plans.txt', 
          type: 'file', 
          size: '2.8 KB', 
          modified: '2 weeks ago', 
          emoji: '📝',
          content: `Birthday Surprise Plans ✨

For Your Special Day:

Morning:
• Breakfast in bed with your favorites
• A special gift waiting on the nightstand
• Your favorite music playing softly

Afternoon:
• Picnic at our special spot
• Photo session to capture memories
• That surprise activity you've been hinting about!

Evening:
• Dinner reservations at the place you've wanted to try
• Cake and champagne under the stars
• Dancing to our song

I can't wait to make your birthday as special as you are to me. You deserve all the happiness in the world! ❤️`
        },
      ]
    },
    {
      id: 'important',
      name: 'BIRTHDAY_WISH.txt',
      type: 'file',
      size: '1.7 KB',
      modified: 'Today',
      emoji: '🎂',
      content: `✨ HAPPY BIRTHDAY MY LOVE! ✨

My dearest sweetheart,

On this special day that celebrates you, I wanted to take a moment to tell you how incredibly lucky I feel to have you in my life.

Every moment with you is a gift that I cherish. Your smile lights up even my darkest days, and your love gives me strength I never knew I had.

My birthday wishes for you:

• May this year bring you all the joy your heart can hold
• May every dream you've ever had begin to come true
• May you always feel as loved as you truly are
• May your laughter never end and your spirit never dim
• May our journey together continue to be filled with beautiful memories

Thank you for being born and for being exactly who you are. You make my world more beautiful just by existing in it.

Today is all about celebrating YOU - the most amazing person I know!

With all my love and birthday kisses,
Your person forever 💖`
    }
  ];

  const [currentItems, setCurrentItems] = useState<FileItem[]>(fileStructure);
  const [pathHistory, setPathHistory] = useState<string[]>(['/']);

  const navigateToFolder = (folder: FileItem) => {
    if (folder.type === 'folder' && folder.children) {
      setCurrentItems(folder.children);
      const newPath = currentPath === '/' ? `/${folder.name}` : `${currentPath}/${folder.name}`;
      setCurrentPath(newPath);
      setPathHistory([...pathHistory, newPath]);
      setOpenFile(null);
    }
  };

  const openTextFile = (file: FileItem) => {
    if (file.type === 'file' && file.content) {
      setOpenFile(file);
    }
  };

  const closeFile = () => {
    setOpenFile(null);
  };

  const navigateBack = () => {
    if (pathHistory.length > 1) {
      const newHistory = pathHistory.slice(0, -1);
      const previousPath = newHistory[newHistory.length - 1];
      setPathHistory(newHistory);
      setCurrentPath(previousPath);
      
      if (previousPath === '/') {
        setCurrentItems(fileStructure);
      } else {
        // Navigate to the correct folder based on path
        const pathParts = previousPath.split('/').filter(Boolean);
        let items = fileStructure;
        for (const part of pathParts) {
          const folder = items.find(item => item.name === part && item.type === 'folder');
          if (folder && folder.children) {
            items = folder.children;
          }
        }
        setCurrentItems(items);
      }
      setOpenFile(null);
    }
  };

  const navigateHome = () => {
    setCurrentPath('/');
    setCurrentItems(fileStructure);
    setPathHistory(['/']);
    setOpenFile(null);
  };

  const toggleSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: FileItem) => {
    // Special handling for specific folders to open their respective apps
    if (item.type === 'folder') {
      // Handle special folders to open respective apps
      switch (item.id) {
        case 'love-letters':
          // Open the LoveLetters component
          const llSize = getResponsiveWindowSize(800, 600);
          const llPosition = getResponsiveWindowPosition(llSize.width, llSize.height);
          
          dispatch({
            type: 'OPEN_WINDOW',
            payload: {
              title: 'Love Letters',
              component: 'LoveLetters',
              isMinimized: false,
              isMaximized: false,
              position: llPosition,
              size: llSize,
              props: { fromFileManager: true, folderPath: currentPath + (currentPath === '/' ? '' : '/') + item.name }
            },
          });
          return;
        
        case 'memories':
          // Open the PhotoGallery component
          const pgSize = getResponsiveWindowSize(900, 650);
          const pgPosition = getResponsiveWindowPosition(pgSize.width, pgSize.height);
          
          dispatch({
            type: 'OPEN_WINDOW',
            payload: {
              title: 'Our Memories',
              component: 'PhotoGallery',
              isMinimized: false,
              isMaximized: false,
              position: pgPosition,
              size: pgSize,
              props: { fromFileManager: true, folderPath: currentPath + (currentPath === '/' ? '' : '/') + item.name }
            },
          });
          return;
        
        case 'music':
          // Open the MusicPlayer component
          const mpSize = getResponsiveWindowSize(350, 600);
          const mpPosition = getResponsiveWindowPosition(mpSize.width, mpSize.height);
          
          dispatch({
            type: 'OPEN_WINDOW',
            payload: {
              title: 'Our Playlist',
              component: 'MusicPlayer',
              isMinimized: false,
              isMaximized: false,
              position: mpPosition,
              size: mpSize,
              props: { fromFileManager: true, folderPath: currentPath + (currentPath === '/' ? '' : '/') + item.name }
            },
          });
          return;
        
        case 'special-dates':
          // Open the SpecialDates component
          const sdSize = getResponsiveWindowSize(800, 600);
          const sdPosition = getResponsiveWindowPosition(sdSize.width, sdSize.height);
          
          dispatch({
            type: 'OPEN_WINDOW',
            payload: {
              title: 'Special Dates',
              component: 'Calendar', // Fix: Changed from 'Calender' to 'SpecialDates'
              isMinimized: false,
              isMaximized: false,
              position: sdPosition,
              size: sdSize,
              props: { fromFileManager: true, folderPath: currentPath + (currentPath === '/' ? '' : '/') + item.name }
            },
          });
          return;

        default:
          // Handle regular folders
          navigateToFolder(item);
          return;
      }
    } else if (item.content) {
      // Open text files in the file viewer
      openTextFile(item);
    }
  };

  const renderGridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {currentItems.map((item) => {
        const isSelected = selectedItems.includes(item.id);
        
        return (
          <div
            key={item.id}
            className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-pink-50 hover:shadow-md ${
              isSelected ? 'bg-pink-100 ring-2 ring-pink-400' : ''
            }`}
            onClick={() => toggleSelection(item.id)}
            onDoubleClick={() => handleItemClick(item)}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 ${
              item.type === 'folder' 
                ? item.color || 'bg-pink-500' 
                : 'bg-gradient-to-br from-pink-100 to-purple-100'
            } shadow-md`}>
              <span className="text-3xl">{item.emoji}</span>
            </div>
            <span className="text-sm font-medium text-gray-800 text-center max-w-full truncate">
              {item.name}
            </span>
            {item.size && (
              <span className="text-xs text-gray-500 mt-1">{item.size}</span>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderListView = () => (
    <div className="p-6">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-4 gap-4 p-4 bg-pink-50 border-b text-sm font-medium text-gray-600">
          <div>Name</div>
          <div>Size</div>
          <div>Modified</div>
          <div>Type</div>
        </div>
        {currentItems.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          
          return (
            <div
              key={item.id}
              className={`grid grid-cols-4 gap-4 p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-pink-50 ${
                isSelected ? 'bg-pink-100' : ''
              }`}
              onClick={() => toggleSelection(item.id)}
              onDoubleClick={() => handleItemClick(item)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  item.type === 'folder' 
                    ? item.color || 'bg-pink-500' 
                    : 'bg-gradient-to-br from-pink-100 to-purple-100'
                }`}>
                  <span className="text-lg">{item.emoji}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{item.name}</span>
              </div>
              <div className="text-sm text-gray-600">{item.size || '-'}</div>
              <div className="text-sm text-gray-600">{item.modified || '-'}</div>
              <div className="text-sm text-gray-600 capitalize">{item.type}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (openFile) {
    return (
      <div className="h-full bg-gradient-to-br from-pink-50 to-rose-50 flex flex-col">
        <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200 p-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={closeFile}
              className="px-3 py-1 bg-pink-100 hover:bg-pink-200 rounded-lg text-pink-800 transition-colors flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <h2 className="text-lg font-medium text-gray-800">{openFile.name}</h2>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 border border-pink-200">
            <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
              {openFile.content}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-pink-50 to-rose-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-2xl">📁</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Our Files</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={navigateBack}
              disabled={pathHistory.length <= 1}
              className="p-2 rounded-lg text-gray-600 hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={navigateHome}
              className="p-2 rounded-lg text-gray-600 hover:bg-pink-100"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>

          {/* Path breadcrumb */}
          <div className="flex-1 bg-pink-50 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-600">{currentPath}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {viewMode === 'grid' ? renderGridView() : renderListView()}
      </div>

      {/* Status bar */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-pink-200 p-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{currentItems.length} items</span>
          <div className="flex items-center space-x-2">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>for you</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;