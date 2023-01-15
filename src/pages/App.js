import Timer from '../components/timer';
import './App.css';
import Settings from './settings.js';
import { useEffect, useState } from 'react';
import SettingsContext from '../settingsContext';
import { useAuth } from '../firebase/auth';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';



function App() {

  const [showSettings,setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setbreakMinutes] = useState(15);
  const {authUser,isLoading} = useAuth();
  const history = useHistory();

  useEffect(()=>{
        if(!authUser && !isLoading){
        console.log(authUser)
        console.log(isLoading)
        history.push('/')
        }
    },[authUser,isLoading])

  

  return((!authUser)?
    <CircularProgress sx = {{marginLeft:'50%',marginTop: '50%'}}/>:
    <main>
      
      <SettingsContext.Provider value ={{
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setbreakMinutes,
        showSettings,
        setShowSettings,
      }}>
       {showSettings ? <Settings/> : <Timer/>}
       </SettingsContext.Provider>
    </main>
  )
}

export default App;
