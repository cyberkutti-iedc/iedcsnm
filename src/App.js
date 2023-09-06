import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import { auth,firestore } from './firebaseConfig';
import Staffsignuppage from './Pages/StaffSiginUp';
import StudentSignupPage from './Pages/StudentSignUp';
import StaffLogin from './Pages/StaffSignIn';
import StudentLogin from './Pages/StudentSignIn';
import StudentDashboard from './Pages/StudentDashboard';
import StaffDashboard from './Pages/StaffDashboard';
import Login from './Pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
// Use Firebase Authentication to check if a user is authenticated
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, set isAuthenticated to true
      setIsAuthenticated(true);

      // Check the user's role
      const checkUserRole = async () => {
        try {
          const userDoc = await firestore.collection('SNMIMT/USERS/STAFFS').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            const role = userData.designation;

            // Set the user's role in the state
            setUserRole(role);
          }
        } catch (error) {
          console.error(error);
        }
      };

      checkUserRole();
    } else {
      // User is signed out, set isAuthenticated to false
      setIsAuthenticated(false);
      setUserRole('');
    }
  });

  // Clean up the listener when the component unmounts
  return () => unsubscribe();
}, []);




  return (
    <Router>
      <div>
    
        <Routes>
          
          <Route path="/login" element={<Login/>}/>
          <Route path="/login/staffSignUp/0/" element={<Staffsignuppage />} />
          <Route path='/login/studentSignUp/0/' element={<StudentSignupPage/>} />
          <Route path='/login/staffSignIn/1/' element={<StaffLogin/>} />
          <Route path='/login/studentSignIn/1/' element={<StudentLogin/>} />
          <Route
            path="/dashboard/student"
            element={isAuthenticated ? <StudentDashboard /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/dashboard/staff"
            element={isAuthenticated ? <StaffDashboard /> : <Navigate to="/login" replace />}
          />
    
        </Routes>
      </div>
    </Router>
  );
}

export default App;
