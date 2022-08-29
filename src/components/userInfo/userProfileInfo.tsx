import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useAppSelector } from 'src/hooks/hooks';
import styles from './userInfo.module.scss';

const UserProfileInfo = () => {
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  return (
    <Card className={styles.userProfile}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {registeredUserData?.userName.slice(0, 1)}
          </Avatar>
        )}
        title={registeredUserData?.userName}
        subheader={registeredUserData?.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Возраст -
          {registeredUserData?.userAge}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Пол -
          {registeredUserData?.userGender}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Chip icon={<LocationCityIcon />} label={registeredUserData?.userCity} variant="outlined" />
      </CardActions>
    </Card>
  );
};
export default UserProfileInfo;
