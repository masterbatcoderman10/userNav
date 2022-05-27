import logo from "./logo.svg";
import "./App.css";

import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { useEffect, useRef, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDzshyneA8NY8AxS-YV8QTCw3CStMt5aUs",
  authDomain: "usernav-77529.firebaseapp.com",
  projectId: "usernav-77529",
  storageBucket: "usernav-77529.appspot.com",
  messagingSenderId: "777254368466",
  appId: "1:777254368466:web:8516b8554d486fcd04a90b",
  measurementId: "G-N3CZN1RS3E",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);

function App() {

  const [user] = useAuthState(auth);
  console.log(user);
  
  return (
    <>
      <Navbar userD={user}/>
      {user ? <Content /> : <SignIn />}
    </>
  );
}

function Content() {
  return (
    <div>

    </div>
  )
}

function UserComponent({user}) {

  const {name, photoURL} = auth.currentUser;

  return (
    <div className="d-flex dropdown">
      <span className="photo me-1">
        <img src={photoURL}>
        </img>
      </span>
      <span>
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {name}
          </a>
      </span>

      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="#">View Profile</a></li>
      </ul>
    </div>
  )
}

function Navbar({userD}) {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand me-5" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* This is where nav items are inserted */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
          </ul>
          {userD ? <UserComponent /> : <li className="nav-item">Not Signed In</li>}
        </div>
      </div>
    </nav>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 p-5 m-5 " id="signin">
            <div className="signin-box mx-auto">
              <div className="google-signin">
                <button className="btn btn-success mx-auto g" onClick={signInWithGoogle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-google"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  <span className="ms-2">Sign In With Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
