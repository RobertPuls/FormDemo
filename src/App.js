import { useCallback, useEffect } from 'react';
import './App.css';
import PhotoTypes from './PhotoTypes';
import WorkFlowTypes from './WorkFlowTypes';
import WorkFlowForm from './WorkFlowForm';
import { useWorkFlowContext } from './context/WorkFlowContext';

const App = () => {
  const {
    getWorkFlowTypes,
    getPhotoTypes,
    submitNewWorkFlow,
    updateSelectedInput,
    selectedWorkFlowType,
  } = useWorkFlowContext();

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    submitNewWorkFlow();
  }, [submitNewWorkFlow])

  const handleInputChange = useCallback((type) => (e) => {
    updateSelectedInput({[type]: e.currentTarget.value})
  }, [updateSelectedInput])

  // Fetch need data when component mounts
  useEffect(() => {
    getWorkFlowTypes();
    getPhotoTypes();
  }, [getPhotoTypes, getWorkFlowTypes])

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <div className='dropdownContainer'>
          <PhotoTypes />
          <WorkFlowTypes />
        </div>
        <WorkFlowForm
          selectedWorkFlowId={selectedWorkFlowType.id}
          handleInputChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default App;
