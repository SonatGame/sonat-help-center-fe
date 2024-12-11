import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Collapse, List, MenuItem, Stack } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

interface Item {
  key: string;
  icon?: React.ReactNode;
  title: string;
  child?: Item[];
}

const ChildItem = ({ pathname, child }: { pathname: string; child: Item }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      {!child.child || child.child.length === 0 ? (
        <Link href={child.key} style={{ textDecoration: "none" }}>
          <MenuItem
            selected={pathname.includes(child.key)}
            sx={{
              cursor: "pointer",
              borderRadius: (theme) => theme.shape.borderRadius / 6,
              px: 1.5,
              py: 1.25,
              fontWeight: 400,
              fontSize: "1rem",
              color: (theme) =>
                pathname.includes(child.key)
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,
              backgroundColor: pathname.includes(child.key)
                ? (theme) => theme.palette.primary.main
                : "transparent",
              "&:hover": {
                backgroundColor: pathname.includes(child.key)
                  ? (theme) => theme.palette.primary.main
                  : (theme) => theme.palette.action.hover,
              },
            }}
          >
            {child.title}
          </MenuItem>
        </Link>
      ) : (
        <>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
              px: 1.5,
              py: 1,
              "&:hover": {
                backgroundColor: pathname.includes(child.key)
                  ? (theme) => theme.palette.primary.main
                  : (theme) => theme.palette.action.hover,
                borderRadius: (theme) => theme.shape.borderRadius / 6,
                cursor: "pointer",
              },
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "white"
                  : theme.palette.text.secondary,
            }}
            onClick={handleClick}
          >
            <Box>{child.title}</Box>
            <KeyboardArrowDown
              sx={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
          </Stack>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ px: 2 }}>
              {child.child.map((subChild, index) => (
                <ChildItem key={index} pathname={pathname} child={subChild} />
              ))}
            </List>
          </Collapse>
        </>
      )}
    </div>
  );
};

export const ChildItems = ({
  pathname,
  item,
}: {
  pathname: string;
  item?: Item[];
}) => {
  if (!item || item.length === 0) return null;

  return (
    <>
      {item.map((child, index) => (
        <ChildItem key={index} pathname={pathname} child={child} />
      ))}
    </>
  );
};
