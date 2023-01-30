import React, { useState } from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';
import { auth, handleUserProfile } from '../firebase/utils'

function SignUp() {

  const [input, setInput] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    })
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = input
    if(password !== confirmPassword) {
      const err = ['Mật khẩu không khớp']
      setInput({
        errors: err
      })
      return;
    }
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
  
        await handleUserProfile( user, { displayName })
  
        setInput({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
          errors: [],
        })
      }
      catch(error) {
        console.log(error)
    }
  }

  return (
    <Container>
      <Content>
      <Title>Đăng ký</Title>
      { input.errors.length > 0 && (
        input.errors.map((error) => {
          return <p style={{color: 'red'}}>{error}</p>
        })
      )}
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <Input
            name="displayName"
            placeholder="Họ tên"
            value={input.displayName}
            onChange={handleChange}
          />
          <Input
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
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={input.confirmPassword}
            onChange={handleChange}
          />
        </Wrapper>
        <ButtonWrapper>
          <Button>Đăng ký</Button>
        </ButtonWrapper>
      </Form>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  ${mobile({
    padding: 0,
  })}
`

const Form = styled.form`
  padding: 20px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 400px;
  padding: 16px;
  margin: 8px 0;
  border-radius: 5px;
  border: 1px solid black;
  ${mobile({width: '300px'})};
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
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

export default SignUp