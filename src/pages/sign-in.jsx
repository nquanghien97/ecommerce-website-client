import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/User/user.actions';
import { CircularProgress, Container, Box, TextField, Grid, Typography, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  wrapper: {
    width: '100%',
    height: '80%',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    marginTop: '80px'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%'
  },
  signup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    backgroundImage: 'url(/images/image-login.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    '@media (max-width:960px)' : {
      display: 'none'
    }
  }
})

function SignIn() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.isLoading)
  const errorMessage = useSelector(state => state.user.message_login)
  const [textErr, setTextErr] = useState();
  
  useEffect(() => {
    setTextErr(errorMessage)
    return () => {
      setTextErr('')
    }
  },[errorMessage])

  const handleSubmit = (values) => {
    try {
      dispatch(login(values.email, values.password));
    }catch(err) {
      console.log(err)
    }
  }

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Trường này là bắt buộc'),
    password: Yup.string()
      .required('Trường này là bắt buộc'),
  });

  return (
    <Container className={classes.container} maxWidth='xl'>
      <Grid container className={classes.wrapper}>
        <Grid item xs={12} md={6} className={classes.formContainer}>
          <Typography variant="h2" style={{margin: '20px 0', textAlign: 'center'}}>Đăng nhập</Typography>
          <Box style={{}}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form>
                  <Box className={classes.form}>
                    <Field
                      style={{margin: '12px 0'}}
                      as={TextField}
                      variant="outlined"
                      type="email"
                      name="email"
                      label="email"
                      onChange={props.handleChange('email')}
                      helperText={props.errors.email}
                    />
                    <Field
                      style={{margin: '12px 0'}}
                      as={TextField}
                      variant="outlined"
                      name="password"
                      type="password"
                      label="Mật khẩu"
                      onChange={props.handleChange('password')}
                      helperText={props.errors.email}
                    />
                  </Box>
                  {textErr ? (
                    <div style={{textAlign: 'center', marginBottom: '16px', color: 'red'}}>
                      <p>{textErr}</p>
                    </div>
                  ) : null}
                  <Box style={{margin: '20px 0'}}>
                    <Button fullWidth variant="contained" color="primary" type="submit" style={{padding: '12px', fontSize: '20px'}}>
                      {loading ? <CircularProgress color="inherit" style={{marginRight:'8px', width:'20px', height:'20px'}} /> : null}
                      Đăng nhập
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
          <Box className={classes.signup}>
            <Typography>Bạn chưa có tài khoản?</Typography>
            <Link to='/sign-up'>
              <Typography style={{color: 'blue', marginLeft: '8px'}}>
                  Đăng ký ngay
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={false} md={6} className={classes.right}></Grid>
      </Grid>
    </Container>
  )
}

export default SignIn