// TODO: Rename file
import { WORKFLOWS_URL, PHOTO_TYPES_URL, WORKFLOWS_TYPES_URL, MODELS_URL, TAGGING_URL } from './const';

const baseFetch = async (url, query = '') => {
  try {
    const res = await fetch(url + query, {});
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

// TODO: merge with functino above
const basePost = async (url, data = {}) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export const fetchWorkFlows = async () => baseFetch(WORKFLOWS_URL);

export const fetchPhotoTypes = async () => baseFetch(PHOTO_TYPES_URL);

export const fetchWorkFlowTypes = async () => baseFetch(WORKFLOWS_TYPES_URL);

// export const fetchModels = async (search) => baseFetch(MODELS_URL, search ? `?search=${search}` : undefined);

export const fetchModels = async (query) => baseFetch(MODELS_URL, query);

export const fetchTags = async (query) => baseFetch(TAGGING_URL, query);

export const postWorkflow = async (data) => basePost(WORKFLOWS_URL, data)
