const BASE_URL = 'https://market-x-api-u6y235qmoq-uc.a.run.app/api/';

export const WORKFLOWS_URL = `${BASE_URL}workflows`;

export const PHOTO_TYPES_URL = `${BASE_URL}photo_types`;

export const WORKFLOWS_TYPES_URL = `${BASE_URL}workflow_types`;

export const MODELS_URL = `${BASE_URL}models`;

export const TAGGING_URL = `${BASE_URL}tagging_queues`;

export const SEGMENTATION_STRING = 'segmentationModelId';

export const IDENTIFICATION_STRING = 'identificationModelId';

export const TAGGING_STRING = 'taggingSystemQueueId';

export const QUEUE_STRING = 'queue'

export const MODEL_STRING = 'model'

// TODO: rename to something better
const SEGMENTATION_TYPE = {
  type: SEGMENTATION_STRING,
  endpoint: MODEL_STRING,
  name: 'segmentation'
}

const IDENTIFICATION_TYPE = {
  type: IDENTIFICATION_STRING,
  endpoint: MODEL_STRING,
  name: 'identification'
}

const TAGGING_TYPE = {
  type: TAGGING_STRING,
  endpoint: QUEUE_STRING,
  name: 'tagging system'
}

export const SCHEMA = {
  '621526f825b54113d85c85cd': [SEGMENTATION_TYPE, IDENTIFICATION_TYPE, TAGGING_TYPE],
  '621526f825b54113d85c85c2': [TAGGING_TYPE],
  '621526f825b54113d85c85b8': [SEGMENTATION_TYPE, IDENTIFICATION_TYPE]
};
