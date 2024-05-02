import styles from "./page.module.css";
import { Suspense, lazy } from "react";

const CookbookLogo = lazy(() => import("@/components/logo/Logo.jsx"));

// Home page component
export default function Home() {
  return (
    <>
      <h1>My Cookbook</h1>

      <div className={styles.center}>
        <Suspense fallback={<div>Loading...</div>}>
          <CookbookLogo />
        </Suspense>
      </div>

      <p>
        Welcome to our Recipe Collection! Here, you can store all your favorite recipes with ease.
        Simply add the ingredients and cooking instructions, and you're all set! Use the search
        feature to quickly find any recipe you've saved. Happy cooking!
      </p>
    </>
  );
}
