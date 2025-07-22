import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import './travelpackages.css';
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
  
const places = ["Goa", "Kashmir", "Kerala", "Manali", "Jaipur", "Rajasthan"];


 return(
    <>
      <div className="travel-container">
<section className="cards-section">
        <h2 className="cards-title">Popular Destinations</h2>
        <motion.div
          className="cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {places.map((place, i) => (
            <motion.div
              key={i}
              className="card"
              variants={itemVariants}
              whileHover={{ scale: 1.2, y: -5}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={`/images/${place.toLowerCase()}.jpg`}
                alt={place}
                className="card-image"
              />
              <h3 className="card-title">{place}</h3>
              <p className="card-subtext">Click to view packages</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

  
      <motion.video
        autoPlay
        muted
        loop
        className="background-video"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
      >
        <source src="/travel-bg.mp4" type="video/mp4" />
      </motion.video>
      </div>
      </>
 );
}

 export default TravelPackage;