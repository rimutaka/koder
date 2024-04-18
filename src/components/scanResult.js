import React, { useEffect } from "react";
import useState from 'react-usestateref';
import "../css/scan.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import initWasmModule, { get_book_data } from '../wasm-rust/isbn_mod.js';

function P({ text }) {

  if (text && !text.includes("undefined")) {
    return <p className="fade-in">{text}</p>
  }
  else {
    return null;
  }
}

function H3({ text }) {

  if (text) {
    return <h3 className="fade-in">{text}</h3>
  }
  else {
    return null;
  }
}

// stores the previous ISBN to check against the one in params
// to avoid unnecessary calls to the WASM module
let previousIsbn = "";

export default function ScanResult() {

  const navigate = useNavigate();
  let { isbn } = useParams();

  const [title, setTitle] = useState();
  const [authors, setAuthors] = useState();
  const [price, setPrice] = useState();
  const [thumbnail, setThumbnail] = useState();

  console.log("render");

  // if the ISBN is different from the previous one, fetch book data
  // from multiple sources with WASM
  if (isbn !== previousIsbn) {
    previousIsbn = isbn;
    (async () => {
      await initWasmModule(); // run the wasm initializer before calling wasm methods
      // request book data from WASM module
      // the responses are sent back as messages to the window object   
      get_book_data(isbn);
    })();
  }

  // useEffect(() => { }, []);

  // handles messages with book data sent back by the WASM module
  window.addEventListener("message", (msg) => {
    // console.log(`WASM msg: ${msg.data} / ${msg.origin} / ${msg.source}`);

    // WASM messages should be JSON objects
    let data;
    try {
      data = JSON.parse(msg.data);
    }
    catch (e) {
      // use this for debugging, but this mostly logs messages sent from React tooling
      // in development mode, not sure it's worth logging this in production
      // console.log(`Error parsing JSON data: ${e}`);
      return;
    }

    // see `WasmResult` and `WasmResponse` in the WASM code for the structure of the data
    if (data?.googleBooks?.Ok) {
      const title = data.googleBooks.Ok?.items[0]?.volumeInfo?.title;
      // console.log(`Title: ${title}`);
      setTitle(title);
      const authors = data.googleBooks.Ok?.items[0]?.volumeInfo?.authors?.join(", ");
      if (authors) setAuthors(authors);
      const thumbnail = data.googleBooks.Ok?.items[0]?.volumeInfo?.imageLinks?.thumbnail;
      if (thumbnail) setThumbnail(thumbnail);
      const amount = data.googleBooks.Ok?.items[0]?.saleInfo?.listPrice?.amount;
      const currency = data.googleBooks.Ok?.items[0]?.saleInfo?.listPrice?.currencyCode;
      if (amount) setPrice(`${currency} ${amount}`);
    }
  });

  const renderQrCodeResult = () => {
    return (
      <div>
        <p>ISBN: {isbn}</p>
        <H3 text={title} />
        <P text={`by ${authors}`} />
        <p><a href={`https://www.goodreads.com/search?q=${isbn}`}>GoodReads</a> | <a href={`https://app.thestorygraph.com/browse?search_term=${isbn}`}>StoryGraph</a></p>
        <p><a href={`https://discover.aucklandlibraries.govt.nz/search?query=${isbn}`}>Auckland libraries</a></p>
        <p><a href={`https://www.google.com/search?tbo=p&tbm=bks&q=isbn:${isbn}`}>Google books</a></p>
        <p><a href={`https://www.thenile.co.nz/search?s.q=${isbn}`}>The Nile</a> | <a href={`https://www.amazon.com/s?k=${isbn}`}>Amazon</a> | <a href={`https://www.mightyape.co.nz/books?q=${isbn}`}>MightyApe</a></p>
      </div>)
  }
  const onClickBackHandler = (e) => {
    e.preventDefault();
    navigate(`/scan`)
  };

  const onClickCopyToClipboard = async (e) => {
    e.preventDefault();
    const shareText = `${title} by ${authors}, more at ${window.location.href}`;
    await navigator.clipboard.writeText(shareText);
    const btnId = document.getElementById("copyToClip");
    btnId.innerText = "COPIED TO CLIPBOARD";
    btnId.style.backgroundColor = "green";
    setTimeout(() => {
      btnId.innerText = "SHARE";
      btnId.style.backgroundColor = "";
    }, 3000);
  }

  const renderCopyToClipboardBtn = () => {
    return <a href="!#" style={{ padding: 12 }} id="copyToClip" className="myHref"
      onClick={onClickCopyToClipboard}>SHARE</a>
  }

  const renderResult = () => {
    return (
      <div className="resultModal">
        <div className="result">
          {renderQrCodeResult()}
        </div>
        <div style={{ marginTop: 40 }}>
          <a href="!#" style={{ padding: 12 }} className="myHref" onClick={onClickBackHandler}>SCAN AGAIN</a>
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
