// theme.js or theme.ts

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    fontSize: 14,
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.8125rem",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          padding: "10px 12px",
        },
        head: {
          fontWeight: 600,
          fontSize: "0.9rem",
          backgroundColor: "#F5F5F5",
          color: "#333",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 500,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 600,
        },
      },
    },
  },
});
export default theme;
