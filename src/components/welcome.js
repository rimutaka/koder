import React from "react";
import "../css/scan.css";
import { useNavigate } from "react-router-dom";


export default function Welcome() {

  const navigate = useNavigate();

  const startStyle = () => {
    const style = { width: 64, textAlign: "center" };
    return { backgroundColor: "", ...style };
  };

  const onBtnClickHandler = async (e) => {
    e.preventDefault();
    navigate(`scan`)
  };

  const renderButtons = () => {
    return <div className="scanBtn">
      <a href="!#" onClick={onBtnClickHandler} className="myHref" style={startStyle()}>Scannn</a>
    </div>;
  };

  const renderWelcomeMsg = () => {
    return <div id="welcomeMsg" className="welcome scanCanvas">
      <div>
        <h1>Scan the ISBN barcode to save the book in your library and more:</h1>
        <ul>
          <li>Find it on Goodreads</li>
          <li>Borrow from Auckland Library</li>
          <li>Buy new or secondhand</li>
        </ul>
      </div>
    </div>;
  };

  const renderScan = () => {
    return (
      <div className="scan">
        {renderWelcomeMsg()}
        {renderButtons()}
      </div>
    );
  };

  return (
    <div>
      {renderScan()}
    </div>
  )
};
