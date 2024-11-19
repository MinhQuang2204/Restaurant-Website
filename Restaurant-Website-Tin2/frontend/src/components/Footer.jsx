import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-bottom">
                <p>©2024 University of Technology and Engineering</p>
                <p>Created by Tran Minh Quang & Nguyen Duc Tin</p>
            </div>
            <div className="footer-container">
                {/* <div className="tooltip-container"
                    onClick={() => window.location.href = 'https://workspace.google.com/intl/vi/gmail/'}
                    style={{ cursor: 'pointer', color: 'blue' }}
                >
                    <span className="tooltip">Gmail</span>
                    <span className="text">@</span>
                </div> */}

                <div className="footer-section">
                    <h3>About Us</h3>
                    <Link to="/about" className="footer-link">Learn More</Link>
                </div>

                <div className="footer-section">
                    <h3>Menus</h3>
                    <Link to="/menu" className="footer-link">View Menu</Link>
                </div>

                <div className="footer-section">
                    <h3>Reserve</h3>
                    <Link to="/reserve" className="footer-link">Book Now</Link>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <Link to="/contact" className="footer-link">Get in Touch</Link>
                </div>
            </div>

        </footer>
    );
}

export default Footer;