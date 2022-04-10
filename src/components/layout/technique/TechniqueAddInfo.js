import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../../ui/button/Button";

import styles from "../../../styles/main.module.scss";

const REGEX = {
  urls: new RegExp(
    /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
  ),
};

export default class TechniqueAddInfo extends React.Component {
  state = {
    isImageModalOpen: false,
    errorMsg: {
      title: "",
      description: "",
      image: "",
    },
    hasLoaded: false
  };

  componentDidMount = () => {
    if (this.props.addInfo.title !== "" &&
      this.props.addInfo.description.length >= 100 &&
      REGEX.urls.test(this.props.addInfo.image)) {
      this.setState({
        errorMsg: {
          title: "valid",
          description: "valid",
          image: "valid"
        }
      })
    }
    this.setState({
      hasLoaded: true
    })
  }

  validateTextInputs = (value, textField) => {
    let msg = "valid";
    if (value.trim() === "") msg = `${textField} cannot be empty`;
    if (value.length < 100 && textField === "description") msg = `${textField} must have at least 100 characters`;
    if (!REGEX.urls.test(value) && textField === "image") msg = "Invalid url path";

    const prevErrorMsg = Object.assign({}, this.state["errorMsg"]);
    prevErrorMsg[textField] = msg;
    this.setState({
      errorMsg: prevErrorMsg,
    });
  };

  checkValidate = () => {
    for (let field in this.state.errorMsg) {
      if (this.state.errorMsg[field] !== "valid") {
        return false;
      }
    }
    return true;
  };

  updateImageModalOpen = () => {
    this.setState({
      isImageModalOpen: !this.state.isImageModalOpen,
    });
  };

  renderListOfImages = () => {
    return this.props.addInfo.images.map(function (image, index) {
      return (
        <React.Fragment key={`img${index}`}>
          <li>{image.name}</li>
        </React.Fragment>
      );
    });
  };

  render() {
    const { addInfo, updateAddInfoText, updateIncreasePageNum } = this.props;
    const { errorMsg } = this.state;

    if (this.state.hasLoaded) {
      return (
        <React.Fragment>
          <div className={`${styles["techniqueAdd__ctn--info"]}`}>

            {/* basic info container */}
            <div className={`${styles["techniqueAdd__info--inputs"]}`}>

              <div className={`${styles["techniqueAdd__infoTitle"]}`}>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={addInfo.title}
                  onChange={(event) =>
                    updateAddInfoText(
                      event,
                      "addInfo",
                      event.target.name,
                      this.validateTextInputs
                    )
                  }
                  placeholder="Technique Title"
                />
                <span className={`${styles["techniqueAdd__error"]}`}>
                  {errorMsg.title}
                </span>
              </div>

              <div className={`${styles["techniqueAdd__infoDesc"]}`}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={addInfo.description}
                  onChange={(event) =>
                    updateAddInfoText(
                      event,
                      "addInfo",
                      event.target.name,
                      this.validateTextInputs
                    )
                  }
                  cols="30"
                  rows="10"
                  placeholder="Technique description here"
                />
                <span className={`${styles["techniqueAdd__error"]}`}>
                  {errorMsg.description}
                </span>
              </div>

              <div className={`${styles["techniqueAdd__infoDropDown"]}`}>

                <div className={`${styles["techniqueAdd__dropDown--ctn"]}`}>
                  <label>Approximate Duration</label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    name="duration"
                    value={addInfo.duration}
                    onChange={(event) =>
                      updateAddInfoText(
                        event,
                        "addInfo",
                        event.target.name,
                        this.validateTextInputs
                      )
                    }
                  />
                  <span className={`${styles["techniqueAdd__error"]}`}></span>
                </div>


                <div className={`${styles["techniqueAdd__dropDown--ctn"]}`}>
                  <label>Difficulty Level</label>
                  <select
                    name="difficulty"
                    value={addInfo.difficulty}
                    onChange={(event) =>
                      updateAddInfoText(
                        event,
                        "addInfo",
                        event.target.name,
                        this.validateTextInputs
                      )
                    }
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                  <span className={`${styles["techniqueAdd__error"]}`}></span>
                </div>

              </div>

              <div className={`${styles["techniqueAdd__infoImage"]}`}>
                <label>Add image</label>
                <input
                  type="text"
                  name="image"
                  value={addInfo.image}
                  onChange={(event) =>
                    updateAddInfoText(
                      event,
                      "addInfo",
                      event.target.name,
                      this.validateTextInputs
                    )
                  }
                  placeholder="Technique Display Image"
                />
                <span className={`${styles["techniqueAdd__error"]}`}>
                  {errorMsg.image}
                </span>
              </div>
            </div>

            {/* Button containers */}
            <div className={`${styles["techniqueAdd__info--btns"]}`}>
              <NavLink to="/techniques">
                <Button class={`${styles["techniqueAdd__infoBtn--cancel"]}`} content="Cancel" />
              </NavLink>

              <Button
                class={`${styles["techniqueAdd__infoBtn"]}`}
                content="Previous"
                clickEvent={() => updateIncreasePageNum(false)}
              />

              <Button
                class={`${styles["techniqueAdd__infoBtn"]}`}
                content="Next"
                clickEvent={() => updateIncreasePageNum(true, this.checkValidate)}
              />
              {/* <Button content="Submit" clickEvent={this.submitNewTechnique}/> */}
            </div>

          </div>

        </React.Fragment>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}
