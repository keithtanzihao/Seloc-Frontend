import React from "react";
import axios from "axios";

import { NavLink, withRouter, Redirect } from "react-router-dom";

import TechniqueAddInfo from "./TechniqueAddInfo";
import TechniqueAddInstructBen from "./TechniqueAddInstructBen";
import TechniqueAddTags from "./TechniqueAddTags";

import Button from "../../ui/button/Button";

import styles from "../../../styles/main.module.scss";

const BASE_API_URL = "http://localhost:3001/";

class TechniqueAdd extends React.Component {
  state = {
    currentPage: 1,
    addInfo: {
      title: "",
      description: "",
      image: "",
      duration: 0,
      difficulty: "Easy",
    },
    addInstructBen: {
      instructions: [],
      benefits: [],
    },
    addTags: {
      category: [],
      painpoints: [],
    },
  };

  updateIncreasePageNum = (increment, checkValidate = 0) => {

    if (this.state.currentPage !== 4 && increment && checkValidate()) {
      this.setState({
        currentPage: (this.state.currentPage += 1),
      });
    }
    if (this.state.currentPage > 1 && !increment) {
      this.setState({
        currentPage: (this.state.currentPage -= 1),
      });
    }
  };

  updateAddInfoText = (event, obj, fieldName, validateInput = 0) => {
    validateInput(event.target.value, fieldName)
    const prevObj = Object.assign({}, this.state[obj]);
    prevObj[event.target.name] = event.target.value;
    this.setState({
      [obj]: prevObj,
    });
  };

  updateAddNewInstructBen = (prevArray, prevArrayName, addedObj, validateFields, resetFields) => {
    if (validateFields()) {
      let currArray = prevArray.slice();
      this.setState({
        addInstructBen: {
          ...this.state.addInstructBen,
          [prevArrayName]: [...currArray, addedObj],
        },
      });
      resetFields();
    } else {
      console.log("kaopei")
    }
  };

  updateAddTags = (event, selectedField, selectedFieldName, tag) => {
    if (selectedField.includes(event.target.value)) {
      let indexToRemove = selectedField.findIndex(function (field) {
        return field === event.target.value;
      });
      this.setState({
        addTags: {
          ...this.state.addTags,
          [selectedFieldName]: [
            ...selectedField.slice(0, indexToRemove),
            ...selectedField.slice(indexToRemove + 1)
          ],
        },
      });
    } else {
      this.setState({
        addTags: {
          ...this.state.addTags,
          [selectedFieldName]: [...selectedField.slice(), tag],
        },
      });
    }
  };

  submitNewTechnique = async (checkTagsNotEmpty) => {
    if (checkTagsNotEmpty()) {
      await axios.post(BASE_API_URL + "technique/add", {
        ...this.state.addInfo,
        ...this.state.addInstructBen,
        ...this.state.addTags
      })
      this.props.history.replace("/techniques");
    }
  }

  renderContentPage = () => {
    const { addInfo, addInstructBen, addTags } = this.state;
    if (this.state.currentPage == 1)
      return (
        <TechniqueAddInfo
          addInfo={addInfo}
          updateAddInfoText={this.updateAddInfoText}
          updateIncreasePageNum={this.updateIncreasePageNum}
        />
      );
    if (this.state.currentPage == 2)
      return (
        <TechniqueAddInstructBen
          addInstructBen={addInstructBen}
          updateAddNewInstructBen={this.updateAddNewInstructBen}
          updateIncreasePageNum={this.updateIncreasePageNum}
        />
      );
    if (this.state.currentPage == 3)
      return (
        <TechniqueAddTags
          addTags={addTags}
          updateAddTags={this.updateAddTags}
          updateIncreasePageNum={this.updateIncreasePageNum}
          submitNewTechnique={this.submitNewTechnique}
        />
      );
  };

  render() {
    return (
      <React.Fragment>
        <section className={`${styles["techniqueAdd"]}`}>
          {/* Header that doesnt change */}


          <div className={`${styles["techniqueAdd__header"]}`}>
            <h1>Add New Technique</h1>
          </div>

          {this.renderContentPage()}

        </section>
      </React.Fragment>
    );
  }
}

export default withRouter(TechniqueAdd);

