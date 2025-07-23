import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import './video.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function TravelPackage(){
  



return (
  <>
     <div
      className="travel-container"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative", 
        zIndex: 0, 
      }}
    >
      <motion.video
        autoPlay
        muted
        loop
        className="background-video"
        style={{
            position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
      >
        <source src="/assets/video1.mp4" type="video/mp4" />
      </motion.video>
    </div>
  </>
);
}

 export default TravelPackage;