import logo from './logo.svg';
import './App.css';
import Register from './pages/register/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login/Login';
import Chat from './pages/chat/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route  path="/" element={<Chat />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
