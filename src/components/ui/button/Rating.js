import React from "react";

import styles from "../../../styles/main.module.css";
import { FaStar } from "react-icons/fa";

export default class Rating extends React.Component {
  state = {
    ratingScore: 0,
    hoverScore: 0,
  };

  renderStarRating = () => {
    const { ratingScore, hoverScore } = this.props.ratingComment;
    const { updateScore } = this.props;

    return [...Array(5)].map((star, index) => {
      const score = index + 1;

      return (
        <React.Fragment key={`star${index}`}>
          <label>
            <input
              className={`${styles["rating__radio"]}`}
              type="radio"
              name="ratingScore"
              value={score}
              onClick={() => updateScore(score, "ratingScore")}
            />
            <FaStar
              className={`${styles["rating__stars"]}`}
              color={(hoverScore || ratingScore) >= score ? "#ffc107" : "#e4e5e9"}
              onMouseOver={() => updateScore(score, "hoverScore")}
              onMouseOut={() => updateScore(0, "hoverScore")}
            />
          </label>
        </React.Fragment>
      );
    });
  };

  render() {
    return <div className={this.props.className}>{this.renderStarRating()}</div>;
  }
}
