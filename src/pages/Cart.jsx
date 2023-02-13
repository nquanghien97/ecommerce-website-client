import styled from 'styled-components';
import { connect } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../redux/Products/actions';
import { mobile } from '../responsive';
import { useSelector, useDispatch} from 'react-redux';

function Cart() {

  const dispatch = useDispatch();

  const items = useSelector(state => state._todoProduct)

  const increaseQuantity = (index) => dispatch(IncreaseQuantity(index))

  const decreaseQuantity = (index) => dispatch(DecreaseQuantity(index))

  const deleteCart = (index) => dispatch(DeleteCart(index))

  let ListCart = [];
  let TotalCart = 0;
  Object.keys(items.Carts).forEach(function(item){
    TotalCart+=items.Carts[item].quantity * items.Carts[item].price;
    ListCart.push(items.Carts[item]);
  });

  return (
    <Container>
      <Left>
        <TextContainer>
          <Text>Giỏ hàng của bạn</Text>
          <TotalItem>TỔNG CỘNG ({items.numberCart} sản phẩm): {Number(TotalCart).toLocaleString('en-US')}đ</TotalItem>
        </TextContainer>
        <Content>
          { ListCart.map((item, index) => {
            return (
              <Wrapper key={index}>
                <LeftContent>
                  <Image src={item.imageUrl} />
                </LeftContent>
                <RightContent>
                  <DesWrapper>
                    <Description>
                      <Detail>
                          <Name>{item.name}</Name>
                          <Price>{Number(item.price).toLocaleString('en-US')}đ</Price>
                      </Detail>
                      <TextDes>Mặt hàng có sẵn mới nhất</TextDes>
                    </Description>
                    <Action>
                      <ClearIcon onClick={()=>deleteCart(index)} />
                    </Action>
                  </DesWrapper>
                  <Amount>
                    <Span style={{cursor: 'pointer'}} onClick={()=>decreaseQuantity(index)}>-</Span>
                    <Span>{item.quantity}</Span>
                    <Span style={{cursor: 'pointer'}} onClick={()=>increaseQuantity(index)}>+</Span>
                  </Amount>
                </RightContent>
              </Wrapper>
            )
          })}
        </Content>
      </Left>
      <Right>
        <OrderContainer>
          <H1>Tóm tắt đơn hàng</H1>
          <Product>
            <TotalProduct>{items.numberCart} sản phẩm</TotalProduct>
            <PriceProduct>{Number(TotalCart).toLocaleString('en-US')}đ</PriceProduct>
          </Product>
          <Ship>
            <TextShip>Giao hàng</TextShip>
            <PriceShip>Miễn phí</PriceShip>
          </Ship>
          <Total>
            <TextTotal>Tổng</TextTotal>
            <PriceTotal>{Number(TotalCart).toLocaleString('en-US')}đ</PriceTotal>
          </Total>
        </OrderContainer>
        <Pay>Thanh toán</Pay>
      </Right>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding: 30px 15px;
  margin-top: 110px;
  ${mobile({
    flexDirection: 'column',
    padding: 0,
    marginTop: '160px',
  })}
`

const Left = styled.div`
  flex: 60%;
  padding: 12px;
`

const TextContainer = styled.div`

`

const Content = styled.div`

`

const Wrapper = styled.div`
  display: flex;
  border: 1px solid;
  margin: 8px 0;
`

const LeftContent = styled.div`
  ${mobile({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
`

const Image = styled.img`
  width: 240px;
  ${mobile({
    width: '150px',
  })}
`

const RightContent = styled.div`
  padding: 12px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const DesWrapper = styled.div`
  display: flex;
  width: 100%;
`

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${mobile({
    flexDirection: 'column',
  })}
`

const Name = styled.h3`
  margin-bottom: 12px;
`

const Price = styled.div`
  display: flex;
  font-size: 20px;
`

const TextDes = styled.div`
  margin-bottom: 12px;
`

const Action = styled.div`
  width: 40px;
  cursor: pointer;
  margin-left: 12px;
`

const Amount = styled.div`

`

const Span = styled.span`
  font-size: 28px;
  padding: 12px;
`

const Text = styled.h1`

`

const TotalItem = styled.p`

`

const Right = styled.div`
  flex: 30%;
  padding: 12px;
`

const Pay = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`

const OrderContainer = styled.div`

`

const H1 = styled.h1`
  margin: 8px 0;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

const TotalProduct = styled.p`
  font-size: 20px;
`

const PriceProduct = styled.p`

`

const Ship = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

const TextShip = styled.p`
  font-size: 20px;
`

const PriceShip = styled.p`

`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

const TextTotal = styled.p`
  font-size: 20px;
`

const PriceTotal = styled.p`

`

const mapStateToProps = state =>{
    return{
        items:state._todoProduct,
    }
}

export default connect(mapStateToProps,{IncreaseQuantity,DecreaseQuantity,DeleteCart})(Cart)