import React from 'react';
import './footer.scss';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-info">
                <span>0899 343 111 / dressShop@gmail.bg</span>
                <span>Dress <i className="fas fa-tshirt"></i> shop</span>
                <span className="icons">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-youtube"></i>
                </span>
            </div>
            <div className="footer-copy">
                Copyright © 2019 DressShop · All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer;
