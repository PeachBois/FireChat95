import React, { Component } from 'react'

import SignIn from './SignIn'

const Login = () => {
  return (
    <div className='box'>
      <div className='title'>
        <p className='title'>ALOL</p>
        <button>X</button>
      </div>
      <div>
        <div className='login'>
          <img src='computer.png' className='mascot' />
          {/* <SignInGoogle /> */}
          <SignIn />
        </div>
        <div className='body'>
          <h4 className='log'>
            >: Hello! My Name is Winnie! Let me know a little about you!
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Login
