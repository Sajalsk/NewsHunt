import React from "react";
import './App.css';


// Children component 
const NewsItem = (props) => {

  let { title, description, imageurl, newsurl, author, date, source } = props;
  
  return (
    <div>
      <div className="card" style={{  width: "18rem", margin: "0px 0px 45px" }}>
        <img src={!imageurl? "https://i.ytimg.com/vi/87ORsmVj29Y/maxresdefault.jpg" : imageurl}
          className="card-img-top"
          alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              {" "}
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}{" "} Source {source}
            </small>
          </p>
          <a href={newsurl} target="_blank" className="btn btm-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
