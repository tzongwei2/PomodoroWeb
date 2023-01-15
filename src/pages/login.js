import React, { useEffect, useState } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { auth } from '../firebase/firebase';
import { Dialog } from '@material-ui/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../firebase/auth';
import {CircularProgress} from '@material-ui/core';
import StyledButton from '../components/styledButton';

const AppPage = '/PomodoroWeb/#/PomodoroWeb/pomodoro'
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: AppPage,
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID
  ]
}


function LoginPage (){
  const [login,setLogin] = useState(false);
  const {authUser,isLoading} = useAuth();
  const history = useHistory()

  useEffect(()=>{
    if(!isLoading && authUser){
      history.push('/pomodoro')
    }
  },[isLoading,authUser])


  return ((isLoading || (!isLoading && authUser))?
  <CircularProgress sx = {{marginLeft:'50%',marginTop: '25%'}}/>:
    <main>
        <div style={{marginTop:'50px'}}>
        <h1>Welcome to Pomodoro</h1>
        <h2>simple productivity timer</h2>
        <StyledButton onClick ={()=> setLogin(true)}text = 'Login'></StyledButton>
        </div>
        <Dialog open ={login} onClose = {() =>setLogin(false)}>
        <StyledFirebaseAuth uiConfig = {uiConfig} firebaseAuth = {auth}></StyledFirebaseAuth>
        </Dialog>
    
    </main>
  );
};

export default LoginPage;