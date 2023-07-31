import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Button, Typography, Box, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AddCart } from '../redux/Products/actions';
import { getProduct } from '../api/productServices';
import { makeStyles } from '@material-ui/core/styles';
import WishListIcon from '../components/common/WishListIcon';
import { openSnackBar } from '../redux/User/user.actions';

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
  img: {
    width: '100%',
  },
  left: {
    width: 'calc(100% - 456px)',
    padding: '0 48px',
    '@media(max-width: 1050px)' : {
      width: '100%'
    }
  },
  name: {
    fontSize: '24px'
  },
  description: {
    fontWeight: '600',
    fontSize: '20px',
  },
  price: {
    padding: '12px 0',
    fontSize: '20px',
    fontWeight: '600',
  },
  right: {
    width: '456px',
    '@media(max-width: 1050px)' : {
      width: '100%',
      padding: '12px 48px',
    }
  },
  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeIcon: {
    cursor: 'pointer',
    padding: '10px',
    border: '1px solid',
    borderRadius: '5px',
    marginLeft: '12px'
  },
  detail: {
    paddingTop: '24px',
  },
  textDetail: {
    lineHeight: '1.75',
    fontSize: '18px',
  }
})

function Product() {

  const classes = useStyles();

  const { id } = useParams();

  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLoggedIn)

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const addCart = (_id, price) => {
    if(!isLogin) {
      dispatch(openSnackBar(true))
    } else {
      dispatch(AddCart(_id, price))
    }
  }

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id)
        setProduct(data.data.product)
        setLoading(false);
      } catch(err) {
        console.log(err.message)
      } 
    }
    fetchProduct()
  },[id])

  const WishList = useSelector((state) => state._todoProduct.WishList)

  if(loading) {
    return (
      <Box className={classes.loading}>
        <CircularProgress />
      </Box>
    )
  }

  const { _id, price} = product

  return (
    <Container className={classes.container}>
      <Box className={classes.left}>
        <img className={classes.img} src={product.imageUrl} alt="" />
      </Box>
      <Box className={classes.right}>
        <Box>
          <Typography className={classes.name}>{product.name}</Typography>
          <Typography className={classes.description}>{product.description}</Typography>
          <Typography className={classes.price}>{Number(product.price).toLocaleString('en-US')}đ</Typography>
        </Box>
        <Box>
          <Box>

          </Box>
          <Box className={classes.btnGroup}>
            <Button
              onClick={()=> addCart(_id, price)}
              variant="contained"
              fullWidth
              color="primary"
              style={{padding: '12px 24px'}} 
            >
              Thêm vào giỏ hàng
            </Button>
            <Box className={classes.likeIcon}>
              <WishListIcon item={product} liked={WishList ? WishList.filter(like => like._id === product._id).length > 0 ? true : false : false} />
            </Box>
          </Box>
          <Box className={classes.detail}>
            <Typography className={classes.textDetail}>{product.detail}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Product;
