import React from 'react';
import './About.css';
import Food1 from '../utils/img/food1.png';
import Food2 from '../utils/img/food2.png';
import Team from '../components/Team';
import Reviews from '../components/Reviews';

const About = () => {
    return (
        <div className='about-page'>
            <header className='rounded m-auto'>
                <div className='container d-flex align-items-center justify-content-center'>
                </div>
            </header>

            <div className='container my-5'>
                <div className='about-text'>
                    <p>We are committed to delivering an unforgettable dining experience that brings together exquisite flavors, exceptional service, and a warm, inviting atmosphere. Our menu showcases a collection of unique dishes, thoughtfully prepared with the freshest ingredients by our talented chefs. Whether you are here to celebrate a special occasion, enjoy a casual meal, or indulge in culinary excellence, our mission is to delight your senses and create memories that last a lifetime.
                        Experience the perfect blend of tradition and innovation with every bite. We look forward to hosting you and making every visit remarkable.</p>
                </div>

                <div className='meal-section'>
                    <section className='meal-section-1'>
                        <div className='col-lg-8'>
                            <img src={Food1} className='img-fluid my-4' alt="" />
                        </div>
                        <div className='col-lg-6'>
                            <p className='w-75'>COLLETTA CARY
                                Seasonal changes, outstanding ingredients and a made-from-scratch philosophy guide Colletta's menu of house-made focaccia and pasta, antipastis, made-to-order wood-fired pizzas, and piatti. The chef curated dinner and dessert menus, pair with the well balanced wine and beverage program.
                                Located at Fenton in Cary, NC, this casual yet polished family-style Italian restaurant features 120 indoor dining seats, 60 seats outdoors on the semi-covered patio, and a 12-seat bar.</p>
                        </div>
                    </section>
                    <section className='meal-section-2 align-items-center'>
                        <div className='col-lg-7'>
                            <p className='w-75'>COLLETTA ATLANTA
                                Located at Avalon in Alpharetta, GA, Colleta Atlanta's restaurant's open-concept dining room is anchored around the kitchen's wood-burning oven, reminiscent of the hearth in a family home. Accented by reclaimed barn wood and refined ceramic tile, the modern space envelops guests in a welcoming atmosphere - whether they're visiting the bar for a hand-crafted cocktail or a glass of wine, grabbing a pizza with the kids or sitting down for a family-style dinner with friends and colleagues.r.
                            </p>
                        </div>
                        <div className='col-lg-6'>
                            <img src={Food2} className='img-fluid my-4' alt="" />
                        </div>
                    </section>
                </div>
            </div>

            <div className='my-5'>
                <Team />
            </div>

            <div className='my-0'>
                <Reviews />
            </div>
        </div>
    )
}

export default About;