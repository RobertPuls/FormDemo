import { useCallback, useEffect, useState } from 'react';
import { fetchPhotoTypes, fetchWorkFlowTypes } from './utils/fetcher';
import './App.css';
import PhotoTypes from './PhotoTypes';
import WorkFlowTypes from './WorkFlowTypes';
import WorkFlowForm from './WorkFlowForm';

const App = () => {
  const [photoTypes, setPhotoTypes] = useState([])
  const [selectedPhotoType, setSelectedPhotoType] = useState('');
  const [workFlowTypes, setWorkFlowTypes] = useState([]);
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
    setSelectedPhotoType(e.currentTarget.value);
  }, [])

  const handleSelectedWorkFlowType = useCallback((e) => {
    const newSelectedWorkFlowType = workFlowTypes.find((workflow) => workflow.id === e.currentTarget.value);
    setSelectedWorkFlowType(newSelectedWorkFlowType);
  }, [workFlowTypes])

  // Fetch need data when component mounts
  useEffect(() => {
    getPhotoTypes()
    getWorkFlowTypes()
  }, [getPhotoTypes, getWorkFlowTypes])

  return (
    <div className="App">
      <form>
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
        />
      </form>
    </div>
  );
}

export default App;
