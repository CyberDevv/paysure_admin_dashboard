import GlobalStyles from '../styles/GlobalStyles'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },
})

const App = ({ Component, pageProps }) => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
)

export default App
