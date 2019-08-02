import React from 'react'

const Notification = ({ message, messageId }) => {
    
    if (message === null) {
        return null
    }
    
    return (
        <div className={messageId}>
            {message}
        </div>
    )

}

export default Notification 