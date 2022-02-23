import { useCallback, useEffect, useState } from 'react';
import { fetchPhotoTypes, fetchWorkFlowTypes, postWorkflow } from './utils/fetcher';
import './App.css';
import PhotoTypes from './PhotoTypes';
import WorkFlowTypes from './WorkFlowTypes';
import WorkFlowForm from './WorkFlowForm';

// {
//   "photoType": "string",
//   "workflowType": "string",
//   "input": {
//     "taggingSystemQueueId": "string"
//   }
// }

// TODO: add default placeholder for dropdowns

const App = () => {
  const [photoTypes, setPhotoTypes] = useState([])
  const [selectedPhotoType, setSelectedPhotoType] = useState({});
  const [workFlowTypes, setWorkFlowTypes] = useState([]);
  const [selectedInput, setSelectedInput] = useState({});
  
  // TODO: change this
  const [selectedWorkFlowType, setSelectedWorkFlowType] = useState({});

  const getPhotoTypes = useCallback(async () => {
    const res = await fetchPhotoTypes();
    setPhotoTypes(res.data);
  }, [])

  const getWorkFlowTypes = useCallback(async () => {
    const res = await fetchWorkFlowTypes();
    setWorkFlowTypes(res.data);
  }, [])

  const handleSelectPhotoType = useCallback((e) => {
    const newSelectedPhotoType = photoTypes.find((photoType) => photoType.id === e.currentTarget.value);
    setSelectedPhotoType(newSelectedPhotoType);
  }, [photoTypes])

  const handleSelectedWorkFlowType = useCallback((e) => {
    const newSelectedWorkFlowType = workFlowTypes.find((workflow) => workflow.id === e.currentTarget.value);
    setSelectedWorkFlowType(newSelectedWorkFlowType);
    // TODO: maybe move this to a useEffect
    setSelectedInput({});
  }, [workFlowTypes]);

  const handleInputChange = useCallback((type) => (e) => {
    setSelectedInput({
      ...selectedInput,
      [type]: e.currentTarget.value,
    })
  }, [selectedInput])

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault()
    const data = {
      photoType: selectedPhotoType.id,
      workflowType: selectedWorkFlowType.id,
      input: selectedInput
    }
    const res = await postWorkflow(data);
    console.log(res)
  }, [selectedPhotoType, selectedWorkFlowType, selectedInput])

  // Fetch need data when component mounts
  useEffect(() => {
    getPhotoTypes()
    getWorkFlowTypes()
  }, [getPhotoTypes, getWorkFlowTypes])

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <div className='dropdownContainer'>
          <PhotoTypes
            photoTypes={photoTypes}
            handleSelectPhotoType={handleSelectPhotoType}
          />
          <WorkFlowTypes
            workFlowsTypes={workFlowTypes}
            handleSelectedWorkFlowType={handleSelectedWorkFlowType}
          />
        </div>
        <WorkFlowForm
          selectedWorkFlowId={selectedWorkFlowType.id}
          handleInputChange={handleInputChange}
        />
        <button>thing</button>
      </form>
    </div>
  );
}

export default App;
