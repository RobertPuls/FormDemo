import { useCallback, useEffect, useMemo, useState } from 'react';
import { SCHEMA, SEGMENTATION_STRING, IDENTIFICATION_STRING, QUEUE_STRING, MODEL_STRING, TAGGING_STRING } from './utils/const';
import { fetchModels, fetchTags } from './utils/fetcher';

// TODO: use id instead
// TODO: use schema in json instead of enum
const WorkFlowForm = ({selectedWorkFlowId}) => {
  const [fields, setFields] = useState([]);
  const [options, setOptions] = useState({
    [QUEUE_STRING]: {
      [TAGGING_STRING]: []
    },
    [MODEL_STRING]: {
      [SEGMENTATION_STRING]: [],
      [IDENTIFICATION_STRING]: [],
    }
  });
  // const [models, setModels] = useState({
  //   [SEGMENTATION_STRING]: [],
  //   [IDENTIFICATION_STRING]: [],
  // });
  // TODO: put this all in one so that we only have to loop throught this once
  // const segmentationModels = useMemo(() => models.filter((model) => model.type === SEGMENTATION_STRING), [models]);
  // const identificationModels = useMemo(() => models.filter((model) => model.type === IDENTIFICATION_STRING), [models]);
  const getOptions = useCallback(async () => {
    const segmentationModels = await fetchModels(SEGMENTATION_STRING);
    const identificationModels = await fetchModels(IDENTIFICATION_STRING);
    const tags = await fetchTags();
    // modelsData.data.forEach((model) => {
    //   if (model.type === SEGMENTATION_STRING) {
    //     segmentationModels.push(model)
    //   } else if (model.type === identificationModels) {
    //     identificationModels.push(model)
    //   }
    // })
    console.log(tags.data)
    setOptions({
      [QUEUE_STRING]: {
        [TAGGING_STRING]: tags.data
      },
      [MODEL_STRING]: {
        [SEGMENTATION_STRING]: segmentationModels.data,
        [IDENTIFICATION_STRING]: identificationModels.data,
      }
    });
  }, [])

  useEffect(() => {
    setFields(SCHEMA[selectedWorkFlowId])
  }, [selectedWorkFlowId])

  // TODO: figure out why this rerenders and sets fields to undefined
  // useEffect(() => {
  //   console.log(fields)
  // })

  useEffect(() => {
    getOptions()
  }, [getOptions])

  return (
    <div>
      {
        fields ?
        fields.map(({type, endpoint}) => (
          <div key={type}>
            <span>{type}: </span>
            <select>
              {
                options[endpoint][type] && options[endpoint][type].length ? 
                options[endpoint][type].map((option) => (
                  <option key={option.id}>{option.name}</option>
                )) :
                null
              }
            </select>
          </div>
        )) :
        null
      }
    </div>
  )
};

export default WorkFlowForm;