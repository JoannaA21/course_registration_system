export const ContactForm = ({ role, handleSubmit, handleChange, handleResponse,newquestion, questions,handleSubmitRes}) => {

    const user = JSON.parse(localStorage.getItem('loggedIn'));

    //{if (user.role == "student"){
    {if (role == "student"){
        return (
            <div className="containerForContact">
                <form className="ContactFormStudent" onSubmit={handleSubmit}>
                    <h2 className="FormTitle">Ask a Question</h2>
                    <div className="form-content">
                        <div className="form-row">
                            <label htmlFor="name" className="ContactFormLabel">Name</label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={newquestion.name}
                            placeholder="Full Name"
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="email" className="ContactFormLabel">Email</label>
                            <input
                            type="email"
                            name="email"
                            id="email"
                            value={newquestion.email}
                            onChange={handleChange}
                            required
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
                            ></textarea>
                        </div>
                        <div className="form-row">
                            <button type="submit" className="SubmitButton">Submit</button>
                         </div>
                    </div>
                </form>
      </div>
    );
    }else if(user.role == "admin"){
    // }else if(role == "admin"){
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
              <label htmlFor="adminAnswer" className="displayAdminLabel">
                Admin Response
              </label>
              <textarea
                id="adminAnswer"
                name="response"
                cols="50"
                rows="6"
                placeholder="Response"
                value={newquestion.response}
                onChange={handleResponse}
              ></textarea>
            </div>
            <div className="form-row">
              <button type="submit" className="displayAdminButton">
                Respond
              </button>
            </div>
          </form>
        </div>
      ))
    ) : (
      <p>All Questions have been answered</p>
    )}
  </div>
    )
    }
    }
   
}


export default ContactForm;