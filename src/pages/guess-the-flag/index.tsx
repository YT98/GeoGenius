import Link from 'next/link';
import React from 'react';

import menuStyles from "../../styles/menus.module.css"

function GuessTheFlagHome() {
    return <div>
        <h2 className={menuStyles.menuTitle}> Choose a region: </h2>

        <ul className={menuStyles.menuLinksContainer}>
            <li>
                <Link href={"/guess-the-flag/world"} className={menuStyles.menuLink}> World </Link>
            </li>
            <li>
                <Link href={"/guess-the-flag/europe"} className={menuStyles.menuLink}> Europe </Link>
            </li>
            <li>
                <Link href={"/guess-the-flag/americas"} className={menuStyles.menuLink}> Americas </Link>
            </li>
            <li>
                <Link href={"/guess-the-flag/asia"} className={menuStyles.menuLink}> Asia </Link>
            </li>
            <li>
                <Link href={"/guess-the-flag/oceania"} className={menuStyles.menuLink}> Oceania </Link>
            </li>
        </ul>


    </div>
}

export default GuessTheFlagHome;