import React from "react";
import axios from "axios";
import { withRouter, NavLink } from "react-router-dom";

import Button from "../ui/button/Button";
import Rating from "../ui/button/Rating";

import styles from "../../styles/main.module.scss";
import { FaStar } from "react-icons/fa";

// const BASE_API_URL = "https://letstalkbackend.herokuapp.com/";
const BASE_API_URL = "http://localhost:3001/";

class Comment extends React.Component {

  state = {
    isBeingEditted: false,

    hoverScore: this.props.commentInfo.ratingScore,
    ratingScore: this.props.commentInfo.ratingScore,
    comment: this.props.commentInfo.comment,
    comment_id: this.props.commentInfo._id || "",

    errorMsg: ""
  }

  updateScore = (value, stateName) => {
    this.setState({
      [stateName]: value,
    });
  };

  updateComment = (event) => {
    let errorMsg = (event.target.value.length === 0) ? "Comment cannot be empty" : "valid";
    this.setState({
      [event.target.name]: event.target.value,
      errorMsg: errorMsg
    })
  }

  // Refactor if got time
  updateIsBeingEditted = () => {
    this.setState({
      isBeingEditted: !this.state.isBeingEditted,
      hoverScore: this.props.commentInfo.ratingScore,
      ratingScore: this.props.commentInfo.ratingScore,
      comment: this.props.commentInfo.comment
    })
  }

  renderRatingScore = (ratingScore) => {
    return [...Array(5)].map((star, index) => {
      const score = index + 1;
      return (
        <FaStar
          className={`${styles["rating__stars--display"]}`}
          color={(ratingScore) >= score ? "#ffc107" : "#e4e5e9"}
        />
      )
    })
  }

  renderButtons = () => {
    const { sessionUser } = this.props;
    if (sessionUser && sessionUser === this.props.commentInfo.user_email) {
      return (
        <div>
          <Button content="Edit" clickEvent={this.updateIsBeingEditted}/>
          <Button content="Delete" clickEvent={this.submitDeleteComment}/>
        </div>
      )
    }
  }


  submitEdittedChanges = async () => {
    if (this.state.errorMsg === "valid") {
      
      await axios.put(BASE_API_URL + `comment/${this.props.commentInfo._id}`, {
        comment: this.state.comment,
        ratingScore: this.state.ratingScore
      })
      // Refresh page
      this.props.history.go(0);
    } 
    
    // Testing purposes
    else {
      console.log("bruh");
    }
  }

  submitDeleteComment = async () => {
    console.log(`${this.props.techniqueID}   ${this.props.commentInfo._id}`);
    await axios.delete(BASE_API_URL + `technique/${this.props.techniqueID}/comment/${this.props.commentInfo._id}`);
    console.log("delete successful / fired");
    // Refresh page
    this.props.history.go(0);
  }


  render() {

    const { commentInfo } = this.props;
    const { isBeingEditted, comment, errorMsg } = this.state;

    if (isBeingEditted) {
      return (
        <div className={`${styles["technique__comment"]}`}>

          <div className={`${styles["technique__commentUser"]}`}>
            <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
            <span>{commentInfo.user_email}</span>
          </div>

          <div className={`${styles["technique__commentContent"]}`}>

            <Rating
              className={`${styles["technique__commentStars"]}`}
              ratingComment={this.state}
              updateScore={this.updateScore}
            />
            <textarea
              name="comment"
              value={comment}
              cols="30"
              rows="10"
              onChange={this.updateComment}
            />

            <span>{errorMsg}</span>

            <div>
              <Button content="Cancel" clickEvent={this.updateIsBeingEditted} />
              <Button content="Submit" clickEvent={this.submitEdittedChanges}/>
            </div>

          </div>

        </div>
      )
    }

    else {
      return (

        <div className={`${styles["technique__comment"]}`}>

          <div className={`${styles["technique__commentUser"]}`}>
            <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
            <span>{commentInfo.user_email}</span>
          </div>

          <div className={`${styles["technique__commentContent"]}`}>

            <div>{this.renderRatingScore(commentInfo.ratingScore)}</div>
            <span>{commentInfo.comment}</span>

            {this.renderButtons()}
          </div>

        </div>

      )
    }
  }
}

export default withRouter(Comment);