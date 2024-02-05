import { createTheme } from '@mui/material/styles';

const palette = {
  black: '#000',
  white: '#FFF',
  lime: '#00FF00', 
};

const theme = createTheme({
  palette: {
    primary: {
      main: palette.lime,
    },
    secondary: {
      main: palette.black,
    },
    },
});

export default theme;
