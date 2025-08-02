import React from 'react'
import ImageSlider from './imageslider/imageslider'

const handleProceedToPayment = async (price) => {
  try {
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: price }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
 
  } catch (error) {
    console.error('Payment initiation failed:', error);
  }
};

function ExplorePackages({paragraph, image1, image2, image3}) {

  return (
    <div className='explore-packages'>
      
      <ImageSlider image1= {image1} image2={image2} image3={image3}/>
      <div className='details'>
           <div className='pargraph'>
            {paragraph}
            </div>
            <div className='buy'>
              <button onClick ={handleProceedToPayment(100)}>Pay Now</button>
            </div>
      </div>
</div>
  )
}

export default ExplorePackages;