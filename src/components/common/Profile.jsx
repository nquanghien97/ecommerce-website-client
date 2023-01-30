import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchProductsRequest, actFetchClothesRequest } from '../../redux/Products/actions';
import { auth } from '../../firebase/utils';

function Profile(props) {

  const userStatus = props.currentUser

  return (
    <Container>
      {userStatus ? 
      (
        <WrapperMobile>
          <Text>
            {`Xin chào ${userStatus?.displayName}`}
          </Text>
          <Link to='/sign-in'>
            <MenuItems onClick={() => auth.signOut()}>
              Đăng xuất
            </MenuItems>
          </Link>
        </WrapperMobile>
      ) : (
      <NotSignIn>
        <Link to='/sign-in'>
          <MenuItems>
            Đăng nhập
          </MenuItems>
        </Link>
      </NotSignIn>
      )
      }
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: white;
  border-radius: 4px 0 0 4px;
  padding: 16px;
  top: 52px;
  right: 0px;
`

const WrapperMobile = styled.div`

`

const Text = styled.div`
  margin-bottom: 12px;
  color: red;
`

const MenuItems = styled.button`
  padding: 4px 8px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  width: 100%;
  background-color: #2acd83;
  &:hover {
    background-color: #8dd3b3;
  }
`

const NotSignIn = styled.div`

`

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  _products: state._todoProduct,
  _clothes: state._todoProduct
});

function mapDispatchToProps(dispatch){
    return{
        actFetchProductsRequest:()=>dispatch(actFetchProductsRequest()),
        actFetchClothesRequest:()=>dispatch(actFetchClothesRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)