import { useCallback, useEffect, useState } from 'react';
import { SCHEMA, SEGMENTATION_STRING, IDENTIFICATION_STRING, QUEUE_STRING, MODEL_STRING, TAGGING_STRING } from './utils/const';
import { fetchModels, fetchTags } from './utils/fetcher';
import { useWorkFlowContext } from './context/WorkFlowContext';
import { buildModelQuery } from './utils/queryBuilder';

const WorkFlowForm = ({selectedWorkFlowId, handleInputChange}) => {
  const {selectedInput = {}, isSubmitButtonDisabled} = useWorkFlowContext();
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

  const getOptions = useCallback(async () => {
    const tags = [];
    let hasMoreTagPages = true;
    let tagPageNum = 1;
    while (hasMoreTagPages) {
      const tagsData = await fetchTags(buildModelQuery({pageNumber: tagPageNum}));
      tags.push(...tagsData.data);
      hasMoreTagPages = tagsData.paging.hasMore;
      tagPageNum++
    };

    const models = []
    let hasMoreModelPages = true;
    let modelPageNum = 1;
    while (hasMoreModelPages) {
      const modelsData = await fetchModels(buildModelQuery({pageNumber: modelPageNum}));
      models.push(...modelsData.data);
      hasMoreModelPages = modelsData.paging.hasMore;
      modelPageNum++
    };

    const segmentationModels = []
    const identificationModels = [];
    models.forEach((model) => {
      if (model.type === 'segmentation') {
        segmentationModels.push(model)
      } else if (model.type === 'identification') {
        identificationModels.push(model)
      }
    })
    
    setOptions({
      [QUEUE_STRING]: {
        [TAGGING_STRING]: tags
      },
      [MODEL_STRING]: {
        [SEGMENTATION_STRING]: segmentationModels,
        [IDENTIFICATION_STRING]: identificationModels,
      }
    });
  }, [])

  useEffect(() => {
    setFields(SCHEMA[selectedWorkFlowId])
  }, [selectedWorkFlowId])

  useEffect(() => {
    getOptions();
  }, [getOptions])

  return (
    <div className='workflowForm'>
      <div className='workflowFieldsContainer'>
        {
          fields ?
          fields.map(({type, endpoint, name}) => (
            <div className='workflowField' key={type}>
                <span className='workflowFormSpan'>{name}: </span>
                <select className='workflowFormSelect' onChange={handleInputChange(type)} value={selectedInput[type] || 0}>
                <option value="0" disabled>Choose here</option>
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
      <div className='submitButtonContainer'>
        <button className='submitButton' disabled={isSubmitButtonDisabled}>Submit</button>
      </div>
    </div>
  )
};

export default WorkFlowForm;