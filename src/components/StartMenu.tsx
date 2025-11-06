import React, { useState } from 'react';
import { useOS } from '../context/OSContext';
import { Power, Settings, User, Grid, RefreshCw, Moon, Clock } from 'lucide-react';

const StartMenu = () => {
  const { state, dispatch } = useOS();
  const [showPowerMenu, setShowPowerMenu] = useState(false);

  if (!state.showStartMenu) return null;

  // Updated apps array with emojis instead of Lucide icons
  const apps = [
    { id: 'love-letters', title: 'Love Letters', emoji: '💌', component: 'LoveLetters' },
    { id: 'photos', title: 'Our Memories', emoji: '📸', component: 'PhotoGallery' },
    { id: 'music', title: 'Our Playlist', emoji: '🎵', component: 'MusicPlayer' },
    { id: 'notepad', title: 'Notes For You', emoji: '📝', component: 'Notepad' },
    { id: 'calendar', title: 'Special Dates', emoji: '📅', component: 'Calendar' },
    { id: 'timeline', title: 'Memory Lane', emoji: '⏳', component: 'Timeline' },
    { id: 'quotes', title: 'Quotes', emoji: '💬', component: 'Quotes' },
    { id: 'file-manager', title: 'File Manager', emoji: '📁', component: 'FileManager' },
  ];

  const recentApps = state.recentApps.slice(0, 3);

  const openApp = (app) => {
    const windowSize = getResponsiveWindowSize(800, 600);
    const windowPosition = getResponsiveWindowPosition(windowSize.width, windowSize.height);
    
    dispatch({
      type: 'OPEN_WINDOW',
      payload: {
        title: app.title,
        component: app.component,
        isMinimized: false,
        isMaximized: false,
        position: windowPosition,
        size: windowSize,
      },
    });
    dispatch({ type: 'ADD_RECENT_APP', payload: app });
    dispatch({ type: 'TOGGLE_START_MENU' });
  };

  const openProfile = () => {
    dispatch({
      type: 'OPEN_WINDOW',
      payload: {
        title: 'User Profile',
        component: 'Profile',
        isMinimized: false,
        isMaximized: false,
        position: { x: 150, y: 100 },
        size: { width: 500, height: 400 },
      },
    });
    dispatch({ type: 'TOGGLE_START_MENU' });
  };

  const openSettings = () => {
    dispatch({
      type: 'OPEN_WINDOW',
      payload: {
        title: 'Settings',
        component: 'Settings',
        isMinimized: false,
        isMaximized: false,
        position: { x: 200, y: 100 },
        size: { width: 600, height: 500 },
      },
    });
    dispatch({ type: 'TOGGLE_START_MENU' });
  };

  const handlePower = (action) => {
    setShowPowerMenu(false);
    dispatch({ type: 'TOGGLE_START_MENU' });
    
    // Simulate system actions
    if (action === 'shutdown') {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: { message: 'Shutting down...', type: 'info' }});
      setTimeout(() => {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#ffe6f2;color:#ff66b2;font-family:\'Comic Sans MS\', cursive;font-size:2rem;">System powered off with love ❤️</div>';
      }, 1500);
    } else if (action === 'restart') {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: { message: 'Restarting...', type: 'info' }});
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else if (action === 'sleep') {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: { message: 'Entering sleep mode...', type: 'info' }});
      setTimeout(() => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.background = 'linear-gradient(to right bottom, #ffb6c1, #ffc0cb, #e0ffff)';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 2s ease';
        overlay.style.zIndex = '9999';
        document.body.appendChild(overlay);
        
        setTimeout(() => {
          overlay.style.opacity = '0.9';
        }, 100);
      }, 500);
    }
  };

  // Modified Recent Apps section to use emojis
  const renderRecentApps = () => {
    if (recentApps.length === 0) return null;
    
    return (
      <div className="p-4 border-b-2 border-pink-100 bg-white/50">
        <h4 className="text-pink-500 text-sm font-medium mb-3 flex items-center">
          <Clock className="w-3 h-3 mr-2" />
          Recent
        </h4>
        <div className="space-y-2">
          {recentApps.map((app) => (
            <button
              key={app.id}
              onClick={() => openApp(app)}
              className="w-full flex items-center space-x-3 p-2 rounded-xl hover:bg-pink-100/50 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl flex items-center justify-center shadow-md border border-pink-100">
                <span className="text-xl">{app.emoji}</span>
              </div>
              <span className="text-purple-700 text-sm font-medium">{app.title}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-pink-100/30 backdrop-blur-sm z-40"
        onClick={() => dispatch({ type: 'TOGGLE_START_MENU' })}
      />
      
      {/* Start Menu - Cute Version */}
      <div className="fixed bottom-14 left-4 w-96 bg-pink-50/90 backdrop-blur-xl rounded-3xl border-2 border-pink-200 shadow-2xl z-50 overflow-hidden">
        {/* Cute decorative bubbles */}
        <div className="absolute -right-6 -top-6 w-16 h-16 bg-purple-200 rounded-full opacity-50"></div>
        <div className="absolute right-10 -top-3 w-8 h-8 bg-pink-300 rounded-full opacity-40"></div>
        <div className="absolute -left-4 bottom-12 w-12 h-12 bg-blue-200 rounded-full opacity-40"></div>
        
        {/* Header - Cute pastel gradient */}
        <div className="p-6 bg-gradient-to-r from-pink-200 via-purple-100 to-pink-200 relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <span className="text-2xl">💖</span>
            </div>
            <div>
              <h3 className="text-pink-600 font-bold text-xl" style={{ fontFamily: "'Comic Neue', cursive" }}>Heyyyy Nishi Ji</h3>
              <p className="text-purple-500 text-sm">Welcome to Nishi's OS 1.0</p>
            </div>
          </div>
        </div>

        {/* Recent Apps Section */}
        {renderRecentApps()}

        {/* All Apps - Updated with emojis and removed circle */}
        <div className="p-4 bg-white/50">
          <h4 className="text-pink-500 text-sm font-medium mb-3 flex items-center">
            <Grid className="w-3 h-3 mr-2" />
            All Apps
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => openApp(app)}
                className="flex flex-col items-center p-3 rounded-xl hover:bg-pink-100/70 transition-all duration-200 transform hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center mb-2 shadow-md border border-pink-100">
                  <span className="text-2xl">{app.emoji}</span>
                </div>
                <span className="text-purple-700 text-xs font-medium text-center">{app.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer - Cute pastels */}
        <div className="p-4 border-t-2 border-pink-100 flex items-center justify-between bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
          <button 
            onClick={openProfile}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 p-2 hover:bg-pink-100/50 rounded-xl"
          >
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Profile</span>
          </button>
          <button 
            onClick={openSettings}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 p-2 hover:bg-pink-100/50 rounded-xl"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowPowerMenu(!showPowerMenu)}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 p-2 hover:bg-pink-100/50 rounded-xl"
            >
              <Power className="w-4 h-4" />
              <span className="text-sm font-medium">Power</span>
            </button>
            
            {showPowerMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-44 bg-white/90 backdrop-blur-xl border-2 border-pink-200 rounded-xl overflow-hidden shadow-xl">
                <button 
                  onClick={() => handlePower('shutdown')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-pink-100/70 text-left"
                >
                  <Power className="w-4 h-4 text-red-400" />
                  <span className="text-pink-600 text-sm font-medium">Shut Down</span>
                </button>
                <button 
                  onClick={() => handlePower('restart')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-pink-100/70 text-left"
                >
                  <RefreshCw className="w-4 h-4 text-yellow-500" />
                  <span className="text-pink-600 text-sm font-medium">Restart</span>
                </button>
                <button 
                  onClick={() => handlePower('sleep')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-pink-100/70 text-left"
                >
                  <Moon className="w-4 h-4 text-blue-400" />
                  <span className="text-pink-600 text-sm font-medium">Sleep</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;

function getResponsiveWindowSize(baseWidth, baseHeight) {
  // Example responsive logic (you can customize this)
  const width = window.innerWidth < 600 ? window.innerWidth - 50 : baseWidth;
  const height = window.innerHeight < 400 ? window.innerHeight - 50 : baseHeight;
  
  return { width, height };
}

function getResponsiveWindowPosition(width, height) {
  // Example responsive position logic (you can customize this)
  const x = (window.innerWidth - width) / 2;
  const y = (window.innerHeight - height) / 2;
  
  return { x, y };
}