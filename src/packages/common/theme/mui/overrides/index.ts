import { ThemeOptions } from "@mui/material";
import Accordion from "./Accordion";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Card from "./Card";
import Checkbox from "./Checkbox";
import CssBaseline from "./CssBaseline";
import Dialog from "./Dialog";
import Input from "./Input";
import Lists from "./List";
import LoadingButton from "./LoadingButton";
import Menu from "./Menu";
import Paper from "./Paper";
import Popover from "./Popover";
import Skeleton from "./Skeleton";
import Slider from "./Slider";
import SvgIcon from "./SvgIcon";
import ToggleButton from "./ToggleButton";
import Tooltip from "./Tooltip";

export default function ComponentsOverrides(theme: ThemeOptions) {
  return Object.assign(
    Card(theme),
    Menu(theme),
    Input(theme),
    Lists(theme),
    Paper(theme),
    Button(theme),
    Dialog(theme),
    Slider(theme),
    Tooltip(theme),
    Popover(theme),
    Skeleton(),
    Accordion(theme),
    ButtonGroup(theme),
    CssBaseline(theme),
    LoadingButton(),
    ToggleButton(theme),
    Checkbox(theme),
    SvgIcon(theme)
  );
}
