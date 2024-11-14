import React from 'react'

const Eye = ({ isEye, onClick, data, top }) => {
    return (
        <div>
            <i className={`fa-solid ${!isEye ? 'fa-eye-slash' : 'fa-eye'} ct_login_icon_top ${data && `${data}`}`} style={{ right: '15px', left: 'auto', top: `${top ? top : '30px'}` }} onClick={onClick}></i>
        </div>
    )
}

export default Eye;