import React from "react";

const Filter = ({ input_string, change_function }) => {
    return (
        <form>
            <div>
                find countries <input value={input_string} onChange={change_function} />
            </div>
        </form>
    );
};

export default Filter;
