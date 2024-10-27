import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Paper, Typography } from '@mui/material';
import styled from '@mui/material/styles/styled';
import GetStarted from "./components/GetStarted.js";

const CustomContainer = styled(Container)(({ theme }) => ({
  width: '400px',
  height: '400px',
  color: '#f8f8fc',
}));

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <CustomContainer component="main" maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f8f8fc' }}> {/* Darker Paper background */}
        <Typography
          variant="h4"
          align="center"
          style={{
            color: '#303030',
            textDecorationColor: 'rgba(255, 255, 255, 0.5)',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}
        >
          WEAR IT
        </Typography>
          <GetStarted />
        </Paper>
      </CustomContainer>
    </ThemeProvider>
  );
}

export default App;
