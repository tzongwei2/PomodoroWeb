import ReactSlider from "react-slider";
import './slider.css'
import SettingsContext from "../settingsContext";
import { useContext } from "react";
import BackButton from "../components/backButton";
import StyledButton from "../components/styledButton";

function Settings(){
    const settingsInfo = useContext(SettingsContext);
    return(
        <div style={{ textAlign: 'left', width: '500px'}}>
        <label>work minutes: {settingsInfo.workMinutes}:00</label>
        <ReactSlider 
        className = {'slider'}
        thumbClassName = {'thumb'}
        trackClassName = {'track'}
        value ={settingsInfo.workMinutes}
        onChange = {newValue => settingsInfo.setWorkMinutes(newValue)}
        min = {1}
        max = {120}
        ></ReactSlider>
        <label>break minutes: {settingsInfo.breakMinutes}:00</label>
        <ReactSlider 
        className = {'slider green'}
        thumbClassName = {'thumb'}
        trackClassName = {'track'}
        value ={settingsInfo.breakMinutes}
        onChange = {newValue => settingsInfo.setbreakMinutes(newValue)}
        min = {1}
        max = {120}
        ></ReactSlider>
         <div style ={{display:'flex', gap: '10px',textAlign:'center', marginTop:'20px'}}>
        <StyledButton text ={'save'}/>
        <StyledButton text ={'music'}/>
        </div>
        <div style ={{display:'flex', gap: '10px',textAlign:'center', marginTop:'20px'}}>
        <BackButton onClick = {()=> settingsInfo.setShowSettings(false)}/>
        <StyledButton text  ={'d'} ></StyledButton>
        <StyledButton text  ={1} ></StyledButton>
        <StyledButton text  ={2} ></StyledButton>
        <StyledButton text  ={3} ></StyledButton>
        <StyledButton text  ={4} ></StyledButton>
        </div>
        </div>
    )
}

export default Settings;