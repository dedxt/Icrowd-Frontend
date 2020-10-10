import axios from 'axios';
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Image from '../Image/Image';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import close from '../../assets/image/close.png';
import { validateFilter, backendURLs, shortData } from '../../helprs/index';
import { API } from '../../helpers';


class Worker extends Component {
  constructor() {
    super();
    this.state = {
      tasks: undefined,
      loadedSingleTask: false,
      data: null,
      singleData: null,
      result: '',
      filter: '',
      filterClass: '',
      buttonClass: '',
      taskViewer: false,
      requestData: '',
      viewedData: false
    };
  }

  async getTasks() {
    const response = await API.getTasks();
    if (response.success) {
      this.setState({ tasks: response.data });
      console.log(response.data);
    }
  }

  componentDidMount() {
    this.getTasks();
  }

  filter(key) {
    key.preventDefault();
    const { resultClass, filterClass, buttonClass, error, result } = validateFilter(this.state);

    if (error === 'error') {
      this.setState({ result, resultClass, filterClass, buttonClass });
      return;
    }

    this.setState({ result: 'Filtering ● ● ●' });

    axios.post(`${backendURLs.BACKEND_URL}/filter-tasks`, { filter: this.state.filter })
      .then((response) => {
        this.setState({ result: response.data.message, loadedData: true, data: response.data.data });
        toast.info(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        this.setState({ result: error.response.data.error || error.response.data.data });
        toast.error(`${error.response.data.error || error.response.data.data}`);
        console.log(error.response);
      });
  }

  viewTask(key, id) {
    key.preventDefault();
    axios.get(`${backendURLs.BACKEND_URL}/fetch-task/${id}`)
      .then((response) => {
        this.setState({ result: response.data.message, loadedSingleTask: true, singleData: response.data.data, taskViewer: true });
      })
      .catch((error) => {
        this.setState({ result: error.response.data.error || error.response.data.data });
        toast.error(`${error.response.data.error || error.response.data.data}`);
        console.log(error.response);
      });
  }

  closeTaskViewer(key) {
    key.preventDefault();
    this.setState({ taskViewer: false });
  }

  deleteTask(key, id) {
    key.preventDefault();
    axios.delete(`${backendURLs.BACKEND_URL}/delete-task/${id}`)
      .then((response) => {
        toast.info(response.data.message);
      })
      .catch((error) => {
        this.setState({ result: error.response.data.error || error.response.data.data });
        toast.error(`${error.response.data.error || error.response.data.data}`);
        console.log(error.response);
      });

    setTimeout(() => {
      window.location.reload(1);
    }, 4500);
  }

  handleChange(key) {
    this.setState({
      result: '',
      resultClass: '',
      filterClass: '',
      buttonClass: '',
      [key.target.id]: key.target.value
    });
  }

  render() {
    return (

      <div>

        <Helmet>
          <style>{'body { background-color: rgb(231, 230, 230); }'}</style>
        </Helmet>

        <ToastContainer />

        <NavBar />

        <Image />

        <div className="worker-task">

          <h2>Worker Tasks</h2>

          <div className="task-filter">

            <button type="submit" className={this.state.buttonClass} onClick={(key) => { this.filter(key); }}>filter</button>
            <input
              id="filter"
              type="date"
              value={this.state.filter}
              className={this.state.filterClass}
              onChange={(id) => this.handleChange(id)}
            />

            <br />
            <br />

            <div className={`${this.state.resultClass} result`}>{this.state.result}</div>

          </div>

          {
            this.state.tasks !==undefined
              ? (
                <div>
                  <div className="task-contents">

                    <div className="box">
                      {
                        this.state.tasks.map((request) => (
                          <div className="box-option" key={request._id}>

                            <img alt="pic" src={request.uploadedImage} className="image" />

                            <div className="task-description">
                              <h6>Title: {request.title} </h6>
                              <div>Expiry date: {request.expiration}</div>
                              <div>Description: {shortData(request.description)} ...</div>

                            </div>

                            <div className="task-action">

                              <button type="submit" className="view-task" onClick={(key) => { this.viewTask(key, request._id); }}>View</button>

                              <button type="submit" className="delete-task" onClick={(key) => { this.deleteTask(key, request._id); }}>Delete</button>
                            </div>

                          </div>
                        ))
                      }

                    </div>

                    {this.state.taskViewer === true
                      && this.state.loadedSingleTask === true
                      ? (
                        <div className="task-viewer">

                          <img alt="pic" src={close} className="close-icon" onClick={(key) => { this.closeTaskViewer(key); }} />

                          <div className="box-option">

                            <img alt="pic" src={this.state.singleData.uploadedImage} className="image" />

                            <div className="task-description">
                              <h6>Title: {this.state.singleData.title}</h6>
                              <div>Requirement: {this.state.singleData.requirement}</div>
                              <div>Worker Numbers: {this.state.singleData.workerNumber}</div>
                              <div>Expiry Date: {this.state.singleData.expiration}</div>
                              <div>Task Type: {this.state.singleData.taskType}</div>
                              <div>Response: {this.state.singleData.response}</div>

                              <div className="viewed-decription">
                                <div>Description : </div>

                                {this.state.singleData.description}
                              </div>

                              <div>Created At: {this.state.singleData.createdAt}</div>
                              <div>Update At: {this.state.singleData.updatedAt}</div>

                            </div>

                            <div className="task-action">
                              <button type="submit" className="delete-task" onClick={(key) => { this.deleteTask(key, this.state.singleData._id); }}>Delete</button>
                            </div>

                          </div>

                        </div>
                      )

                      : null}

                  </div>

                  <div className="dashbord-pagination">

                    <FontAwesomeIcon icon={faAngleLeft} className="pagination-angles" style={{ color: '#6d6868' }} />
                    <span className="pagination-page">01</span>
                    <FontAwesomeIcon icon={faAngleRight} className="pagination-angles" style={{ color: '#6d6868' }} />

                  </div>
                </div>
              )

              : null
          }
        </div>

        <Footer />

      </div>

    );
  }
}

export default Worker;
