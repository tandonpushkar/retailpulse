import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit';
import {reducers} from '@constants';
import {
  getDefaultFilter,
  getFilterOptions,
  getStoresDetail,
  getUserData,
} from '@utils';

interface HomeScreenSlice {
  storeList: [];
  filterOptions: {};
  currentFilter: {};
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export const getStoreData = createAsyncThunk(
  `${reducers.HOME}/getStoreData`,
  async (_, {dispatch, getState, rejectWithValue}: any) => {
    try {
      dispatch(setStoreLoading('pending'));
      const uid = getState()?.login?.loginResponse?.user?.uid;
      const userData: any = await getUserData(uid);
      if (userData?.stores?.length) {
        const storesData = await getStoresDetail(userData?.stores);
        dispatch(setStoreList(storesData));
        let filterOptions = await getFilterOptions(storesData);
        dispatch(setFilterOptions(filterOptions));
      }
    } catch (err) {
      dispatch(setStoreLoading('failed'));
    }
  },
);

const initialState = {
  storeList: [],
  filterOptions: {},
  currentFilter: getDefaultFilter(),
  loading: 'idle',
} as HomeScreenSlice;

export const homeScreenSlice = createSlice({
  name: reducers.HOME,
  initialState,
  reducers: {
    setStoreLoading(state, action) {
      state.loading = action.payload;
    },
    setStoreList(state, action) {
      state.storeList = action.payload;
      state.loading = 'succeeded';
    },
    setFilterOptions(state, action) {
      state.filterOptions = action.payload;
    },
  },
});

export const selectHomeScreenSlice = createSelector(
  (state: any) => ({
    storeList: state[reducers.HOME].storeList,
    filterOptions: state[reducers.HOME].filterOptions,
    currentFilter: state[reducers.HOME].currentFilter,
    loading: state[reducers.HOME].loading,
  }),
  state => state,
);

export const {setStoreList, setFilterOptions, setStoreLoading} =
  homeScreenSlice.actions;
