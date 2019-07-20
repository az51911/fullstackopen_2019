import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = props => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
};

const Part = props => {
    return (
        <div>
            {props.part} {props.values}
        </div>
    );
};

const Content = props => {
    return (
        <div>
            <Part part={props.parts[0].name} values={props.parts[0].value} />
            <Part part={props.parts[1].name} values={props.parts[1].value} />
            <Part part={props.parts[2].name} values={props.parts[2].value} />
        </div>
    );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    let parts = [
        {
            name: "good",
            value: good
        },
        {
            name: "neutral",
            value: neutral
        },
        {
            name: "bad",
            value: bad
        }
    ];

    const title = "give feedback";

    const handleGoodClick = () => {
        setGood(good + 1);
    };

    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    };

    const handleBadClick = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <Header title={title} />
            <div>
                <Button onClick={handleGoodClick} text="good" />
                <Button onClick={handleNeutralClick} text="neutral" />
                <Button onClick={handleBadClick} text="good" />
            </div>
            <h1>statistics</h1>
            <div>
                <Content parts={parts} />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
