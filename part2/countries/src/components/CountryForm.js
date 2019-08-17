import React from "react";

const CountryForm = props => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name:{" "}
                <input value={props.input_name} onChange={props.input_name_onchange} />
                <div>
                    number:{" "}
                    <input
                        value={props.input_number}
                        onChange={props.input_number_onchange}
                    />
                </div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default CountryForm;
