import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const [Search, setSearch] = useState("");

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=9e67673ace6b407f98542ac615ce1121&page=${
      page + 1
    }&pageSize=${props.pageSize}`;

    setloading({loading: true });
    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    props.setProgress(70);

    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disabled-next-line
  }, []);

  const fetchMoreData = async () => {
    // console.log("fetch more data triggered");
    setpage(page + 1);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9e67673ace6b407f98542ac615ce1121&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };
  return (
    <>
      <div className="text-center" style={{ margin: "75px" }}>
        <h2>News Monkey - Top Headlines</h2>
      </div>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {" "}
            {articles
              .filter((value) => {
                // console.log(value, props.searchQuery)
                if (props.searchQuery !== "") {
                  return value.title.toLowerCase().includes(props.searchQuery);
                } else {
                  return value;
                }
              })
              .map((element) => {
                return (
                  <div className="col md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={
                        element.description
                          ? element.description.slice(0, 50)
                          : ""
                      }
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  page: "1",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.number,
};

export default News;
