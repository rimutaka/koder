import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import * as serviceWorker from './serviceWorker';
import Scan from "./components/scan";
import ScanResult from "./components/scanResult";



ReactDOM.createRoot(document.getElementById("app")).render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Scan scanRate={250} covid19={true} upnqr={true} />} />
          <Route path="isbn/:isbn" element={<ScanResult />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// ReactDom.render((
//   <div className="main">
//     <Scan scanRate={250} covid19={true} upnqr={true} />
//   </div>
// ), document.getElementById("app"));

serviceWorker.register();

function Layout() {
  return (
    <div className="main">
      <Outlet />
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}