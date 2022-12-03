import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Allroutes from './Components/Allroutes';
import Header from './Components/Header';
import { setUser } from './Redux/Features/authSlice';

function App() {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('profile'));
    dispatch(setUser(user));
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        {/* <ToastContainer/> */}
      </BrowserRouter>
        <Allroutes/>
    </div>
  );
}

export default App;
