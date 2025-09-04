import './App.scss'
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router, } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner';
import { useContext } from "react";
import { UserContext } from './context/userContext';
function App() {
  const { user } = useContext(UserContext)
  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <Rings
              height="80"
              width="80"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data... </div>
          </div>
          :
          <>
            <div className='app-header'>
              < Nav />
            </div>
            <div className='app-container'>
              <AppRoutes />
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>

          </>
        }
      </Router>
    </>
  );
}

export default App;
