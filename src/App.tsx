import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import StartMenu from './components/StartMenu';
import { OSProvider } from './context/OSContext';
// Import the wallpaper image
import wallpaperImage from './components/assets/hello-kitty.gif';  // Add your image file here

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState("Starting up...");
  const [showWelcome, setShowWelcome] = useState(false);

  // Extract SVG data URL to avoid JSX parsing issues
  const dotPatternUrl = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  useEffect(() => {
    const bootSequence = async () => {
      // Simulate boot progress
      const steps = [
        { progress: 20, message: "Initializing LoveOS..." },
        { progress: 40, message: "Loading romantic modules..." },
        { progress: 60, message: "Preparing your memories..." },
        { progress: 80, message: "Setting up love applications..." },
        { progress: 100, message: "Welcome to Nishi's OS!" }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setBootProgress(step.progress);
        setBootMessage(step.message);
        
        // Show the welcome message when we reach 100%
        if (step.progress === 100) {
          await new Promise(resolve => setTimeout(resolve, 800));
          setShowWelcome(true);
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoaded(true);
    };

    bootSequence();
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-100 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm w-full">
          {/* Enhanced animated loader with multiple layers */}
          <div className="relative mb-10 flex justify-center">
            {/* Outer ring - slow spin */}
            <div className="w-24 h-24 rounded-full border-4 border-pink-100 border-t-pink-400 border-r-purple-300 animate-spin" style={{ animationDuration: '3s' }}></div>
            
            {/* Middle ring - medium spin */}
            <div className="absolute w-20 h-20 top-2 left-1/2 -ml-10 rounded-full border-4 border-purple-100 border-t-purple-400 border-l-pink-300 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            
            {/* Inner ring - fast spin with glow */}
            <div className="absolute w-16 h-16 top-4 left-1/2 -ml-8 rounded-full border-4 border-pink-200 border-b-purple-400 animate-spin shadow-[0_0_15px_rgba(236,72,153,0.5)]" style={{ animationDuration: '1.5s' }}></div>
            
            {/* Center heart with pulse effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl animate-pulse" style={{ animationDuration: '2s' }}>💕</span>
            </div>
          </div>
          
          <h2 
            className="text-2xl sm:text-3xl font-bold text-purple-600 mb-6 tracking-wide" 
            style={{ fontFamily: "'Bubblegum Sans', cursive", textShadow: '0 2px 4px rgba(139, 92, 246, 0.2)' }}
          >
            Nishi's OS
          </h2>
          
          {showWelcome ? (
            <div className="animate-bounce" style={{ animationDuration: '1.5s' }}>
              <p 
                className="text-xl sm:text-2xl text-pink-500 mb-8 font-bold" 
                style={{ fontFamily: "'Bubblegum Sans', cursive", textShadow: '0 1px 2px rgba(236, 72, 153, 0.2)' }}
              >
                Welcome Nishi Ji ❤️
              </p>
            </div>
          ) : (
            <p 
              className="text-base sm:text-lg text-purple-500 mb-8 font-medium px-4" 
              style={{ fontFamily: "'Comic Neue', cursive" }}
            >
              {bootMessage}
            </p>
          )}
          
          {/* Enhanced progress bar */}
          <div className="w-full max-w-xs mx-auto">
            <div className="relative">
              {/* Background track with pattern */}
              <div className="w-full bg-gradient-to-r from-purple-50 to-pink-50 rounded-full h-4 mb-3 overflow-hidden shadow-inner">
                {/* Animated dots for texture */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                
                {/* Animated progress fill */}
                <div 
                  className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                  style={{ width: `${bootProgress}%` }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                  
                  {/* Moving highlight */}
                  <div 
                    className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-30 animate-shimmer"
                    style={{ 
                      animation: 'shimmer 2s infinite',
                      animationTimingFunction: 'ease-in-out' 
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Percentage with better styling */}
              <p className="text-sm font-medium text-purple-500 tracking-wider">{bootProgress}%</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <OSProvider>
      <div className="h-screen overflow-hidden relative">
        {/* Custom wallpaper background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${wallpaperImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Semi-transparent overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Floating elements can still be kept if desired */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 5}s infinite ease-in-out`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                {i % 3 === 0 ? '💕' : i % 3 === 1 ? '✨' : '🌸'}
              </div>
            ))}
          </div>
        </div>

        <Desktop />
        <WindowManager />
        <StartMenu />
        <Taskbar />
      </div>
    </OSProvider>
  );
}

export default App;