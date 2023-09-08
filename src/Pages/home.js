import React, { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Container, Typography, Grid, Link } from "@mui/material";
import { LinkedIn, Instagram, GitHub } from "@mui/icons-material";
import Footer from '../Pages/footer.js';
import NavBar from "./Navbar.js";
import '../css/Home.css';
import '../css/swiper-bundle.min.css';
import '../css/cards.css';
import iedclogo from '../img/iedclogo.png';

function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();

  // Function to upload an image to Firebase Storage
  const uploadImage = async (file) => {
    const storageRef = ref(storage, `img/${file.name}`);
    await uploadBytes(storageRef, file);
    // Get the download URL of the uploaded image
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
  };

  // useEffect to upload an image when the component mounts
  useEffect(() => {
    // For demonstration purposes, you need to replace 'imageFile' with the actual image file.
    const imageFile = null; // Replace with your image file

    if (imageFile) {
      uploadImage(imageFile);
    }
  }, []);

  useEffect(() => {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 200,
    });

    sr.reveal('.reveal', {}); // Apply ScrollReveal to elements with the "reveal" class
  }, []);
  

  return (
    <div>
    <NavBar/>
      <section className="home bd-grid" id="home">
        <div className="home__data">
          <h5 className="home__title">
            Hi Everyone, Welcome 
            <span>To</span>
            <span className="home__title-color"> IEDC-SNMIMT</span>
          </h5>
         
          <a href="#contact" className="button">
            Contact
          </a>
        </div>

        <div className="home__social">
          <a href="#" className="home__social-icon">
            <i className='bx bxl-linkedin'></i>
          </a>
          <a href="https://instagram.com/iedc.snm" className="home__social-icon">
            <i className='bx bxl-instagram'></i>
          </a>
          <a href="#" className="home__social-icon">
            <i className='bx bxl-github'></i>
          </a>
        </div>

        <div className="home__img">
  <svg width="0" height="0">
    <clipPath id="custom-mask">
      <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
    </clipPath>
  </svg>
  
  <img className="img" src={iedclogo} alt="IEDC Logo" style={{ clipPath: 'url(#custom-mask)', boxShadow: '0 0 10px purple' ,marginLeft:'1rem'}} />
</div>

      </section>

      <section className="home bd-grid">
        <div className="home__data">
          <h1 className="home__title__info">"Creativity is just connecting things"</h1>
          <span className="home__title-color">
            <h1 className="home__title__info__min">-Steve Jobs</h1>
          </span>
        </div>
      </section>

      {/* Rest of your sections and content */}

      <>
      <section>
        <div className="container">
          <div className="card">
            <div className="content">
              <div className="imgBx">
                <img src={require("../img/idea.png")} alt="Idea" />
              </div>
              <div className="contentBx">
                <h3>
                  Innovation
                  <br />
                  <span>
                    Innovation is the unrelenting drive to break the status quo and develop anew where have dared to go
                  </span>
                </h3>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <div className="imgBx">
                <img src={require("../img/team.png")} alt="Team" />
              </div>
              <div className="contentBx">
                <h3>
                  Entrepreneurship
                  <br />
                  <span>The best way to predict the future is to create it.</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <div className="imgBx">
                <img src={require("../img/tech.png")} alt="Technology" />
              </div>
              <div className="contentBx">
                <h3>
                  Technology
                  <br />
                  <span>It has become appallingly obvious that our technology has exceeded our humanity.</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about section" id="about">
        <h2 className="section-title">About</h2>

        <div className="about__container bd-grid">
          <div className="about__img">
            <img className="img" src={require("../img/iedclogo.png")} alt="IEDC Logo" />
          </div>

          <div>
            <h2 className="about__subtitle">IEDC-SNMIMT</h2>
            <p className="about__text">
              IEDC has been developed to foster and nurture innovations combined with entrepreneurship amongst young minds,
              there is growth potential to be untapped and IEDC aims to fill this abyss.
            </p>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="about section" id="vision">
        <h2 className="section-title">Vision</h2>

        <div className="about__container_vision">
          <div className="about__subtitle">
            <h2>
              "To dive into the inner potential and to promote technological disruptions when proffering the nurturing mind
              to think laterally and divergently, IEDC is a body to develop entrepreneurial skills and to foster innovations to start up."
            </h2>
          </div>
        </div>
      </section>
    </>

    <>
      <section className="work section" id="Gallery">
        <h2 className="section-title">Gallery</h2>

        <div className="work__container bd-grid">
          <a href="" className="work__img">
            <img src={require("../img/gallery/IMG-20221012-WA0064.jpg")} alt="" />
          </a>
          <a href="" className="work__img">
            <img src={require("../img/gallery/IMG-20221012-WA0065.jpg")} alt="" />
          </a>
          <a href="" className="work__img">
            <img src={require("../img/gallery/IMG-20221012-WA0066.jpg")} alt="" />
          </a>
          <a href="" className="work__img">
            <img src={require("../img/gallery/IMG-20221012-WA0067.jpg")} alt="" />
          </a>
          <a href="" className="work__img">
            <img src={require("../img/gallery/IMG-20221012-WA0068.jpg")} alt="" />
          </a>
          <a href="" className="work__img">
            <img src={require("../img/gallery/IMG-20221014-WA0001.jpg")} alt="" />
          </a>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section id="team">
                <div class="row">
                  <h1>Our Team</h1>
                </div>
                <div class="row">
                



                  <div class="column">
                    <div class="card">
                      <div class="img-container">
                        <img src={require("../img/person/chaithyan no.jpg")}/>
                      </div>
                      <h3>CHAITHANYA RAJ</h3>
                      <p>NODAL OFFICER</p>
                      <div class="icons">
                        <a href="#">
                          <i class="fab fa-whatsapp-square"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
              


                  <div class="column">
                    <div class="card">
                      <div class="img-container">
                        <img src={require("../img/person/CEO_sreeraj.jpeg")}/>
                      </div>
                      <h3>SREERAJ V RAJESH</h3>
                      <p>CEO</p>
                      <div class="icons">
                        <a href="#">
                          <i class="fab fa-whatsapp-square"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
             



                  <div class="column">
                    <div class="card">
                      <div class="img-container">
                        <img src={require("../img/person/CFO_aadarsh.jpg")}/>
                      </div>
                      <h3>AADARSH M.K</h3>
                      <p>CFO</p>
                      <div class="icons">
                        <a href="#">
                          <i class="fab fa-whatsapp-square"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                
                


                  <div class="column">
                    <div class="card">
                      <div class="img-container">
                        <img src="assets\img\person\CCO_ameesha.jpg" />
                      </div>
                      <h3>AMEESHA ANOTHNY</h3>
                      <p>CCO</p>
                      <div class="icons">
                        <a href="#">
                          <i class="fab fa-whatsapp-square"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="card">
                      <div class="img-container">
                        <img src="assets/img/person/cmo_ajay.jpg" />
                      </div>
                      <h3>AJAY PRAVEEN</h3>
                      <p>CMO</p>
                      <div class="icons">
                        <a href="#">
                          <i class="fab fa-whatsapp-square"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="card">
                      <div class="img-container">
                        <img src="assets/img/person/arachan coo.png" />
                      </div>
                      <h3>Arachan M.B</h3>
                      <p>COO</p>
                      <div class="icons">
                        <a href="#">
                          <i class="fab fa-whatsapp-square"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="card">
                      <div class="img-container">
                        <img src="assets/img/person/fathima cwo.jpg" />
                      </div>
                      <h3>Fathima Fairose</h3>
                      <p>CWO</p>
                      <div class="icons">
                        <a href="#">
                          <i class="fab fa-whatsapp-square"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="card">
                      <div class="img-container">
                        <img src="assets\img\person\CTO_abhinav.jpg" />
                      </div>
                      <h3>ABHINAV RAJ</h3>
                      <p>CTO</p>
                      <div class="icons">
                        <a href="#">
                          <i class="fab fa-whatsapp-square"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="card">
                      <div class="img-container">
                        <img src="assets\img\person\CPO_yedukrishana.jpg" />
                      </div>
                      <h3>YEDHUKRISHNAN K.D</h3>
                      <p>CPO</p>
                      <div class="icons">
                        <a href="#">
                          <i class="fab fa-whatsapp"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                 
                </div>
      </section>

      {/* MY STORE */}
      <section className="mystore" id="mystore">
        <div className="container">
          <h1>Our Apps</h1>
          <div className="card">
            <div className="face face1">
              <div className="content">
                <img src={require("../img/apps/fete1.png")} alt="Fete App" />
                <h3>Fete</h3>
              </div>
            </div>
            <div class="face face2">
            <div class="content">
                <p>Fete-A Real-time video call webapp .fete powered by IEDC SNMIMT , Real-time Simple Secure Fast video calls,chat and speed.</p>
                    <a href="https://fete.onrender.com">Check It</a>
            </div>
        </div>
          </div>
          <div className="card">
            <div className="face face1">
              <div className="content">
                <img src={require("../img/apps/fete1.png")} alt="Fete App" />
                <h3>Fete</h3>
              </div>
            </div>
            <div class="face face2">
            <div class="content">
                <p>Fete-A Real-time video call webapp .fete powered by IEDC SNMIMT , Real-time Simple Secure Fast video calls,chat and speed.</p>
                    <a href="https://fete.onrender.com">Check It</a>
            </div>
        </div>
          </div>

          <div className="card">
            <div className="face face1">
              <div className="content">
                <img src={require("../img/apps/fete1.png")} alt="Fete App" />
                <h3>Fete</h3>
              </div>
            </div>
            <div class="face face2">
            <div class="content">
                <p>Fete-A Real-time video call webapp .fete powered by IEDC SNMIMT , Real-time Simple Secure Fast video calls,chat and speed.</p>
                    <a href="https://fete.onrender.com">Check It</a>
            </div>
        </div>
          </div>
          {/* ... (Repeat for other app cards) */}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact section" id="contact">
        <h2 className="section-title">Contact</h2>

        <div className="contact__container bd-grid">
          <form action="https://script.google.com/macros/s/AKfycbyOA9KtjgcHLVLZbTM-kMdq8IPLydKiV0JzvNAjkbKFFIkTxS9RgVPW4Ll0r-tA3lIEMA/exec" className="contact__form" method="POST">
            <input name="Name" type="text" placeholder="Name" className="contact__input" required />
            <input name="Email" type="email" placeholder="Email" className="contact__input" required />
            <textarea name="Give A Feedback" id="" cols="0" rows="10" placeholder="Any Enquiry" className="contact__input"></textarea>
            <input type="submit" value="Send" className="contact__button button" />
          </form>
        </div>
      </section>
    </>
   <Footer/>

    </div>
  );
}

export default Home;
