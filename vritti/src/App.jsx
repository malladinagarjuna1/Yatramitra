import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import DropDownMenu from '../src/lib/pages/components/dropdown/dropdown.jsx';
import FlightSearch from '../src/lib/pages/components/flight search component/flightsearchcomponent.jsx';
import './App.css';
import GetFlights from '../src/lib/pages/get flights/getflights.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className='header' style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'flex-start' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/ALLEN_Career_Institute_logo.svg/941px-ALLEN_Career_Institute_logo.svg.png?20230622120943"
          alt="Yatramitra"
          style={{ height: '50px' }}
        />

        {/* Navigation Links */}
        <Link to="/" className="nav-link" style={{ marginLeft: '250px', marginTop: '15px' }}>
          <DropDownMenu label="Home" items={["NEET", "JEE (Main+Advanced)", "JEE Main"]} />
        </Link>
        <Link to="/TestSeries" className="nav-link" style={{ marginTop: '15px' }}>
          <DropDownMenu label="Book" items={["Class 6-10", "Foundation", "Pre-Medical", "Engineering"]} />
        </Link>
        <Link to="/Classroom" className="nav-link" style={{ marginTop: '15px' }}>
          <DropDownMenu label="Tickets" />
        </Link>
        <Link to="/Result" className="nav-link" style={{ marginTop: '15px' }}>
          <DropDownMenu label="R" items={["NEET", "JEE", "Class 6-10"]} />
        </Link>
        <Link to="/StudyMaterials" className="nav-link" style={{ marginTop: '15px' }}>
          <DropDownMenu label="Study Material" />
        </Link>
        <Link to="/Scholarships" className="nav-link" style={{ marginTop: '15px' }}>
          <DropDownMenu label="Scholarships" />
        </Link>
        <Link to="/Allenestore" className="nav-link" style={{ marginTop: '15px' }}>
          <DropDownMenu label="Contact Us" />
        </Link>
        <Link to="/More" className="nav-link" style={{ marginTop: '15px' }}>
          <DropDownMenu label="More" />
        </Link>
      </div>

      <Routes>
      
        <Route path="/flight" element={<GetFlights />} />


        <Route
          path="/"
          element={
            <>
              <div>
                <h2>Yatramita - YOUR BEST TRAVEL COMPANION</h2>
              </div>

              <div style={{ paddingLeft: '350px', paddingTop: '200px', display: 'flex', flexDirection: 'center' }}>
                <FlightSearch />
              </div>

              <div>
                <h2>Popular Destinations</h2>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
