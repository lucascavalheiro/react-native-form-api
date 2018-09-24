import { Dimensions } from 'react-native';

export const COLOR = {
  BLUE: '#005DAA',
  RED: '#E24D5F',
  GRAY: '#929292',
  GRAY_BACKGROUND: '#f8f8f8',
  GRAY_DARK: '#4f4f4f',
  GRAY_LIGHT: '#adadad',
  GRAY_LIGHTER: '#e0e0e0',
  GRAY_5: '#F0F0F0',
  GRAY_42: '#929292',
  WHITE: '#FFFFFF',
};

export const LINE_SPACING = 1.3;

const { width } = Dimensions.get('window');
// Guideline sizes are based on iPhone 6 screen
const guidelineBaseWidth = 375;

export const scale = size => (width / guidelineBaseWidth) * size;

export const FONT = {
  LINE_HEIGHT: scale(21),
  SIZE_10: scale(10),
  SIZE_12: scale(12),
  SIZE_14: scale(14),
  SIZE_16: scale(16),
  SIZE_18: scale(18),
  SIZE_20: scale(20),
  SIZE_24: scale(24),
  SIZE_26: scale(26),
  SIZE_28: scale(28),
  SIZE_32: scale(32),
};
