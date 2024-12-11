import { Assets } from "@/lib/constants/assets";
import { default as NextHead } from "next/head";

interface HeadProps {
  title: string;
}

export default function Head(props: HeadProps) {
  return (
    <NextHead>
      <title>{props.title} | Sonat Help Center</title>
      <meta name="description" content="Welcome to Sonat Help Center" />
      <link rel="icon" href={Assets.LOGO} />
    </NextHead>
  );
}
