import React from 'react'

function Dashboard(props) {

    console.log('Data passed form Login to Dashboard', props.location.matchedUserData)
    var userName = props.location.matchedUserData.fName;
    return (
        <>
            <h1>Welcome to dashboard {userName}</h1>
        </>
    )
}

export default Dashboard
