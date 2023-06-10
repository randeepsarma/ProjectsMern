import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from './pages/Registration';
import Layout from './components/Layout';
import Feed from './pages/Feed';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import MessageBox from 'components/widgets/messages/MessageBox';

import { io } from "socket.io-client"
import Profile from 'pages/Profile';
// import Update from 'pages/Update';
// import { useEffect } from 'react';
import Error from 'pages/Error';
import Update from 'pages/Update';
import { Fragment } from 'react';
import LayoutTwo from 'components/LayoutTwo';
export const socket = "var" //io('http://localhost:8900')
function App() {


  const obj = useSelector(state => state.counterSliceReducer)
  const token = obj.token;


  //console.log(data)



  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={token?<Layout />:<LayoutTwo/>}>
          <Route index element={token ? <Navigate to={`feed/${obj.user?.id}`} /> : <Login />} />

          <Route path="register" element={token ? <Navigate to={`/feed/${obj.user.id}`} /> : <Registration />} />
          <Route path={`feed/:id`} element={token ? <Feed /> : <Navigate to="/" />} />
          <Route path="message/:id" element={token ? <MessageBox /> : <Navigate to="/" />} />
          <Route path={`profile/:id`} element={token ? <Profile /> : <Navigate to="/" />} />
          <Route path={`update/:id`} element={token ? <Update /> : <Navigate to="/" />} />
        </Route>
        
      </Routes>

    </BrowserRouter>

  );
}

export default App;
