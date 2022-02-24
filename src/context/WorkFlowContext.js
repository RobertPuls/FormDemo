import React, { useContext, useCallback, useState, useMemo } from 'react';
import { SCHEMA } from '../utils/const';
import { fetchPhotoTypes, fetchWorkFlowTypes, postWorkflow } from '../utils/fetcher';
import { checkIfObjectEmpty } from '../utils/helpers';

const WorkFlowContext = React.createContext();

export const useWorkFlowContext = () => useContext(WorkFlowContext);

export const WorkFlowProvider = ({children}) => {
  const [workFlowTypes, setWorkFlowTypes] = useState([]);
  const [photoTypes, setPhotoTypes] = useState([]);
  const [selectedPhotoType, setSelectedPhotoType] = useState({});
  const [selectedWorkFlowType, setSelectedWorkFlowType] = useState({});
  const [selectedInput, setSelectedInput] = useState({});

  const getWorkFlowTypes = useCallback(async () => {
    const res = await fetchWorkFlowTypes();
    setWorkFlowTypes(res.data);
  }, []);

  const updateSelectedWorkFlowType = useCallback((newWorkFlowTypes) => {
    const selectedWorkFlowType = workFlowTypes.find((workFlowType) => workFlowType.id === newWorkFlowTypes);
    setSelectedWorkFlowType(selectedWorkFlowType);
    setSelectedInput({});
  }, [workFlowTypes]);

  const getPhotoTypes = useCallback(async () => {
    const res = await fetchPhotoTypes();
    setPhotoTypes(res.data);
  }, []);

  const updateSelectedPhotoType = useCallback((newPhotoTypeId) => {
    const newSelectedPhotoType = photoTypes.find((photoType) => photoType.id === newPhotoTypeId);
    setSelectedPhotoType(newSelectedPhotoType);
  }, [photoTypes]);

  const updateSelectedInput = useCallback((newSelectedInput) => {
    setSelectedInput({
      ...selectedInput,
      ...newSelectedInput,
    })
  }, [selectedInput]);

  const submitNewWorkFlow = useCallback(async () => {
    const data = {
      photoType: selectedPhotoType.id,
      workflowType: selectedWorkFlowType.id,
      input: selectedInput
    }
    const res = await postWorkflow(data);
    console.log(res)
  }, [selectedPhotoType, selectedWorkFlowType, selectedInput]);

  const hasRequiredSelectedInputs = useMemo(() => {
    if (SCHEMA[selectedWorkFlowType.id] && SCHEMA[selectedWorkFlowType.id].length) {
      return SCHEMA[selectedWorkFlowType.id].every(({type}) => selectedInput[type]);
    }
    return false;
  }, [selectedWorkFlowType, selectedInput]);

  const isSubmitButtonDisabled = useMemo(() => (
    !hasRequiredSelectedInputs || checkIfObjectEmpty(selectedPhotoType) || checkIfObjectEmpty(selectedWorkFlowType)
  ), [hasRequiredSelectedInputs, selectedPhotoType, selectedWorkFlowType])
  
  return (
    <WorkFlowContext.Provider value={{
      workFlowTypes,
      getWorkFlowTypes,
      selectedWorkFlowType,
      updateSelectedWorkFlowType,
      photoTypes,
      getPhotoTypes,
      selectedPhotoType,
      updateSelectedPhotoType,
      selectedInput,
      updateSelectedInput,
      submitNewWorkFlow,
      isSubmitButtonDisabled,
    }}>
      {children}
    </WorkFlowContext.Provider>
  );
}