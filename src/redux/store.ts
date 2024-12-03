// store.ts or store/configureStore.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice'; // replace with your slice
import shortReducer from './slice/shortsSlice'; // replace with your slice
import videoReducer from './slice/videoSlice'; // replace with your slice
import categoryReducer from './slice/categorySlice'; // replace with your slice
import storyReducer from './slice/storysSlice'; // replace with your slice




// Define the type for the root state
export type RootState = ReturnType<typeof store.getState>;

// Define the type for the dispatch function
export type AppDispatch = typeof store.dispatch;

// Create and configure your store
const store = configureStore({
  reducer: {
    auth: authReducer,
    short: shortReducer,
    story: storyReducer,
    videos: videoReducer,
    category: categoryReducer,
  },
});

export default store;
