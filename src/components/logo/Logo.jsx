import Image from 'next/image';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <Image
          className={styles.logo}
          src="/logo.jpg"
          alt="My Cookbook Logo"
          width={384}
          height={384}
    />
  );
}