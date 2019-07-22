import React from 'react'

const Total = ({parts}) => {

    let exercises_array = new Array(parts.length)

    parts.forEach((element,index) => {
        exercises_array[index] = element.exercises
    });

    let sum = exercises_array.reduce(summing_function)

    function summing_function(accumulator, currentValue) {
        return accumulator + currentValue
    }

    return (
        <div>
            <strong>
            total of {sum} exercises 
            </strong>
        </div>
    )
}

export default Total