"use client";

import { ArrowBackOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Metadata, NextPage, NextPageContext } from "next";
import { useRouter } from "next/navigation";
import styles from "../../styles/home.module.css";

interface Props {
  statusCode?: number;
}

export const metadata: Metadata = {
  title: "Error",
};

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
  const router = useRouter();

  const onGoBack = () => {
    router.back();
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Oops!</h1>
        <p className={styles.description}>
          {statusCode
            ? `An error ${statusCode} occurred on server.`
            : "An error occurred on client."}
        </p>
        <Button variant="contained" onClick={onGoBack}>
          <ArrowBackOutlined />
          Go back
        </Button>
      </main>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
