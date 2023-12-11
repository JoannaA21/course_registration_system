import { useRef } from 'react'

export const ContactForm = ({ role, handleSubmit, handleChange, handleResponse,newquestion, questions,handleSubmitRes}) => {
    const inputRef = useRef();
    const user = JSON.parse(localStorage.getItem('loggedIn'));

    //{if (user.role == "student"){
    {if (role ==="student"){
        return (
            <div className="containerForContact">
                <form className="ContactFormStudent" onSubmit={(e) => handleSubmit(e,`${user.detail.fname} ${user.detail.lname}`, user.detail.email)}>
                    <h2 className="FormTitle">Ask a Question</h2>
                    <div className="form-content">
                        <div className="form-row">
                            <label htmlFor="name" className="ContactFormLabel">Name</label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.detail.fname +" "+user.detail.lname}
                            placeholder="Full Name"
                            disabled
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="email" className="ContactFormLabel">Email</label>
                            <input
                            type="email"
                            name="email"
                            id="email"
                            value={user.detail.email}
                            disabled
                            placeholder="Email Address"
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="query" className="ContactFormLabel">Your Question</label>
                            <textarea
                            id="query"
                            name="query"
                            cols="50"
                            rows="6"
                            placeholder="Your Question"
                            value={newquestion.query}
                            onChange={handleChange}
                            autoFocus
                            ref={inputRef}
                            ></textarea>
                        </div>
                        <div className="form-row">
                            <button type="submit" className="SubmitButton" onClick={() => inputRef.current.focus()}>Submit</button>
                         </div>
                    </div>
                </form>
      </div>
    );
    }else if(user.role === "admin"){
    // }else if(role === "admin"){
    const unansweredQuestions = questions.filter((q) => !q.isanswered);

    return (
        <div className="containerForAdmin">
    {unansweredQuestions.length ? (
      unansweredQuestions.map((q) => (
        <div key={q.id} className="displayAdminContainer">
          <div className="displayAdminHeader">
            <h2 className="displayAdminTitle">Student Details</h2>
          </div>
          <div className="displayAdminDetails">
            <p>
              <span className="displayAdminLabel">Student Name: </span>
              {q.name}
            </p>
            <p>
              <span className="displayAdminLabel">Student Email: </span>
              {q.email}
            </p>
            <p>
              <span className="displayAdminLabel">Student Question: </span>
              {q.query}
            </p>
          </div>
          <form className="displayAdminForm" onSubmit={(e) => handleSubmitRes(q.id)}>
            <div className="form-row">
              <label htmlFor={`adminAnswer-${q.id}`} className="displayAdminLabel">
                Admin Response
              </label>
              <textarea
                id={`adminAnswer-${q.id}`}
                name="response"
                cols="40"
                rows="6"
                placeholder="Response"
                value={newquestion[q.id]?newquestion[q.id].response:""}
                onChange={(e) => handleResponse(e, q.id)}
                autoFocus
                ref={inputRef}
              ></textarea>
            </div>
            <div className="form-row">
              <button type="submit" className="displayAdminButton" onClick={() => inputRef.current.focus()}>
                Respond
              </button>
            </div>
          </form>
        </div>
      ))
    ) : (
        <div className='noQuestionFromStudent-container'>
        <p className='noQuestionFromStudent'>All Questions have been answered</p>
      </div>
    )}
  </div>
    )
    }
    }
   
}


export default ContactForm;