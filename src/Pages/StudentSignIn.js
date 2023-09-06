import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebaseConfig';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import '../css/studentsignin.css';
function StudentLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(username, password);
      const user = userCredential.user;

      // Assuming user data is stored in the "SNMIMT/USERS/STUDENTS" collection
      const userDoc = await firestore.collection('SNMIMT/USERS/STUDENTS').doc(user.uid).get();

      if (userDoc.exists) {
        navigate('/dashboard/student'); // Redirect to the student dashboard on successful login
      } else {
        // Handle the case where user data doesn't exist
        setError("User data not found.");
        // You can choose to redirect or display an error message here
      }
    } catch (error) {
      console.error(error);
      setError("Invalid email or password. Please try again."); // Set the error message
    }
  };

  return (
    <div className="student-login-container">
      <div className="background"></div>
      <div className="content">
        <Typography variant="h4" className="title">
          IEDC SNMIMT STUDENTS LOGIN PAGE
        </Typography>
        <div className="form">
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
          {error && (
            <Alert severity="error" style={{ marginTop: '16px' }}>
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
