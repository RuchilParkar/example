import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../context/OSContext';
import { Minimize2, Maximize2, X } from 'lucide-react';

const Window = ({
  id,
  title,
  isMinimized,
  isMaximized,
  position,
  size,
  zIndex,
  children,
}) => {
  const { dispatch } = useOS();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;

  // Handle mouse down for drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    dispatch({ type: 'SET_ACTIVE_WINDOW', payload: id });
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };
  
  // Handle touch start for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMaximized) return;
    
    dispatch({ type: 'SET_ACTIVE_WINDOW', payload: id });
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    const touch = e.touches[0];
    
    if (rect && touch) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  };

  // Mouse move and touch move handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        dispatch({
          type: 'UPDATE_WINDOW_POSITION',
          payload: {
            id,
            position: {
              x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 50)),
              y: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 50)),
            },
          },
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && !isMaximized && e.touches[0]) {
        e.preventDefault(); // Prevent scrolling while dragging
        dispatch({
          type: 'UPDATE_WINDOW_POSITION',
          payload: {
            id,
            position: {
              x: Math.max(0, Math.min(e.touches[0].clientX - dragOffset.x, window.innerWidth - 50)),
              y: Math.max(0, Math.min(e.touches[0].clientY - dragOffset.y, window.innerHeight - 50)),
            },
          },
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset, id, dispatch, isMaximized]);

  if (isMinimized) return null;

  // Update the windowStyle calculation with better mobile handling
  const windowStyle = isMaximized
    ? { 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: 'calc(100vh - 48px)' 
      }
    : { 
        top: typeof position.y === 'string' ? position.y : Math.max(0, Math.min(position.y, window.innerHeight - 100)),
        left: typeof position.x === 'string' ? position.x : Math.max(0, Math.min(position.x, window.innerWidth - 100)),
        width: Math.min(size.width, window.innerWidth - 20),
        height: Math.min(size.height, window.innerHeight - 80)
      };

  return (
    <div
      ref={windowRef}
      className="fixed bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden"
      style={{ ...windowStyle, zIndex }}
    >
      {/* Title bar */}
      <div
        className="h-12 bg-gradient-to-r from-gray-100/50 to-gray-200/50 backdrop-blur-xl flex items-center justify-between px-4 cursor-move border-b border-white/20"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <span className="text-gray-800 font-medium">{title}</span>
        <div className="flex items-center space-x-2">
          <button
            className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors duration-200"
            onClick={() => dispatch({ type: 'MINIMIZE_WINDOW', payload: id })}
          >
            <Minimize2 className="w-3 h-3 text-white" />
          </button>
          <button
            className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-200"
            onClick={() => dispatch({ type: 'MAXIMIZE_WINDOW', payload: id })}
          >
            <Maximize2 className="w-3 h-3 text-white" />
          </button>
          <button
            className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-200"
            onClick={() => dispatch({ type: 'CLOSE_WINDOW', payload: id })}
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
      
      {/* Window content */}
      <div className="h-full overflow-auto" style={{ height: 'calc(100% - 48px)' }}>
        {children}
      </div>
    </div>
  );
};

export default Window;