import React from "react";

const Filter = ({ input_string, change_function }) => {
    return (
        <form>
            <div>
                filter shown with{" "}
                <input value={input_string} onChange={change_function} />
            </div>
        </form>
    );
};

export default Filter;
