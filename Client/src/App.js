import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Allroutes from './Components/Allroutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h2>Hello React</h2>
      </BrowserRouter>
      <Allroutes/>
    </div>
  );
}

export default App;
