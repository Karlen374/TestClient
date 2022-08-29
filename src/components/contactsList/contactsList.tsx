import Grid from '@mui/material/Grid';
import { useTransition, animated } from 'react-spring';
import React from 'react';
import { useAppSelector } from 'src/hooks/hooks';
import ContactItem from './contactItem';
import styles from './contactsList.module.scss';

const ContactsList = () => {
  const { viewedUserContacts } = useAppSelector((store) => store.contact);
  const transitions = useTransition(viewedUserContacts, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 0,
    key: (item:any) => item?._id,
  });
  return (
    <div className={styles.contact}>
      <Grid container spacing={3} className="">
        {transitions(({ opacity }, item) => (
          <Grid item md={6} sm={6} lg={4} xs={12}>
            <animated.div
              style={{
                opacity: opacity.to({ output: [0.2, 1], range: [0, 1] }),
                transition: opacity
                  .to(() => 'opacity 100ms ease-in'),
              }}
            >
              <ContactItem
                key={item?._id}
                contact={item}
              />
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default ContactsList;
