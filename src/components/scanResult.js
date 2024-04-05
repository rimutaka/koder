import React, { useEffect } from "react";
// import useState from 'react-usestateref';
import "../css/scan.css";
import { useParams } from "react-router-dom";

export default function ScanResult() {

  let { isbn } = useParams();

  useEffect(() => { }, []);

  const renderQrCodeResult = () => {
    return (
      <div>
        <p>ISBN: {isbn}</p>
        <p><a href={`https://www.goodreads.com/search?q=${isbn}`}>GoodReads</a> | <a href={`https://app.thestorygraph.com/browse?search_term=${isbn}`}>StoryGraph</a> | </p>
        <p><a href={`https://discover.aucklandlibraries.govt.nz/search?query=${isbn}`}>Auckland libraries</a></p>
        <p><a href={`https://www.google.com/search?tbo=p&tbm=bks&q=isbn:${isbn}`}>Google books</a></p>
        <p><a href={`https://www.thenile.co.nz/search?s.q=${isbn}`}>The Nile</a> | <a href={`https://www.amazon.com/s?k=${isbn}`}>Amazon</a></p>
      </div>)
  }
  const onClickBackHandler = (e) => {
    e.preventDefault();
  };

  const onClickCopyToClipboard = async (e) => {
    e.preventDefault();
    await navigator.clipboard.writeText(isbn);
    const btnId = document.getElementById("copyToClip");
    btnId.innerText = "DONE";
    btnId.style.backgroundColor = "green";
    setTimeout(() => {
      btnId.innerText = "COPY";
      btnId.style.backgroundColor = "";
    }, 1000);
  }

  const renderCopyToClipboardBtn = () => {
    return <a href="!#" style={{ padding: 12 }} id="copyToClip" className="myHref"
      onClick={onClickCopyToClipboard}>COPY</a>
  }

  const renderResult = () => {
    return (
      <div className="resultModal">
        <div className="result">
          {renderQrCodeResult()}
        </div>
        <div style={{ marginTop: 40 }}>
          <a href="!#" style={{ padding: 12 }} className="myHref" onClick={onClickBackHandler}>BACK</a>
          {renderCopyToClipboardBtn()}
        </div>
      </div>);
  };

  return (
    <div>
      {renderResult()}
    </div>
  )
};
