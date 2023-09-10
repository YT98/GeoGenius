import Link from 'next/link';
import React from 'react';
import menuStyles from '../styles/menus.module.css';

function HomePage() {
  return <div>
    <h1 className={menuStyles.menuTitle}> Choose a game mode: </h1>

    <ul className={menuStyles.menuLinksContainer}>
      <li>
        <Link href={"/guess-the-flag"} className={menuStyles.menuLink}>
          🇨🇦 Guess The Flag
        </Link>
      </li>
      <li>
        <Link href={"/place-the-country"} className={menuStyles.menuLink}>
          📍 Place The Country
        </Link>
      </li>
      <li>
        <Link href={"/name-the-capital"} className={menuStyles.menuLink}>
          🏛️ Name The Capital
        </Link>
      </li>
    </ul>

  </div>;
}

export default HomePage;