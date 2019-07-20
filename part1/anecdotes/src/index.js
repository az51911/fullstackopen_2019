import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Currentvoteleader = ({ current_line }) => {
    let current_leader_data = 0;
    let current_leader_index = 0;

    current_line.forEach(myFunction);
    function myFunction(data, index) {
        if (current_leader_data < data) {
            current_leader_data = data;
            current_leader_index = index;
        }
    }

    return (
        <div>
            <h1>Anecdote with the most votes</h1>
            <div>{anecdotes[current_leader_index]}</div>
            has {current_leader_data} votes
    </div>
    );
};

const App = props => {
    const [selected, setSelected] = useState(0);
    const [vote_value, setVote] = useState(0);

    const nextanecdote = () => {
        let selected_val = Math.floor(Math.random() * 6);
        setSelected(selected_val);
    };

    const handlevotes = () => {
        vote_array[selected] = vote_array[selected] + 1;
        setVote(vote_array[selected]);
    };

    const Currentvotenumber = () => {
        return <div>has {vote_array[selected]} votes</div>;
    };

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <Currentvotenumber current_line={vote_value} />
            <div>
                <Button onClick={handlevotes} text="vote" />
                <Button onClick={nextanecdote} text="next anecdote" />
            </div>
            <Currentvoteleader current_line={vote_array} />
        </div>
    );
};

const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];
let vote_array = new Uint32Array(anecdotes.length);
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
