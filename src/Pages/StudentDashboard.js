import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore ,storage} from '../firebaseConfig';
// MATERIAL UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { TableCell,Table,TableBody,TableRow,TableHead } from '@mui/material';
import '../css/studentdashboard.css';
function StudentDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
// Define state variables for tab management
const [activeTab, setActiveTab] = useState('personalInfo');
  const [activityPoints, setActivityPoints] = useState('');
  const [studentList, setStudentList] = useState([]); // To store the list of all students
  const [selectedStudentUid, setSelectedStudentUid] = useState('');
  const [posterFile, setPosterFile] = useState(null); // State to store the selected poster file
  // Define a state variable for the poster upload button visibility
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [latestEvents, setLatestEvents] = useState([]); // State to store the latest events

  // Define state variables for editable fields
  const [editedData, setEditedData] = useState({
    email: '',
    phone: '',
    password: '',
    fatherphnumber: '',
    motherphnumber: '',
    year: '',
    posts: '', // Add the 'posts' field
  });










  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login/student/1');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    // Toggle edit mode and initialize edited data with the current user data
    setEditMode(!editMode); 
    setEditedData({
      email: userData.email,
      phone: userData.phone,
      password: '',
      fatherphnumber: userData.fatherphnumber,
      motherphnumber: userData.motherphnumber,
      year: userData.year,
      posts: userData.posts, // Initialize posts with current value
    });
  };

  const handleSubmit = async () => {
    try {
      // Update the user's data in Firestore with the editedData
      const user = auth.currentUser;
      if (user) {
        await firestore.collection('SNMIMT/USERS/STUDENTS').doc(user.uid).update({
          email: editedData.email,
          phone: editedData.phone,
          fatherphnumber: editedData.fatherphnumber,
          motherphnumber: editedData.motherphnumber,
          year: editedData.year,
          posts: editedData.posts, // Update the 'posts' field
        });

        // Refresh the user data and exit edit mode
        const updatedUserDoc = await firestore.collection('SNMIMT/USERS/STUDENTS').doc(user.uid).get();
        if (updatedUserDoc.exists) {
          setUserData(updatedUserDoc.data());
          setEditMode(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await firestore.collection('SNMIMT/USERS/STUDENTS').doc(user.uid).get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        // Fetch the list of all students
        const studentsSnapshot = await firestore.collection('SNMIMT/USERS/STUDENTS').get();
        const studentsData = studentsSnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
        setStudentList(studentsData);
      } catch (error) {
        console.error(error);
      }
    };

    

    fetchStudentList();
  }, []);


  useEffect(() => {
    // Check if the user has 'CEO' or 'CCO' post to show the upload button
    if (userData && (userData.posts === 'CEO' || userData.posts === 'CCO')) {
      setShowUploadButton(true);
    } else {
      setShowUploadButton(false);
    }
  }, [userData]);
  

  const handleUpdateActivityPoints = async () => {
    try {
      const user = auth.currentUser;
      if (user && selectedStudentUid) {
        // Update the selected student's activity points in Firestore
        await firestore.collection('SNMIMT/USERS/STUDENTS').doc(selectedStudentUid).update({
          activityPoints: activityPoints,
        });
  
        // Notify staff about the update
        const notificationMessage = `Activity Points updated by CEO (${user.displayName}): ${activityPoints}`;
        
        // Query the staff members with designation 'NODAL OFFICER'
        const staffSnapshot = await firestore.collection('SNMIMT/USERS/STAFFS')
          .where('designation', '==', 'NODAL OFFICER')
          .get();
        
        // Send the notification to each staff member
        staffSnapshot.forEach(async (staffDoc) => {
          await firestore.collection('notifications').add({
            message: notificationMessage,
            timestamp: new Date(),
            recipientId: staffDoc.id, // Include staff member's ID as a recipient
          });
        });
  
        // Reset the activity points and selected student
        setActivityPoints('');
        setSelectedStudentUid('');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleFileChange = (e) => {
    // Update the posterFile state with the selected file
    const file = e.target.files[0];
    setPosterFile(file);
  };

  const handleUploadPoster = async () => {
    try {
      if (posterFile) {
        const user = auth.currentUser;
        if (user) {
          // Define a unique storage path for the poster using the user's UID
          const storagePath = `posters/${user.uid}/${posterFile.name}`;

          // Upload the poster to Firebase Storage
          const storageRef = storage.ref();
          const posterRef = storageRef.child(storagePath);
          await posterRef.put(posterFile);

          // Get the download URL of the uploaded poster
          const downloadURL = await posterRef.getDownloadURL();

          // Store the download URL in Firestore
          await firestore.collection('SNMIMT/POSTERS').add({
            userId: user.uid,
            downloadURL: downloadURL,
            timestamp: new Date(),
          });

          alert('Poster uploaded successfully!');
        }
      } else {
        alert('Please select a poster file to upload.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to upload poster. Please check the console for details.');
    }
  };

  const handleUploadDoc = async () => {
    try {
      if (posterFile) {
        const user = auth.currentUser;
        if (user) {
          // Define a unique storage path for the poster using the user's UID
          const storagePath = `docevent/${user.uid}/${posterFile.name}`;

          // Upload the poster to Firebase Storage
          const storageRef = storage.ref();
          const posterRef = storageRef.child(storagePath);
          await posterRef.put(posterFile);

          // Get the download URL of the uploaded poster
          const downloadURL = await posterRef.getDownloadURL();

          // Store the download URL in Firestore
          await firestore.collection('SNMIMT/POSTERS').add({
            userId: user.uid,
            downloadURL: downloadURL,
            timestamp: new Date(),
          });

          alert('Poster uploaded successfully!');
        }
      } else {
        alert('Please select a poster file to upload.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to upload poster. Please check the console for details.');
    }
  };



  useEffect(() => {
    // Fetch the latest events published by NODAL OFFICER
    const fetchLatestEvents = async () => {
      try {
        const eventsSnapshot = await firestore
          .collection('events') // Replace with the actual collection name
          .orderBy('timestamp', 'desc') // Order events by timestamp in descending order
          .limit(5) // Limit to the latest 5 events
          .get();

        const eventsData = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLatestEvents(eventsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatestEvents();
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  return (
    <div className="dashboard-container">
      <h1>Welcome Back, {`${userData?.firstname || 'Student'} ${userData?.lastname || ''}`}
</h1>
      <h2>Helloo..., {userData?.posts || 'students'}</h2>
      <div className="button-container">
        <Button
          variant="contained"
          color="warning"
          size="small"
          sx={{ ml: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className="tabs-container">
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'personalInfo' ? 'active' : ''}`}
            onClick={() => handleTabClick('personalInfo')}
          >
            Personal Information
          </div>
          <div
            className={`tab ${activeTab === 'uploadPoster' ? 'active' : ''}`}
            onClick={() => handleTabClick('uploadPoster')}
          >
            Upload Poster
          </div>
         
        </div>
        <div className="tab-content">
          {activeTab === 'personalInfo' && (
            <div className="user-info">
              {/* Personal Information content */}
              {/* ... */}

              {userData && (
          <div className="user-info">
            <h2>Personal Information</h2>
           

            {editMode ? (
              <form>
             
  <TextField
    label="Email"
    type="email"
    value={editedData.email}
    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
  />
  <TextField
    label="Phone Number"
    type="tel"
    value={editedData.phone}
    onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
  />
  <TextField
    label="Change Password"
    type="Password"
    value={editedData.password}
    onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
  />
  {/* Repeat this pattern for other form fields */}
 

              </form>
            ) : (
              <div className="table-container">
              <Table className="custom-table">
              
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>E-Mail ID</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Blood Group</TableCell>
                    <TableCell>Father Name</TableCell>
                    <TableCell>Father Phone Number</TableCell>
                    <TableCell>Mother Name</TableCell>
                    <TableCell>Mother Phone Number</TableCell>
                    <TableCell>Guardian Name</TableCell>
                    <TableCell>Guardian Phone Number</TableCell>
                    <TableCell>Hostel</TableCell>
                    <TableCell>Residential Address</TableCell>
                    <TableCell>KtUid</TableCell>
                    <TableCell>Area of Interest</TableCell>
                    <TableCell>Year of Joining</TableCell>
                    <TableCell>Year of Joining IEDC</TableCell>
                    <TableCell>Skills</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Posts</TableCell>
                    <TableCell>IEDC Activity Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{userData.username}</TableCell>
                    <TableCell>{`${userData.firstname} ${userData.lastname}`}</TableCell>
                    <TableCell>{userData.year}</TableCell>
                    <TableCell>{userData.Branch}</TableCell>
                    <TableCell>{userData.email}</TableCell>
                    <TableCell>{userData.phone}</TableCell>
                    <TableCell>{userData.bloodgroup}</TableCell>
                    <TableCell>{userData.fathername}</TableCell>
                    <TableCell>{userData.fatherphnumber}</TableCell>
                    <TableCell>{userData.mothername}</TableCell>
                    <TableCell>{userData.motherphnumber}</TableCell>
                    <TableCell>{userData.guardianname}</TableCell>
                    <TableCell>{userData.guardianphnumber}</TableCell>
                    <TableCell>{userData.hostel}</TableCell>
                    <TableCell>{userData.ResidentialAddress}</TableCell>
                    <TableCell>{userData.KTUid}</TableCell>
                    <TableCell>{userData.Areaofinterset}</TableCell>
                    <TableCell>{userData.yearofjoining}</TableCell>
                    <TableCell>{userData.iedcjoiningdate}</TableCell>
                    <TableCell>{userData.skills}</TableCell>
                    <TableCell>{userData.password}</TableCell>
                    <TableCell>{userData.posts}</TableCell>
                    <TableCell>{userData.activityPoints}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              </div>
            )}
            {editMode ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
              >
                Edit Profile
              </Button>
            )}
          </div>
        )}
            </div>
          )}
          {activeTab === 'uploadPoster' && (
            <div className="upload-poster">
              {/* Upload Poster content */}
              {/* ... */}

              {userData.posts === 'CEO' && (
              <div>
                <div>
                  <label>Select a Student:</label>
                  <select
                    value={selectedStudentUid}
                    onChange={(e) => setSelectedStudentUid(e.target.value)}
                  >
                    <option value="">Select a Student</option>
                    {studentList.map((student) => (
                      <option key={student.uid} value={student.uid}>
                        {student.firstname} {student.lastname}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedStudentUid && (
                  <div>
                    <TextField
                      label="Activity Points"
                      type="number"
                      value={activityPoints}
                      onChange={(e) => setActivityPoints(e.target.value)}
                    />
                    <Button
                      variant="contained"
        color="primary"
        size="small" // Set button size to 'small'
        sx={{ ml: 2 }} // Add margin to the left (adjust as needed)
                      onClick={handleUpdateActivityPoints}
                    >
                      Update Activity Points
                    </Button>
                  </div>
                )}
              </div>
            )}
            {userData.posts === 'CPO' || userData.posts === 'CEO' ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUploadPoster}
              >
                Upload Poster
              </Button>
            </div>
          ) : null}

          {showUploadButton && (
        <div>
          <input
            type="file"
            accept="/*"
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
        color="primary"
        size="small" // Set button size to 'small'
        sx={{ ml: 2 }} // Add margin to the left (adjust as needed)
            onClick={handleUploadDoc}
          >
            Upload Document
          </Button>
        </div>
      )}
            </div>
          )}
          {activeTab === 'editProfile' && (
            <div className="edit-profile">
              {/* Edit Profile content */}
              {/* ... */}
            </div>
          )}
        </div>
      </div>
      <div>
        <h2>Latest Events</h2>
        <ul>
        {latestEvents.map((event) => (
            <li key={event.id}>
              <strong>{event.title}</strong>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Time: {event.time}</p>
              <p>Description:{event.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentDashboard;
