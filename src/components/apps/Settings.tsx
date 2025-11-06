import React, { useState } from 'react';
import { Monitor, Bell, Palette, Info, Check } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('default');
  const [animation, setAnimation] = useState('enabled');
  const [savedMessage, setSavedMessage] = useState('');
  
  const handleSave = () => {
    setSavedMessage('Settings saved successfully!');
    setTimeout(() => {
      setSavedMessage('');
    }, 3000);
  };
  
  const renderAppearanceTab = () => (
    <div>
      <h3 className="text-lg font-medium text-purple-700 mb-4">Appearance Settings</h3>
      
      <div className="space-y-5">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-pink-100">
          <h4 className="text-sm font-medium text-pink-600 mb-3">Theme</h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button 
              className={`p-3 rounded-lg border-2 transition-colors ${theme === 'default' ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-200'}`}
              onClick={() => setTheme('default')}
            >
              <div className="w-full h-10 bg-gradient-to-r from-pink-200 to-purple-200 rounded-md mb-2"></div>
              <div className="text-xs font-medium text-gray-600">Pink Paradise</div>
              {theme === 'default' && <Check className="w-4 h-4 absolute top-2 right-2 text-pink-500" />}
            </button>
            
            <button 
              className={`p-3 rounded-lg border-2 transition-colors relative ${theme === 'lavender' ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}`}
              onClick={() => setTheme('lavender')}
            >
              <div className="w-full h-10 bg-gradient-to-r from-purple-200 to-blue-200 rounded-md mb-2"></div>
              <div className="text-xs font-medium text-gray-600">Lavender Dream</div>
              {theme === 'lavender' && <Check className="w-4 h-4 absolute top-2 right-2 text-purple-500" />}
            </button>
            
            <button 
              className={`p-3 rounded-lg border-2 transition-colors relative ${theme === 'sunset' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}
              onClick={() => setTheme('sunset')}
            >
              <div className="w-full h-10 bg-gradient-to-r from-orange-200 to-pink-200 rounded-md mb-2"></div>
              <div className="text-xs font-medium text-gray-600">Sunset Glow</div>
              {theme === 'sunset' && <Check className="w-4 h-4 absolute top-2 right-2 text-orange-500" />}
            </button>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-pink-100">
          <h4 className="text-sm font-medium text-pink-600 mb-3">Animations</h4>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="animation-enabled" 
                name="animation" 
                className="w-4 h-4 text-pink-500 focus:ring-pink-400"
                checked={animation === 'enabled'}
                onChange={() => setAnimation('enabled')}
              />
              <label htmlFor="animation-enabled" className="ml-2 text-sm text-gray-700">Enable animations</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="radio" 
                id="animation-reduced" 
                name="animation" 
                className="w-4 h-4 text-pink-500 focus:ring-pink-400"
                checked={animation === 'reduced'}
                onChange={() => setAnimation('reduced')}
              />
              <label htmlFor="animation-reduced" className="ml-2 text-sm text-gray-700">Reduced animations</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="radio" 
                id="animation-disabled" 
                name="animation" 
                className="w-4 h-4 text-pink-500 focus:ring-pink-400"
                checked={animation === 'disabled'}
                onChange={() => setAnimation('disabled')}
              />
              <label htmlFor="animation-disabled" className="ml-2 text-sm text-gray-700">Disable animations</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderNotificationsTab = () => (
    <div>
      <h3 className="text-lg font-medium text-purple-700 mb-4">Notification Settings</h3>
      
      <div className="space-y-5">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Enable notifications</h4>
              <p className="text-sm text-gray-500">Receive alerts for special moments</p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
            </label>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Sound effects</h4>
              <p className="text-sm text-gray-500">Play sounds for notifications</p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={soundEnabled}
                onChange={() => setSoundEnabled(!soundEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderAboutTab = () => (
    <div>
      <h3 className="text-lg font-medium text-purple-700 mb-4">About NISHI's-OS</h3>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-pink-100 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">💕</span>
        </div>
        
        <h4 className="text-xl font-bold text-pink-600 mb-2">NISHI's-OS 1.0</h4>
        <p className="text-gray-600 mb-4">Created with love for NISHI Ji</p>
        
        <div className="px-4 py-2 bg-pink-50 rounded-lg inline-block">
          <p className="text-sm text-pink-600">Made especially for my pookie wookie sweet little baby</p>
        </div>
      </div>
      
      <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-pink-100">
        <h4 className="text-sm font-medium text-pink-600 mb-3">Features</h4>
        
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-2">
              <span className="text-xs">💌</span>
            </div>
            Love Letters - Heartfelt messages just for you
          </li>
          <li className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-2">
              <span className="text-xs">🎵</span>
            </div>
            Music Player - Songs that remind me of us
          </li>
          <li className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-2">
              <span className="text-xs">📸</span>
            </div>
            Photo Gallery - Our beautiful memories
          </li>
        </ul>
      </div>
    </div>
  );
  
  return (
    <div className="h-full bg-gradient-to-br from-pink-50 to-purple-50 overflow-auto">
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Settings</h2>
        
        {/* Settings tabs */}
        <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
          <button 
            className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap ${activeTab === 'appearance' ? 'bg-pink-100 text-pink-600' : 'bg-white/70 text-gray-600 hover:bg-pink-50'}`}
            onClick={() => setActiveTab('appearance')}
          >
            <Palette className="w-4 h-4 mr-2" />
            <span>Appearance</span>
          </button>
          
          <button 
            className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap ${activeTab === 'notifications' ? 'bg-pink-100 text-pink-600' : 'bg-white/70 text-gray-600 hover:bg-pink-50'}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="w-4 h-4 mr-2" />
            <span>Notifications</span>
          </button>
          
          <button 
            className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap ${activeTab === 'about' ? 'bg-pink-100 text-pink-600' : 'bg-white/70 text-gray-600 hover:bg-pink-50'}`}
            onClick={() => setActiveTab('about')}
          >
            <Info className="w-4 h-4 mr-2" />
            <span>About</span>
          </button>
        </div>
        
        {/* Content area */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-pink-100 min-h-[400px]">
          {activeTab === 'appearance' && renderAppearanceTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'about' && renderAboutTab()}
        </div>
        
        {/* Save button */}
        {activeTab !== 'about' && (
          <div className="mt-6 flex justify-end">
            <button 
              className="px-5 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg shadow-md hover:from-pink-500 hover:to-purple-500 transition-colors"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        )}
        
        {/* Success message */}
        {savedMessage && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
            <Check className="w-5 h-5 mr-2" />
            {savedMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;