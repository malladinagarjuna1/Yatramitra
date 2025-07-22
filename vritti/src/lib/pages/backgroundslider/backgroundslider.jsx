import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion'   

const images =[
    '/images/'
];

export default function BackgroundSlider(){
    const [index, setIndex]= useState(0);
    useEffect(()=>{
        const tiemr = setInterval(()=>{
            setIndex((i)=>(i+1)%images.length);

        }, 5000);
        return ()=> clearInterval(timer);
    },[]);
   return(<div className='absolute inset-0 z-0'>
       <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>
   </div>);
}