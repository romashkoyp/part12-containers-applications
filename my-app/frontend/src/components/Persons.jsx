/* eslint-disable react/prop-types */
const Persons = ({ dataToShow, deleteRecord }) => {
    return (
        <div>
            {dataToShow.map((person, index) => (
                <div key={index}>{person.name} - {person.number}
                <button onClick={() => deleteRecord(person.id, person)}>delete</button></div>
            ))}
            
        </div>
    )
}

export default Persons