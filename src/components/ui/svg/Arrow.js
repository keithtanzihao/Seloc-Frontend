import React from "react";

import styles from "../../../styles/main.module.css";

export default class Arrow extends React.Component {
  render() {
    return (
      <svg
        className={`${styles["arrow__svg"]}`}
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        x="0"
        y="0"
        version="1.1"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
        style={{
          backgroundSize: "initial",
          backgroundRepeatY: "initial",
          backgroundRepeatX: "initial",
          backgroundPositionY: "initial",
          backgroundPositionX: "initial",
          backgroundOrigin: "initial",
          backgroundImage: "initial",
          backgroundColor: "rgb(255, 255, 255)",
          backgroundClip: "initial",
          backgroundAttachment: "initial",
          WebkitAnimationPlayState: "paused",
          animationPlayState: "paused",
        }}
      >
        <g
          className="ldl-scale"
          style={{
            WebkitTransformOrigin: "50% 50%",
            MsTransformOrigin: "50% 50%",
            transformOrigin: "50% 50%",
            WebkitAnimationPlayState: "paused",
            animationPlayState: "paused",
          }}
          transform="scale(.8)"
        >
          <path
            fill="#323232"
            d="M52.343 90.249L92.5 50.093 52.343 9.936l-8.031 8.031 26.446 26.447H7.5v11.358h63.258L44.312 82.218z"
            style={{
              WebkitAnimationPlayState: "paused",
              animationPlayState: "paused",
            }}
          ></path>
        </g>
      </svg>
    )
  }
}