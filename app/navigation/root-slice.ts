import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit';
import { reducers } from '@constants';

interface RootSlice {
  deviceUniqueId: string;
  copyCourseFinderData: {};
}

const initialState = {
  deviceUniqueId: '',
  copyCourseFinderData: {},
} as RootSlice;

const rootSlice = createSlice({
  name: reducers.ROOT,
  initialState,
  reducers: {},
});

export const selectRootSlice = createSelector(
  (state: any) => ({
    // deviceUniqueId: state[reducers.ROOT].deviceUniqueId,
    // copyCourseFinderData: state[reducers.ROOT].copyCourseFinderData,
  }),
  state => state,
);

// export const {setDeviceUniqueId} = rootSlice.actions;

export default rootSlice.reducer;
