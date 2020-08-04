import React from 'react';

const Header = ({onClose}) => {
    return (
        <div className="sc-header">
            <img className="sc-header--img" src="/assets/logo-no-bg.svg" alt=""/>
            <div className="sc-header--team-name">Ҳуқуқий маслаҳат керакми бизга ёзинг!</div>
            <div className="sc-header--close-button" onClick={onClose}>
                <img src="/assets/close-icon.png" alt=""/>
            </div>
        </div>
    );
}

export default Header;
