import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import cookie from "js-cookie";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ token }) {
  token ? console.log(token) : console.log("token");

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
      <h1>Session Cookies</h1>
      <h2>Token: {token}</h2>
      <button
        type="button"
        onClick={() => {
          // cookie.set("token", "ABCD", { expires: 1 / 24 });
          fetch("/api/login", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: "ABCD" }),
          });
        }}
      >
        Login
      </button>{" "}
      <button
        type="button"
        onClick={() => {
          // cookie.remove("token");
          fetch("/api/logout", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });
        }}
      >
        Logout
      </button>
      </main>
    </>
  )
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}