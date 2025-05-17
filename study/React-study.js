// Basic
import React from 'react';
import Header from "./Header";

export default function App() {
    return (
        <Header />
    )
}

export default function Header() {
    return (
        <div className="main-grid">
            <h1>This is the Header</h1>
        </div>
    )
}


// React state overview
import React, { useState } from "react";  
// Object destructuring 
/* 
React is imported and then { useState } is imported. 
This allows you to write useState instead of React.useState 
in the rest of the App component's code
*/
import { TaskList } from "./components/TaskList";

export default function App() {
    const [tasks, setTasks] = useState([   // Array destructuring
        { id: 1, task: "Go shopping", done: true },
        { id: 2, task: "Wash dishes", done: false },
    ]);

    /* 
    array of objects
    it is a very convenient way to work with data in JavaScript
    */

    return (
        // Passing in state data as props from the parent component
        /* 
        TaskList component so that it accepts the props.tasks 
        and does something with the data that comes in
        */
        <TaskList task={tasks} />
    )
}


// Form elements in React
<form>
    <label>
        Number of guests:
        <input type="number" name="guests" />
    </label>
    <button type="Submit">Submit</button>
</form>