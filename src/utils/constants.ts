import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const icons = {
  home: { set: 'Feather', name: 'home' },
  history: { set: 'Feather', name: 'clock' },
  settings: { set: 'Feather', name: 'settings' },
  back: { set: 'Feather', name: 'chevron-left' },
  close: { set: 'Feather', name: 'x' },
  menu: { set: 'Feather', name: 'menu' },
  compress: { set: 'MaterialCommunityIcons', name: 'arrow-collapse-all' },
  import: { set: 'Feather', name: 'plus' },
  export: { set: 'Feather', name: 'share' },
  delete: { set: 'Feather', name: 'trash-2' },
  edit: { set: 'Feather', name: 'edit-2' },
  save: { set: 'Feather', name: 'save' },
  play: { set: 'Feather', name: 'play' },
  pause: { set: 'Feather', name: 'pause' },
  video: { set: 'Feather', name: 'video' },
  check: { set: 'Feather', name: 'check' },
  checkCircle: { set: 'Feather', name: 'check-circle' },
  info: { set: 'Feather', name: 'info' },
  warning: { set: 'Feather', name: 'alert-triangle' },
  error: { set: 'Feather', name: 'alert-circle' },
  chevronRight: { set: 'Feather', name: 'chevron-right' },
  more: { set: 'Feather', name: 'more-horizontal' },
  star: { set: 'Feather', name: 'star' },
  search: { set: 'Feather', name: 'search' },
  filter: { set: 'Feather', name: 'filter' },
  refresh: { set: 'Feather', name: 'refresh-cw' },
  zap: { set: 'Feather', name: 'zap' },
} as const;
