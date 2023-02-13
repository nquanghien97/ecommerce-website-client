import styled from "styled-components";
import { Link } from 'react-router-dom';
import { AddCart, AddWishList } from '../redux/Products/actions';
import { mobile } from '../responsive';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useSelector, useDispatch } from "react-redux";

function WishList() {

  const dispatch = useDispatch();

  const addWishList = (item) => dispatch(AddWishList(item))
  const addCart = (item) => dispatch(AddCart(item))

  const WishList = useSelector((state) => state._todoProduct.WishList)
  const numberWishList = useSelector((state) => state._todoProduct.numberWishList)

  console.log(WishList)
  return (
    <Container>
      <H1>MY WISHLISH</H1>
      <NumberItems>{numberWishList} items</NumberItems>
      <Wrapper>
        {WishList.map((item, index) => (
            <ItemContainer key={index}>
              <Link to={`/product/${item._id}`}>
                <Content>
                  <Image src={item.imageUrl} />
                  <Price>{Number(item.price).toLocaleString('en-US')}đ</Price>
                  <Name>{item.name}</Name>
                </Content>
              </Link>
              <Cart onClick={() => {addCart(WishList[index])}}>
                Thêm vào giỏ hàng
              </Cart>
              <Icon>
                <FavoriteBorderIcon className='icon' onClick={()=> addWishList(item)} />
              </Icon>
            </ItemContainer>
        ))}
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
  margin-top: 110px;
  ${mobile({
    marginTop: '152px',
  })}
`

const H1 = styled.h1`
  margin-left:
`

const NumberItems = styled.div`
  font-size: 24px;
  ${mobile({
    marginBottom: '8px',
  })}
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  `
  
  const ItemContainer = styled.div`
  position: relative;
  cursor: pointer;
  border: 1px solid transparent;
  &:hover{
    border: 1px solid;
    border-radius: 4px;
  }
  ${mobile({
    border: '1px solid',
    borderRadius: '4px',
  })}
`

const Content = styled.div`
  width: 300px; 
  margin: 8px;
`
const Image = styled.img`
  width: 100%
`
const Price = styled.p`

`
const Name = styled.div`
  width: 100%;
  height: 50px;
`

const Icon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`

const Cart = styled.button`
  width: calc(100% - 16px);
  margin: 12px 8px;
  padding: 8px;
  border: 1px solid;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  &:hover{
    background-color: black;
    color: white;
  }
`

export default WishList;
