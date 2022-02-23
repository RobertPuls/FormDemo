import { useCallback, useEffect, useState } from 'react';
import { SCHEMA, SEGMENTATION_STRING, IDENTIFICATION_STRING, QUEUE_STRING, MODEL_STRING, TAGGING_STRING } from './utils/const';
import { fetchModels, fetchTags } from './utils/fetcher';

// TODO: use id instead
// TODO: use schema in json instead of enum
const WorkFlowForm = ({selectedWorkFlowId, handleInputChange}) => {
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
    // TODO put segmentation string in const
    const segmentationModels = await fetchModels('segmentation');
    const identificationModels = await fetchModels('identification');
    const tags = await fetchTags();
    // modelsData.data.forEach((model) => {
    //   if (model.type === SEGMENTATION_STRING) {
    //     segmentationModels.push(model)
    //   } else if (model.type === identificationModels) {
    //     identificationModels.push(model)
    //   }
    // })
    console.log(segmentationModels.data)
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
        fields.map(({type, endpoint, name}) => (
          <div key={type}>
            <span>{name}: </span>
            <select onChange={handleInputChange(type)}>
              {
                options[endpoint][type] && options[endpoint][type].length ? 
                options[endpoint][type].map((option) => {
                  return <option key={option.id} value={option.id}>{option.name}</option>
                }) :
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