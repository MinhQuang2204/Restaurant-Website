
import React from 'react';
import './Home.css';
import RestaurantImage from '../utils/img/restaurant.jpg';
import Dish1 from '../utils/img/food-1.jpg';
import Dish2 from '../utils/img/food-2.jpg';
import RestaurantImage2 from '../utils/img/restaurant-2.jpg';
import RestaurantImage3 from '../utils/img/restaurant-3.jpg';


const Home = () => {
    return (
        <div className="homepage">
            {/* Welcome Section */}
            <section className="welcome-section">
                <div className="welcome-text">
                    <p>
                        Welcome to our restaurant, where we are dedicated to providing an exceptional dining experience. Our menu features a variety of delicious dishes made from the freshest ingredients, carefully prepared by our skilled chefs. Whether you're here for a casual meal, a special occasion, or simply to enjoy great food, we strive to offer excellent service and a warm, inviting atmosphere. We look forward to serving you!                    </p>
                </div>
                <img src={RestaurantImage} alt="Restaurant Interior" className="welcome-image" />
            </section>

            {/* Quote Section */}
            <section className='quote-section'>
                <section className="quote-section-1">
                    <blockquote>
                        "Delight in the exquisite and unique dishes that our restaurant has to offer, carefully crafted to provide a memorable dining experience."
                    </blockquote>
                    <img src={Dish1} alt="Dish 1" className="dish-image" />
                </section>

                <section className='quote-section-2'>
                    <button className="see-more">See more...</button>
                    <img src={Dish2} alt="Dish 2" className="dish-image" />
                </section>
            </section>

            {/* Dining Experience Section */}
            <section className="dining-section">
                <section className='dining-section-1'>
                    <img src={RestaurantImage2} alt="Restaurant Setup" className="dining-image" />
                    <blockquote>
                        "Offering a memorable and luxurious experience that delights the senses and creates lasting memories for our guests."
                    </blockquote>
                </section>
                <section className='dining-section-2'>
                    <img src={RestaurantImage3} alt="Rooftop View" className="dining-image" />
                    <button className="book-now">Book now!</button>
                </section>
            </section>
        </div>
    );
}

export default Home;
