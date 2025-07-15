import React, {useState} from 'react';
import './dropdown.css'
function DropDownMenu({label, items=[]}){
    const [isDropDownOpen, setisDropDownOpen]= useState(false);
    return (
        <div className="Navbar">
            <div 
            className="nav-item"
            onMouseEnter={()=>setisDropDownOpen(true)}
            onMouseLeave={()=>setisDropDownOpen(false)}
            >
                <span className="nav-link">{label}</span>
                {isDropDownOpen && (
                    <div className="dropdown">
                        {items.map((item, index)=>(
                            <div key ={index} className="dropdown-item">
                                {item}<span></span>
                                </div>
                        ))}
                    <div className="dropdown-item">NEET<span></span></div>
                    <div className="dropdown-item">JEE (Main+Advanced)<span></span></div>
                    <div className = "dropdown-item">JEE Main<span></span></div>
                    </div>
                )}
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