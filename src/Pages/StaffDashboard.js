import React, { useState, useEffect } from 'react';
import '../css/staffdashboard.css';
import {
  Button,
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  IconButton,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../css/staffdashboard.css';
import { firestore, auth ,storage} from '../firebaseConfig';

import { useNavigate } from 'react-router-dom';
function StaffDashboard() {
  const navigate =useNavigate;
  const [staffData, setStaffData] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignedPosts, setAssignedPosts] = useState({});
  const [showStudentList, setShowStudentList] = useState(false); // State to toggle student list visibility
  const [events, setEvents] = useState([]); // State to store the events
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  // State to manage the editing of an event
  const [editingEvent, setEditingEvent] = useState(null);
  // State to store the edited event details
  const [editedEvent, setEditedEvent] = useState({
    id: '',
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });  

  useEffect(() => {


    // Fetch events published by the NODAL OFFICER
    const eventsRef = firestore.collection('events'); // Replace with the actual collection name
    eventsRef
      .orderBy('timestamp', 'desc') // Order events by timestamp in descending order
      .limit(5) // Limit to the latest 5 events
      .get()
      .then((querySnapshot) => {
        const eventsData = [];
        querySnapshot.forEach((doc) => {
          const event = doc.data();
          eventsData.push(event);
        });
        setEvents(eventsData);
      })
      .catch((error) => {
        console.log('Error getting events:', error);
      });
  
    // Fetch staff data from Firestore based on the user's authentication
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const staffRef = firestore.collection('SNMIMT/USERS/STAFFS').doc(userId);

      staffRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setStaffData(doc.data());
          } else {
            console.log('No such document!');
          }
          setLoading(false); // Set loading to false after staff data is fetched
        })
        .catch((error) => {
          console.log('Error getting staff document:', error);
          setLoading(false); // Set loading to false in case of an error
        });

      // Fetch a list of students from Firestore
      const studentsRef = firestore.collection('SNMIMT/USERS/STUDENTS');
      studentsRef
        .get()
        .then((querySnapshot) => {
          const studentList = [];
          querySnapshot.forEach((doc) => {
            const student = doc.data();
            student.uid = doc.id; // Store the student's UID
            studentList.push(student);
          });
          setStudents(studentList);
        })
        .catch((error) => {
          console.log('Error getting student list:', error);
        });
    }
  }, []);


  const handleShowStudentList = () => {
    setShowStudentList(!showStudentList);
  };


  const handlePostAssignment = (studentUid, selectedPost) => {
    setAssignedPosts((prevState) => ({
      ...prevState,
      [studentUid]: selectedPost,
    }));
  };

  const handleSavePosts = async () => {
    try {
      const batch = firestore.batch();

      Object.keys(assignedPosts).forEach((studentUid) => {
        const studentRef = firestore.collection('SNMIMT/USERS/STUDENTS').doc(studentUid);
        batch.update(studentRef, { posts: assignedPosts[studentUid] });
      });

      await batch.commit();
      alert('Assigned posts have been saved successfully.');
    } catch (error) {
      console.error('Error updating Firestore:', error);
      alert('Failed to save assigned posts. Please check the console for details.');
    }
  };


  

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleEventTimeChange = (e) => {
    setEventTime(e.target.value);
  };

  const handleEventVenueChange = (e) => {
    setEventVenue(e.target.value);
  };


  const handleSubmitEvent = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
         // Create a new event document in Firestore
         const eventsRef = firestore.collection('events'); // Replace with the actual collection name
         await eventsRef.add({
           title: eventName,
           date: eventDate,
           description: eventDesc, // Store the event description
           time: eventTime,
           location: eventVenue,
           timestamp: new Date(),
           createdBy: user.uid, // You can store the NODAL OFFICER's UID
         });

        // Clear the form fields after submitting
        setEventName('');
        setEventDate('');
        setEventTime('');
        setEventVenue('');
        setEventDesc('');

        alert('Event created successfully!');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create the event. Please check the console for details.');
    }
  };
  
  // Function to delete an event document
  const handleDeleteEvent = async (eventId) => {
    try {
      // Create a reference to the event document in Firestore
      const eventRef = firestore.collection('events').doc(eventId);

      // Delete the event document
      await eventRef.delete();

      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete the event. Please check the console for details.');
    }
  };
  
  
