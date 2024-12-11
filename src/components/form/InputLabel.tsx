import { InputLabel, InputLabelProps } from "@mui/material";
import React from "react";

interface IProps extends InputLabelProps {
  children: React.ReactNode;
}
const InputLabelCustom: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <InputLabel
      sx={{
        ".MuiInputLabel-asterisk": {
          color: (theme) => theme.palette.error.main,
        },
        fontSize: 14,
      }}
      {...props}
    >
      {children}
    </InputLabel>
  );
};

export default InputLabelCustom;
