import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/User/user.actions';
import { Link } from 'react-router-dom';
import { CircularProgress, Container, Grid, Typography, Box, TextField, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: '#ffffff',
    padding: '24px 0',
    height: '80%',
    borderRadius: '5px',
    marginTop: '80px',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
  },
  left: {
    backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    '@media (max-width:960px)' : {
      display: 'none'
    }
  },
  formContainer: {
    padding: '24px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  signin: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

function SignUp() {

  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user.isLoading)
  const errorMessage = useSelector(state => state.user.message_register)

  const [textErr, setTextErr] = useState();

  useEffect(() => {
    setTextErr(errorMessage)
    return () => {
      setTextErr('')
    }
  },[errorMessage])
  
  const handleSubmit = (values)=> {
    try {
      dispatch(register(values.email, values.password, values.fullName))
      // navigate('/')
    }
    catch(error) {
      console.log(error)
  }
  }

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };


  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Trường này là bắt buộc'),
    email: Yup.string()
      .required('Trường này là bắt buộc'),
    password: Yup.string()
      .required('Trường này là bắt buộc'),
    confirmPassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    })
  });

  return (
    <Container className={classes.container} maxWidth='xl'>
      <Grid container className={classes.wrapper}>
        <Grid item xs={false} md={6} className={classes.left}></Grid>
        <Grid item xs={12} md={6} className={classes.formContainer}>
          <Typography variant="h2" style={{margin: '20px 0', textAlign: 'center'}}>Đăng ký</Typography>
          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form>
                  <Box className={classes.form}>
                    <Field
                      as={TextField}
                      style={{margin: '12px 0'}}
                      variant="outlined"
                      name="fullName"
                      label="Họ tên"
                      onChange={props.handleChange('fullName')}
                      helperText={props.errors.fullName}
                    />
                    <Field
                      as={TextField}
                      style={{margin: '12px 0'}}
                      variant="outlined"
                      type="email"
                      name="email"
                      label="Email"
                      onChange={props.handleChange('email')}
                      helperText={props.errors.email}
                    />
                    <Field
                      as={TextField}
                      style={{margin: '12px 0'}}
                      variant="outlined"
                      name="password"
                      type="password"
                      label="Mật khẩu"
                      onChange={props.handleChange('password')}
                      helperText={props.errors.password}
                    />
                    <Field
                      as={TextField}
                      style={{margin: '12px 0'}}
                      variant="outlined"
                      name="confirmPassword"
                      type="password"
                      label="Xác nhận mật khẩu"
                      onChange={props.handleChange('confirmPassword')}
                      helperText={props.errors.confirmPassword}
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
                      Đăng ký
                    </Button>
                  </Box>
                  <Box className={classes.signin}>
                    <Typography>Bạn đã có tài khoản?</Typography>
                    <Link to='/sign-in'>
                      <Typography style={{color: 'blue', marginLeft: '8px'}}>
                        Đăng nhập
                      </Typography>
                    </Link>
                </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignUp