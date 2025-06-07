import Link from "next/link";
import { memo } from "react";
import styles from "./Navigation.module.scss";

// Configuration for navigation links - easily maintainable
const NAVIGATION_LINKS = [
  { href: "/solutions", label: "Solutions", ariaLabel: "View our solutions" },
  {
    href: "/how-we-work",
    label: "How we work",
    ariaLabel: "Learn how we work",
  },
] as const;

// Business name configuration - single source of truth
const BUSINESS_NAME = "Simple Bit Design";

// Logo SVG component
const Logo = () => (
  <svg
    width="28"
    height="32"
    viewBox="0 0 28 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.40261 0.480189C9.2698 0.501777 8.84373 0.566444 8.45582 0.62385C6.49705 0.913689 4.45588 1.98989 2.92404 3.54034C-0.915748 7.42712 -0.982105 13.6596 2.77413 17.6292C4.2826 19.2234 6.0679 20.2103 8.24902 20.6558C9.07758 20.825 9.57812 20.8483 12.391 20.8483C15.0652 20.8483 15.6496 20.8236 15.9498 20.6979C17.2627 20.1483 17.6263 18.5372 16.666 17.524C16.1012 16.9281 16.1306 16.9326 12.4452 16.8718C9.10221 16.8167 9.05575 16.8132 8.27104 16.5541C5.57712 15.6646 3.86716 13.1442 4.02547 10.2964C4.11772 8.63652 4.63854 7.50108 5.86911 6.27676C6.44634 5.70251 6.84178 5.40541 7.38665 5.13668C8.63384 4.52147 8.92951 4.49127 13.7009 4.49175C18.4739 4.49224 18.4089 4.48352 19.0449 5.20957C19.4535 5.67598 19.5447 5.92594 19.5447 6.57948C19.5447 7.17658 19.3294 7.68191 18.9016 8.08889C18.3171 8.64475 18.265 8.65065 13.9325 8.65065C9.54296 8.65065 9.40068 8.66672 8.82007 9.22791C7.87599 10.1404 7.97084 11.4016 9.04909 12.2719C9.42009 12.5713 9.42009 12.5713 12.7678 12.6329C16.5502 12.7025 16.8375 12.7446 18.1331 13.4186C19.5119 14.1357 20.632 15.4892 21.1174 17.0244C21.4227 17.9903 21.4227 19.7371 21.1174 20.7031C20.5171 22.6021 19.0977 24.0368 17.0816 24.7826C16.6362 24.9473 16.1136 24.9651 10.3657 25.0103C4.13279 25.0593 4.13279 25.0593 3.6535 25.3067C2.71637 25.7902 2.30963 26.9984 2.76998 27.9309C3.0102 28.4175 4.63467 30.1244 5.41503 30.71C6.56785 31.5753 6.29334 31.5454 13.0731 31.5454C17.6216 31.5454 19.1492 31.5156 19.593 31.4182C22.9273 30.6862 25.4794 28.7007 26.8949 25.737C28.2441 22.9122 28.2597 19.9084 26.9396 17.1093C26.3623 15.8851 25.829 15.1244 24.8967 14.1953L24.0978 13.3991L24.4769 12.9393C25.8395 11.2866 26.2257 9.01619 25.4812 7.03389C25.0751 5.95246 24.4416 5.11209 22.7924 3.46696C21.0711 1.75 20.3014 1.19569 19.0134 0.74573C18.2407 0.475737 18.2407 0.475736 13.9424 0.458311C11.5783 0.448631 9.53542 0.458505 9.40261 0.480189Z"
      fill="#1A4A48"
    />
  </svg>
);

interface NavigationProps {
  businessName?: string;
  className?: string;
}

/**
 * Navigation component with improved accessibility, performance, and maintainability
 * Uses Next.js Link for client-side navigation and proper semantic HTML
 */
const Navigation = memo(function Navigation({
  businessName = BUSINESS_NAME,
  className,
}: NavigationProps = {}) {
  const navClassName = className ? `${styles.nav} ${className}` : styles.nav;

  return (
    <nav
      className={navClassName}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
          aria-label={`${businessName} - Go to homepage`}
        >
          <Logo />
          <span className={styles.businessName}>{businessName}</span>
        </Link>

        <div className={styles.navRight}>
          <ul className={styles.links} role="list">
            {NAVIGATION_LINKS.map(({ href, label, ariaLabel }) => (
              <li key={href} role="listitem">
                <Link
                  href={href}
                  aria-label={ariaLabel}
                  className={styles.link}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/start-project" className={styles.ctaButton}>
            Start a project
          </Link>
        </div>
      </div>
    </nav>
  );
});

export default Navigation;
