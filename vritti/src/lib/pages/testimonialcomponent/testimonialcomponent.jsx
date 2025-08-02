import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './testimonialComponent.css';

const TestimonialComponent = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Frequent Traveler",
      quote: "Yatramitra made my last-minute flight booking to Paris seamless. The interface is intuitive, and the support team was incredibly helpful!",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Business Executive",
      quote: "Thanks to Yatramitra, I saved hours on planning my business trips. The variety of options for flights, trains, and buses is impressive.",
      rating: 4,
    },
    {
      name: "Anita Desai",
      role: "Family Traveler",
      quote: "Traveling with my family was stress-free with Yatramitra. The personalized service and safety measures are top-notch!",
      rating: 5,
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const testimonialVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  return (
    <div className="testimonial-container">
      <h2 className="testimonial-title">What Our Travelers Say</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial}
          className="testimonial-card"
          variants={testimonialVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <p className="testimonial-quote">"{testimonials[currentTestimonial].quote}"</p>
          <div className="testimonial-author">
            <h3>{testimonials[currentTestimonial].name}</h3>
            <span>{testimonials[currentTestimonial].role}</span>
          </div>
          <div className="testimonial-rating">
            {'★'.repeat(testimonials[currentTestimonial].rating)}
            {'☆'.repeat(5 - testimonials[currentTestimonial].rating)}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentTestimonial === index ? 'active' : ''}`}
            onClick={() => setCurrentTestimonial(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialComponent;