import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useAuthorizationServices from 'src/services/useAuthorizationService';
import { IUser } from 'src/types/IUser';
import { IUserSignInData } from 'src/types/IUserSignInData';
import { IUserSignUpData } from 'src/types/IUserSignUpData';

interface IAlertMessage{
  text: string;
  alert: 'error' | 'info' | 'success'| 'warning';
}
interface AuthorizationState {
  signUpModal:boolean;
  signInModal:boolean;
  registeredUserData:IUser | null;
  alertStatus:boolean;
  alertMessage: IAlertMessage;
}

const initialState:AuthorizationState = {
  signUpModal: false,
  signInModal: false,
  registeredUserData: null,
  alertStatus: false,
  alertMessage: {
    text: '',
    alert: 'success',
  },
};

export const signIn = createAsyncThunk(
  'authorization/signIn',
  async (data:IUserSignInData) => {
    const { signInUser } = useAuthorizationServices();
    const response = await signInUser(data);
    return response;
  },
);
export const signUp = createAsyncThunk(
  'authorization/signUp',
  async (data:IUserSignUpData) => {
    const { signUpUser } = useAuthorizationServices();
    const response = await signUpUser(data);
    return response;
  },
);

const AuthorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModal = true;
      state.signInModal = false;
    },
    closeSignUpModal: (state) => {
      state.signUpModal = false;
    },
    openAlertModal: (state) => {
      state.alertStatus = true;
    },
    closeAlertModal: (state) => {
      state.alertStatus = false;
    },
    openSignInModal: (state) => {
      state.signInModal = true;
      state.signUpModal = false;
    },
    closeSignInModal: (state) => {
      state.signInModal = false;
    },
    signOut: (state) => {
      state.registeredUserData = null;
      localStorage.removeItem('registeredUserData');
    },
    getRegisteredUserData: (state, action) => {
      state.registeredUserData = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.registeredUserData = action.payload;
        localStorage.setItem('registeredUserData', JSON.stringify(action.payload));
      })
      .addCase(signIn.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: '???????????? ???????????????? ?????????? ?????? ????????????', alert: 'error' };
      })
      .addCase(signUp.fulfilled, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: '?????????????????????? ???????????? ?????????????? ', alert: 'success' };
      })
      .addCase(signUp.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: '?????? ???? ?????????? ???? ??????', alert: 'error' };
      });
  },
});

const { actions, reducer } = AuthorizationSlice;

export default reducer;

export const {
  openSignUpModal,
  closeSignUpModal,
  openSignInModal,
  closeSignInModal,
  openAlertModal,
  closeAlertModal,
  signOut,
  getRegisteredUserData,
} = actions;
