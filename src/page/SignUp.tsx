import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Input from '../component/common/Input'
import Title from '../component/common/Title'
import Button from '../component/common/Button'
import COLORS from '../constant/root'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constant/routes'
import { SIGNUP } from '../api/auth'
import { getCookie } from '../util/cookie'

const SignUp = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  const accessToken = getCookie('accessToken')

  useEffect(() => {
    if (accessToken) {
      navigate(ROUTES.TODO)
      alert('로그인 상태입니다!')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type } = e.target
    switch (type) {
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setDisabled(true)
      await SIGNUP({
        email: email,
        password: password,
      })
      alert('회원가입이 성공하였습니다!\n로그인을 시도해주세요.')
      navigate(ROUTES.SIGNIN)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <SignUpStyle>
      <Title
        titleType='h1'
        title='회원가입'
        margin='0 0 50px'
      />
      <FormStyle onSubmit={handleSubmit}>
        <Input
          dataTestid='email-input'
          type='email'
          placeholder='이메일'
          onChange={handleChange}
          // onInvalid={}
        />
        <Input
          dataTestid='password-input'
          type='password'
          placeholder='비밀번호'
          onChange={handleChange}
        />
        <Button
          type='submit'
          dataTestid='signup-button'
          text='회원가입'
          isDisabled={disabled}
        />
      </FormStyle>
      <Button
        buttonType='transparent'
        text='홈으로'
        onClick={() => navigate(ROUTES.HOME)}
      />
    </SignUpStyle>
  )
}

export default SignUp

const SignUpStyle = styled.div`
  > button {
    width: 100%;
    background-color: ${COLORS.skyblue};
    margin-top: 50px;
  }
`

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
