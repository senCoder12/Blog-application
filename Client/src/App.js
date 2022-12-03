import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Allroutes from './Components/Allroutes';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
      </BrowserRouter>
      <Allroutes/>
    </div>
  );
}

export default App;
