const WorkFlowTypes = ({
  workFlowsTypes,
  handleSelectedWorkFlowType
}) => {
  return (
    <div className='dropDown'>
      <span>Workflow type: </span>
      <select id='WorkFlowType' name='WorkFlowType' onChange={handleSelectedWorkFlowType}>
        {workFlowsTypes.map(({name, id}) => (
          <option
            key={id}
            value={id}
          >
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default WorkFlowTypes;