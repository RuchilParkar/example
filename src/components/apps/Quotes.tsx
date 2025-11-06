import React, { useState } from 'react';
import { MessageSquare, Heart, RefreshCw, Star } from 'lucide-react';

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      id: 1,
      text: "NISHI, loving YOU isn't just an emotion—it's how my soul breathes.",
      author: "Ruchil",
      category: "Love"
    },
    {
      id: 2,
      text: "Your name is safe in my mouth, I'll never let anyone twist it into something ugly.",
      author: "Ruchil",
      category: "Romance"
    },
    {
      id: 3,
      text: "What i feel for YOU isn't poetrt it's pulse, it's the reason behind every calm breath i take after a long day.",
      author: "Ruchil",
      category: "Love"
    },
    {
      id: 4,
      text: "It took years to learn patience, empathy, honesty—but you, you taught me that real love carries all of it, effortlessly.",
      author: "Ruchil",
      category: "Wisdom"
    },
    {
      id: 5,
      text: "With YOU, NISHI, love is not an escape from life it's the reason i want to live it fully, loudly, gratefully.",
      author: "Ruchil",
      category: "Life"
    },
    {
      id: 6,
      text: "NISHI, what i feel for you scince can't measure it, and psychology can't define it, but I live it, everyday.",
      author: "Ruchil",
      category: "Philosophy"
    },
    {
      id: 7,
      text: "Before YOU, my dreams were just mine. With YOU, they're ourss and they feel real.",
      author: "Ruchil",
      category: "Dreams"
    },
    {
      id: 8,
      text: "If souls are made in pairs, then mine came with NISHI engraved in silence.",
      author: "Ruchil",
      category: "Soul"
    }
    
  ];

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const randomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(randomIndex);
  };

  const quote = quotes[currentQuote];

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="p-6">
        <div className="text-center mb-8">
          <MessageSquare className="w-12 h-12 text-teal-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Love Quotes</h1>
          <p className="text-teal-600">Words that capture the essence of our love</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Quote Display */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center relative overflow-hidden">
            <div className="absolute top-4 left-6 text-6xl text-teal-100 font-serif">"</div>
            <div className="absolute bottom-4 right-6 text-6xl text-teal-100 font-serif">"</div>
            
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl text-gray-800 font-light leading-relaxed mb-6 italic">
                {quote.text}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-4 h-4 text-yellow-500" />
                <p className="text-lg text-gray-600 font-medium">— {quote.author}</p>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                {quote.category}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={prevQuote}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              ← Previous
            </button>
            <button
              onClick={randomQuote}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Random</span>
            </button>
            <button
              onClick={nextQuote}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Next →
            </button>
          </div>

          {/* Quote Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quotes.map((q, index) => (
              <div
                key={q.id}
                className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                  index === currentQuote ? 'ring-2 ring-teal-500' : ''
                }`}
                onClick={() => setCurrentQuote(index)}
              >
                <div className="flex items-start space-x-2 mb-2">
                  <Heart className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    {q.text.length > 120 ? `${q.text.substring(0, 120)}...` : q.text}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">— {q.author}</p>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {q.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;