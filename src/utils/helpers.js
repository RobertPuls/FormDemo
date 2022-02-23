// import Ajv from 'ajv';

// const SCHEMA = {
//   properties: {
//     type: {type: 'string'},
//     properties: {
//       type: 'object',
//       properties: {
//         taggingSystemQueueId: {type}
//       }
//     }
//   }
// }

// ,


const thing = {
  "type":"object",
  "properties":{
    "segmentationModelId": {
      "description":"The unique identifier for the segmentation model",
      "type":"string"
    },
    "identificationModelId":{
      "description":"The unique identifier for the identification model",
      "type":"string"
    },
    "taggingSystemQueueId":{
      "description":"The unique identifier for the tagging system queue",
      "type":"string"
    }
  },
  "required":[
  "segmentationModelId",
  "identificationModelId",
  "taggingSystemQueueId"
]
}

// const thing = {
//   "type": "object",
//   "properties": {
//     "taggingSystemQueueId": {
//       "description": "The unique identifier for the tagging system queue",
//       "type": "string"  
//       }
//     },
//   "required": ["taggingSystemQueueId"]  
// }