import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

import userData from "./../../Data/userData.json";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === userData.email && password === userData.password) {
      login();
      navigate('/home')
    } else {
      alert('Invalid credentials!');
    }
  };

  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#a0e1e7'; 
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
    <MDBContainer className="my-5">
      <MDBCard className="shadow-5-strong rounded-5" >
        <MDBRow >

          <MDBCol md='12' lg="6">
            <MDBCardImage src='https://marketplace.canva.com/EAFzjXx_i5w/1/0/1600w/canva-blue-illustrative-e-commerce-online-shop-logo-fZejT2DpGCw.jpg' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='12' lg="6">
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex mx-4 flex-row mt-2'>
                <MDBIcon fas icon="cart-shopping fa-3x me-3" style={{ color: '#063970' }}/>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>
              <div className='text-center'>
                <h5 className="fw-bold my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
              </div>


                <MDBInput
                 wrapperClass='mb-4'
                  label='Email address' 
                  id='formControlLg' 
                  type='email'
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Password' 
                  id='formControlLg'
                  type='password' 
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              <MDBBtn 
                className="mb-4 px-5" 
                color='info' 
                size='lg'
                onClick={handleLogin}
              >
                Login
              </MDBBtn>


              <div className='d-flex flex-column justify-content-center align-items-center '>
                <a className="small text-muted" href="#!">Forgot password?</a>
                <p className="mb-0 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
    </div>
  );
}

export default Login;