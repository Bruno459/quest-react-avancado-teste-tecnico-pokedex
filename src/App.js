import { ThemeProvider } from './contexts/theme-context';
import { ThemeTogglerButton } from './components/theme-toggler-button/theme-toggler-button';
import { AppRoutes } from './pages/routes';
import { ResponsiveStyle } from './styles/responsiveStyles';
import styled from 'styled-components';

const Font = styled.div`
  font-family: "Roboto", serif;
`;

function App() {
  return (
    <Font>
      <ThemeProvider>
        <ResponsiveStyle />
        < ThemeTogglerButton />
        < AppRoutes />
      </ThemeProvider>
    </Font>
  )
}

export default App;
