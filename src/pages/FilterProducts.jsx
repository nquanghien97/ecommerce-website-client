import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDispatch } from 'react-redux';
import { AddWishList } from '../redux/Products/actions';
import { mobile } from '../responsive';
import { filterServices } from '../api/filterServices'

function Product() {

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [product, setProduct] = useState();

  const goToProduct = (id) => {
    navigate(`/product/${id}`)
  }

  const addWishList = (item) => {
    dispatch(AddWishList(item))
  }

  useEffect(() => {
    const fetchProduct = async () => {
      await filterServices(pathname)
      .then(data => setProduct(data.data.product))
      .catch(err => console.log(err.message))
    }
    fetchProduct()
  },[pathname])

  if(!product) {
    return <div>Loading...</div>
  }
  return (
    <Container>
    <Wrapper>
      <Title>All Products</Title>
      <Content>
        {product?.map((item) => (
          <ProductContainer
            key={item._id}
            onClick={() => goToProduct(item._id)}
          >
            <Top>
              <ImageWrapper>
                <Image src={item.imageUrl} alt={item.name} />
              </ImageWrapper>
              <Price>{Number(item.price).toLocaleString('en-US')}đ</Price>
              <Icon>
                <FavoriteBorderIcon
                  className='icon'
                  onClick={(e) => {
                    addWishList(item)
                    e.stopPropagation()
                  }} />
              </Icon>
            </Top>
            <Bottom>
              <Name>{item.name}</Name>
              <Description>{item.description}</Description>
              <Status>{item.status}</Status>
            </Bottom>
          </ProductContainer>
        ))}
      </Content>
    </Wrapper>
  </Container>
  )
}

 
const Container = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({
    marginTop: '117px',
  })}
`

const Wrapper = styled.div`
  max-width: 1280px;
`

const Title = styled.h1`
  text-align: center;
  margin: 8px;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25.00%);
  ${mobile({
    gridTemplateColumns: '50% 50%'
  })}
`

const ProductContainer = styled.div`
  border: 1px solid transparent;
  cursor: pointer;
  margin: 4px;
  padding: 4px;
  &:hover {
    border: 1px solid
  }
`

const Top = styled.div`
  position: relative;
`

const ImageWrapper = styled.div`

`

const Image = styled.img`
  width: 100%;
`

const Price = styled.div`
  position: absolute;
  bottom: 0;
  left: 4px;
  background-color: white;
  padding: 4px;
`

const Bottom = styled.div`
  padding: 8px;
`

const Icon = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`

const Name = styled.div`

`

const Description = styled.div`

`

const Status = styled.div`

`


export default Product;