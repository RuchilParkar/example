/**
 * Calculates the optimal position for a new window based on screen size
 */
export const getResponsiveWindowPosition = (width: number, height: number) => {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    // Center the window precisely on mobile devices
    return { 
      x: Math.max(0, Math.floor((window.innerWidth - width) / 2)), 
      y: Math.max(0, Math.floor((window.innerHeight - height) / 2)) 
    };
  }
  
  // On desktop, add some randomization for a more natural feel
  return {
    x: 100 + Math.random() * 200,
    y: 100 + Math.random() * 150
  };
};

/**
 * Returns appropriate window dimensions based on screen size
 */
export const getResponsiveWindowSize = (defaultWidth: number, defaultHeight: number) => {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    // Use smaller margin on mobile for more space
    return { 
      width: Math.min(defaultWidth, window.innerWidth - 16), 
      height: Math.min(defaultHeight, window.innerHeight - 64) 
    };
  }
  
  return { width: defaultWidth, height: defaultHeight };
};