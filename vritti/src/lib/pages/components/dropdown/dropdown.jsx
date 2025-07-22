import React, {useState} from 'react';
import './dropdown.css'
function DropDownMenu({label, items=[]}){

    return (
        <div className="Navbar">
            <div 
            className="nav-item"
            onMouseEnter={()=>setisDropDownOpen(true)}
            onMouseLeave={()=>setisDropDownOpen(false)}
            >
                <span className="nav-link">{label}</span>
               
            </div>
        </div>
    );
}

 export default DropDownMenu;
// function DropDownMenu(){
//     const [isDropDownOpen, setisDropDownOpen]= useState(false);
//    return (
//     <div className='Navbar'>
//         <div className='nav-item'
//         onMouseEnter={()=>setisDropDownOpen(true)}
//         onMouseLeave={()=>setisDropDownOpen(false)}>
//             <span className="nav-link">Test Series</span>
//        {isDropDownOpen && (
//         <div className="dropdown">
//             <div className="dropdown-item">NEET<span></span></div>
//             <div className="dropdown-item">
//        )}                    
                
            
//         </div>

//     </div>
//    )
// }