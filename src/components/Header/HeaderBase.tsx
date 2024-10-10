'use client';
import "./HeaderBase.css";
import companyLogo from "@/public/img/logo.png";
import languageList from "@/public/img/langIcon.png";
import dropDownIcon from "@/public/img/dropDownIcon.png";
import menuIcon from "@/public/img/menuIcon.png";
import loginIcon from "@/public/img/loginIcon.png";
import logoutIcon from "@/public/img/logoutIcon.png";

import { TFunction } from "i18next";
import { languages } from "../../i18n/settings";
import { signOut, useSession } from "next-auth/react";

type HeaderProps = {
    t: ((key: string) => string) & TFunction<"translation", undefined>;
};

export const HeaderBase = ({ t }: HeaderProps) => {
    const { data: session } = useSession();

    const handleSidebarDisplay = () => {
        document.body.style.overflowY = "hidden";
        const sidebar = document.querySelector(".sidebar")!;
        const sidebarMenu = document.querySelector(".sidebarMenu")!;
        sidebar.classList.add("active");
        setTimeout(() => {
            sidebarMenu.classList.add("active");
        }, 1);
    }
    const handleSignOut = () => {
        console.log("sign out");
        signOut();
    }
    const handleSignIn = () => {
        window.location.href = "/api/auth/signin";
    }

    return (
        <div className="header prevent-select">
            <a className="logoHomeLink" href="/#">
                <div className="headerLogo">
                    <img className="logo" src={companyLogo.src} alt="logo" width={103} height={60} />
                    <div className="logoText">
                        <div className="zh">洲通能源科技有限公司</div>
                        <div className="en">UBQTS Power Technology Co.,Ltd</div>
                    </div>
                </div>
            </a>

            <div className="headerMenu">
                <a href="/#">{t("home-page")}</a>
                <a href="partners">{t("partners")}</a>
                <a href="contact_us">{t("contact-us")}</a>
                <a href="news">{t("news")}</a>
                <a href="download_files">{t("downloads")}</a>
            </div>

            <div className="headerRight">
                <div className="languageDropDown">
                    <div className="languageBtn">
                        <img src={languageList.src} alt="lang" />
                        <img src={dropDownIcon.src} alt="dropdown" />
                    </div>
                    <div className="languageList">
                        {languages.map((lang) => {
                            const newUrl = window.location.origin + window.location.pathname.replace(/^\/(tw|cn|en)/, `/${lang}`);
                            return (
                                <a key={lang} href={newUrl}>
                                    {lang === "tw" ? "繁體中文" : lang === "cn" ? "简体中文" : "English"}
                                </a>
                            );
                        })}
                        {/* {languages.map((lang) => (
                            <a key={lang} href={`/${lang}`}>
                                {lang === "tw" ? "繁體中文" : lang === "cn" ? "简体中文" : "English"}
                            </a>
                        ))} */}
                    </div>
                </div>
                <img className="sidebarIcon" src={menuIcon.src} alt="menu" onClick={handleSidebarDisplay} />
                {
                    session ? (
                        <div className="logout" onClick={() => handleSignOut()}>
                            <img className="logoutIcon" src={logoutIcon.src} alt="logout" />
                        </div>
                    ) : (
                        <div className="login" onClick={() => handleSignIn()}>
                            <img className="loginIcon" src={loginIcon.src} alt="login" />
                        </div>
                    )
                }
            </div>

        </div>
    );
}