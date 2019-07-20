import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = props => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
};

function check_if_zeros(props) {
    let all_zeros_flag = 0;
    props.parts.forEach(element => {
        if (element.value !== 0) {
            all_zeros_flag = 1;
        }
    });

    return all_zeros_flag;
}

const Statistic = props => {
    if (props.text === "positive") {
        return (
            <div>
                {props.text} {props.value} %
      </div>
        );
    } else {
        return (
            <div>
                {props.text} {props.value}
            </div>
        );
    }
};

const Total = props => {
    let all = 0;

    props.parts.forEach(myFunction);

    function myFunction(data, index) {
        all = all + data.value;
    }

    return all;
};

const AverageScore = props => {
    return props[0] - props[2];
};

const SentimentCount = props => {
    let sentiment = 0;
    sentiment = sentiment + props.value;
    return sentiment;
};

const Statistics = props => {
    let total_inputs = Total(props);
    let positive_sentiment = SentimentCount(props.parts[0]);
    let neutral_sentiment = SentimentCount(props.parts[1]);
    let negative_sentiment = SentimentCount(props.parts[2]);

    let average_score = AverageScore([
        positive_sentiment,
        neutral_sentiment,
        negative_sentiment
    ]);
    let sentiment_average;
    let calculated_average;

    if (total_inputs === 0) {
        sentiment_average = 0;
        calculated_average = 0;
    } else if (total_inputs !== 0) {
        sentiment_average = positive_sentiment / total_inputs;
        calculated_average = average_score / total_inputs;
    }

    //console.log(positive_sentiment.props.inputs.parts[1].value);

    //console.log(total_inputs);
    //console.log(average_score)
    //console.log(positive_sentiment)
    if (!check_if_zeros(props)) {
        return <div>No inputs given</div>;
    } else
        return (
            <div>
                <tr>
                    <td>
                        <Statistic text="good" value={props.parts[0].value} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Statistic text="neutral" value={props.parts[1].value} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Statistic text="bad" value={props.parts[2].value} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Statistic text={"all"} value={total_inputs} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Statistic text={"average"} value={calculated_average} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Statistic text={"positive"} value={sentiment_average} />
                    </td>
                </tr>
            </div>
        );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    let tallies = [
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
                <Button onClick={handleBadClick} text="bad" />
            </div>
            <h1>statistics</h1>
            <div>
                <Statistics parts={tallies} />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
