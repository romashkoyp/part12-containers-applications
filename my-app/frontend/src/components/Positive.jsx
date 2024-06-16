/* eslint-disable react/prop-types */
const Positive = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='success'>
        {message}
      </div>
    )
  }

  export default Positive