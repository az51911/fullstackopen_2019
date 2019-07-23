import React from 'react'
import Course from './components/Course'


const App = () => {

    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'extra addition',
                    exercises: 14,
                    id: 3
                }
            ]
        }
    ]

    const all_courses = () => courses.map(single_course => 
        <Course 
            key = {single_course.id} course={single_course} 
        />
    )

    return (
        <div>
            {all_courses()}
        </div>
    )



}

export default App 