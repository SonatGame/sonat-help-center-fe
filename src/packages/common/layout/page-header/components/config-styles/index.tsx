import { Settings } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import * as React from "react";
import ChartColorPicker from "./chart-color-picker";
import ConfigCommonStyles from "./config-common-styles";

export default function ConfigStylesModal() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState("common");

  const handleCloseModal = () => setIsModalOpen(false);

  const CONFIG_STYLES_TABS = [
    {
      label: "Common",
      value: "common",
      component: <ConfigCommonStyles handleCloseModal={handleCloseModal} />,
    },
    {
      label: "Chart colors",
      value: "chart-colors",
      component: (
        <ChartColorPicker
          elementKeys={["column", "line", "pie", "average"]}
          handleCloseModal={handleCloseModal}
        />
      ),
    },
  ];

  return (
    <>
      <IconButton onClick={() => setIsModalOpen(true)}>
        <Settings sx={{ color: (theme) => theme.palette.text.secondary }} />
      </IconButton>

      {isModalOpen && (
        <Dialog
          open={isModalOpen}
          maxWidth="md"
          fullWidth
          onClose={handleCloseModal}
        >
          <DialogTitle>Config styles</DialogTitle>

          <Divider />

          <Box px={2}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              allowScrollButtonsMobile
              scrollButtons="auto"
              variant="scrollable"
            >
              {CONFIG_STYLES_TABS.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Box>

          {CONFIG_STYLES_TABS.map(
            (item) => item.value === tabValue && item.component
          )}
        </Dialog>
      )}
    </>
  );
}
