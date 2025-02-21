import { Typography, Box, Paper } from "@mui/material";

function About() {
  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          We are a modern web application showcasing the integration of React
          with Material-UI components.
        </Typography>
        <Typography variant="body1">
          Built with modern tools and best practices in web development.
        </Typography>
      </Paper>
    </Box>
  );
}

export default About;
