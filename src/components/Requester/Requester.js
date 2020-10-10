
import Helmet from "react-helmet";
import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import ChoiceOptions from "../ChoiceOptions";
import DecisionOptions from "../DecisionOptions";
import SentenceOptions from "../SentenceOptions";
import { API } from "../../helpers";

class Requester extends Component {
  /* Srate Staff */
  constructor() {
    super();
    this.state = {
      uploadedImage: "",
      requireClass: "",
      result: "",
      taskType: "",
      title: "",
      description: "",
      expiration: "",
      workersRequired: "",
      requirement: "",
      response: "",
      workerNumber: "",
      resultClass: "",
      titleClass: "",
      descriptionClass: "",
      expirationClass: "",
      responseClass: "",
      workerNumberClass: "",
      imageclass: "",
      choiceOptions: false,
      decisionOptions: false,
      sentenceOptions: false,
      informationObject: {},
    };
  }


  componentDidMount() {
    console.log("Page is loaded successfully");
  }

  async submitRequest(key) {
    key.preventDefault();
    this.setState({ result: "Loading ● ● ●" });
    let dataToSend = {
      title: this.state.title,
      description: this.state.description,
      expiryDate: this.state.expiration,
      workerRequired: this.state.requirement === "yes",
      reward: Number.parseInt(this.state.response),
      noOfWorkers: Number.parseInt(this.state.workerNumber),
    };
    if (this.state.choiceOptions) {
      dataToSend.choice1 = this.state.informationObject.option1;
      dataToSend.choice2 = this.state.informationObject.option2;
      dataToSend.choice3 = this.state.informationObject.option3;
      dataToSend.choice4 = this.state.informationObject.option4;
      dataToSend.type = "CHOICE";
    }
    else if (this.state.decisionOptions) {
      dataToSend.decisionBool = this.state?.informationObject?.decision === "yes";
      dataToSend.type = "DECISION_MAKING";
    }
    else if (this.state.sentenceOptions) {
      dataToSend.translatedText = this.state?.informationObject?.sentence;
      dataToSend.type = "SENTENCE_LEVEL";
    }
    const response = await API.createTask(dataToSend);
    if (response.success) {
      toast("Created");
    } else {
      toast(response.data)
    }
  }

  changeInformation = (val) => {
    this.setState({
      informationObject: val,
    });

    console.log("information Object changed");
  };

  handleChange(key) {
    // console.log(key.target.value);

    if (key.target.value === "Choice Task") {
      this.setState({
        choiceOptions: true,
        decisionOptions: false,
        sentenceOptions: false,
      });
    } else if (key.target.value === "Decision Task") {
      this.setState({
        choiceOptions: false,
        decisionOptions: true,
        sentenceOptions: false,
      });
    } else if (key.target.value === "Sentence Task") {
      this.setState({
        choiceOptions: false,
        decisionOptions: false,
        sentenceOptions: true,
      });
    }

    this.setState({
      result: "",
      imageclass: "",
      resultClass: "",
      taskClass: "",
      requireClass: "",
      choiceTaskClass: "",
      decisionTaskClass: "",
      sentenceTaskClass: "",
      titleClass: "",
      descriptionClass: "",
      expirationClass: "",
      responseClass: "",
      workerNumberClass: "",
      [key.target.id]: key.target.value,
    });

    if (key.target.files) {
      this.setState({ [key.target.id]: key.target.files[0] });
    }
  }

  render() {
    const {
      requireClass,
      result,
      taskType,
      title,
      description,
      expiration,
      requirement,
      response,
      workerNumber,
      resultClass,
      titleClass,
      taskClass,
      descriptionClass,
      expirationClass,
      responseClass,
      workerNumberClass,
      uploadedImage,
      imageclass,
    } = this.state;

    let preview;
    let previewImg;

    if (uploadedImage) {
      if (uploadedImage.name) {
        preview = uploadedImage.name;
        const getDocName = uploadedImage.name;
        const docLength = getDocName.length;
        const point = getDocName.lastIndexOf(".");
        const getExtensionFile = getDocName.substring(point, docLength);
        const lowCaseExtensionFile = getExtensionFile.toLowerCase();
        if (
          lowCaseExtensionFile === ".jpg" ||
          lowCaseExtensionFile === ".png"
        ) {
          previewImg = URL.createObjectURL(uploadedImage);
        }
      }
    }

    return (
      <div>
        <Helmet>
          <style>
            {
              " height: 100vh; position: relative; background-size: cover; background: rgb(255, 255, 255); background-color: rgb(175, 3, 3);"
            }
          </style>
        </Helmet>

        <ToastContainer />

        <NavBar />

        <div className="requester-page">
          <div className="requester-title">
            <span className="requester-header">New Requester Task</span>

            <span className="requester-desc">Worker Task</span>
          </div>
          <div className="task-type">
            <div className="select-title">Select Task Type: </div>

            <div className={`${taskClass}`}>
              <input
                type="radio"
                id="taskType"
                name="taskType"
                className="input"
                value="Choice Task"
                checked={taskType === "Choice Task"}
                onChange={(id) => this.handleChange(id)}
              />
              Choice Task
            </div>

            <div className={`${taskClass}`}>
              <input
                type="radio"
                id="taskType"
                name="taskType"
                className="input"
                value="Decision Task"
                checked={taskType === "Decision Task"}
                onChange={(id) => this.handleChange(id)}
              />
              Decision Making Task
            </div>

            <div className={`${taskClass}`}>
              <input
                type="radio"
                id="taskType"
                name="taskType"
                className="input"
                value="Sentence Task"
                checked={taskType === "Sentence Task"}
                onChange={(id) => this.handleChange(id)}
              />
              Sentence-Level Task
            </div>
          </div>

          <div className="task-desc">Describe Your Task To Workers</div>
          <div className="task-desc-form">
            <div>
              <div className="input-label">Title :</div>
              <input
                id="title"
                type="text"
                value={title}
                className={`${titleClass}`}
                onChange={(id) => this.handleChange(id)}
              />
            </div>

            <div>
              <div className="input-label">Description :</div>
              <textarea
                type="text"
                id="description"
                value={description}
                className={`${descriptionClass}`}
                onChange={(id) => this.handleChange(id)}
              />
            </div>

            <div>
              <div className="input-label">Expiration Date :</div>
              <input
                type="date"
                id="expiration"
                value={expiration}
                className={`${expirationClass}`}
                onChange={(id) => this.handleChange(id)}
              />
            </div>
          </div>
          <div className="task-desc">Setting Up Your Task</div>
          <div className="setting-desc">
            This Section could have any information we want for Unit-SIT313
          </div>
          {this.state.choiceOptions ? (
            <ChoiceOptions changeInformation={this.changeInformation} />
          ) : null}
          {this.state.decisionOptions ? (
            <DecisionOptions changeInformation={this.changeInformation} />
          ) : null}
          {this.state.sentenceOptions ? (
            <SentenceOptions changeInformation={this.changeInformation} />
          ) : null}
          <div className="task-desc">Worker Requirement</div>
          <div className="worker-desc-form">
            <div className="worker-requirement">
              <div className="select-title">Require Master Workers: </div>

              <div className={`${requireClass}`}>
                <input
                  value="yes"
                  type="radio"
                  id="requirement"
                  className="input"
                  name="requirement"
                  checked={requirement === "yes"}
                  onChange={(id) => this.handleChange(id)}
                />
                Yes
              </div>

              <div className={`${requireClass}`}>
                <input
                  value="no"
                  type="radio"
                  id="requirement"
                  className="input"
                  name="requirement"
                  checked={requirement === "no"}
                  onChange={(id) => this.handleChange(id)}
                />
                No
              </div>
            </div>

            <div>
              <div className="input-label">Reward Per Response :</div>
              <input
                type="text"
                id="response"
                value={response}
                className={`${responseClass} input`}
                onChange={(id) => this.handleChange(id)}
              />
            </div>

            <div>
              <div className="input-label">Number Of Workers :</div>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                id="workerNumber"
                value={workerNumber}
                className={`${workerNumberClass} input`}
                onChange={(id) => this.handleChange(id)}
              />
            </div>

            <div>
              <div className={`${imageclass} form-file`}>
                <div>
                  <input
                    type="file"
                    id="uploadedImage"
                    name="uploadedImage"
                    className="form-file-input"
                    onChange={(id) => this.handleChange(id)}
                  />
                </div>

                <div className="form-preview">
                  {preview || "Please upload image"}

                  <br />

                  {previewImg ? <img src={previewImg} alt="img" /> : null}
                </div>
              </div>
            </div>

            <div>
              <div className={`${resultClass} result`}>{result}</div>
            </div>

            <div>
              <button
                type="submit"
                onClick={(key) => {
                  this.submitRequest(key);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Requester;
