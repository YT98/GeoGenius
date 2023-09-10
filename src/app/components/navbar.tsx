import styles from '../../styles/Navbar.module.css';
import title from '../../../public/title.png'
import Image from 'next/image';

export default function Navbar() {
    return <div>
        <Image
            className={styles.title}
            src={title}
            alt="title"
        />
    </div>
}