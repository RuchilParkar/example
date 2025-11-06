import React from 'react';
import { Clock, Heart, Star, Camera, Music, Gift, CakeIcon, BirdIcon, Flower2Icon, MessageCircleIcon, CakeSlice } from 'lucide-react';

const Timeline = () => {
  const memories = [
    {
      id: 1,
      date: 'July, 2023',
      title: 'Where It All Began',
      description: 'We met in a group chat random, unexpected. But something about you pulled me in. We started talking more, laughing more, and just like that… you became my best friend. It was never forced. It just fit .',
      icon: MessageCircleIcon,
      color: 'bg-blue-500',
      image: 'https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      date: 'August 9, 2024',
      title: 'The Yes That Changed Everything',
      description: 'I told you how I felt every word typed with shaky fingers and a racing heart. I didn’t know what you"d say… but then you said yes. And in that moment, the whole world felt right. You were mine.',
      icon: Heart,
      color: 'bg-red-500',
      image: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      date: 'November 20, 2024',
      title: 'Your First Birthday With Me',
      description: 'I couldn’t be there in person, but I was there in every way I could be with words, love, and all the effort my heart could give. Your first birthday as my girlfriend, and all I wanted was to make you feel how much you mean to me.',
      icon: CakeIcon,
      color: 'bg-purple-500',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      date: 'February 14, 2025',
      title: 'Our First Valentine’s Day',
      description: 'No roses, no candlelight, just two souls syncing through a screen. We celebrated our first Valentine’s Day in our own way sweet messages and that feeling of being deeply, truly loved.',
      icon: Flower2Icon,
      color: 'bg-blue-500',
      image: 'https://images.pexels.com/photos/1024981/pexels-photo-1024981.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      date: 'June 24, 2025',
      title: 'My First Birthday With You Around',
      description: 'You made me feel seen, special, and truly loved without even being in the same place. Every word from you was a gift. My first birthday with you in my life, and I wouldn’t change a thing.',
      icon: CakeSlice,
      color: 'bg-red-900',
      image: 'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      date: 'Today',
      title: 'Every Day With You',
      description: 'Each day brings new reasons to love you more. Here\'s to all the beautiful memories yet to come.',
      icon: Heart,
      color: 'bg-pink-500',
      image: 'https://images.pexels.com/photos/1024969/pexels-photo-1024969.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="p-6">
        <div className="text-center mb-8">
          <Clock className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Memory Lane</h1>
          <p className="text-indigo-600">Every message, every smile, every “I miss you” shaped this beautiful journey of us.Because even the smallest chats with you became the biggest parts of my heart</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-200"></div>

            {memories.map((memory, index) => {
              const IconComponent = memory.icon;
              return (
                <div key={memory.id} className="relative flex items-start mb-12">
                  {/* Timeline dot */}
                  <div className={`absolute left-6 w-4 h-4 ${memory.color} rounded-full border-4 border-white shadow-lg z-10`}></div>
                  
                  {/* Content */}
                  <div className="ml-16 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={memory.image}
                          alt={memory.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-8 h-8 ${memory.color} rounded-full flex items-center justify-center`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{memory.title}</h3>
                            <p className="text-sm text-gray-600">{memory.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{memory.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;