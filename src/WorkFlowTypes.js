import { useCallback, useEffect } from 'react';
import { useWorkFlowContext } from './context/WorkFlowContext';

// TODO: make this and photoTypes on reuseable file

const WorkFlowTypes = () => {
  const {workFlowTypes = [], updateSelectedWorkFlowType, selectedWorkFlowType ={}} = useWorkFlowContext();

  const handleSelectedWorkFlowType = useCallback((e) => updateSelectedWorkFlowType(e.currentTarget.value), [updateSelectedWorkFlowType]);

  return (
    <div className='dropDown'>
      <span>Workflow Type: </span>
      <select id='WorkFlowType' name='WorkFlowType' onChange={handleSelectedWorkFlowType} value={selectedWorkFlowType.id || 0}>
      <option value="0" disabled>Choose here</option>
        {workFlowTypes.map(({name, id}) => (
          <option
            key={id}
            value={id}
          >
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WorkFlowTypes;