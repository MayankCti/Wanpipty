import React from 'react';
import { useNavigate } from 'react-router';
import { pageRoutes } from '../Routes/pageRoutes';
import './DashboardCss.css';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor: "#000000" }}>
            <div className="ct_home_2_main">
                <div className="d-flex align-items-center gap-3">
                    {/* <div className="ct_admin_logo">
                        <img src="assets/img/Panaloto_logo1.png" alt="" style={{ maxWidth: "260px" }} />
                    </div> */}
                    <div className="ct_login_main" onClick={() => navigate(pageRoutes.login)}>
                        <a href="javascript:void(0)" className="ct_home_login ct_ff_Antonio">LOGIN</a>
                    </div>
                </div>
                <div className="ct_index_2_title pt-5 ">
                    <div>
                        <h2 className="ct_fs_113 ct_ff_Chromium ct_yellow_text_1">LAST 2</h2>
                        <p>araw araw, oras oras - panalo to dito!</p>
                        <div className="ct_login_main mx-auto mt-5 mb-4" onClick={() => navigate(pageRoutes.login)}>
                            <a href="javascript:void(0)" className="ct_home_login ct_ff_Antonio">PLAY  NOW</a>
                        </div>
                    </div>
                    <div className="ct_fixed_bottom_img">
                        <img src="assets/img/balls.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard