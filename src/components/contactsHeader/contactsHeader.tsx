import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Modal from 'src/components/modal/modal';
import ContactForm from 'src/components/contactForm/contactForm';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeViewedContacts, openContactModal } from 'src/store/slices/contactSlice';
import React from 'react';
import style from './contactsHeader.module.scss';

const ContactsHeader = () => {
  const dispatch = useAppDispatch();
  const { contactModal } = useAppSelector((store) => store.contact);
  return (
    <>
      <div className={style.header}>
        <TextField
          id="outlined-basic"
          label="Поиск"
          onChange={(e) => dispatch(changeViewedContacts(e.target.value))}
          variant="outlined"
        />
        <Button
          onClick={() => dispatch(openContactModal())}
          variant="contained"
          color="success"
          endIcon={<AddIcon />}
        >
          Добавить Контакт
        </Button>
      </div>
      <Modal active={contactModal}>
        <ContactForm />
      </Modal>
    </>
  );
};
export default ContactsHeader;
