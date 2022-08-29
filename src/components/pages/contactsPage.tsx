import ContactsHeader from 'src/components/contactsHeader/contactsHeader';
import { useEffect } from 'react';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { get } from 'src/store/slices/contactSlice';
import ContactsList from '../contactsList/contactsList';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  useEffect(() => {
    const registeredUser = localStorage.getItem('registeredUserData');
    if (registeredUser) {
      dispatch(getRegisteredUserData(JSON.parse(registeredUser)));
      dispatch(get(JSON.parse(registeredUser)._id));
    }
  }, []);
  if (!registeredUserData) {
    return (
      <h2>
        для получения  полного доступа нужно зарегистрироваться
      </h2>
    );
  }
  return (
    <>
      <ContactsHeader />
      <ContactsList />
    </>

  );
};
export default ContactsPage;
