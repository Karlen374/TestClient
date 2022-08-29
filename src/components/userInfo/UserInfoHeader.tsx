import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import LogoutIcon from '@mui/icons-material/Logout';
import { openSignUpModal, signOut } from 'src/store/slices/authorizationSlice';
import { red } from '@mui/material/colors';
import styles from './userInfo.module.scss';

const UserInfoHeader = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const content = registeredUserData ? (
    <div>
      <Button
        variant="text"
        onClick={() => dispatch(signOut())}
        sx={{ color: red[700] }}
      >
        Выйти
        <LogoutIcon sx={{ margin: 1 }} />
      </Button>
    </div>
  )
    : (
      <Button onClick={() => dispatch(openSignUpModal())} variant="contained" color="success">
        Регистрация
      </Button>
    );

  return (
    <div className={styles.userProfile_Buttons}>
      {content }
    </div>
  );
};
export default UserInfoHeader;
