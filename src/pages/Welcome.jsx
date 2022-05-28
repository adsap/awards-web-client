import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { signIn } from '../store/actionCreator'
import { useNavigate } from "react-router-dom"
import star from '../assets/star.svg'

const Welcome = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  let [ email, setEmail ] = useState('')

  const onChangeHandle = (e) => {
    const {value} = e.target
    setEmail(value)
  }

  const onClickHandle = (e) => {
    e.preventDefault()
    dispatch(signIn(email, navigate))
  }
  
  return (
    <>
      <div className="container mt-5">
        <div className="text-center">
          <img src={star} alt="thumbnail" className="img-thumbnail mt-5" width={150} height={150}/>
          <p className="fs-2 fw-bold text-secondary">AWARD</p>
          <p>Enter your email address<br/> to sign in and continue</p>
          <div className="myForm">
            <input onChange={(e)=>{onChangeHandle(e)}} type="email" name="email" className="form-control" id="email" placeholder="Email Address"/>
          </div>
          <button onClick={(e)=>{onClickHandle(e)}} type="button" className="btn mt-3" style={{backgroundColor: "navy", color: 'white', width: '150px'}}>Sign In</button>
        </div>
      </div>
    </>
  )

}

export default Welcome