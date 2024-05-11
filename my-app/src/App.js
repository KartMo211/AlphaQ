import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>


      <BrowserRouter>
        <Routes>

          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/login" element={<UnprotectedRoute><Login/></UnprotectedRoute>}/>
          <Route path="/register" element={<UnprotectedRoute><Register/></UnprotectedRoute>}/>

        </Routes>
      </BrowserRouter>
      


    </div>
  );
}

function ProtectedRoute(props){
  if(localStorage.getItem("AlphaQ")){
    return props.children;
  }
  else return <Navigate to='/login'/>;
}

function UnprotectedRoute(props){
  if(localStorage.getItem("AlphaQ")){
    return <Navigate to='/'/>;
  }
  else return props.children;
}

export default App;
