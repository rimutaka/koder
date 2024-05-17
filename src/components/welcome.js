import React, { useEffect } from "react";
import "../css/scan.css";
import { useNavigate } from "react-router-dom";


export default function Welcome() {

  const navigate = useNavigate();

  const startStyle = () => {
    const style = { width: 100, textAlign: "center" };
    return { backgroundColor: "", ...style };
  };

  useEffect(() => {

    // these values are used to set the meta tags in index.html
    // and have to be reset when the component is mounted from
    // a scan that sets them to the book details
    // make sure the values are synchronized with index.html
    // TODO: change ids to constants
    document.title="📖📚🐛📚"
    document.getElementById("ogImage").setAttribute('content', "Scan book barcodes to record or share the books");
    document.getElementById("ogTitle").setAttribute('content', "/logo.png");
  }, []);

  const onBtnClickHandler = async (e) => {
    e.preventDefault();
    navigate(`scan`)
  };

  const renderButtons = () => {
    return <div className="scanBtn">
      <a href="!#" onClick={onBtnClickHandler} className="myHref" style={startStyle()}>SCAN ISBN</a>
    </div>;
  };

  const renderWelcomeMsg = () => {
    return <div id="welcomeMsg" className="welcome scanCanvas">
      <div>
        <h1>Scan the ISBN barcode to save the book in your library and more:</h1>
        <ul>
          <li>Find it on Goodreads</li>
          <li>Borrow from Auckland Libraries</li>
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
