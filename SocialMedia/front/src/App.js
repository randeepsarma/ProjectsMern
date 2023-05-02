import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from './pages/Registration';
import Layout from './components/Layout';
import Feed from './pages/Feed';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import MessageBox from 'components/widgets/messages/MessageBox';
import Comment from 'components/widgets/posts/postChild/Comment';
import Messanger from 'components/widgets/Messanger/Messanger';
function App() {

  const obj = useSelector(state => state.counterSliceReducer)
  const token = obj.token;


  //console.log(data)





  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={token ? <Navigate to={`feed/${obj.user.id}`} /> : <Login />} />

            <Route path="registration" element={<Registration />} />
            <Route path={`feed/:id`} element={token ? <Feed /> : <Navigate to="/" />} />
            <Route path="message/:id" element={token ? <MessageBox /> : <Navigate to="/" />} />

          </Route>
        </Routes>
        {/* <Routes>
          <Route path={`message/:id`} element={token ? <Messanger /> : <Navigate to="/" />} />
        </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
