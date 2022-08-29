import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/hooks';
import AppAlert from './appAlert';
import styles from './appHeader.module.scss';

const AppHeader = () => {
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  return (
    <>
      <AppAlert />
      <nav className={styles.app__menu}>
        <ul>
          <li>
            <NavLink end style={({ isActive }) => ({ color: isActive ? '#9f0013' : 'inherit' })} to="/">
              Home
            </NavLink>
          </li>
          {registeredUserData && (
          <>
            /
            <li>
              <NavLink style={({ isActive }) => ({ color: isActive ? '#9f0013' : 'inherit' })} to="/contacts">
                Contacts
              </NavLink>
            </li>
          </>
          )}
        </ul>
      </nav>
    </>
  );
};
export default AppHeader;
