import { IContact } from 'src/types/IContact';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, yellow } from '@mui/material/colors';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { deleteContactById, getEditContactData } from 'src/store/slices/contactSlice';
import { useAppDispatch } from 'src/hooks/hooks';
import styles from './contactsList.module.scss';

interface ContactItemProps {
  contact: IContact | null;
}
const ContactItem = ({ contact }:ContactItemProps) => {
  const dispatch = useAppDispatch();
  const openEditContactModalForm = () => {
    dispatch(getEditContactData(contact));
  };
  const deleteContact = () => {
    if (contact) dispatch(deleteContactById(contact?._id));
  };
  return (
    <Card className={styles.contact_item} sx={{ margin: '0 auto', maxWidth: 345 }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {contact?.name.slice(0, 1)}
          </Avatar>
      )}
        action={(
          <>
            <IconButton onClick={openEditContactModalForm} aria-label="settings">
              <EditIcon sx={{ color: yellow[400] }} />
            </IconButton>
            <IconButton onClick={deleteContact} aria-label="settings">
              <DeleteIcon sx={{ color: red[700] }} />
            </IconButton>
          </>
      )}
        title={`${contact?.name} ${contact?.surName}`}
        subheader={contact?.number}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Возраст -
          {contact?.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Пол -
          {contact?.gender}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Chip icon={<LocationCityIcon />} label={contact?.city} variant="outlined" />
      </CardActions>
    </Card>
  );
};
export default ContactItem;
