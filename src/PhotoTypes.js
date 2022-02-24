import { useCallback } from 'react';
import { useWorkFlowContext } from './context/WorkFlowContext';

const PhotoTypes = () => {
  const {photoTypes, updateSelectedPhotoType, selectedPhotoType = {}} = useWorkFlowContext();

  const handleSelectPhotoType = useCallback((e) => updateSelectedPhotoType(e.currentTarget.value), [updateSelectedPhotoType]);

  return (
    <div className='dropDown'>
      <span>Photo Type Code: </span>
      <select id='photoType' name='photoType' onChange={handleSelectPhotoType} value={selectedPhotoType.id || 0}>
        <option value="0" disabled>Choose here</option>
        {photoTypes.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
      </select>
    </div>
  )
}

export default PhotoTypes;