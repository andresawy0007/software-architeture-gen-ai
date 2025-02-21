import { Typography, Box, Paper } from "@mui/material";

function Home() {
  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to My App
        </Typography>
        <Typography variant="body1">
          This is a modern React application built with Vite and Material-UI.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Home;
