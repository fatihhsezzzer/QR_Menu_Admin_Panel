import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  useEffect(() => {
    checkMobile(); // sayfa ilk yüklendiğinde çalışır
    window.addEventListener("resize", checkMobile); // pencere boyutu değiştiğinde çalışır

    return () => window.removeEventListener("resize", checkMobile); // cleanup
  }, []);

  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar-header">
        <div className="logo-icon">
          <img
            style={{
              height: "70px",
              width: "70px",
              display: isMobile ? "none" : "block",
            }}
            src="assets/images/softt.png"
            className="logo-img"
            alt=""
          />
        </div>
        <div className="logo-name flex-grow-1">
          <img
            style={{
              height: "60px",
              width: "260px",
              marginLeft: "-50px",
              marginBottom: "8px",
              display: isMobile ? "none" : "block",
            }}
            src="assets/images/softanabuyuk.png"
            className="logo-img"
            alt=""
          />
        </div>
        <div className="sidebar-close">
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>
      <div className="sidebar-nav" data-simplebar="true">
        <ul className="metismenu" id="menu">
          <li>
            <Link to="/">
              <div className="parent-icon">
                <span className="material-symbols-outlined">home</span>{" "}
              </div>
              <div className="menu-title">Anasayfa</div>
            </Link>
          </li>

          <li>
            <Link to="/feedbacks">
              <div className="parent-icon">
                <span className="material-symbols-outlined">feedback</span>
              </div>
              <div className="menu-title">Geri Dönüşler</div>
            </Link>
          </li>

          <li>
            <a href="javascript:;" className="has-arrow">
              <div className="parent-icon">
                <span className="material-symbols-outlined">
                  restaurant_menu
                </span>
              </div>
              <div className="menu-title">Menü</div>
            </a>
            <ul>
              <li>
                <Link to="/add-blog">
                  <span className="material-symbols-outlined">arrow_right</span>
                  Ürün Ekle
                </Link>
              </li>
              <li>
                <Link to="/product-list">
                  <span className="material-symbols-outlined">arrow_right</span>
                  Ürün Listesi
                </Link>
              </li>
              <li>
                <Link to="/add-category">
                  <span className="material-symbols-outlined">arrow_right</span>
                  Kategori Ekle
                </Link>
              </li>
              <li>
                <Link to="/category-list">
                  <span className="material-symbols-outlined">arrow_right</span>
                  Kategori Listesi
                </Link>
              </li>
              <li>
                <Link to="/alergens">
                  <span className="material-symbols-outlined">arrow_right</span>
                  Alerjen Düzenle
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
