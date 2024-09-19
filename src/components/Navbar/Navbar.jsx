import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/gallery_1522185.png";
function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <a href="#" className={styles.logoContainer}>
        <img src={Logo} />
        <h2>PhotoFolio</h2>
      </a>
    </div>
  );
}

export default Navbar;
