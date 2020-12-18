import React, { Component } from "react";
import classnames from "./testFile.module.css";

export default class testFile extends Component {
  state = {
    apiData: [],
    csfr: "",
    error: null,
  };
  componentDidMount() {
    axios
      .get("https://example.com/api/test")
      .then((res) => {
        this.setState({
          apiData: res.data,
          csfr: res.data[0].csfr,
          error: null,
        });
      })
      .catch((err) =>
        this.setState({
          error: err,
        })
      );
  }
  render() {
    let handleApiData = this.state.apiData;

    return (
      <div>
        {this.state.err ? (
          null(
            <>
              <h1>{handleApiData[0]?.version}</h1>
              <h1>{handleApiData[0]?.count}</h1>
              <a href={handleApiData[0]?.buttonURL}>
                <button>Click</button>
              </a>
            </>
          )
        ) : (
          <h1>An error has occured in the api call</h1>
        )}
      </div>
    );
  }
}