// Function to set the event being edited
const handleEditEvent = (eventId) => {
  const eventToEdit = events.find((event) => event.id === eventId);
  setEditedEvent(eventToEdit);
  setEditingEvent(eventId);
};

// Function to update the edited event in Firestore
const handleUpdateEvent = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      // Create a reference to the event document in Firestore
      const eventRef = firestore.collection('events').doc(editedEvent.id);

      // Update the event document with the edited details
      await eventRef.update({
        title: editedEvent.title,
        date: editedEvent.date,
        description: editedEvent.description,
        time: editedEvent.time,
        location: editedEvent.location,
      });

      // Clear the edited event details and stop editing mode
      setEditedEvent({
        id: '',
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
      });
      setEditingEvent(null);

      alert('Event updated successfully!');
    }
  } catch (error) {
    console.error('Error updating event:', error);
    alert('Failed to update the event. Please check the console for details.');
  }
};

// Function to cancel the editing of an event
const cancelEdit = () => {
  setEditedEvent({
    id: '',
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  setEditingEvent(null);
};


const handleLogout = async () => {
  try {
    await auth.signOut();
    navigate('/login/student/1');
  } catch (error) {
    console.error(error);
  }
};

//STYLES



  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or component
  }

  return (
    <Container className="py-6 px-4">
     <Typography variant="h4" className="mb-6">
        Welcome, {staffData.firstName} {staffData.lastName}!
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className="p-4 mb-4">
            <Typography>Email: {staffData.email}</Typography>
            <Typography>Designation: {staffData.designation}</Typography>
            <Typography>Branch: {staffData.branch}</Typography>
            <Typography>Phone: {staffData.phone}</Typography>
            <Typography>KTU ID: {staffData.KTUid}</Typography>
          </Paper>
        </Grid>
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <Button
            variant="contained"
            color="primary"
            className="mb-4"
            onClick={handleShowStudentList}
          >
        {showStudentList ? 'Hide Student List' : 'Show Student List'}
      </Button>
</Grid>

      <div className="mb-4">
        <Typography variant="h5" className="mb-2">Create Event</Typography>
        <form className="flex flex-col space-y-4">
          <TextField
            label="Event Name"
            value={eventName}
            onChange={handleEventNameChange}
          />
          <TextField
            label="Event Date"
            type="date"
            value={eventDate}
            onChange={handleEventDateChange}
          />
         
          <TextField
            label="Event Time"
            type="time"
            value={eventTime}
            onChange={handleEventTimeChange}
          />
          <TextField
            label="Event Description"
            value={eventVenue}
            onChange={handleEventVenueChange}
          />
         
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitEvent}
          >
            Create Event
          </Button>
        </form>
      </div>
 

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} lg={4} key={event.id}>
            <Paper className="p-4">
              <Typography variant="h6">{event.title}</Typography>
              <Typography>Date: {event.date}</Typography>
              <Typography>Time: {event.time}</Typography>
              <Typography>Venue: {event.location}</Typography>
              <Typography>Description: {event.description}</Typography>
              <IconButton
                color="secondary"
                onClick={() => handleDeleteEvent(event.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>

      


      {/* Event list */}
      <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border p-4 rounded-md">
          {/* Display event details */}
          {editingEvent === event.id ? (
            // Edit mode: Show input fields for editing
            <div>
              <TextField
                label="Event Name"
                value={editedEvent.title}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, title: e.target.value })
                }
              />
              <TextField
                label="Event Date"
                type="date"
                value={editedEvent.date}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, date: e.target.value })
                }
              />
              <TextField
                label="Event Time"
                type="time"
                value={editedEvent.time}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, time: e.target.value })
                }
              />
              <TextField
                label="Event Description"
                value={editedEvent.description}
                onChange={(e) =>
                  setEditedEvent({
                    ...editedEvent,
                    description: e.target.value,
                  })
                }
              />
              <TextField
                label="Event Venue"
                value={editedEvent.location}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, location: e.target.value })
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateEvent}
              >
                Update
              </Button>
              <Button variant="contained" color="secondary" onClick={cancelEdit}>
                Cancel
              </Button>
            </div>
          ) : (
            // View mode: Show event details and edit button
            <div>
              <Typography variant="h6">{event.title}</Typography>
              <Typography>Date: {event.date}</Typography>
              <Typography>Time: {event.time}</Typography>
              <Typography>Venue: {event.location}</Typography>
              <Typography>Description: {event.description}</Typography>
              <IconButton
                color="secondary"
                onClick={() => handleDeleteEvent(event.id)} // Pass the event ID to the delete function
              >
                <DeleteIcon />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditEvent(event.id)} // Pass the event ID to the edit function
              >
                Edit
              </Button>
            </div>
          )}
          
        </div>
      ))}
</div>


{showStudentList && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" className="mb-2">
              List of Students:
            </Typography>
            <Table>
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
            <TableCell>KTUid</TableCell>
            <TableCell>Area of Interest</TableCell>
            <TableCell>Year of Joining</TableCell>
            <TableCell>Year of Joining IEDC</TableCell>
            <TableCell>Skills</TableCell>
            <TableCell>IEDC Posts</TableCell>
            <TableCell>Assigned Post</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <TableCell>{student.username}</TableCell>
              <TableCell>{`${student.firstname} ${student.lastname}`}</TableCell>
              <TableCell>{student.year}</TableCell>
              <TableCell>{student.Branch}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>{student.bloodgroup}</TableCell>
              <TableCell>{student.fathername}</TableCell>
              <TableCell>{student.fatherphnumber}</TableCell>
              <TableCell>{student.mothername}</TableCell>
              <TableCell>{student.motherphnumber}</TableCell>
              <TableCell>{student.guardianname}</TableCell>
              <TableCell>{student.guardianphnumber}</TableCell>
              <TableCell>{student.hostel}</TableCell>
              <TableCell>{student.ResidentialAddress}</TableCell>
              <TableCell>{student.KTUid}</TableCell>
              <TableCell>{student.Areaofinterset}</TableCell>
              <TableCell>{student.yearofjoining}</TableCell>
              <TableCell>{student.iedcjoiningdate}</TableCell>
              <TableCell>{student.skills}</TableCell>
              <TableCell>{student.posts}</TableCell>
              <TableCell>
                <FormControl>
                  <InputLabel>Assign Post</InputLabel>
                  <Select
                    value={assignedPosts[student.uid] || ''}
                    onChange={(e) =>
                      handlePostAssignment(student.uid, e.target.value)
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Member">Member</MenuItem>
                    <MenuItem value="CEO">CEO</MenuItem>
                    <MenuItem value="CTO">CTO</MenuItem>
                    <MenuItem value="CWO">CWO</MenuItem>
                    <MenuItem value="CMO">CMO</MenuItem>
                    <MenuItem value="CFO">CFO</MenuItem>
                    <MenuItem value="CPO">CPO</MenuItem>
                    <MenuItem value="CCO">CCO</MenuItem>
                    <MenuItem value="COO">COO</MenuItem>
                    <MenuItem value="IPR AND RESEARCH OFFICER">IPR AND RESEARCH OFFICER</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
      </Grid>
      </Grid>

      
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSavePosts}
      >
        Save Assigned Posts
      </Button>

     
{/* Logout button */}
<Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>

    </Container>
  );
}

export default StaffDashboard;
