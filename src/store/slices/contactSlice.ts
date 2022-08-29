import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useContactService from 'src/services/useContactService';
import { IContact } from 'src/types/IContact';

interface IEditForm{
  name:string;
  surName:string;
  age:number;
  gender:string;
  city:string;
  number: string;
}
interface ContactState {
  contactModal:boolean;
  userContacts: IContact[] | null;
  viewedUserContacts: IContact[] | null;
  editContact: IEditForm;
  editContactId: string;
}
const initialState:ContactState = {
  contactModal: false,
  userContacts: null,
  viewedUserContacts: null,
  editContact: {
    name: '', surName: '', age: 18, gender: '', city: '', number: '',
  },
  editContactId: '',
};

export const create = createAsyncThunk(
  'contact/create',
  async (data:IContact) => {
    const { createContact } = useContactService();
    const response = await createContact(data);
    return response;
  },
);
export const get = createAsyncThunk(
  'contact/get',
  async (authorId:string) => {
    const { getContacts } = useContactService();
    const response = await getContacts(authorId);
    return response;
  },
);
export const edit = createAsyncThunk(
  'contact/edit',
  async (data:IContact) => {
    const { editContact } = useContactService();
    const response = await editContact(data);
    return response;
  },
);
export const deleteContactById = createAsyncThunk(
  'contact/delete',
  async (_id:string) => {
    const { deleteContact } = useContactService();
    const response = await deleteContact(_id);
    return response;
  },
);
const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    openContactModal: (state) => {
      state.contactModal = true;
    },
    closeContactModal: (state) => {
      state.contactModal = false;
      state.editContact = {
        name: '', surName: '', age: 18, gender: '', city: '', number: '',
      };
    },
    getEditContactData: (state, action) => {
      state.editContact = action.payload;
      state.contactModal = true;
    },
    changeViewedContacts: (state, action) => {
      if (state.userContacts) {
        state.viewedUserContacts = state.userContacts?.filter((item) => {
          const searchMarkers = `${item.name} ${item.surName} ${item.number} ${
            item.surName} ${item.name} ${item.number} ${
            item.name} ${item.number} ${item.surName} ${
            item.surName} ${item.number} ${item.name} ${
            item.number} ${item.name} ${item.surName} ${
            item.number} ${item.surName} ${item.name}`;

          return searchMarkers.toUpperCase().indexOf(action.payload.toUpperCase()) > -1;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.fulfilled, (state, action) => {
        if (state.userContacts) {
          state.viewedUserContacts = [...state.userContacts, action.payload];
          state.userContacts = [...state.userContacts, action.payload];
        }
      })
      .addCase(get.fulfilled, (state, action) => {
        state.userContacts = action.payload;
        state.viewedUserContacts = action.payload;
      })
      .addCase(edit.fulfilled, (state, action) => {
        if (state.userContacts) {
          state.userContacts = state.userContacts?.map((item) => {
            if (item._id !== action.payload._id) return item;
            else return action.payload;
          });
          state.viewedUserContacts = state.userContacts?.map((item) => {
            if (item._id !== action.payload._id) return item;
            else return action.payload;
          });
        }
      })
      .addCase(deleteContactById.fulfilled, (state, action) => {
        if (state.userContacts) {
          state.userContacts = state.userContacts?.filter((item) => item._id !== action.payload);
          state.viewedUserContacts = state.userContacts;
        }
      });
  },
});

const { actions, reducer } = ContactSlice;

export default reducer;

export const {
  openContactModal,
  closeContactModal,
  getEditContactData,
  changeViewedContacts,
} = actions;
