import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.contact}>
          <span className={styles.circle}>
            <img className={styles.contactIcon} src="/icons/mail.svg" alt="" />
          </span>
          <div>
            <p className={styles.contactTitle}>Mail Us</p>
            <p className={styles.contactText}>Info@Example.com</p>
          </div>
        </div>

        <div className={styles.contact}>
          <span className={styles.circle}>
            <img className={styles.contactIcon} src="/icons/phone.svg" alt="" />
          </span>
          <div>
            <p className={styles.contactTitle}>Call Us</p>
            <p className={styles.contactText}>+01 569 896 654</p>
          </div>
        </div>

        <div className={styles.contact}>
          <span className={styles.circle}>
            <img className={styles.contactIcon} src="/icons/Icon.svg" alt="" />
          </span>
          <div>
            <p className={styles.contactTitle}>Location</p>
            <p className={styles.contactText}>Amsterdam, 109-74</p>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.middle}>
        <div className={styles.about}>
          <p className={styles.aboutText}>
            Denouncing pleasure and praising pain was born and I will givg you a
            coghmplete acchount of the system, and expound the actual
          </p>
          <div className={styles.socials}>
            <a className={styles.social} href="#" aria-label="Instagram">
              <img className={styles.socialIcon} src="/icons/insta.png" alt="" />
            </a>
            <a className={styles.social} href="#" aria-label="Facebook">
              <img className={styles.socialIcon} src="/icons/facebook.svg" alt="" />
            </a>
            <a className={styles.social} href="#" aria-label="Twitter">
              <img className={styles.socialIcon} src="/icons/tweeter.svg" alt="" />
            </a>
            <a className={styles.social} href="#" aria-label="Pinterest">
              <img className={styles.socialIcon} src="/icons/pinterest.svg" alt="" />
            </a>
          </div>
        </div>

        <div className={styles.linksGroup}>
          <div className={styles.links}>
            <h3 className={styles.colTitle}>Explore</h3>
            <a href="#">About Us</a>
            <a href="#">Gallery</a>
          </div>

          <div className={styles.links}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <a href="#">Services</a>
            <a href="#">Blog</a>
            <a href="#">Contact Us</a>
            <a href="#">Service Request</a>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <p className={styles.copyright}>Copyright © Logo. All Right Reserved</p>
    </footer>
  );
}
