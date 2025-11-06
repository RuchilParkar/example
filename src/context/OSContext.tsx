import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Window {
  id: string;
  title: string;
  component: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface App {
  id: string;
  title: string;
  icon: any;
  component: string;
}

interface OSState {
  windows: Window[];
  activeWindow: string | null;
  nextZIndex: number;
  showStartMenu: boolean;
  recentApps: App[];
}

type OSAction =
  | { type: 'OPEN_WINDOW'; payload: Omit<Window, 'id' | 'zIndex'> }
  | { type: 'CLOSE_WINDOW'; payload: string }
  | { type: 'SET_ACTIVE_WINDOW'; payload: string }
  | { type: 'MINIMIZE_WINDOW'; payload: string }
  | { type: 'MAXIMIZE_WINDOW'; payload: string }
  | { type: 'UPDATE_WINDOW_POSITION'; payload: { id: string; position: { x: number; y: number } } }
  | { type: 'UPDATE_WINDOW_SIZE'; payload: { id: string; size: { width: number; height: number } } }
  | { type: 'TOGGLE_START_MENU' }
  | { type: 'ADD_RECENT_APP'; payload: App };

const initialState: OSState = {
  windows: [],
  activeWindow: null,
  nextZIndex: 1000,
  showStartMenu: false,
  recentApps: [],
};

const osReducer = (state: OSState, action: OSAction): OSState => {
  switch (action.type) {
    case 'OPEN_WINDOW':
      const newWindow: Window = {
        ...action.payload,
        id: Date.now().toString(),
        zIndex: state.nextZIndex,
      };
      return {
        ...state,
        windows: [...state.windows, newWindow],
        activeWindow: newWindow.id,
        nextZIndex: state.nextZIndex + 1,
      };

    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.payload),
        activeWindow: state.activeWindow === action.payload ? null : state.activeWindow,
      };

    case 'SET_ACTIVE_WINDOW':
      return {
        ...state,
        activeWindow: action.payload,
        windows: state.windows.map(w =>
          w.id === action.payload ? { ...w, zIndex: state.nextZIndex } : w
        ),
        nextZIndex: state.nextZIndex + 1,
      };

    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload ? { ...w, isMinimized: !w.isMinimized } : w
        ),
      };

    case 'MAXIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload ? { ...w, isMaximized: !w.isMaximized } : w
        ),
      };

    case 'UPDATE_WINDOW_POSITION':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.id ? { ...w, position: action.payload.position } : w
        ),
      };

    case 'UPDATE_WINDOW_SIZE':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.id ? { ...w, size: action.payload.size } : w
        ),
      };

    case 'TOGGLE_START_MENU':
      return {
        ...state,
        showStartMenu: !state.showStartMenu,
      };

    case 'ADD_RECENT_APP':
      const existingIndex = state.recentApps.findIndex(app => app.id === action.payload.id);
      let newRecentApps = [...state.recentApps];
      
      if (existingIndex !== -1) {
        newRecentApps.splice(existingIndex, 1);
      }
      
      newRecentApps.unshift(action.payload);
      newRecentApps = newRecentApps.slice(0, 5); // Keep only 5 recent apps
      
      return {
        ...state,
        recentApps: newRecentApps,
      };

    default:
      return state;
  }
};

const OSContext = createContext<{
  state: OSState;
  dispatch: React.Dispatch<OSAction>;
} | null>(null);

export const OSProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(osReducer, initialState);

  return (
    <OSContext.Provider value={{ state, dispatch }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};