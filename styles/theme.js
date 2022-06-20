import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepPurple, amber } from "@mui/material/colors";

// Create a theme instance.
let theme = createTheme({
  palette: {

    secondary: amber,
  },
});

theme = responsiveFontSizes(theme);

export default theme;