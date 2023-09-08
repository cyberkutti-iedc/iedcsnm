import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import backgroungIMG from './Background.png';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function Login() {
    const navigate = useNavigate(); // Correctly call useNavigate as a function
  const handleNodalLogin = async () => {
    // Handle Nodal Officers login logic here
    try {
        navigate('/login/staffSignin/1/'); // Redirect to the desired route after login
      } catch (error) {
        console.error(error);
      }
  };

  const handleStudentLogin = () => {
    // Handle Students login logic here

    try {
        navigate('/login/studentSignin/1/'); // Redirect to the desired route after login
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          IEDC SNMIMT LOGIN PAGE
        </Typography>
        <Paper elevation={5} style={{ padding: '30px', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleNodalLogin}
            style={{ marginBottom: '20px' }}
          >
            Nodal Officers
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleStudentLogin}
          >
            Students
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} className="background-image" style={{ position: 'relative', boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.7)' }}>
      <img
  src={backgroungIMG} 
  alt="Login Image"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
    filter: 'blur(.01px)', /* Add a blur effect to the background image */
    animation: 'colorfulShadow 5s linear infinite', /* Add an animation to the shadow */
    boxShadow: '20px 0px 20px rgba(255, 0, 0, 0.7)' /* Initial shadow color (Red) */
  }}
/>

      </Grid>
    </Grid>
  );
}

export default Login;
 