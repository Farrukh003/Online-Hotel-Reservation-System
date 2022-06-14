//import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter,Route, Routes, Redirect} from 'react-router-dom';
import Homescreen from './screen/Homescreen';
import Bookingscreen from './screen/Bookingscreen';
import Registerscreen from './screen/Registerscreen';
import Login from './screen/Login';
import Profilescreen, { Mybookings } from './screen/Profilescreen';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <BrowserRouter> 
     <Routes>

    <Route path="/home" exact element={<Homescreen/>}> </Route>
    <Route path="/book/:roomid/:fromdate/:todate" exact element={<Bookingscreen />} />
    <Route path="/register" exact element={<Registerscreen/>}/>
    <Route path="/login" exact element={<Login/>}/>
    <Route path="/profile" exact element={<Profilescreen/>}/>
    <Route path="/Mybookings" exact element={<Mybookings/>}/>
    <Route path='/' exact element={<Homescreen/>}/>

    </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
