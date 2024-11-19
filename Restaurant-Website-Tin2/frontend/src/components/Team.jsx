import React from "react";
import './Team.css';
import Staff1 from '../utils/img/staff-1.png';
import Staff2 from '../utils/img/staff-2.png';
import Staff3 from '../utils/img/staff-3.png';
import Staff4 from '../utils/img/staff-4.png';
import Staff5 from '../utils/img/staff-5.png';
import Staff6 from '../utils/img/staff-6.png';
import Staff7 from '../utils/img/staff-7.png';
import Staff8 from '../utils/img/staff-8.png';


const Team = () => {
    return (
        <div className="container py-5">
            <h2 className="text-center fs-1 mb-5 text-uppercase fw-bold">Team</h2>
            <div className="row">
                <div className="col-md-3 px-2">
                    <div className="my-3">
                        <img src={Staff1} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={Staff2} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="col-md-3 px-2">
                    <div className="my-3">
                        <img src={Staff3} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={Staff4} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="col-md-3 px-2">
                    <div className="my-3">
                        <img src={Staff5} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={Staff6} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="col-md-3 px-2">
                    <div className="my-3">
                        <img src={Staff7} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={Staff8} className="img-fluid" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team;