import React, { useState } from 'react'


function ImageSlider({image1, image2, image3}) {
    const[count, setCount]= useState(0);
    let CurrentImage;
    if(count==1)CurrentImage= image1;
    else if(count==2)CurrentImage= image2;
    else if(count==3)CurrentImage = image3;

  return (
    <div>
        <p>Count : { count}</p>
    <button onClick = {()=> setCount((count>1 ? count-1:3)  )}>Previous</button>
    <button onClick ={()=> setCount((count<3 ? count+1 : 1))}> Next</button>
    <img src ={CurrentImage} alt= {`Slide ${count}`}/>
    </div>
  )
}

export default  ImageSlider;