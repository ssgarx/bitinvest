import React from 'react'

function BuyPopup(props) {
    // console.log("BuyPopup props", props);
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-button" onClick={() => props.setTrigger(false)}></button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default BuyPopup
