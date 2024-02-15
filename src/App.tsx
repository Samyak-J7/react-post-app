import './App.css';
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Main from './pages/main/Main';
import Navbar from './components/Navbar';
import CreatePost from './pages/create-post/create-post';
function App() {
  return (
    <div className="App"> 
    <Router>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/createpost' element={<CreatePost/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
