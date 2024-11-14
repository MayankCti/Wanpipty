import React, { useState } from 'react'

const RememberMe = ({ onClick, isChecked }) => {

    return (
        <div className="form-check ct_clr_8E8E8E">
            <input
                type="checkbox"
                className="form-check-input"
                id="flexCheckDefault"
                onClick={onClick}
                checked={isChecked}
            />
            <label className="form-check-label ct_ff_poppin" for="flexCheckDefault">
                Remember me
            </label>
        </div>
    )
}

export default RememberMe;