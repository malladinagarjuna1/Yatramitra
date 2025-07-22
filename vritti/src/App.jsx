import { Link, Route, Routes, useLocation } from 'react-router-dom';
import DropDownMenu from '../src/lib/pages/components/dropdown/dropdown.jsx';
import FlightSearch from '../src/lib/pages/components/flight search component/flightsearchcomponent.jsx';
import GetFlights from '../src/lib/pages/get flights/getflights.jsx';
import './App.css';
import SeatSelectionWrapper from '../src/lib/pages/wrappercontent/wrappercontent.jsx';
import CheckoutButton from './lib/pages/payment/payment.jsx';
import Login from './lib/pages/login/login.jsx';
import SignupPage from './lib/pages/signup/signup.jsx';
import PaymentSuccess from './lib/pages/payment/success.jsx';
import PaymentCancel from './lib/pages/payment/cancel.jsx';
import { useEffect  } from 'react';
import Footer from './lib/pages/components/footer/footer.jsx';
import React from 'react';

import ReactDOM from "react-dom";
import TravelPackage from "./lib/pages/components/travelpackages/travelpackages.jsx";
import Video from './components/video/video.jsx'


function App() {
  const location = useLocation();
  const hideLayoutRoutes = ['/login', '/signup'];
   useEffect(() => {
    let style;

    if (location.pathname === '/login') {
      style = import('../src/lib/pages/login/login.css');
    }

    return () => {
     
      
    };
  }, [location.pathname]);





  return (
    <>
      <div   style={{minHeight: '100vh', position: 'relative'}}>
      {!hideLayoutRoutes.includes(location.pathname) && (
        <div
          className="header"
          style={{
     display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
          
            zIndex: 1000,
            padding: '5px 5px',
            boxShadow: '0 2px 5px rgba(139, 1, 1, 0.1)',
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/ALLEN_Career_Institute_logo.svg/941px-ALLEN_Career_Institute_logo.svg.png?20230622120943"
            alt="Yatramitra"
            style={{ height: '50px' }}
          />
          <Link to="/" className="nav-link" style={{ marginLeft: '250px', marginTop: '15px' }}>
            <DropDownMenu label="Home" />
          </Link>
          <Link to="/TestSeries" className="nav-link" style={{ marginTop: '15px' }}>
            <DropDownMenu label="Flight" />
          </Link>
          <Link to="/Classroom" className="nav-link" style={{ marginTop: '15px' }}>
            <DropDownMenu label="Bus" />
          </Link>
          <Link to="/Result" className="nav-link" style={{ marginTop: '15px' }}>
            <DropDownMenu label="Train" />
          </Link>
          <Link to="/StudyMaterials" className="nav-link" style={{ marginTop: '15px' }}>
            <DropDownMenu label="About Us" />
          </Link>
          <Link to="/Scholarships" className="nav-link" style={{ marginTop: '15px' }}>
            <DropDownMenu label="Contact Us" />
          </Link>
          <div style={{ marginLeft: 'auto', marginTop: '15px' }}>
            <button>Login</button>
          </div>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className={"blue-300"} style={{marginTop:"10px"}} >
             <Video/>
                <h2>Yatramita - YOUR BEST TRAVEL COMPANION</h2>
              </div>
              <div style={{ alignContent:'center', paddingTop: '1200px', display: 'flex' }}>
                <FlightSearch />
              </div>
              <div style={{paddingTop: '90px'}}>
                <TravelPackage />
                </div>
                <div style ={{paddingTop: '50px'}}>
<Footer/>
                </div>
            
            </>

          }
        />
        <Route path="/flight" element={<GetFlights />} />
        <Route path="/seatMap" element={<SeatSelectionWrapper />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentCancel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/payment-page" element={<CheckoutButton />} />
      </Routes>
        </div>
    </>
  );
}

export default App; 



