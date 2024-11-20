import React from 'react';
import './Contact.css';
import Logo from '../utils/img/Logo-big.png';
import Position from '../utils/img/position.png';

const Contact = () => {
  return (
    <div className="contact-page">
      <main>
        <h2 className="main-title">We are here for you</h2>

        <section className="contact-section">
          <div className="meet-us">
            <h3>Meet us</h3>
            <li className='telephone'>
              <a href="tel:02837221223">📞 Telephone</a>
            </li>
            <p>📍 Address</p>
          </div>

          <div className="pitch-us">
            <h3>Pitch us</h3>
            <li className="facebook">
              <a href="https://www.facebook.com/dhspkt.hcmute">🌐 Facebook</a>
            </li>
            <li className="gmail">
              <a href="mailto:pmo@hcmute.edu.vn">✉️ Gmail</a>
            </li>
          </div>
        </section>

        <div className="map-container">
          <div className="map-and-logo">
            <img src={Position} alt="Map" className="map-image" />
            <img src={Logo} alt="Logo" className="map-logo" />
          </div>
          <button className="get-directions">GET DIRECTIONS</button>
        </div>
      </main>
    </div>
  );
};

export default Contact;