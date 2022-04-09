import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../../ui/button/Button";

import styles from "../../../styles/main.module.scss";

const REGEX = {
  urls: new RegExp(
    /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
  ),
};

export default class TechniqueAddInstructBen extends React.Component {
  state = {
    isFieldType: "instructions",
    content: "",
    imageUrl: "",

    errorMsg: {
      content: "",
      imageUrl: "valid"
    },
  };

  validateTextInputs = (value, textField) => {
    let msg = "valid";
    if (value.trim() === "" && textField === "title") msg = `${textField} cannot be empty`;
    else if (value.length < 10 && textField === "title") msg = `${textField} must have at least 10 characters`;
    else if (!REGEX.urls.test(value) && textField === "imageUrl" && value.trim() !== "") msg = "Invalid url path";

    const prevErrorMsg = Object.assign({}, this.state["errorMsg"]);
    prevErrorMsg[textField] = msg;
    this.setState({
      errorMsg: prevErrorMsg,
    });
  };

  checkValidate = () => {
    const { errorMsg } = this.state;
    let content = errorMsg.content !== "valid" ? `Input cannot be empty` : "valid";
    let imageUrl = errorMsg.imageUrl !== "valid" ? `Invalid url path` : "valid";

    this.setState({
      errorMsg: {
        content,
        imageUrl,
      },
    });

    for (let field in this.state.errorMsg) {
      if (this.state.errorMsg[field] !== "valid") {
        return false;
      }
    }
    return true;
  };

  checkInstructBenNotEmpty = () => {
    if (this.props.addInstructBen.instructions.length != 0 &&
      this.props.addInstructBen.benefits.length != 0) {
      return true;
    }
    return false;
  }

  updateField = (event, fieldName = 0, validateTextInputs = 0) => {
    validateTextInputs(event.target.value, fieldName);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateIsFieldType = (type) => {
    if (type !== this.state.isFieldType) {
      this.setState({
        isFieldType: `${type}`,
        content: "",
        imageUrl: "",
      });
    }
  };

  resetFields = () => {
    this.setState({
      content: "",
      imageUrl: "",
      errorMsg: {
        content: "",
        imageUrl: "valid"
      }
    });
  };

  renderFieldType = () => {
    const { isFieldType, content, imageUrl } = this.state;
    const { addInstructBen } = this.props;

    return (
      <React.Fragment>
        <div className={`${styles["techniqueAdd__instructCtn"]}`}>
          <h1>New {isFieldType}</h1>
          <label>Title</label>
          <input
            type="text"
            name="content"
            value={content}
            onChange={(event) =>
              this.updateField(
                event,
                "content",
                this.validateTextInputs
              )
            }
            placeholder={`Add ${isFieldType} title`}
          />
          <span className={`${styles["techniqueAdd__error"]}`}>
            {this.state.errorMsg.content}
          </span>

          <label>Image Url</label>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={(event) =>
              this.updateField(
                event,
                "imageUrl",
                this.validateTextInputs
              )
            }
            placeholder={`Add ${isFieldType} image url`}
          />
          <span className={`${styles["techniqueAdd__error"]}`}>
            {this.state.errorMsg.imageUrl}
          </span>

          <Button
            class={`${styles["techniqueAdd__addBtn"]}`}
            content={`Add ${isFieldType}`}
            clickEvent={() =>
              this.props.updateAddNewInstructBen(
                addInstructBen[`${isFieldType}`],
                isFieldType,
                { content, imageUrl },
                this.checkValidate,
                this.resetFields
              )
            }
          />
        </div>
      </React.Fragment>
    );
  };

  renderFieldTypeContent = (type) => {
    return this.props.addInstructBen[type].map(function (field) {
      return (
        <React.Fragment key={field.content}>
          <li className={`${styles["techniqueAdd__indivItem"]}`}>
            <p>{field.content}</p>
            {field.imageUrl && <img src={field.imageUrl} />}
          </li>
        </React.Fragment>
      );
    });
  };

  render() {
    const { updateIncreasePageNum } = this.props;

    return (
      <React.Fragment>

        <div className={`${styles["techniqueAdd__ctn--instructBen"]}`}>

          {/* Ctn for buttons */}
          <div className={`${styles["techniqueAdd__selectCtn"]}`}>

            <h1>Add Instructions Or Benefits</h1>

            <div>
              <Button
                content="Add Instruction"
                clickEvent={() => this.updateIsFieldType("instructions")}
              />
              <Button
                content="Add Benefit"
                clickEvent={() => this.updateIsFieldType("benefits")}
              />
            </div>

          </div>

          {/* Render Instruction / Benefit box */}
          <div>
            {this.renderFieldType()}
          </div>

          {/* Show resulting Instructions / Benefits ctn */}
          <div className={`${styles["techniqueAdd__instructCtn"]}`}>

            {/* Resulting instructions, Need to allow delete and editing of instructions */}
            <div className={`${styles["techniqueAdd__displayCtn"]}`}>
              <h3>Review Instructions</h3>
              <ol>{this.renderFieldTypeContent("instructions")}</ol>
              <span className={`${styles["techniqueAdd__error"]}`}></span>
            </div>

            {/* Resulting benefits */}
            <div className={`${styles["techniqueAdd__displayCtn"]}`}>
              <h3>Review Benefits</h3>
              <ol>{this.renderFieldTypeContent("benefits")}</ol>
              <span className={`${styles["techniqueAdd__error"]}`}></span>
            </div>
          </div>




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
              clickEvent={() => updateIncreasePageNum(true, this.checkInstructBenNotEmpty)}
            />
            {/* <Button content="Submit" clickEvent={this.submitNewTechnique}/> */}
          </div>


        </div>

      </React.Fragment>
    );
  }
}


