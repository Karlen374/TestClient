import { useAppSelector } from 'src/hooks/hooks';
import SignInForm from 'src/components/signInForm/signInForm';
import SignUpForm from 'src/components/signUpForm/signUpForm';
import Modal from 'src/components/modal/modal';
import UserInfoHeader from './UserInfoHeader';
import UserProfileInfo from './userProfileInfo';

const UserInfo = () => {
  const { registeredUserData, signInModal, signUpModal } = useAppSelector((store) => store.authorization);
  return (
    <>
      <UserInfoHeader />
      <Modal active={signInModal}>
        <SignInForm />
      </Modal>
      <Modal active={signUpModal}>
        <SignUpForm />
      </Modal>
      {registeredUserData && <UserProfileInfo />}
      {!registeredUserData && (
      <h2>
        для получения  полного доступа нужно зарегистрироваться
      </h2>
      )}

    </>
  );
};
export default UserInfo;
