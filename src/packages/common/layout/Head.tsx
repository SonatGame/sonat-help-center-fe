import { Assets } from "@/lib/constants/assets";
import { default as NextHead } from "next/head";

interface HeadProps {
  title: string;
}

export default function Head(props: HeadProps) {
  return (
    <NextHead>
      <title>{props.title} | Sonat BI System</title>
      <meta name="description" content="Welcome to Sonat BI System" />
      <link rel="icon" href={Assets.LOGO} />
    </NextHead>
  );
}
