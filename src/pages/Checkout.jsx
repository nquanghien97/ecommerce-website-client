import { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, TextField, Button, CircularProgress, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { getCartServices } from '../api/cartServices';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  loading: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    marginTop: '110px',
    '@media(max-width: 1050px)' : {
      marginTop: '152px',
      flexDirection: 'column',
    }
  },
  title: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    margin: '8px 0'
  },
  btnGroup: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: '8px',
    padding: '12px 24px'
  },
  priceSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0'
  },
  line: {
    width: '100%',
    height: '1px',
    backgroundColor: '#ccc',
  },
  listProducts: {
    padding: '12px 0'
  },
  product: {
    display: 'flex',
    margin: '8px 0'
  },
  img: {
    width: '200px',
    paddingRight: '8px'
  }
})
export default function Checkout() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listCart, setListCart] = useState([]);
  const [successCheckout, setSuccessCheckout] = useState(false);
  const userId = useSelector(state => state.user?.user?.user._id) || '';

  useEffect(() => {
    //getCart
    const getCart = async () => {
      setLoading(true)
      try{
        const res = await getCartServices(userId)
        setListCart(res.data?.data)
        setLoading(false)
      }catch(err) {
        console.log(err)
      }
    }
    getCart();
  }, [userId]);

  const onSubmit = (values) => {
    setSuccessCheckout(true)
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Trường này là bắt buộc'),
    address: Yup.string()
      .required('Trường này là bắt buộc'),
    phoneNumber: Yup.string()
      .required('Trường này là bắt buộc'),
  });
  const initialValues = {
    fullName: '',
    address: '',
    phoneNumber: '',
  };

  const deliveryPrice = 250000

  if(loading) {
    return (
      <Box className={classes.loading}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Container className={classes.container}>
      <Box sx={{m:"0 auto", width: "100%", px:'24px'}} style={{flex: '70%'}}>
        <Box className={classes.title}>
          <Typography variant="h4">Checkout Form</Typography>
        </Box>
        <Grid
          display= "flex" 
          flexdirection= "column"
          alignItems="center"
          justifycontent="center"
          container
          xs={12}
          item
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {
              (props) => (
                <Form style={{width: "100%"}}>
                  <Grid item xs={12}>
                    <Field
                      className={classes.field}
                      fullWidth
                      as={TextField}
                      variant="outlined"
                      value={props.values.name}
                      label="Full Name"
                      name="fullName"
                      onChange={props.handleChange('fullName')}
                      required
                    />
                    <Field
                      className={classes.field}
                      fullWidth
                      as={TextField}
                      variant="outlined"
                      value={props.values.description}
                      label="Address"
                      name="address"
                      onChange={props.handleChange('address')}
                      required
                    />
                    <Field
                      type="number"
                      className={classes.field}
                      fullWidth
                      as={TextField}
                      variant="outlined"
                      value={props.values.price}
                      label="Phone Number"
                      name="phoneNumber"
                      onChange={props.handleChange('phoneNumber')}
                      required
                    />
                  </Grid>
                  <Grid className={classes.btnGroup} item container xs={12}>
                    <Button className={classes.btn} variant="contained" color="primary" fullWidth type="submit" >
                      Xác nhận
                    </Button>
                    <Button className={classes.btn} variant="contained" color="primary" fullWidth onClick={() => navigate('/cart')}>Hủy</Button>
                  </Grid>
                </Form>
              )
            }
          </Formik>
        </Grid>
      </Box>
      <Box sx={{px:'24px'}} style={{flex:'30%'}}>
        <Box>
          <Typography variant="h4">Order Summary</Typography>
        </Box>
        <Box>
          <Box className={classes.priceSummary}>
            <Typography>Subtotal</Typography>
            <Typography>{Number(listCart.subTotal).toLocaleString('en-US')}đ</Typography>
          </Box>
          <Box className={classes.priceSummary}>
            <Typography>Delivery/Shipping</Typography>
            <Typography>{Number(deliveryPrice).toLocaleString('en-US')}đ</Typography>
          </Box>
        </Box>
        <Box className={classes.line}></Box>
        <Box className={classes.priceSummary}>
          <Typography>Total</Typography>
          <Typography>{Number(listCart?.subTotal + deliveryPrice).toLocaleString('en-US')}đ</Typography>
        </Box>
        <Box className={classes.line}></Box>
        <Box className={classes.listProducts}>
          {listCart?.products?.map(item => (
            <Box key={item._id} className={classes.product}>
              <img className={classes.img} src={item.productId.imageUrl} alt='' />
              <Box>
                <Typography>{item.productId.name}</Typography>
                <Typography style={{color:"#8d8d8d"}}>{`Quantity: ${item.quantity}`}</Typography>
                <Typography style={{color:"#8d8d8d"}}>{Number(item.total).toLocaleString('en-US')}đ</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        autoHideDuration={2000}
        message="Order Successfully"
        open={successCheckout}
        onClose={() => setSuccessCheckout(false)}
      />
    </Container>
  )
}
