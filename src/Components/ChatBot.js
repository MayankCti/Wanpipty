import React, { useState } from 'react'

const ChatBot = () => {
    const [isChatBot, setIsChatBot] = useState(false);

    return (
        <div className="position-relative">
            <div className="ct_chat_icon" onClick={() => setIsChatBot(!isChatBot)}>
                <img src="assets/img/sknow-icon.svg" alt="" />
            </div>
            <div className={`ct_chat_box_main ${isChatBot && "ct_chat_active"}`}>
                <div className="d-flex align-items-center justify-content-between ct_py_30_px_24">
                    <h4 className="mb-0 ct_ff_oswald ct_fw_700 text-white">FAQ</h4>+
        <div className="ct_dash_yellow_text ct_clr_FFC701 ct_online_text12">
                        <p className="mb-0 ct_fw_700 ct_ff_oswald"><span></span> ONLINE</p>
                    </div>
                </div>
                <div className="ct_chat_item_main">
                    <div className="ct_chat_item_user">
                        <div className="ct_chat_user_icon">
                            <img src="assets/img/chat_user.png" alt="" />
                        </div>
                        <div>
                            <h5 className="ct_clr_475A76 ct_fs_14 mb-1">You</h5>
                            <p className="mb-0 ct_clr_F3EBFB ct_fs_14">How to add money in wallet?</p>
                        </div>
                    </div>
                    <div className="ct_chat_item_user mt-5">
                        <div className="ct_chat_user_icon">
                            <img src="assets/img/chat_box.png" alt="" />
                        </div>
                        <div>
                            <h5 className="ct_clr_475A76 ct_fs_14 mb-1">Chat Bot</h5>
                            <p className="mb-0 ct_clr_F3EBFB ct_fs_14">Goto main manu  Add  Enter Amount
                     and Pay accordingly</p>
                        </div>
                    </div>
                </div>
                <div className="ct_chat_bottom_12 pb-5">
                    <div className=" position-relative">
                        <input type="text" className="form-control ct_profile_input" value="Alex meian" placeholder="Type Here..." />
                        <img src="assets/img/emog.png" alt="" className="ct_chat_imogi" />
                    </div>
                    <div className="d-flex align-items-center gap-3 mt-3">
                        <p className="mb-0 ct_fs_14 text-white ct_fw_600">Chat rules <img src="assets/img/small_question.png" alt="" /></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBot
