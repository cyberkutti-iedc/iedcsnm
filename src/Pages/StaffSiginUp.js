import React from 'react';
import { auth,firestore } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import staffcss from '../css/staffsignup.module.css';



function Staffsignuppage() {
  const navigate = useNavigate(); // Create a navigate function
  const isPasswordValid = (password) => {
    // Password should be at least 8 characters long
    if (password.length < 8) {
      return false;
    }
  
    // Password should contain at least one alphabet, one number, and one symbol
    const alphabetPattern = /[a-zA-Z]/;
    const numberPattern = /[0-9]/;
    const symbolPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  
    return (
      alphabetPattern.test(password) &&
      numberPattern.test(password) &&
      symbolPattern.test(password)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Collect form data
    const formData = {
      username: event.target.username.value,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      email: event.target.mail.value,
      phone:event.target.phone.value,
      Branch:event.target.branch.value,
      designation:event.target.designation.value,
      ResidentialAddress:event.target.ResidentialAddress.value,
      KTUid:event.target.KTUid.value,
      Areaofinterset:event.target.Areaofinterset.value,
      password: event.target["userpassword"].value,
      passwordconfirm: event.target["userpasswordconfirm"].value
    };


   
  const confirmPassword = event.target["userpasswordconfirm"].value;

  // Check if password and confirm password match
  if (formData.password !== confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return; // Stop form submission
  }

  // Check if the password meets the requirements
  if (!isPasswordValid(formData.password)) {
    alert("Password must be at least 8 characters long and contain alphabets, numbers, and symbols.");
    return; // Stop form submission
  }

  
  try {
    // Create a new user account using Firebase Authentication
    const userCredential = await auth.createUserWithEmailAndPassword(
      formData.email,
      formData.password
    );

    // Get the newly created user's unique ID (UID)
    const userId = userCredential.user.uid;

    // Save user data to Firestore with the UID as the document ID
    await firestore.collection('SNMIMT/USERS/STAFFS').doc(userId).set(formData);

  // Show a success message and redirect
  alert("Account created successfully!");
  navigate('/login/staffSignIn/1/'); // Redirect to the login page
} catch (error) {
  console.error("Error creating user account:", error.message);
  alert("Error creating user account. Please try again.");
}
 
  
  };

  return (
    <div className={staffcss.container}>
      <div className={staffcss.header}>
        <title>IEDC NODAL OFFICER Sign up | IEDC SNMIMT</title>
      </div>
      <div>
        <main className={staffcss['card-container']}>
          <div className={staffcss['image-container']}>
            <h1 className={staffcss.company}>
            NODAL OFFICER SIGNUP
            </h1>
           
          </div>
          <form onSubmit={handleSubmit}>
            <div className={staffcss['form-container']}>


            <div class={staffcss["input-container"]}>
                    <label for="Username"></label>
                    <input type="text" name="username" id="username" required/>
                    <span>
                        Username
                    </span>
                    <div class="error"></div>
                </div>
          
              <div class={staffcss["input-container"]}>
                    <label for="firstname"></label>
                    <input type="text" name="firstname" id="firstname" required/>
                    <span>
                        First name
                    </span>
                    <div class="error"></div>
                </div>
    
                <div class={staffcss["input-container"]}>
                    <label for="lastname"></label>
                    <input type="text" name="lastname" id="lastname" required/>
                    <span>
                        Last name
                    </span>
                    <div class="error"></div>
                </div>
    
                <div class={staffcss["input-container"]}>
                    <label for="mail">
                    </label>
                    <input type="email" name="mail" id="mail" required/>
                    <span>
                        E-mail
                    </span>
                    <div class="error"></div>
                </div>
    
                <div class={staffcss["input-container"]}>
                    <label for="phone">
                    </label>
                    <input type="tel" name="phone" id="phone" required/>
                    <span>Phone</span>
                    <div class="error"></div>
                </div>


                <div className={staffcss["input-container"]}>
 
  <select name="branch" id="branch" required>
 
    <option value="">Select Branch</option>
    <option value="CIVIL">CIVIL</option>
    <option value="CSE">CSE</option>
    <option value="CSE-AI">CSE-AI</option>
    <option value="CB">CB</option>
    <option value="ECE">ECE</option>
    <option value="EEE">EEE</option>
    <option value="ICE">ICE</option>
    <option value="ME">ME</option>
    <option value="Admn">Admn</option>
    
  </select>
  <div className="error"></div>
  <span>Branch</span>
</div>



<div className={staffcss["input-container"]}>
 
 <select name="designation" id="designation" required>

   <option value="">Select Designation</option>
   <option value="NODAL OFFICER">IEDC NODAL OFFICER</option>
   <option value="ASS-NODAL OFFICER">IEDC ASSIASNT NODAL OFFICER</option>
   

 </select>
 <div className="error"></div>
 <span>Designation</span>
</div>


                <div class={staffcss["input-container"]}>
                    <label for="ResidentialAddress">
                    </label>
                    <input type="text" name="ResidentialAddress" id="ResidentialAddress" required/>
                    <span>Residential Address</span>
                    <div class="error"></div>
                </div>

                <div class={staffcss["input-container"]}>
                    <label for="KTUid">
                    </label>
                    <input type="text" name="KTUid" id="KTUid" required/>
                    <span>KTU-id</span>
                    <div class="error"></div>
                </div>

                <div class={staffcss["input-container"]}>
                    <label for="Areaofinterset">
                    </label>
                    <input type="text" name="Areaofinterset" id="Areaofinterset" required/>
                    <span>Area of interset</span>
                    <div class="error"></div>
                </div>

              
                <div class={staffcss["input-container"]}>
                    <label for="userpassword"></label>
                    <input type="password" name="userpassword" id="userpassword" class="user-password" required/>
                    <span>Password</span>
                    <div class="error"></div>
                </div>

                <div class={staffcss["input-container"]}>
                    <label for="user-password-confirm"></label>
                    <input type="password" name="userpasswordconfirm" id="userpasswordconfirm" class="password-confirmation" required/>
                    <span>
                        Confirm Password
                    </span>
                    <div class="error"></div>
                </div>

            </div>
            <div id="btm">
                    <button type="submit" class={staffcss["submit-btn"]}>Create Account</button>
                   
                </div>
          </form>
        </main>
        <section className={staffcss['outro-overlay']}>
          
          <h1 className={staffcss['outro-greeting']}>signing up..!</h1>
          
         
        </section>
      </div>
    </div>
  );
}

export default Staffsignuppage;
