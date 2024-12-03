import { createSelector } from 'reselect';


interface StateSlice {
    isSkeleton?: boolean;
    isLoading?: boolean;
    // add other properties as needed
  }
  
  // Assuming the root state is an object of slices
  interface RootState {
    [key: string]: StateSlice | undefined;
  }
  
  const selectStates = (state: RootState) => state;
  
  export const isSkeleton = createSelector(
    selectStates,
    (state) => {
      const slices = Object.values(state);
      return slices.some((slice) => slice?.isSkeleton === true);
    }
  );
  
  export const isLoading = createSelector(
    selectStates,
    (state) => {
      const slices = Object.values(state);
      return slices.some((slice) => slice?.isLoading === true);
    }
  );