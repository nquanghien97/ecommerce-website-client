import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, Avatar, TextField, Button, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { getUser, updateUser } from '../api/userServices';
import { updateUser as updateUserStore } from '../redux/User/user.actions'

const useStyles = makeStyles({
  container: {
    marginTop: '120px',
    height: '100vh',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imgContainer: {
    marginBottom: '20px',
    position: 'relative',
  },
  img: {
    height: '150px',
    width: '150px',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  infoContainer: {
    width: '100%',
    padding: '40px',
    border: '1px solid',
    borderRadius: '4px'
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    margin: '12px 0',
  },
  title: {
    marginRight: '8px',
    minWidth: '130px'
  }
})

function Profile() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.user?.user._id)
  const [file, setFile] = useState();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    try{
        const data = await getUser(userId)
        setUser(data.data.user)
      }
     catch(err){
      console.log(err)
    }}, [userId])

    useEffect(() => {
      fetchUser()
    },[fetchUser])

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleChangeInput = (e) => {
    setUser({...user, fullName: e.target.value})
  }

  const onUpdateProfile = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('image', file)
    formData.append('fullName', user.fullName)
    formData.append('userId', userId)
    try {
      const res = await updateUser(formData)
      dispatch(updateUserStore(res.data))
      await fetchUser()
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box className={classes.wrapper}>
        <Typography variant="h2">Profile</Typography>
        <Box className={classes.imgContainer} >
          <Box className={classes.icon}>
            <input onChange={onFileChange} id="icon-button-file" type="file" style={{display: 'none'}} />
            <label htmlFor="icon-button-file" style={{cursor: 'pointer'}}>
              <AddAPhotoIcon />
            </label>
          </Box>
          {
            file ? 
            <Avatar alt='preview' src ={URL.createObjectURL(file)} className={classes.img} /> :
            <Avatar alt={user?.fullName} src ={user?.imageUrl} className={classes.img} />
          }
        </Box>
        <Box className={classes.infoContainer}>
          <Typography variant="h4">User Info</Typography>
          <Box>
            <Box className={classes.info}>
              <Typography className={classes.title} variant="h5" >FullName</Typography>
              <TextField
                variant="outlined"
                onChange={handleChangeInput}
                value={user?.fullName || ''}
              />
            </Box>
          </Box>
        </Box>
        <Box style={{width: '100%', marginTop: '20px'}} onClick={onUpdateProfile}>
          <Button variant="contained" color="primary">
            Update Profile
            {loading? <CircularProgress style={{marginLeft: '8px'}} size="20px" color="inherit" /> : null}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Profile