import React from "react";
import axios from "axios";

import { withRouter, NavLink } from "react-router-dom";

import Comment from "../../layout/Comment";

import Button from "../button/Button";
import Rating from "../button/Rating";

import styles from "../../../styles/main.module.css";

const BASE_API_URL = "http://localhost:3001/";

class TechniqueDisplay extends React.Component {
  state = {
    ratingScore: 0,
    hoverScore: 0,
    comment: "",
    validateCommentMsg: "valid",

    commentList: [],

    // TESTING FOR REACT ROUTE
    hasLoaded: false,

    techniqueInfo: {},

    sessionUser: "",

    // Edit comment
  };

  componentDidMount = async () => {
    // Get individual technique info w/o comments
    let techniqueInfo = await axios.get(
      BASE_API_URL + `technique/${this.props.match.params.id}`
    );
    this.setState({
      techniqueInfo: techniqueInfo.data.techniqueInfo,
      sessionUser: techniqueInfo.data.sessionUser,
    });

    // Get individual technique comments
    let techniqueComments = await axios.get(
      BASE_API_URL + `technique/${this.props.match.params.id}/comments`
    );
    this.setState({
      hasLoaded: true,
      commentList: techniqueComments.data,
    });

    console.log("---------------------------")
    console.log(techniqueComments)
    console.log("#####################")
    console.log(techniqueInfo)
    console.log("---------------------------")
  };

  // Validate comment
  validateComment = () => {
    if (this.state.comment.length !== 0) {
      this.setState({
        validateCommentMsg: "Comment cannot be empty",
      });
    } else {
      this.setState({
        validateCommentMsg: "valid",
      });
    }
  };

  updateScore = (value, stateName) => {
    this.setState({
      [stateName]: value,
    });
  };

  updateComment = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitComment = async (event) => {
    event.preventDefault();

    if (this.state.validateCommentMsg === "valid") {
      let newComment = {
        comment: this.state.comment,
        ratingScore: this.state.ratingScore,
      };
      await axios.post(
        BASE_API_URL + `technique/${this.props.match.params.id}/comment/add`,
        newComment
      );

      // Refresh the comments ?
      let techniqueComments = await axios.get(
        BASE_API_URL + `technique/${this.props.match.params.id}/comments`
      );
      this.setState({
        commentList: techniqueComments.data,
      });
    }
  };

  // Rewrite this later
  renderContent = (contentArray, className, isButton) => {
    return contentArray.map(function (content) {
      return isButton ? (
        <Button key={content} class={className} content={content} />
      ) : (
        <li key={content}>{content}</li>
      );
    });
  };

  renderInstructBen = (contentObj, className) => {
    let contentObjArray = [];
    for (let key in contentObj) {
      contentObjArray.push(
        <React.Fragment key={`instructBen${key}`}>
          <li className={className}>
            <p>{contentObj[key]["content"]}</p>
            <img src={contentObj[key]["imageUrl"]} />
          </li>
        </React.Fragment>
      );
    }
    return contentObjArray;
  };

  renderRating = () => {
    if (this.state.sessionUser !== "") {
      return (
        <React.Fragment>
          <h3>Login to leave comments</h3>
          <div className={`${styles["technique__commentCtn--input"]}`}>
            <Rating
              className={`${styles["technique__commentStars"]}`}
              ratingComment={this.state}
              updateScore={this.updateScore}
            />
            <textarea
              name="comment"
              value={this.state.comment}
              cols="30"
              rows="10"
              placeholder="Tell us what you think"
              onChange={this.updateComment}
            />
            <Button
              class={`${styles["technique__contentBtn--comment"]}`}
              content="Submit"
              clickEvent={this.submitComment}
            />
          </div>
        </React.Fragment>
      );
    } else {
      return <h3>Login to leave comments</h3>;
    }
  };

  renderComments = () => {

    console.log(this.state.commentList, this.state.techniqueInfo);

    return this.state.commentList.map((comment, index) => {
      
      return (
        <React.Fragment key={`comment${comment.comment}${index}`}>
          <Comment
            techniqueID={this.state.techniqueInfo._id}
            commentInfo={comment}
            sessionUser={this.state.sessionUser}
          />
        </React.Fragment>
      );
    });
  };

  render() {
    const { comment } = this.state;
    const {
      title,
      description,
      duration,
      difficulty,
      image,
      instructions,
      benefits,
      category,
      painpoints,
    } = this.state.techniqueInfo;

    if (this.state.hasLoaded) {
      return (
        <React.Fragment>
          <main className={`${styles["technique__display"]}`}>
            <section className={`${styles["technique__displayCtn"]}`}>
              <NavLink to={`/techniques`}>
                <Button
                  class={`${styles["technique__returnBtn"]}`}
                  content="<"
                  clickEvent={this.updateIsDisplayOpen}
                />
              </NavLink>

              <img
                className={`${styles["technique__displayImg"]}`}
                src={image}
              />

              <div className={`${styles["technique__contentCtn"]}`}>
                <h1>{title}</h1>
                <span>Duration: Approximately {duration} hours</span>
                <br />
                <span>Difficulty: {difficulty}</span>

                <h3>Categories</h3>
                <ul>
                  {this.renderContent(
                    category,
                    `${styles["technique__contentBtn--category"]}`,
                    true
                  )}
                </ul>

                <h3>Target Painpoints</h3>
                <ul>
                  {this.renderContent(
                    painpoints,
                    `${styles["technique__contentBtn--painpoint"]}`,
                    true
                  )}
                </ul>

                <h3>Description</h3>
                <p>{description}</p>

                <h3>Instructions</h3>
                <ol>
                  {this.renderInstructBen(
                    instructions,
                    `${styles["technique__InfoCtn"]}`
                  )}
                </ol>

                <h3>Benefits</h3>
                <ul>
                  {this.renderInstructBen(
                    benefits,
                    `${styles["technique__InfoCtn"]}`
                  )}
                </ul>

                {/* Render rating box */}
                {this.renderRating()}

                <h3>Comments</h3>
                <div className={`${styles["technique__commentCtn--display"]}`}>
                  {this.renderComments()}
                </div>
              </div>
            </section>
          </main>
        </React.Fragment>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

export default withRouter(TechniqueDisplay);
