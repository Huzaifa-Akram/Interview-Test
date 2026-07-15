import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <Header active="contact" />
      <main className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            Lorem ipsum dolor sit amet consectetur. Nullam at enim sed augue eget in
            orci in. A sed nulla eget convallis. Augue nam viverra lacus lorem quam
            viverra sit in et. Metus eros nunc leo magnis facilisi id posuere nunc cras.
          </p>
          <form className={styles.form}>
            <div className={styles.row}>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                placeholder="First Name"
              />
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <input
              className={styles.input}
              type="text"
              name="subject"
              placeholder="Subject"
            />
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="Write Your Message"
            />
            <button className={styles.submit} type="submit">
              Submit
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
