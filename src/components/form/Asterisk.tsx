import { styled } from "@mui/material";

const AsteriskStyle = styled("span")(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default function Asterisk() {
  return <AsteriskStyle>*</AsteriskStyle>;
}
