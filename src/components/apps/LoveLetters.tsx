import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, Home, Mail, Calendar, Clock } from 'lucide-react';
import { useOS } from '../../context/OSContext';

// Update the component to receive props
const LoveLetters = ({ fromFileManager = false }) => {
  const { dispatch } = useOS();
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Enhanced letter data
  const letters = [
    {
      id: 1,
      title: "Why I Love You.txt",
      date: "2 days ago",
      size: "2.1 KB",
      emoji: "💌",
      preview: "My dearest love, every morning I wake up grateful for you...",
      content: `My dearest love,

Every morning I wake up grateful for you. Your smile lights up my world in ways I never thought possible. You bring joy to the simplest moments and make every day feel like an adventure.

I love the way you laugh at my silly jokes, how you always know exactly what to say when I'm having a tough day, and the way you make everything better just by being you.

You are my best friend, my partner in crime, and the love of my life. Thank you for being the most amazing person I know.

Forever yours,
With all my love 💕`
    },
    {
      id: 2,
      title: "Our First Date.txt",
      date: "1 week ago",
      size: "1.8 KB",
      emoji: "💘",
      preview: "I still remember every detail of our first date...",
      content: `My beautiful girl,

I still remember every detail of our first date - how nervous I was, how beautiful you looked, and how effortlessly our conversation flowed. From that moment, I knew you were special.

The way you laughed at my stories, how you listened with such genuine interest, and the spark in your eyes when you talked about your passions - I was completely enchanted.

That first date was just the beginning of the most beautiful love story I could have ever imagined.

With endless love,
Your devoted partner 💖`
    },
    {
      id: 3,
      title: "Future Dreams.txt",
      date: "3 days ago",
      size: "2.5 KB",
      emoji: "💝",
      preview: "When I think about our future together...",
      content: `My forever love,

When I think about our future together, my heart fills with excitement and joy. I dream of all the adventures we'll have, the memories we'll create, and the love we'll continue to build.

I imagine us laughing together until we're old and gray, supporting each other through every challenge, and celebrating every victory side by side.

You are my today, my tomorrow, and my always. I can't wait to spend the rest of my life loving you.

Forever and always,
Your soulmate 💕✨`
    },
    {
      id: 4,
      title: "My Promise.txt",
      date: "Yesterday",
      size: "1.9 KB",
      emoji: "💞",
      preview: "I promise to always be there for you...",
      content: `My sweetest love,

This is my promise to you - to stand by your side through every storm, to celebrate with you in every joy, to support you in every dream, and to love you with all my heart every single day.

I promise to be your biggest fan, your trusted confidant, your loyal partner, and your best friend. I promise to choose you, again and again, every day for the rest of our lives.

When the days are hard, I'll hold your hand. When the nights are long, I'll be your comfort. And in all the moments in between, I'll be there loving you.

This is my solemn promise, sealed with all my love.

Yours forever,
Your faithful partner 💖`
    },
    {
      id: 5,
      title: "Moments I Cherish.txt",
      date: "5 days ago",
      size: "2.3 KB",
      emoji: "💗",
      preview: "There are so many little moments with you that I treasure...",
      content: `My darling,

There are so many little moments with you that I treasure - the way you look first thing in the morning, your laugh when something really amuses you, how focused you get when you're passionate about something.

I cherish our quiet evenings together, our silly inside jokes, our deep conversations late at night, and even our little disagreements that always lead to understanding each other better.

These seemingly ordinary moments are what make our love extraordinary. They're the building blocks of our story, and I'm grateful for each one.

Thank you for all these beautiful moments, past and future.

With endless affection,
The one who loves collecting memories with you 💕`
    }
  ];

  // Function to return to FileManager when coming from there
  const returnToFileManager = () => {
    if (fromFileManager) {
      // Close the LoveLetters window
      dispatch({ type: 'CLOSE_ACTIVE_WINDOW' });
      
      // Open FileManager with the Love Letters folder open
      dispatch({
        type: 'OPEN_WINDOW',
        payload: {
          title: 'File Manager',
          component: 'FileManager',
          isMinimized: false,
          isMaximized: false,
          position: { x: 100 + Math.random() * 100, y: 100 + Math.random() * 100 },
          size: { width: 800, height: 600 },
          // You could add some state to have FileManager open at this path
          props: { initialPath: '/Love Letters' }
        },
      });
    } else {
      // Just go back to the letter list
      setSelectedLetter(null);
    }
  };

  // Modify the back button handler in the letter view
  if (selectedLetter !== null) {
    const letter = letters[selectedLetter];
    return (
      <div className="h-full bg-gradient-to-br from-pink-50 to-rose-50 flex flex-col">
        <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200 p-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSelectedLetter(null)}
              className="px-3 py-1 bg-pink-100 hover:bg-pink-200 rounded-lg text-pink-800 transition-colors flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <h2 className="text-lg font-medium text-gray-800">{letter.title}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            {/* Letter header */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-pink-200 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-rose-400 rounded-xl flex items-center justify-center shadow-md text-white">
                  <span className="text-2xl">{letter.emoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-pink-800 mb-1">{letter.title.replace('.txt', '')}</h3>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 inline" /> {letter.date}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1 inline" /> {new Date().toLocaleDateString()}
                    </div>
                    <div>{letter.size}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Letter content */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-pink-200">
              <div className="prose prose-pink max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {letter.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main letter list view
  return (
    <div className="h-full bg-gradient-to-br from-pink-50 to-rose-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-2xl">💌</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Love Letters</h1>
          </div>
          
          {/* View toggle buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {fromFileManager ? (
              <button
                onClick={returnToFileManager}
                className="px-3 py-1 bg-pink-100 hover:bg-pink-200 rounded-lg text-pink-800 transition-colors flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Files
              </button>
            ) : (
              <button
                className="p-2 rounded-lg text-gray-600 hover:bg-pink-100"
              >
                <Home className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Path breadcrumb */}
          <div className="flex-1 bg-pink-50 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-600">
              {fromFileManager ? '/File Manager/Love Letters' : '/Love Letters'}
            </span>
          </div>
        </div>
      </div>

      {/* Content - Grid and List views remain the same */}
      <div className="flex-1 overflow-auto p-6">
        {viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {letters.map((letter, index) => (
              <div
                key={letter.id}
                className="flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-pink-50 hover:shadow-md"
                onClick={() => setSelectedLetter(index)}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 bg-gradient-to-br from-pink-300 to-rose-400 shadow-md">
                  <span className="text-3xl">{letter.emoji}</span>
                </div>
                <span className="text-sm font-medium text-gray-800 text-center max-w-full truncate">
                  {letter.title}
                </span>
                <span className="text-xs text-gray-500 mt-1">{letter.size}</span>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 gap-4 p-4 bg-pink-50 border-b text-sm font-medium text-gray-600">
              <div>Name</div>
              <div>Size</div>
              <div>Modified</div>
              <div>Type</div>
            </div>
            {letters.map((letter, index) => (
              <div
                key={letter.id}
                className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-pink-50"
                onClick={() => setSelectedLetter(index)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-pink-300 to-rose-400">
                    <span className="text-lg">{letter.emoji}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{letter.title}</span>
                </div>
                <div className="text-sm text-gray-600">{letter.size}</div>
                <div className="text-sm text-gray-600">{letter.date}</div>
                <div className="text-sm text-gray-600">Text</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status bar remains the same */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-pink-200 p-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{letters.length} items</span>
          <div className="flex items-center space-x-2">
            <span>Written with</span>
            <span className="text-red-500">❤️</span>
            <span>just for you</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveLetters;