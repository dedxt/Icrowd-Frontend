import { axiosInstance, errorHelper, generateSuccess } from './axiosInstance';

class API {

    getTasks() {
        return axiosInstance.get('tasks/getTasks').then((response) => {
            return generateSuccess(response.data.data.tasks);
        }).catch(error => errorHelper(error));
    }

    createTask(data) {
        return axiosInstance.post('tasks/createTask', data).then((response) => {
            return generateSuccess(response);
        }).catch(error => errorHelper(error));
    }

}

const instance = new API();
export default instance;