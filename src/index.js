import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.css';
import App from 'components/App'
import reportWebVitals from './tests/reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D4E8EF'
    },
    secondary: {
      main: '#564CAC'
    },
    card: {
      backgroundColor: '#09BC8A',
      color: '#09BC8A',
    },
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
