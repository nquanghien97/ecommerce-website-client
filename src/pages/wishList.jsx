import styled from "styled-components";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddCart, AddWishList } from '../redux/Products/actions';
import { mobile } from '../responsive';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function WishList(props) {

  const { WishList, numberWishList } = props.items;

  console.log(WishList[0])
  return (
    <Container>
      <H1>MY WISHLISH</H1>
      <NumberItems>{numberWishList} items</NumberItems>
      <Wrapper>
        {WishList.map((item, index) => (
            <ItemContainer key={index}>
              <Link to={`/product/${item.name}`}>
                <Content>
                  <Image src={item.avatar} />
                  <Price>{Number(item.price).toLocaleString('en-US')}đ</Price>
                  <Name>{item.name}</Name>
                </Content>
              </Link>
              <Cart onClick={() => {props.AddCart(WishList[index])}}>
                Thêm vào giỏ hàng
              </Cart>
              <Icon>
                <FavoriteBorderIcon className='icon' onClick={()=> props.AddWishList(item)} />
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

const mapStateToProps = state =>{
  return{
      items:state._todoProduct,
  }
}

function mapDispatchToProps(dispatch){
  return{
      AddCart:item=>dispatch(AddCart(item)),
      AddWishList:item=>dispatch(AddWishList(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList)