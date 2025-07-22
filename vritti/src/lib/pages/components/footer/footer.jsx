import React, { useState } from 'react';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      title: 'Product Information',
      content: 'Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability. Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.',
    },
    {
      title: 'Shipping Details',
      content: 'Shipping is available worldwide. Standard delivery takes 5-7 business days, while express shipping takes 1-3 business days. Free shipping on orders over $50. Track your order with our real-time tracking system.',
    },
    {
      title: 'Return Policy',
      content: 'Returns are accepted within 30 days of purchase. Items must be unused and in original packaging. Contact support for a return authorization. Refunds are processed within 7-10 business days.',
    },
  ];

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // Inline SVG for the arrow (simplified)
  const ArrowIcon = ({ isOpen }) => (
    <svg
      style={{
        width: '20px',
        height: '20px',
        transform: isOpen ? 'rotate(180deg)' : 'none',
        transition: 'transform 0.3s ease',
        fill: 'none',
        stroke: 'currentColor',
      }}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', padding: '20px 10px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {sections.map((section, index) => (
          <div key={index} style={{ borderTop: '1px solid #4a4a4a' }}>
            <button
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px',
                backgroundColor: openSection === index ? '#333' : '#000',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background-color 0.3s',
              }}
              onClick={() => toggleSection(index)}
              aria-expanded={openSection === index}
              aria-controls={`footer-content-${index}`}
            >
              <span style={{ fontSize: '18px', fontWeight: '500' }}>{section.title}</span>
              <ArrowIcon isOpen={openSection === index} />
            </button>
            <div
              id={`footer-content-${index}`}
              style={{
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out',
                maxHeight: openSection === index ? '384px' : '0',
              }}
            >
              <p style={{ padding: '12px', color: '#ccc', margin: '0' }}>{section.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#999' }}>
        © {new Date().getFullYear()} Yatramitra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;