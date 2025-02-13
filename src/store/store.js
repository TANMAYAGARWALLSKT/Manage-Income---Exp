import { configureStore } from '@reduxjs/toolkit';
import navReducer from '../Redux';

export const store = configureStore({
  reducer: {
    nav: navReducer
  }
}); 