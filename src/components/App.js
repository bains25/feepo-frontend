import React from 'react';
import Dashboard from 'pages/Dashboard';
import ArtistListPage from 'pages/ArtistListPage';
import ArtistPage from 'pages/ArtistPage';
import LandingPage from 'pages/LandingPage';
import TopBar from "components/TopBar"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  let [loggedInUser, setLoggedInUser] = React.useState(JSON.parse(localStorage.getItem("user")));
  let [jwt, setJWT] = React.useState(localStorage.getItem("jwt"));

  function setSession(user, jwt) {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));

    setJWT(jwt);
    setLoggedInUser(user);
  }

  function clearSession() {
    localStorage.clear("jwt");
    localStorage.clear("user");

    setJWT(null);
    setLoggedInUser(null);
  }



  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <TopBar setSession={setSession} clearSession={clearSession} loggedInUser={loggedInUser} jwt={jwt} /> } >
            <Route exact path="/" element={< LandingPage />} />
            <Route exact path="artists" element={< ArtistListPage />} />
            <Route exact path="artists/:artistUsername" element={< ArtistPage />} />
            <Route exact path="dashboard" element={< Dashboard  loggedInUser = { loggedInUser } jwt={ jwt } />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
