import { useState } from 'react';
import { createProduct } from '../../../api/productServices';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Grid, Typography, TextField, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    width: '100%',
    marginTop: '100px',
  },
  btnGroup: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: '8px'
  },
  field: {
    margin: '8px 0'
  }
})

function CreateProduct() {

  const classes = useStyles();

  const navigate = useNavigate();

  const [newData, setNewData] = useState({
    name: '',
    description: '',
    gender: '',
    imageUrl: '',
    status: '',
    price: '',
    category: '',
  });

  console.log(newData)

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value
    })
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await createProduct(newData)
      navigate("/dashboard/allproducts")
    } catch (error) {
      console.log("Something is Wrong")
    }
  }

  const handleCancelClick = () => {
    navigate("/dashboard/allproducts")
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Trường này là bắt buộc'),
    description: Yup.string()
      .required('Trường này là bắt buộc'),
    gender: Yup.string()
      .required('Trường này là bắt buộc'),
    imageUrl: Yup.string()
      .required('Trường này là bắt buộc'),
    status: Yup.string()
      .required('Trường này là bắt buộc'),
    price: Yup.string()
      .required('Trường này là bắt buộc'),
    category: Yup.string()
      .required('Trường này là bắt buộc'),
  });
  
  const initialValues = {
    name: '',
    description: '',
    gender: '',
    imageUrl: '',
    status: '',
    price: '',
    category: '',
  };
  
  if(!newData) return (
    <div>Loading....</div>
  )

  return (
    <Container maxWidth={false} style={{display: "flex", height: "100vh", backgroundColor: "rgb(204, 204, 204, 0.9)"}}>
      <Box sx={{m:"auto"}}>
        <Grid
        display= "flex" 
        flexdirection= "column"
        alignItems="center"
        justifycontent="center"
        container
        xs={12}
        item
        style={{
          padding: "28px",
          border: "1px solid black",
          borderRadius: "10px",
          backgroundColor: "#94B49F"
        }}
        >
          <Typography variant="h4" sx={{mb:2}}>Create New Product</Typography>
          <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          >
            <Form>
                <Grid item xs={12}>
                  <Field
                    className={classes.field}
                    fullWidth
                    as={TextField}
                    value={newData.name}
                    label="Name"
                    name="name"
                    onChange={e => {handleChange(e)}}
                    required
                  />
                  <Field
                    className={classes.field}
                    fullWidth
                    as={TextField}
                    value={newData.description}
                    label="Description"
                    name="description"
                    onChange={e => {handleChange(e)}}
                    required
                  />
                  <Field
                    className={classes.field}
                    fullWidth
                    as={TextField}
                    value={newData.gender}
                    label="Gender"
                    name="gender"
                    onChange={e => {handleChange(e)}}
                    required
                  />
                  <Field
                    className={classes.field}
                    fullWidth
                    as={TextField}
                    value={newData.imageUrl}
                    label="imageUrl"
                    name="imageUrl"
                    onChange={e => {handleChange(e)}}
                    required
                  />
                  <Field
                    className={classes.field}
                    fullWidth
                    as={TextField}
                    value={newData.status}
                    label="Status"
                    name="status"
                    onChange={e => {handleChange(e)}}
                    required
                  />
                  <Field
                    className={classes.field}
                    fullWidth
                    as={TextField}
                    value={newData.price}
                    label="Price"
                    name="price"
                    onChange={e => {handleChange(e)}}
                    required
                  />
                  <Field
                    className={classes.field}
                    fullWidth
                    as={TextField}
                    value={newData.category}
                    label="Category"
                    name="category"
                    onChange={e => {handleChange(e)}}
                    required
                  />
                </Grid>
                <Grid className={classes.btnGroup} item container xs={12}>
                    <Button className={classes.btn} variant="contained" onClick={onSubmit} type="submit">Xác nhận</Button>
                    <Button className={classes.btn} variant="contained" onClick={handleCancelClick}>Hủy</Button>
                </Grid>
              </Form>
          </Formik>
        </Grid>
      </Box>
    </Container>
  )
}

export default CreateProduct