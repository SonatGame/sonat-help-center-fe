import { ReactNode } from "react";

export interface IOption {
  label: string;
  value: string;
  labelDisplay?: ReactNode;
  icon?: React.ReactElement;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  disabled?: boolean;
  backgroundColor?: string;
  color?: string;
  name?: string;
}

export interface ITreeviewOption {
  name: string;
  _id: string;
  id: string;
  children: ITreeviewOption[];
}
