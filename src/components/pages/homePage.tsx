import { useEffect } from 'react';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import { useAppDispatch } from 'src/hooks/hooks';
import UserProfile from 'src/components/userInfo/UserInfo';

const HomePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
  }, []);

  return (
    <UserProfile />
  );
};
export default HomePage;
