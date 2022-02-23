import { WORKFLOWS_URL, PHOTO_TYPES_URL, WORKFLOWS_TYPES_URL, MODELS_URL, TAGGING_URL } from './const';

const baseFetch = async (url, query = '') => {
  try {
    const data = await fetch(url + query);
    const json = await data.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export const fetchWorkFlows = async () => baseFetch(WORKFLOWS_URL);

export const fetchPhotoTypes = async () => baseFetch(PHOTO_TYPES_URL);

export const fetchWorkFlowTypes = async () => baseFetch(WORKFLOWS_TYPES_URL);

export const fetchModels = async (search) => baseFetch(MODELS_URL, search ? `?search=${search}` : undefined);

export const fetchTags = async () => baseFetch(TAGGING_URL);
