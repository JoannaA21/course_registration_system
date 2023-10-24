import React from 'react'

const Response = ({questions}) => {

    const user = JSON.parse(localStorage.getItem('loggedIn'));
    // const id;
    const id = 3;

    const myansweredquestions = questions.filter((data) => 
        data.studentid === id && data.isanswered === true
    )

    return (
        <>
        {myansweredquestions.length > 0 && (
                <div className="response-container">
                    <h2 className="FormTitle">Response</h2>
                    {myansweredquestions.map((question) => (
                    <div key={question.id} className="answered-question">
                        <p className="ContactFormLabel">Your Question: {question.query}</p>
                        <p className="ContactFormLabel">Admin Response: {question.response}</p>
                </div>
                ))}
      </div>
    )}
        </>
    )
}

export default Response
