import React from 'react';
import './Reserve.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="hero">
                <div className="hero-text">
                    <h1>Reserve Your Table, Savor The Moments!</h1>
                </div>
            </section>

            <section className="content">
                <h2>Experience The Convenience Of Booking Your Table!</h2>
                <p>
                    At our restaurant, we believe that every dining experience should be seamless and enjoyable. That's why we offer a hassle-free reservation system that allows you to secure your table ahead of time. Whether you're planning a special occasion, a romantic dinner, or a casual gathering with friends, booking your table ensures that you have the perfect spot waiting for you. Simply choose your desired date and time, and let us take care of the rest. Enjoy a memorable meal with exceptional service and delectable dishes, all without the worry of wait times. Reserve your table today and savor the moments with us!
                </p>
                <button onClick={() => window.location.href = '/reservation'}>Reserve now!</button>
            </section>
        </div>
    );
};

export default About;