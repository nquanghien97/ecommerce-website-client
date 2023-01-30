import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { mobile } from '../responsive'
import { signInWithGoogle, auth } from '../firebase/utils';

function SignIn() {

  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = input

    try {
      await auth.signInWithEmailAndPassword(email, password)

      setInput({
        email: '',
        password: '',
      })
    }
    catch(err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    })
  }

  console.log(input)
  return (
    <Container>
      <Content>
      <Title>Đăng nhập</Title>
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={input.password}
            onChange={handleChange}
          />
        </Wrapper>
        <ButtonWrapper>
          <Button>Đăng nhập</Button>
        </ButtonWrapper>
      </Form>
      <Google onClick={signInWithGoogle}>
          Sign-in with Google
      </Google>
      <SignUpWrapper>
          Bạn chưa có tài khoản?
          <Link to='/sign-up'>
              <SignUp>
                  Đăng ký ngay
              </SignUp>
          </Link>
      </SignUpWrapper>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: calc(100vh - 30px - 30px - 70px)
  ${mobile({height: 'calc(100vh - 224px)'})}
`

const Content = styled.div`
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  ${mobile({
    padding: '40px 0',
    marginTop: '20px',
  })}
`

const Title = styled.h1`
  padding: 20px;
`

const Form = styled.form`

`

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  width: 400px;
  padding: 16px;
  margin: 8px 0;
  border-radius: 5px;
  border: 1px solid black;
  ${mobile({width: '300px'})};
`

const Button = styled.button`
  padding: 10px 40px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  width: 50%;
  background-color: #2acd83;
  &:hover {
    background-color: #8dd3b3;
  }
`

const Google = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 50%;
  background-color: #d85040;
  &:hover {
    background-color: #d38a81;
  }
`

const SignUpWrapper = styled.div`
  margin-top: 20px;
`

const SignUp = styled.span`
  margin-left: 8px;
  color: blue;
  cursor: pointer;
  &:hover {
      text-decoration: underline;
  }
`

export default SignIn