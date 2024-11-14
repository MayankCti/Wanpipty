import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import { fetchProfile } from '../Redux/Action/userReducer';
import { pageRoutes } from '../Routes/pageRoutes';
import { curSym } from '../Auth/Pip';
import { Formik } from "formik";
import ErrorMessage from "../Components/ErrorMessage";
import { ContactUsSchema } from '../Auth/schema';

const Dashboard1 = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const dispatch = useDispatch();
    const [remainingHours, setRemainingHours] = useState(0);
    const [remainingMinuts, setRemainingMinuts] = useState(0);
    const [remainingSecondes, setRemainingSecondes] = useState(0);
    const initialState = {
        email: "",
        name: "",
        comment: "",
    };

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play();
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now1 = new Date();
            const hours1 = now1.getHours();
            const minutes1 = now1.getMinutes();
            const secondes1 = now1.getSeconds();
            setRemainingHours(24 - hours1);
            setRemainingMinuts(60 - minutes1);
            setRemainingSecondes(60 - secondes1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSubmitData = async (values, { setSubmitting }) => {
        setSubmitting(false);
        console.log(values)
    }

    return (
        <div>
            <header className="ct_header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="ct_logo">
                                    <a>
                                        <img src="assets/img/Panaloto_logo1.png" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a onClick={() => navigate(pageRoutes.login)} className="ct_yellow_btn ct_login_btn ct_pointer_curser">Login</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="ct_hero_banner">
                {/* <video
                    width="100%"
                    height="670px"
                    muted="muted"
                    autoplay="true"
                    playsinline
                    loop
                    src="assets/img/wanpipti_video.mov"
                >
                    <source muted="true" src="assets/img/wanpipti_video.mov" type="video/mov" />
                </video> */}
                <iframe className="ct_iframe_fix" src="https://www.panaloto.com/lotto_balls.mp4" height="200" width="100%" title="Iframe Example" style={{ objectFit: "cover" }}></iframe>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-sine">
                            <div className="ct_hero_banner_left">
                                <img src="assets/img/number_img_new.png" alt="" />
                                <div className="mt-5 text-center ">
                                    <a onClick={() => navigate(pageRoutes.login)} className="ct_yellow_btn ct_login_btn mx-auto w-50">PLAY NOW</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-left"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-sine">
                            <div className="ct_hero_banner_right text-center">
                                <h1 className="ct_fs_60 ct_anton_ff ct_dark_yellow_text">Last 2 <br /> Araw Araw, Oras Oras <br /> Panalo to dito! </h1>
                                {/* <h4 className="text-white ct_fs_24 ct_fw_300 mt-2">Genuine Money Transaction</h4> */}
                                <div className="d-flex align-items-center gap-3 justify-content-center mt-4 ">
                                    <ul className="ct_comming_soon_div">
                                        <li>
                                            <h5 className="">Pick 3</h5>
                                            <p>Coming Soon</p>
                                        </li>
                                        <li>
                                            <h5 className="">STL</h5>
                                            <p>Coming Soon</p>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="ct_be_control_bg">
                <div className="container">
                    <div className="row">
                        <div className=" col-lg-12 mx-auto" data-aos="fade-down"
                            data-aos-duration="1000">
                            <div className="ct_today_win_card">
                                <h3 className="mb-0 ct_fs_35 text-white ct_anton_ff ct_fw_400 ct_white_space_nowrap">Today you can Win upto</h3>
                                <img src="assets/img/List.png" alt="" className="w-100" />
                            </div>
                        </div>
                    </div>
                    <div className="ct_mt_102" data-aos="fade-down"
                        data-aos-duration="1000">
                        <h2 className="ct_fs_35 ct_anton_ff ct_yellow_text text-center ct_mb_40">Be in Control</h2>
                        <img src="assets/img/line.png" alt="" className="mx-auto d-block ct_line_500" />
                    </div>
                </div>
                <div className="container mt-5 pt-3 pb-5">
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center gap-3 ct_flex_wrap_md">
                                <div className="ct_control_icon">
                                    <img src="assets/img/icon_1.svg" alt="" />
                                </div>
                                <div>
                                    <h4 className="ct_fs_20 text-white ct_fw_700">Payment Limitation</h4>
                                    <p className="mb-0 text-white ct_fw_400">Lorem ipsum dolor sit amet, consecteturt, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. sum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-left"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center gap-3 ct_flex_wrap_md">
                                <div className="ct_control_icon">
                                    <img src="assets/img/icon_2.svg" alt="" />
                                </div>
                                <div>
                                    <h4 className="ct_fs_20 text-white ct_fw_700">Profit Limitation</h4>
                                    <p className="mb-0 text-white ct_fw_400">Lorem ipsum dolor sit amet, consecteturt, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. sum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="assets/img/line.png" alt="" className="mx-auto d-block w-100 ct_line_3" />
                <div className="container mt-5 pt-3">
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center gap-3 ct_flex_wrap_md">
                                <div className="ct_control_icon">
                                    <img src="assets/img/icon_3.svg" alt="" />
                                </div>
                                <div>
                                    <h4 className="ct_fs_20 text-white ct_fw_700">Loss Limitation</h4>
                                    <p className="mb-0 text-white ct_fw_400">Lorem ipsum dolor sit amet, consecteturt, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. sum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-left"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center gap-3 ct_flex_wrap_md">
                                <div className="ct_control_icon">
                                    <img src="assets/img/icon_4.svg" alt="" />
                                </div>
                                <div>
                                    <h4 className="ct_fs_20 text-white ct_fw_700">Deposit Limit</h4>
                                    <p className="mb-0 text-white ct_fw_400">Lorem ipsum dolor sit amet, consecteturt, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. sum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          */}
            {/* <section className="ct_how_start_bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" data-aos="fade-down"
                            data-aos-duration="1000">
                            <h2 className="ct_fs_35 ct_anton_ff ct_yellow_text text-center ct_mb_40">How to Start ?</h2>
                            <img src="assets/img/line.png" alt="" className="mx-auto d-block ct_line_500" />
                        </div>
                    </div>
                    <div className="row  mt-5 pt-3">
                        <div className="col-md-4 mb-4 mb-md-0" data-aos="fade-right"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center gap-3 ct_flex_wrap_md">
                                <div className="ct_control_icon">
                                    <img src="assets/img/icon_1.svg" alt="" className="ct_img_81" />
                                </div>
                                <div>
                                    <h4 className="ct_fs_20 text-white ct_fw_700">Signup and LOGIN</h4>
                                    <p className="mb-0 text-white ct_fw_400">Lorem ipsum dolor sit ametiqua.
                                sum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 mb-md-0" data-aos="fade-up"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center gap-3 ct_flex_wrap_md">
                                <div className="ct_control_icon">
                                    <img src="assets/img/icon_6.png" alt="" className="ct_img_81" />
                                </div>
                                <div>
                                    <h4 className="ct_fs_20 text-white ct_fw_700">Deposit in WALLET</h4>
                                    <p className="mb-0 text-white ct_fw_400">Lorem ipsum dolor sit ametiqua.
                                sum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 mb-md-0" data-aos="fade-left"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center gap-3 ct_flex_wrap_md">
                                <div className="ct_control_icon">
                                    <img src="assets/img/icon_5.png" alt="" className="ct_img_81" />
                                </div>
                                <div>
                                    <h4 className="ct_fs_20 text-white ct_fw_700">Play & Enjoy</h4>
                                    <p className="mb-0 text-white ct_fw_400">Lorem ipsum dolor sit ametiqua.
                                sum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section> */}
            {/* <section className="ct_be_control_bg ct_pt_85 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" data-aos="fade-down"
                            data-aos-duration="1000">
                            <h2 className="ct_fs_35 ct_anton_ff ct_yellow_text text-center ct_mb_40">Unlock free TRIAL</h2>
                            <img src="assets/img/line.png" alt="" className="mx-auto d-block ct_line_500" />
                        </div>
                    </div>
                    <div className="row mt-4 align-items-center">
                        <div className="col-md-5 mb-4 mb-md-0 mb-4" data-aos="fade-right"
                            data-aos-duration="1000">
                            <div className="ct_free_trial_img">
                                <img src="assets/img/img_12.png" alt="" />
                            </div>
                        </div>
                        <div className="col-md-6 offset-md-1 mb-md-0 mb-4" data-aos="fade-left"
                            data-aos-duration="1000">
                            <div>
                                <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis notrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                                <p className="text-white">velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupdatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                laborum. Sed ut perspiciatis unde omnis iste.</p>
                                <a href="#" className="ct_yellow_btn ct_login_btn mt-4 h-auto py-2 w-50">PLAY NOW</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <section className="ct_how_start_bg" data-aos="fade-up"
                data-aos-duration="1000">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <img src="assets/img/line.png" alt="" className="mx-auto d-block ct_line_500" />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <h2 className="ct_fs_24 ct_anton_ff ct_yellow_text text-center ct_mb_40">TODAY'S WINNERS</h2>
                            <ul className="ct_winner_list">
                                <li>
                                    <p className="mb-0 text-white">04. jemmy doe</p>
                                    <img src="assets/img/user_1.png" alt="" className="ct_img_30" />
                                    <p className="mb-0 text-white">{curSym} 365.28</p>
                                </li>
                                <li>
                                    <p className="mb-0 text-white">14. Adelbert</p>
                                    <img src="assets/img/user_2.png" alt="" className="ct_img_30" />
                                    <p className="mb-0 text-white">{curSym} 365.28</p>
                                </li>
                                <li>
                                    <p className="mb-0 text-white">15. Abraham</p>
                                    <img src="assets/img/user_3.png" alt="" className="ct_img_30" />
                                    <p className="mb-0  text-white   ">{curSym} 365.28</p>
                                </li>
                                <li>
                                    <p className="mb-0 text-white">04. jemmy doe</p>
                                    <img src="assets/img/user_1.png" alt="" className="ct_img_30" />
                                    <p className="mb-0  text-white   ">{curSym} 365.28</p>
                                </li>
                                <li>
                                    <p className="mb-0 text-white">14. Adelbert</p>
                                    <img src="assets/img/user_2.png" alt="" className="ct_img_30" />
                                    <p className="mb-0  text-white   ">{curSym} 365.28</p>
                                </li>
                                <li>
                                    <p className="mb-0 text-white">15. Abraham</p>
                                    <img src="assets/img/user_3.png" alt="" className="ct_img_30" />
                                    <p className="mb-0  text-white   ">{curSym} 365.28</p>
                                </li>
                                <li>
                                    <p className="mb-0 text-white">15. Abraham</p>
                                    <img src="assets/img/user_3.png" alt="" className="ct_img_30" />
                                    <p className="mb-0  text-white   ">{curSym} 365.28</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <h2 className="ct_fs_35 ct_anton_ff ct_yellow_text text-center ct_mb_40">JACKPOTS</h2>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="ct_jackpots_car">
                                        <figure>
                                            <div className="ct_jackpot_car_img">
                                                <img src="assets/img/car.png" alt="" />
                                            </div>
                                            <figcaption>
                                                <h4 className="ct_fs_24 text-center text-white ct_anton_ff ct_fw_400">CAR</h4>
                                                <p className="ct_fs_24 text-center text-white mb-2">{curSym} 1,25,002</p>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="ct_jackpots_car">
                                        <figure>
                                            <div className="ct_jackpot_car_img">
                                                <img src="assets/img/cash.png" alt="" />
                                            </div>
                                            <figcaption>
                                                <h4 className="ct_fs_24 text-center text-white ct_anton_ff ct_fw_400">CASH</h4>
                                                <p className="ct_fs_24 text-center text-white mb-2">{curSym} 25,002</p>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="ct_jackpots_car">
                                        <figure>
                                            <div className="ct_jackpot_car_img">
                                                <img src="assets/img/bike.png" alt="" />
                                            </div>
                                            <figcaption>
                                                <h4 className="ct_fs_24 text-center text-white ct_anton_ff ct_fw_400">BIKE</h4>
                                                <p className="ct_fs_24 text-center text-white mb-2">{curSym} 50,030</p>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="ct_jackpots_car">
                                        <figure>
                                            <div className="ct_jackpot_car_img">
                                                <img src="assets/img/phone.png" alt="" />
                                            </div>
                                            <figcaption>
                                                <h4 className="ct_fs_24 text-center text-white ct_anton_ff ct_fw_400">IPHONE</h4>
                                                <p className="ct_fs_24 text-center text-white mb-2">{curSym} 50,030</p>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="ct_jackpots_car">
                                        <figure>
                                            <div className="ct_jackpot_car_img">
                                                <img src="assets/img/gold.png" alt="" />
                                            </div>
                                            <figcaption>
                                                <h4 className="ct_fs_24 text-center text-white ct_anton_ff ct_fw_400">GOLD</h4>
                                                <p className="ct_fs_24 text-center text-white mb-2">{curSym} 50,030</p>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="ct_jackpots_car">
                                        <figure>
                                            <div className="ct_jackpot_car_img">
                                                <img src="assets/img/game.png" alt="" />
                                            </div>
                                            <figcaption>
                                                <h4 className="ct_fs_24 text-center text-white ct_anton_ff ct_fw_400">PS 5</h4>
                                                <p className="ct_fs_24 text-center text-white mb-2">{curSym} 50,030</p>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <h2 className="ct_fs_24 ct_anton_ff ct_yellow_text text-center ct_mb_40">NEXT GAME WILL START IN</h2>
                            <div className="ct_next_game_box">
                                <h5>{remainingHours <= 9 ? `0${remainingHours}` : remainingHours ?? 0}</h5>
                                <p className="mb-0">Hours</p>
                            </div>
                            <div className="ct_next_game_box mt-5">
                                <h5>{remainingMinuts <= 9 ? `0${remainingMinuts}` : remainingMinuts ?? 0}</h5>
                                <p className="mb-0">Mins</p>
                            </div>
                            <div className="ct_next_game_box mt-5">
                                <h5>{remainingSecondes <= 9 ? `0${remainingSecondes}` : remainingSecondes ?? 0}</h5>
                                <p className="mb-0">Secs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <section className="ct_faq_bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" data-aos="fade-down"
                            data-aos-duration="1000">
                            <h2 className="ct_fs_35 ct_anton_ff ct_yellow_text text-center ct_mb_40">FREQUENTLY ASK QUESTIONS</h2>
                            <img src="assets/img/line.png" alt="" className="mx-auto d-block ct_line_500" />
                        </div>
                    </div>
                    <div className="row mt-5 pt-4">
                        <div className="col-lg-9 mb-4 mb-md-4" data-aos="fade-right"
                            data-aos-duration="1000">
                            <div className="row ct_faq_main ct_mb_30">
                                <div className="col-lg-6">
                                    <div className="ct_faq_cnt">
                                        <h4 className="ct_fs_20 ct_mb_20 ct_fw_500 text-white ct_anton_ff">01. How do I create Casine Account ?</h4>
                                        <p className="text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit, sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim.</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="ct_faq_cnt ct_line_none">
                                        <h4 className="ct_fs_20 ct_mb_20 ct_fw_500 text-white ct_anton_ff">02. Where can I Redeem My Earnings ?</h4>
                                        <p className="text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit, sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row ct_faq_main">
                                <div className="col-lg-6">
                                    <div className="ct_faq_cnt">
                                        <h4 className="ct_fs_20 ct_mb_20 ct_fw_500 text-white ct_anton_ff">03. How do I Start Playing ?</h4>
                                        <p className="text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua. Ut enim ad minim. Lorem
                                    ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="ct_faq_cnt ct_line_none">
                                        <h4 className="ct_fs_20 ct_mb_20 ct_fw_500 text-white ct_anton_ff">04. How do I Move Up a Level ?</h4>
                                        <p className="text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua. Ut enim ad minim. Lorem
                                    ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3  mb-4 mb-md-4" data-aos="fade-left"
                            data-aos-duration="1000">
                            <div className="ct_faq_form">
                                <Formik
                                    initialValues={initialState}
                                    validationSchema={ContactUsSchema}
                                    onSubmit={(values, actions) => {
                                        handleSubmitData(values, actions);
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                    }) => (
                                        <form>
                                            <div className="form-group mb-3">
                                                <input
                                                    id="name"
                                                    type="text"
                                                    className="form-control ct_input"
                                                    placeholder="Enter Your Name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="name"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input
                                                    id="email"
                                                    type="email"
                                                    className="form-control ct_input"
                                                    placeholder="Enter Your Email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="email"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <textarea
                                                    id="comment"
                                                    rows="4"
                                                    className="form-control ct_input h-auto"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.comment}
                                                    placeholder="Enter Comments"
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="comment"
                                                />
                                            </div>
                                            <button
                                                onClick={(e) => handleSubmit(e)}
                                                type="submit"
                                                className="ct_yellow_btn ct_login_btn mt-4 h-auto w-100 py-2 ct_radius_none"
                                            >SEND
                                            </button>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="ct_about_bg">
                <div className="container ct_mb_74">
                    <div className="row justify-content-between">
                        <div className="col-md-5 mb-4 mb-md-0" data-aos="fade-right"
                            data-aos-duration="1000">
                            <div className="ct_about_cnt px-4">
                                <h2 className="ct_fs_35 ct_anton_ff ct_yellow_text ct_mb_40">ABOUT PANALOTO</h2>
                                <img src="assets/img/line.png" alt="" className="mx-auto d-block ct_line_500" />
                                <p className="text-white ct_mt_38 mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed <br />do eiusmod tempor incididunt ut labore et dolore magna <br />aliqua. Ut enim ad minim veniam, quis nostrud exercitation <br />ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <p className="text-white mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed <br />do eiusmod tempor incididunt ut labore et dolore magna ua.</p>
                            </div>
                        </div>
                        <div className="col-md-4  mb-4 mb-md-0" data-aos="fade-left"
                            data-aos-duration="1000">
                            <div className="ct_about_cnt px-4">
                                <div>
                                    <h2 className="ct_fs_35 ct_anton_ff ct_yellow_text ct_mb_40">PAYMENT METHODS</h2>
                                    <img src="assets/img/line.png" alt="" className="mx-auto d-block ct_line_500" />
                                </div>
                                <div className="d-flex align-items-center gap-3 flex-wrap ct_payment_card ">
                                    {/* <img src="assets/img/paypal.jpg" alt="" />
                                    <img src="assets/img/visa.jpg" alt="" />
                                    <img src="assets/img/disc.jpg" alt="" />
                                    <img src="assets/img/americal_express.jpg" alt="" />
                                    <img src="assets/img/master-card.jpg" alt="" /> */}
                                    <img src="assets/img/Gcash.png" alt="" style={{ width: "100px" }} />
                                    <img src="assets/img/paymaya.png" alt="" style={{ width: "100px" }} />
                                </div>
                                {/* <div className="ct_mt_64">
                                    <h2 className="ct_fs_35 ct_anton_ff ct_yellow_text ct_mb_40">SUBSCRIBE FOR OFFERS</h2>
                                    <img src="assets/img/line.png" alt="" className="mx-auto d-block ct_line_500" />
                                </div>
                                <div>
                                    <form action="">
                                        <div className="form-group mb-3 position-relative">
                                            <input type="email" className="form-control ct_input" placeholder="Enter Your Email" />
                                            <button className="ct_yellow_btn ct_login_btn  py-2 ct_radius_none ct_news_letter_btn w-auto">SEND</button>
                                        </div>
                                    </form>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ct_footer_section" data-aos="fade-down"
                    data-aos-duration="1000">
                    <ul>
                        <li>
                            <a href="#">About Us</a>
                        </li>
                        <li>
                            <a href="#">Games</a>
                        </li>
                        <li>
                            <a href="#">Tournaments</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                    <p className="mb-0 text-center ct_copyright_text">Copyright 2024. All rights reserved. PANALOTO</p>
                </div>
            </section>
        </div>
    )
}

export default Dashboard1