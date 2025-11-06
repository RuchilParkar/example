import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Import all images locally
import Img1 from '../assets/imgs/img1.jpg';
import Img2 from '../assets/imgs/img2.jpg';
import Img3 from '../assets/imgs/img3.jpg';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([0, 2]);

  // Using locally imported images instead of placeholder URLs
  const photos = [
    {
      id: 1,
      url: Img1,
      title: 'Beautiful Sunset Together',
      description: 'That magical evening when we watched the sunset by the lake',
      date: 'June 15, 2024'
    },
    {
      id: 2,
      url: Img2,
      title: 'Coffee Date Memories',
      description: 'Our favorite café where we spent hours just talking and laughing',
      date: 'May 22, 2024'
    },
    {
      id: 3,
      url: Img3,
      title: 'Beach Adventure',
      description: 'Walking hand in hand along the shore, making memories',
      date: 'July 3, 2024'
    },
    
  ];

  const toggleFavorite = (index: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (selectedPhoto !== null) {
    const photo = photos[selectedPhoto];
    return (
      <div className="h-full bg-gradient-to-br from-purple-900 to-black relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 text-8xl">💖</div>
          <div className="absolute bottom-10 right-10 text-8xl">✨</div>
        </div>
        
        {/* Back button */}
        <button
          onClick={() => setSelectedPhoto(null)}
          className="absolute top-4 left-4 z-10 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Favorite button */}
        <button
          onClick={(e) => toggleFavorite(selectedPhoto, e)}
          className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${favorites.includes(selectedPhoto) ? 'fill-pink-500 text-pink-500' : 'text-white'}`} 
          />
        </button>
        
        <div className="h-full flex items-center justify-center">
          {/* Previous button */}
          <button
            onClick={() => setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : photos.length - 1)}
            className="absolute left-4 z-10 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Photo display */}
          <div className="max-w-4xl max-h-full p-8 flex flex-col items-center">
            <div className="relative">
              <img
                src={photo.url}
                alt={photo.title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl border-4 border-white/20 shadow-2xl"
              />
              
              {/* Decorative corner hearts */}
              <div className="absolute -top-3 -left-3 bg-gradient-to-br from-pink-500 to-pink-600 p-1.5 rounded-full shadow-lg">
                <span className="text-xs">💕</span>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-pink-500 to-pink-600 p-1.5 rounded-full shadow-lg">
                <span className="text-xs">💕</span>
              </div>
            </div>
            
            {/* Photo info */}
            <div className="text-center mt-6 bg-white/10 backdrop-blur-md p-5 rounded-xl w-full max-w-lg">
              <h3 className="text-white text-xl font-bold mb-2">{photo.title}</h3>
              <p className="text-pink-200 mb-2">{photo.description}</p>
              <div className="text-xs text-gray-400 flex items-center justify-center mt-3">
                <span className="mr-2">📆</span>
                {photo.date}
              </div>
            </div>
          </div>
          
          {/* Next button */}
          <button
            onClick={() => setSelectedPhoto(selectedPhoto < photos.length - 1 ? selectedPhoto + 1 : 0)}
            className="absolute right-4 z-10 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Photo counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm">
          {selectedPhoto + 1} / {photos.length}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 overflow-auto">
      <div className="p-6">
        {/* Header with emoji instead of Camera icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-white">
            <span className="text-4xl">📸</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent mb-2">Our Memories</h1>
          <p className="text-pink-600">Every picture tells our love story</p>
        </div>

        {/* Gallery header with floating hearts */}
        <div className="relative mb-8">
          <div className="h-32 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-2xl flex items-center justify-center overflow-hidden">
            {/* Floating hearts */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute text-pink-300 opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.max(20, Math.random() * 30)}px`,
                  animation: `float ${3 + Math.random() * 5}s infinite ease-in-out`,
                  animationDelay: `${i * 0.5}s`
                }}
              >
                {['💖', '💕', '💗', '💓', '💘'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
            
            <div className="text-center z-10 px-5">
              <h2 className="text-xl font-bold text-pink-700 mb-1">Cherished Moments Together</h2>
              <p className="text-purple-600 text-sm">Click on any photo to view our special memories</p>
            </div>
          </div>
        </div>

        {/* Photo grid with improved styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white transform hover:-translate-y-1"
              onClick={() => setSelectedPhoto(index)}
            >
              {/* Image container with fixed aspect ratio */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay with heart */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={(e) => toggleFavorite(index, e)}
                    className="p-2 bg-white/30 backdrop-blur-sm rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <Heart 
                      className={`w-5 h-5 ${favorites.includes(index) ? 'fill-pink-500 text-pink-500' : 'text-white'}`} 
                    />
                  </button>
                </div>
                
                {/* Date ribbon */}
                <div className="absolute top-3 left-0 bg-pink-500 text-white text-xs px-3 py-1 rounded-r-full shadow-md">
                  {photo.date}
                </div>
                
                {/* Favorite indicator */}
                {favorites.includes(index) && (
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md">
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  </div>
                )}
              </div>
              
              {/* Caption */}
              <div className="p-4 border-t border-pink-100">
                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Cute footer */}
        <div className="text-center mt-10 mb-4">
          <div className="inline-flex items-center bg-white px-5 py-3 rounded-full shadow-md border border-pink-200">
            <span className="text-lg mr-2">💘</span>
            <span className="text-pink-700">Making memories with you is my favorite thing to do</span>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
};

export default PhotoGallery;