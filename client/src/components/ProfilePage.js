import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const ProfilePage = (props) => {
  const [userImage, setUserImage] = useState([]);
  // const [user, setUser] = useState({})
  const navigate = useNavigate();
  const localUser = localStorage.getItem("getLoggedUser");
  const loggedUser = JSON.parse(localUser);
  console.log(props);
  useEffect(() => {
    console.log("loggedUser: ", loggedUser._id);
    console.log("image ", loggedUser.image);

    axios
      .get(`http://localhost:8000/api/getLoggedUser`, { withCredentials: true })
      .then((res) => {
        console.log("line 12 ", res.data);
        setUserImage(res.data.image);
      })
      .catch((err) => console.log(err));
  }, []);
  const logout = (e) => {
    axios
      .get("http://localhost:8000/api/logout", { withCredentials: true })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="row">
        <nav className="navbar col-12 picGram">
          <div className="container-fluid">
            <h2 className="picGramFont">PicGram</h2>
            <button className="btn logoutBtn" onClick={logout}>
              Logout
            </button>
          </div>
        </nav>
        <div className="container d-flex bodyColor p-3">
          <div className="col-3  pe-3">
            <div className="container text-center borderColor p-2 mb-3">
              <img
                src="./images/profileImage.jpeg"
                alt=""
                className="rounded mx-auto d-block profileImage img-fluid"
              />
              <div className="container w-100 d-flex justify-content-around align-items-center mt-3">
                <Link
                  to={`/edit-profile/${loggedUser._id}`}
                  className="btn editBtnColor circle"
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </Link>
                <Link className="btn btn-secondary circle">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
            <div className="container">
              <h4>
                {loggedUser.firstName} {loggedUser.lastName}
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                dolores eligendi explicabo tempora fugiat! Fugiat, dicta
                voluptas odio officia iure alias earum? Tempora quo excepturi,
                ipsum debitis tenetur impedit accusamus!
              </p>
              <button type="button" className="btn editBtnColor w-100">
                Edit Profile
              </button>
            </div>
          </div>
          <div className="col-6  borderColor galleryBgr p-2">
            <div className="container  p-2 d-flex flex-wrap justify-content-between">
              {userImage.map((image) => (
                <Link
                  to={`/single-image/${image._id}`}
                  className="size d-flex justify-content-center align-items-center mb-2 "
                >
                  <img
                    src={image.postedImage}
                    alt=""
                    className="rounded img-fluid gallery "
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="col-3  d-flex flex-column justify-content-around align-items-center">
            <Link to="/addPost" className="btn addBtnColor w-50">
              Add post
            </Link>
            <div className="chat">chat here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
