import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = props => {
    const [selected, setSelected] = useState(0);
    const [vote_value, setVote] = useState(0);

    const nextanecdote = () => {
        let selected_val = Math.floor(Math.random() * 6);
        setSelected(selected_val);
    };

    const handlevotes = () => {
        console.log(selected);
        vote_array[selected] = vote_array[selected] + 1;
        setVote(vote_array[selected]);
    };

    const Currentvotenumber = () => {
        return <div>has {vote_array[selected]} votes</div>;
    };

    return (
        <div>
            {props.anecdotes[selected]}
            <Currentvotenumber current_line={vote_value} />
            <div>
                <Button onClick={handlevotes} text="vote" />
                <Button onClick={nextanecdote} text="next anecdote" />
            </div>
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
