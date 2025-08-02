import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import './travelcomponent.css';

const TravelSummaryComponent = () => {
  const [summary, setSummary] = useState({
    totalTrips: 0,
    totalSavings: 0,
    activeBookings: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSummary((prevSummary) => ({
        totalTrips: prevSummary.totalTrips + Math.floor(Math.random() * 5),
        totalSavings: prevSummary.totalSavings + Math.floor(Math.random() * 1000),
        activeBookings: prevSummary.activeBookings + Math.floor(Math.random() * 2),
      }));
    }, 3000); // Update every 3 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const summaryVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="travel-summary-container">
      <motion.div
        className="travel-summary-card"
        initial="hidden"
        animate="visible"
        variants={summaryVariants}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <h2 className="summary-title">Travel Summary</h2>
        <div className="summary-items">
          <div className="summary-item">
            <motion.h3 variants={summaryVariants}>Total Trips Booked</motion.h3>
            <motion.p variants={summaryVariants}>
              <CountUp end={summary.totalTrips} separator="," duration={2} />
            </motion.p>
          </div>
          <div className="summary-item">
            <motion.h3 variants={summaryVariants}>Total Savings (USD)</motion.h3>
            <motion.p variants={summaryVariants}>
              <CountUp end={summary.totalSavings} separator="," prefix="$" duration={2} />
            </motion.p>
          </div>
          <div className="summary-item">
            <motion.h3 variants={summaryVariants}>Active Bookings</motion.h3>
            <motion.p variants={summaryVariants}>
              <CountUp end={summary.activeBookings} separator="," duration={2} />
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TravelSummaryComponent;