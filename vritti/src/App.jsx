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
import Video from '../src/lib/pages/components/video/video.jsx'
import GlassmorphismDiv from '../src/lib/pages/component/component.jsx';
import  StatsComponent from '../src/lib/pages/numbercomponent/numbercomponent.jsx'
import TestimonialComponent from './lib/pages/testimonialcomponent/testimonialcomponent.jsx'; 

import TravelSummaryComponent from './lib/pages/travelcomponent/travelcomponent.jsx';
import FlightSurch from './lib/pages/components/flightsearchcomponent2/flightsurch.jsx';
import Componenz from './lib/pages/componenz/componenz.jsx'
import Compo from './lib/pages/compo/compo.jsx'  
import ExplorePackages from './lib/pages/ExplorePackages/ExplorePackages.jsx';
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
            boxShadow: '0 2px 5px rgba(139, 1, 1, 0.08)',
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
            <button  className="button"style ={{marginRight:"80px", background:"Black"}}><Link to ='/login'>Login</Link></button>
          </div>
        </div>
      )}

      <Routes>
        {/* <Route
          path="/"
          element={
            <>
          
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', paddingTop: '00px' , display : 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Video><h2 style={{color:"white", fontSize:"20px"}}>Yatramitra - A Travel Booking Website</h2></Video> 
        <div style={{  position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
         
            padding: '25px',
            borderRadius: '10px',
            width: '100%',
            maxWidth: '1000px',
            height: '100%'
            }}>
          <FlightSearch />
      
      
        </div>
     
      </div>
      <div><GlassmorphismDiv/></div>
       <div><GlassmorphismDiv/></div>
              <div><GlassmorphismDiv/></div>
      <div style={{ paddingTop: '90px' }}>
        <TravelPackage />
      </div>
      <div>
        <TestimonialComponent/>
      </div>
      <div style={{ paddingTop: '50px' }}>
        <Footer />
      </div>
            
            </>

          }

        /> */}
   <Route
  path="/"
  element={
    <>
      <div style={{ 
        position: 'relative', 
        height: '100vh', 
        overflow: 'hidden', 
        paddingTop: '0px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100%' 
        }}>
          <Video 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
          <h2 style={{ 
            position: 'absolute', 
            top: '25%', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            color: '#fff', 
            fontSize: '50px', 
            fontFamily: 'Arial, sans-serif', 
            fontWeight: 'bold', 
            letterSpacing: '4px', 
            textTransform: 'uppercase', 
            transition: 'transform 0.3s ease, text-shadow 0.3s ease', 
            zIndex: 2, 
            textAlign: 'center' 
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateX(-50%) scale(1.1)';
            e.target.style.textShadow = '0 0 10px #fff, 0 0 20px #000000';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateX(-50%) scale(1)';
            e.target.style.textShadow = 'none';
          }}>
            Yatramitra - A Travel Booking Website
          </h2>
        </div>
        <div style={{ 
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '1',
          padding: '25px',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '1000px',
          height: '100%'
        }}>
          <FlightSearch />
        </div>
      </div>
      <div><GlassmorphismDiv/></div>
      <div><Componenz/></div>
      <div><Compo/></div>
      <div style={{ paddingTop: '90px' }}>
        <TravelPackage />
      </div>
      <div>
        <TestimonialComponent/>
      </div>
      <div style={{ paddingTop: '50px' }}>
        <Footer />
      </div>
    </>
  }
/>
        <Route path="/flight" element={<>
          <div><FlightSurch/></div><GetFlights /></>} />
        <Route path="/seatMap" element={<SeatSelectionWrapper />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentCancel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/payment-page" element={<CheckoutButton />} />
     <Route path = "/explore-packages" element ={<ExplorePackages/>}/>
   
      </Routes>
        </div>
    </>
  );  
}

export default App; 



