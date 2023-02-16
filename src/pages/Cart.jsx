import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import { getCartServices, updateCartServices, deleteCartServices } from '../api/cartServices';
import CartHeader from '../components/header/CartHeader';

function Cart() {

  const userId = useSelector(state => state.user?.user?.userId) || '';

  const [listCart, setListCart] = useState([])
  const [newCart, setNewCart] = useState([]);
  const [listCartRemaining, setListCartRemaining] = useState()

  const handleChangeQuantity = (e, id) => {
    setNewCart([
      ...newCart,
      {
      productId: id,
      quantity: e.target.value,
      }
    ]
    )
  }
  const result = newCart.reduce((acc, cur) => {
    const productId = cur.productId;
    const quantity = cur.quantity;
    acc[productId] = quantity || 1;
    return acc;
  }, {});
  
  for(let i = 0; i < listCart.products?.length; i++) {
    if (Object.keys(result).includes(listCart.products[i].productId._id)) {
      listCart.products[i].quantity = +result[listCart.products[i].productId._id]
      const subTotal = listCart.products.map(item => item.quantity * item.price).reduce((sum, item) => sum + item)
      listCart.subTotal = subTotal
    }
  }
  
  useEffect(() => {
    //getCart
    const getCart = async () => {
      const res = await getCartServices(userId)
      setListCart(res.data?.data)
    }
    getCart();

    //updateCart
    const result = newCart.reduce((acc, cur) => {
      const productId = cur.productId;
      const quantity = cur.quantity;
      acc[productId] = quantity || 1;
      return acc;
    }, {});
  
    const products = Object.keys(result).map(key => ({
      productId: key,
      quantity: result[key]
    })); 
    const dataUpdate = {
      userId,
      products
    }
    const updateCart = async () => {
      await updateCartServices(dataUpdate)
    }
    updateCart()
  },[newCart, userId]);

  const deleteCart = async (productId) => {
    try {
      await deleteCartServices(userId, productId)
      const newData = listCart.products?.filter((item) => {
        return item.productId._id !== productId
      })
      setListCartRemaining(newData)
    } catch (err) {
      console.log(err)
    }
  }

  if(listCartRemaining) {
    listCart.products = listCartRemaining
    // listCart.subTotal = listCartRemaining.reduce((acc, cur) => acc + cur.total, 0)
  }

  // console.log('listCartRemaining',listCartRemaining)
  // console.log('listCart',listCart)
  
  return (
    <>
    <CartHeader />
    <Container>
      <Left>
        <TextContainer>
          <Text>Giỏ hàng của bạn</Text>
          <TotalItem>TỔNG CỘNG ({listCart.products?.length} sản phẩm): {Number(listCart.subTotal).toLocaleString('en-US')}đ</TotalItem>
        </TextContainer>
        <Content>
          { listCart.products?.map((item, index) => {
            return (
              <Wrapper key={index}>
                <LeftContent>
                  <Image src={item.productId.imageUrl} />
                </LeftContent>
                <RightContent>
                  <DesWrapper>
                    <Description>
                      <Detail>
                          <Name>{item.productId.name}</Name>
                          <Price>{Number(item.productId.price).toLocaleString('en-US')}đ</Price>
                      </Detail>
                      <TextDes>Mặt hàng có sẵn mới nhất</TextDes>
                    </Description>
                    <Action>
                      <ClearIcon onClick={()=>deleteCart(item.productId._id)} />
                    </Action>
                  </DesWrapper>
                  <div>
                    <TextField
                      type="number"
                      name="quantity"
                      label="Số lượng"
                      variant="filled"
                      onChange={(e)=> handleChangeQuantity(e, item.productId._id)}
                      InputProps={{ inputProps: { min: 1 } }}
                      defaultValue={item.quantity}
                    />
                  </div>
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
            <TotalProduct>{listCart.products?.length} sản phẩm</TotalProduct>
            <PriceProduct>{Number(listCart.subTotal).toLocaleString('en-US')}đ</PriceProduct>
          </Product>
          <Ship>
            <TextShip>Giao hàng</TextShip>
            <PriceShip>Miễn phí</PriceShip>
          </Ship>
          <Total>
            <TextTotal>Tổng</TextTotal>
            <PriceTotal>{Number(listCart.subTotal).toLocaleString('en-US')}đ</PriceTotal>
          </Total>
        </OrderContainer>
        <Pay>Thanh toán</Pay>
      </Right>
    </Container>
    <div style={{display: 'flex', justifyContent: 'center', }}>
      <TextField
        type="number"
        label="Số lượng"
        variant="filled"
        onChange={handleChangeQuantity}
        InputProps={{ inputProps: { min: 1 } }}
      />
    </div>
    </>
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

export default Cart

