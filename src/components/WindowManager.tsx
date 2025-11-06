import React from 'react';
import { useOS } from '../context/OSContext';
import Window from './Window';
import LoveLetters from './apps/LoveLetters';
import PhotoGallery from './apps/PhotoGallery';
import MusicPlayer from './apps/MusicPlayer';
import Notepad from './apps/Notepad';
import Calendar from './apps/Calendar';
import Timeline from './apps/Timeline';
import Quotes from './apps/Quotes';
import FileManager from './apps/FileManager';
import Settings from './apps/Settings';
import Profile from './apps/Profile';

const components = {
  LoveLetters,
  PhotoGallery,
  MusicPlayer,
  Notepad,
  Calendar,
  Timeline,
  Quotes,
  FileManager,
  Settings,
  Profile,
};

const WindowManager = () => {
  const { state } = useOS();

  return (
    <>
      {state.windows.map(window => {
        const Component = components[window.component as keyof typeof components];
        return (
          <Window key={window.id} {...window}>
            <Component />
          </Window>
        );
      })}
    </>
  );
};

export default WindowManager;