import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { closeContactModal, create, edit } from 'src/store/slices/contactSlice';
import { v4 as uuidv4 } from 'uuid';
import { IContact } from 'src/types/IContact';
import styles from './contactForm.module.scss';

const ContactForm = () => {
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const { editContact } = useAppSelector((store) => store.contact);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IContact>({ mode: 'onBlur', defaultValues: editContact });
  const dispatch = useAppDispatch();
  const createContact = (formState:IContact) => {
    if (registeredUserData) {
      if (!editContact.name) {
        dispatch(create({
          ...formState, _id: uuidv4(), authorId: registeredUserData?._id,
        }));
      } else {
        dispatch(edit(formState));
      }
    }
    dispatch(closeContactModal());
    reset();
  };
  return (
    <form onSubmit={handleSubmit(createContact)}>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="Name"
            type="text"
            {...register('name', {
              required: 'это поле обязательное',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'используйте символы a-Z',
              },
            })}
          />
          {errors.name?.message && (
            <div className={styles.Contact_Form__ErrorMessage}>{errors.name?.message}</div>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="surName"
            type="text"
            {...register('surName', {
              required: 'это поле обязательное',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'используйте символы a-Z',
              },
            })}
          />
          {errors.surName?.message && (
            <div className={styles.Contact_Form__ErrorMessage}>{errors.surName?.message}</div>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="Number"
            type="text"
            {...register('number', {
              required: 'это поле обязательное',
              pattern: {
                value: /[1-9,+]+$/i,
                message: 'используйте цифры и +',
              },
            })}
          />
          {errors.number?.message && (
            <div className={styles.Contact_Form__ErrorMessage}>{errors.number?.message}</div>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="Age"
            type="number"
            {...register('age', {
              required: 'это поле обязательное',
              min: {
                value: 18,
                message: 'You must be over 18 to create an account',
              },
              max: {
                value: 100,
                message: 'введите правильный возраст',
              },
            })}
          />
          {errors.age?.message && (
            <div className={styles.Contact_Form__ErrorMessage}>{errors.age?.message}</div>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Gender"
              defaultValue=""
              {...register('gender', {
                required: 'это поле обязательное',
              })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            {errors.gender?.message && (
            <div className={styles.Contact_Form__ErrorMessage}>{errors.gender?.message}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="city"
            type="text"
            {...register('city', {
              required: 'это поле обязательное',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'используйте символы a-Z',
              },
            })}
          />
          {errors.city?.message && (
            <div className={styles.Contact_Form__ErrorMessage}>{errors.city?.message}</div>
          )}
        </Grid>
        <div className={styles.Contact_Form__Buttons}>
          <Button variant="contained" type="submit" color="success">
            Создать
          </Button>
          <Button variant="contained" onClick={() => dispatch(closeContactModal())} color="error">
            Отмена
          </Button>
        </div>
      </Grid>
    </form>
  );
};
export default ContactForm;
