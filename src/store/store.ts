import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorization from 'src/store/slices/authorizationSlice';
import contact from 'src/store/slices/contactSlice';

export const store = configureStore({
  reducer: {
    authorization,
    contact,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
