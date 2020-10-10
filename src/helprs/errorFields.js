const validateErrorForm = (state) => {
  let error;
  let result;

  if (state.taskType.length < 1
    && state.title.length < 1
    && state.description.length < 1
    && state.expiration.length < 1
    && state.requirement.length < 1
    && state.response.length < 1
    && state.workerNumber.length < 1
    && state.uploadedImage.length < 1) {
    error = 'error';
    result = 'Empty form';
    const resultClass = 'form-result';
    const taskClass = 'form-task';
    const requireClass = 'form-requirement';
    const choiceTaskClass = 'form-choiceTask';
    const decisionTaskClass = 'form-decisionTask';
    const sentenceTaskClass = 'form-sentenceTask';
    const titleClass = 'form-title';
    const descriptionClass = 'form-description';
    const expirationClass = 'form-expiration';
    const responseClass = 'form-response';
    const workerNumberClass = 'form-workerNumber';
    const imageclass = 'form-file-error';
    return {
      error,
      result,
      taskClass,
      resultClass,
      titleClass,
      requireClass,
      descriptionClass,
      expirationClass,
      responseClass,
      workerNumberClass,
      choiceTaskClass,
      decisionTaskClass,
      sentenceTaskClass,
      imageclass
    };
  }

  if (state.taskType.length < 1) {
    error = 'error';
    result = 'Task type is required';
    const resultClass = 'form-result';
    const taskClass = 'form-task';
    return { error, result, resultClass, taskClass };
  }

  if (state.title.length < 1) {
    error = 'error';
    result = 'Title is required';
    const resultClass = 'form-result';
    const titleClass = 'form-title';
    return { error, result, resultClass, titleClass };
  }

  if (state.title.length < 3) {
    error = 'error';
    result = 'Real title is required';
    const resultClass = 'form-result';
    const titleClass = 'form-title';
    return { error, result, resultClass, titleClass };
  }

  if (state.title.length > 15) {
    error = 'error';
    result = 'Real title should have less 15 characters';
    const resultClass = 'form-result';
    const titleClass = 'form-title';
    return { error, result, resultClass, titleClass };
  }

  if (state.description.length < 1) {
    error = 'error';
    result = 'Description is required';
    const resultClass = 'form-result';
    const descriptionClass = 'form-description';
    return { error, result, resultClass, descriptionClass };
  }

  if (state.description.length < 10) {
    error = 'error';
    result = 'Real description is required';
    const resultClass = 'form-result';
    const descriptionClass = 'form-description';
    return { error, result, resultClass, descriptionClass };
  }

  if (state.expiration.length < 1) {
    error = 'error';
    result = 'Expiration is required';
    const resultClass = 'form-result';
    const expirationClass = 'form-expiration';
    return { error, result, resultClass, expirationClass };
  }

  if (new Date(state.expiration) < new Date()) {
    error = 'error';
    result = 'Invalid expiration date';
    const resultClass = 'form-result';
    const expirationClass = 'form-expiration';
    return { error, result, resultClass, expirationClass };
  }

  if (state.requirement.length < 1) {
    error = 'error';
    result = 'Requirement is required';
    const resultClass = 'form-result';
    const requireClass = 'form-requirement';
    return { error, result, resultClass, requireClass };
  }

  if (state.response.length < 1) {
    error = 'error';
    result = 'Response is required';
    const resultClass = 'form-result';
    const responseClass = 'form-response';
    return { error, result, resultClass, responseClass };
  }

  if (state.response.length < 3) {
    error = 'error';
    result = 'Real response is required';
    const resultClass = 'form-result';
    const responseClass = 'form-response';
    return { error, result, resultClass, responseClass };
  }

  if (state.workerNumber.length < 1) {
    error = 'error';
    result = 'Worker number is required and should be number';
    const resultClass = 'form-result';
    const workerNumberClass = 'form-workerNumber';
    return { error, result, resultClass, workerNumberClass };
  }

  if (state.uploadedImage.length < 1) {
    error = 'error';
    result = 'image is required';
    const resultClass = 'form-result';
    const imageclass = 'form-file-error';
    return { error, result, resultClass, imageclass };
  }

  if (state.uploadedImage.name) {
    if (state.uploadedImage.name.length < 4) {
      error = 'error';
      result = 'image is required';
      const resultClass = 'form-result';
      const imageclass = 'form-file-error';
      return { error, result, resultClass, imageclass };
    }

    const getDocName = state.uploadedImage.name;
    const docLength = getDocName.length;
    const point = getDocName.lastIndexOf('.');
    const getExtensionFile = getDocName.substring(point, docLength);
    const lowCaseExtensionFile = getExtensionFile.toLowerCase();

    if (lowCaseExtensionFile !== '.jpg' && lowCaseExtensionFile !== '.png') {
      error = 'error';
      result = 'image format must be jpg or png';
      const resultClass = 'form-result';
      const imageclass = 'form-file-error';
      return { error, result, resultClass, imageclass };
    }
  }

  error = 'Loading ● ● ●';
  return { error };
};

const validateFilter = (state) => {
  let error;
  let result;

  if (state.filter.length < 1) {
    error = 'error';
    result = 'Please filter is empty';
    const filterClass = 'filter-task';
    const buttonClass = 'filter-button';
    const resultClass = 'result-error';
    return { error, result, resultClass, filterClass, buttonClass };
  }

  error = 'Loading ● ● ●';
  return { error };
};

const shortData = (data) => {
  const length = 15;
  const trimmedData = data.substring(0, length);
  return trimmedData;
};

export { shortData, validateFilter, validateErrorForm };
