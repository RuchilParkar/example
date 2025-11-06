import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, SkipBack, SkipForward, Heart, Volume2, Repeat, Shuffle, ChevronUp, ChevronDown, ChevronLeft } from 'lucide-react';
import { useOS } from '../../context/OSContext';

// Import audio files
import PerfectAudio from '../assets/music/perfect.mp3';
import PrettyLittle from '../assets/music/prettylittlebaby.mp3';
import TumMile from '../assets/music/tummile.mp3';

const MusicPlayer = ({ fromFileManager = false }) => {
  const { dispatch } = useOS();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [progress, setProgress] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([1, 4]); 
  const [currentTime, setCurrentTime] = useState("0:00");
  const [volume, setVolume] = useState(70);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [songDurations, setSongDurations] = useState<{[key: number]: string}>({});
  const progressBarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Cute album covers with actual audio files, but without hardcoded durations
  const playlist = [
    { 
      id: 1, 
      title: "Perfect", 
      artist: "Ed Sheeran", 
      color: "from-pink-400 to-red-400",
      cover: "💖",
      audio: PerfectAudio
    },
    { 
      id: 2, 
      title: "Pretty Little Baby", 
      artist: "Connie Francis", 
      color: "from-purple-400 to-indigo-400",
      cover: "💜",
      audio: PrettyLittle
    },
    { 
      id: 3, 
      title: "Tum Mile", 
      artist: "Neeraj Shridhar", 
      color: "from-purple-400 to-indigo-400",
      cover: "💜",
      audio: TumMile
    }
    // Add more songs here
  ];

  // Function to calculate and store duration of an audio file
  const calculateDuration = (audioSrc: string, songId: number) => {
    const audio = new Audio();
    audio.src = audioSrc;
    
    audio.addEventListener('loadedmetadata', () => {
      const durationInSeconds = Math.floor(audio.duration);
      const formattedDuration = formatTime(durationInSeconds);
      
      setSongDurations(prev => ({
        ...prev,
        [songId]: formattedDuration
      }));
    });
    
    // Clean up to prevent memory leaks
    audio.load();
  };
  
  // Load durations for all songs on component mount
  useEffect(() => {
    playlist.forEach(song => {
      calculateDuration(song.audio, song.id);
    });
  }, []);

  const currentTrack = playlist[currentSong];
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(currentTrack.audio);
    audioRef.current.volume = volume / 100;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Function to return to FileManager
  const returnToFileManager = () => {
    if (fromFileManager) {
      // Pause audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Close this window
      dispatch({ type: 'CLOSE_ACTIVE_WINDOW' });
      
      // Open File Manager
      dispatch({
        type: 'OPEN_WINDOW',
        payload: {
          title: 'File Manager',
          component: 'FileManager',
          isMinimized: false,
          isMaximized: false,
          position: { x: 100 + Math.random() * 100, y: 100 + Math.random() * 100 },
          size: { width: 800, height: 600 }
        },
      });
    }
  };

  // Handle song changes
  useEffect(() => {
    if (audioRef.current) {
      // Save current playing state
      const wasPlaying = !audioRef.current.paused;
      
      // Pause current audio
      audioRef.current.pause();
      
      // Load new song
      audioRef.current.src = currentTrack.audio;
      audioRef.current.load();
      
      // Reset time and progress
      setProgress(0);
      setCurrentTime("0:00");
      
      // Restore playing state if it was playing before
      if (wasPlaying) {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong, currentTrack.audio]);
  
  // Handle play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  // Update progress and time display during playback
  useEffect(() => {
    if (!audioRef.current) return;
    
    const updateProgress = () => {
      if (audioRef.current && !isDragging) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 1;
        const progressPercent = (currentTime / duration) * 100;
        
        setProgress(progressPercent);
        setCurrentTime(formatTime(Math.floor(currentTime)));
      }
    };
    
    const handleEnded = () => {
      nextSong();
    };
    
    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [isDragging]);

  // Handle progress bar mouse/touch events
  const handleProgressBarClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!progressBarRef.current || !audioRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    
    const position = (clientX - rect.left) / rect.width;
    const newProgress = Math.max(0, Math.min(100, position * 100));
    
    setProgress(newProgress);
    
    // Update audio time
    const duration = audioRef.current.duration || 0;
    const newTime = duration * (newProgress / 100);
    audioRef.current.currentTime = newTime;
    
    setCurrentTime(formatTime(Math.floor(newTime)));
  };
  
  const handleProgressBarMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    handleProgressBarClick(e);
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && progressBarRef.current && audioRef.current) {
        const rect = progressBarRef.current.getBoundingClientRect();
        const position = (e.clientX - rect.left) / rect.width;
        const newProgress = Math.max(0, Math.min(100, position * 100));
        
        setProgress(newProgress);
        
        // Update time display
        const duration = audioRef.current.duration || 0;
        const newTime = duration * (newProgress / 100);
        setCurrentTime(formatTime(Math.floor(newTime)));
      }
    };
    
    const handleMouseUp = () => {
      if (isDragging && audioRef.current) {
        // Update actual audio time when dragging ends
        const duration = audioRef.current.duration || 0;
        const newTime = duration * (progress / 100);
        audioRef.current.currentTime = newTime;
        
        setIsDragging(false);
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && progressBarRef.current && audioRef.current && e.touches[0]) {
        const rect = progressBarRef.current.getBoundingClientRect();
        const position = (e.touches[0].clientX - rect.left) / rect.width;
        const newProgress = Math.max(0, Math.min(100, position * 100));
        
        setProgress(newProgress);
        
        // Update time display
        const duration = audioRef.current.duration || 0;
        const newTime = duration * (newProgress / 100);
        setCurrentTime(formatTime(Math.floor(newTime)));
      }
    };
    
    const handleTouchEnd = () => {
      if (isDragging && audioRef.current) {
        // Update actual audio time when dragging ends
        const duration = audioRef.current.duration || 0;
        const newTime = duration * (progress / 100);
        audioRef.current.currentTime = newTime;
        
        setIsDragging(false);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, progress]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSong((currentSong + 1) % playlist.length);
  };

  const prevSong = () => {
    setCurrentSong(currentSong === 0 ? playlist.length - 1 : currentSong - 1);
  };
  
  const toggleFavorite = (id: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };
  
  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
      {/* Add a Back to Files button when opened from FileManager */}
      {fromFileManager && (
        <div className="p-2 bg-white/80 backdrop-blur-sm border-b border-pink-200">
          <button 
            onClick={returnToFileManager}
            className="px-3 py-1 bg-pink-100 hover:bg-pink-200 rounded-lg text-pink-800 transition-colors flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Files
          </button>
        </div>
      )}
      
      {/* Header - Now Playing Bar */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-pink-200/80 to-purple-200/80 backdrop-blur-md">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${currentTrack.color} shadow-lg flex items-center justify-center border-2 border-white`}>
            <span className="text-2xl sm:text-3xl">{currentTrack.cover}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-bold text-pink-800 line-clamp-1">{currentTrack.title}</h2>
            <p className="text-xs sm:text-sm text-purple-700">{currentTrack.artist}</p>
          </div>
          <button 
            onClick={() => toggleFavorite(currentTrack.id)}
            className="p-2 hover:bg-pink-100/50 rounded-full transition-colors"
          >
            <Heart 
              className={`w-5 h-5 ${favorites.includes(currentTrack.id) ? 'text-pink-500 fill-pink-500' : 'text-gray-400'}`}
            />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-5">
        {/* Album Display */}
        <div className="flex justify-center mb-6 sm:mb-10 mt-2 sm:mt-5">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 blur-2xl opacity-40 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full"></div>
            
            {/* Floating hearts animation */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute text-sm opacity-40 text-pink-500"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${3 + Math.random() * 5}s infinite ease-in-out`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  {i % 2 === 0 ? '💕' : '✨'}
                </div>
              ))}
            </div>
            
            <div 
              className={`relative w-48 h-48 sm:w-60 sm:h-60 bg-gradient-to-br ${currentTrack.color} rounded-3xl shadow-2xl 
                        flex items-center justify-center border-4 border-white 
                        ${isPlaying ? 'animate-[pulse_4s_ease-in-out_infinite]' : ''}`}
            >
              <span className="text-6xl sm:text-8xl">{currentTrack.cover}</span>
              
              {/* Decorative elements */}
              <div className="absolute -right-3 -top-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                <Heart className={`w-5 h-5 ${favorites.includes(currentTrack.id) ? 'text-pink-500 fill-pink-500' : 'text-gray-300'}`} />
              </div>
              
              <div className="absolute -left-3 -bottom-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                <Music className="w-5 h-5 text-purple-400" />
              </div>
              
              {/* Cute sticker in corner */}
              <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-pink-100 rounded-full transform rotate-12 flex items-center justify-center shadow border-2 border-white">
                <span className="text-sm">🎀</span>
              </div>
            </div>
          </div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-pink-800 mb-1">{currentTrack.title}</h1>
          <p className="text-sm sm:text-base text-purple-600">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar - Update to use dynamic duration */}
        <div className="mb-6 sm:mb-8 max-w-md mx-auto px-2">
          <div 
            ref={progressBarRef}
            className="relative h-3 cursor-pointer touch-none"
            onClick={handleProgressBarClick}
            onMouseDown={handleProgressBarMouseDown}
            onTouchStart={handleProgressBarMouseDown}
          >
            <div className="absolute inset-0 rounded-full bg-gray-200"></div>
            <div 
              className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" 
              style={{ width: `${progress}%` }}
            ></div>
            <div 
              className="absolute h-6 w-6 bg-white border-2 border-purple-500 rounded-full -top-1.5 shadow-md"
              style={{ left: `calc(${progress}% - 12px)` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2 px-1">
            <span>{currentTime}</span>
            <span>{songDurations[currentTrack.id] || "0:00"}</span>
          </div>
        </div>

        {/* Controls - Mobile Friendly */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
          <button 
            className="w-8 h-8 text-purple-400 hover:text-purple-600 transition-colors"
            aria-label="Shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>
          
          <button
            onClick={prevSong}
            className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors active:bg-pink-300"
            aria-label="Previous song"
          >
            <SkipBack className="w-6 h-6 text-pink-600 ml-1" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center hover:from-pink-600 hover:to-purple-600 transition-colors shadow-lg transform hover:scale-105 transition-transform active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-white" />
            ) : (
              <Play className="w-7 h-7 text-white ml-1" />
            )}
          </button>
          
          <button
            onClick={nextSong}
            className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors active:bg-pink-300"
            aria-label="Next song"
          >
            <SkipForward className="w-6 h-6 text-pink-600 ml-1" />
          </button>
          
          <button 
            className="w-8 h-8 text-purple-400 hover:text-purple-600 transition-colors"
            aria-label="Repeat"
          >
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Slider - Mobile Friendly */}
        <div className="flex items-center justify-center space-x-3 mb-6 sm:mb-10">
          <Volume2 className="w-4 h-4 text-purple-500" />
          <div className="relative w-32 h-6 touch-none">
            <div className="absolute inset-y-2.5 inset-x-0 rounded-full bg-gray-200"></div>
            <div 
              className="absolute top-2.5 bottom-2.5 left-0 rounded-full bg-purple-400" 
              style={{ width: `${volume}%` }}
            ></div>
            <input 
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Volume"
            />
            <div 
              className="absolute h-5 w-5 bg-white border border-purple-400 rounded-full top-0.5 shadow-md pointer-events-none" 
              style={{ left: `calc(${volume}% - 10px)` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Playlist Toggle Button - Mobile friendly */}
      <button 
        onClick={togglePlaylist}
        className="flex items-center justify-center p-3 bg-pink-100 mx-auto rounded-t-xl border-2 border-b-0 border-pink-200 transform transition-transform duration-300"
        style={{ transform: showPlaylist ? 'translateY(0)' : 'translateY(10px)' }}
      >
        {showPlaylist ? (
          <ChevronDown className="w-5 h-5 text-pink-500" />
        ) : (
          <>
            <ChevronUp className="w-5 h-5 text-pink-500" />
            <span className="ml-1 text-sm font-medium text-pink-700">Playlist</span>
          </>
        )}
      </button>
      
      {/* Playlist - Mobile Friendly with TouchEvents */}
      <div 
        className={`bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out 
                   ${showPlaylist ? 'max-h-64' : 'max-h-0'} overflow-hidden`}
      >
        <div className="p-3 sm:p-4 border-b border-pink-100 flex justify-between items-center">
          <h3 className="font-medium text-pink-800 flex items-center">
            <Music className="w-4 h-4 text-pink-500 mr-2" />
            Songs That Remind Me of Us
          </h3>
          <div className="text-xs bg-pink-100 px-2 py-1 rounded-lg text-pink-600">
            {playlist.length} songs
          </div>
        </div>
        
        <div className="overflow-y-auto" style={{ maxHeight: '40vh' }}>
          {playlist.map((song, index) => (
            <div
              key={song.id}
              className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b border-pink-50 last:border-b-0 
                         hover:bg-pink-50/50 transition-colors flex items-center 
                         ${index === currentSong ? 'bg-pink-100/50' : ''}`}
              onClick={() => {
                setCurrentSong(index);
                setIsPlaying(true);
              }}
              onTouchStart={() => {}} // Empty handler to ensure mobile click works
            >
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${song.color} flex items-center justify-center shadow-md mr-3`}>
                <span className="text-lg">{song.cover}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className={`font-medium truncate ${index === currentSong ? 'text-pink-800' : 'text-gray-800'}`}>{song.title}</div>
                <div className="text-xs text-gray-500 truncate">{song.artist}</div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => toggleFavorite(song.id, e)}
                  className="p-2 hover:bg-pink-100 rounded-full"
                  onTouchStart={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Heart 
                    className={`w-3.5 h-3.5 ${favorites.includes(song.id) ? 'text-pink-500 fill-pink-500' : 'text-gray-400'}`} 
                  />
                </button>
                <span className="text-xs text-gray-500">{songDurations[song.id] || "..."}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;