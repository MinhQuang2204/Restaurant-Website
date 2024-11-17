import React, { useState} from 'react';
import './Menu.css';
import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import CocktailImg from '../utils/img/Cocktail.png';
import LunchImg from '../utils/img/Lunch.png';
import DinnerImg from '../utils/img/dinner.png';
import SupperImg from '../utils/img/Supper.png';
import BrunchImg from '../utils/img/Brunch.png';

function Menu() {
    const [activeMenu, setActiveMenu] = useState('Dinner');

    // Handler to change the active menu
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    return (
        <div className='menu-page'>
            <section className="hours-location">
                <h2>Hours & Location</h2>
                    <address>
                        1 Fenton Main Street, Suite 170<br />
                        Cary, NC 27511<br />
                        <a href="tel:9197660062">919-766-0062</a><br />
                        <a href="mailto:collettacary@theindigoroad.com">
                            collettacary@theindigoroad.com
                        </a>
                    </address>
                <p>Dinner: Sunday-Thursday: 5-10 p.m., Friday-Saturday: 5-11 p.m.</p>
                <p>Lunch: Monday-Friday: 11 a.m.-2:30 p.m.</p>
                <p>Brunch: Saturday-Sunday: 11 a.m.-2:30 p.m.</p>
            </section>

            <section className="menu-categories">
                <button onClick={() => handleMenuClick('Dinner')}>Dinner</button>
                <button onClick={() => handleMenuClick('Cocktails')}>Cocktails</button>
                <button onClick={() => handleMenuClick('Lunch')}>Lunch</button>
                <button onClick={() => handleMenuClick('Brunch')}>Brunch</button>
                <button onClick={() => handleMenuClick('Supper')}>Supper</button>
            </section>

            <section className="menu-items">
                {activeMenu === 'Dinner' && <img src={DinnerImg} alt="Dinner Menu" />}
                {activeMenu === 'Cocktails' && <img src={CocktailImg} alt="Cocktail Menu" />}
                {activeMenu === 'Lunch' && <img src={LunchImg} alt="Lunch Menu" />}
                {activeMenu === 'Brunch' && <img src={BrunchImg} alt="Brunch Menu" />}
                {activeMenu === 'Supper' && <img src={SupperImg} alt="Supper Menu" />}
            </section>
        </div>
    )
}

export default Menu;