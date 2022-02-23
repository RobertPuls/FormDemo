const PhotoTypes = ({
  photoTypes,
  handleSelectPhotoType,
}) => (
  <div className='dropDown'>
    <span>Photo type code: </span>
    <select id='photoType' name='photoType' onChange={handleSelectPhotoType}>
      {photoTypes.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
    </select>
  </div>
)

export default PhotoTypes;