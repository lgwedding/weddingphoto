"use client";

import Image from "next/image";
import styles from "./page.module.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";
import { firebaseAuthService } from "./_services/firebase-auth-service";

export default function Home() {
  const { login, logut, isLoggedin } = firebaseAuthService();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Card style={{ maxWidth: 400, padding: "20px" }}>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <MdLockOutline style={{ fontSize: 40, color: "#3f51b5" }} />
                </div>
                <Typography
                  variant="h5"
                  component="h2"
                  align="center"
                  gutterBottom
                >
                  Sign In
                </Typography>
                <form noValidate autoComplete="off">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </form>
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={
                    isLoggedin()
                      ? () => logut()
                      : () =>
                          userData.email && userData.password && login(userData)
                  }
                >
                  {isLoggedin() ? "Logout" : "Sign In"}
                </Button>
              </CardActions>
            </Card>
          </div>

          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
