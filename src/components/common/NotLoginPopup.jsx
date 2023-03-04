import { useState } from 'react';
import { Snackbar, Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { openSnackBar } from '../../redux/User/user.actions';

function NotLoginPopup({isOpen}) {
  const [open, setOpen] = useState(isOpen);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(openSnackBar(false))
  }

  return (
    <Snackbar
      open={open}
      message="Bạn phải đăng nhập trước"
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      action={
        <>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <Close fontSize="small" />
          </IconButton>
        </>
      }
    />
  )
}

export default NotLoginPopup;
