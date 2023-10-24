export const ContactForm = ({ role, handleSubmit, handleChange, handleResponse,newquestion, questions,handleSubmitRes}) => {

    const user = JSON.parse(localStorage.getItem('loggedIn'));
    const id = 3;

    //{if (user.role == "student"){
    {if (role == "student"){
        return (
            <div class="containerForContact">
                <form class="ContactFormStudent" onSubmit={handleSubmit}>
                    <h2 class="FormTitle">Ask a Question</h2>
                    <div class="form-content">
                        <div class="form-row">
                            <label for="name" class="ContactFormLabel">Name</label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={newquestion.name}
                            placeholder="Full Name"
                            onChange={handleChange}
                            />
                        </div>
                        <div class="form-row">
                            <label for="email" class="ContactFormLabel">Email</label>
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
                        <div class="form-row">
                            <label for="query" class="ContactFormLabel">Your Question</label>
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
                        <div class="form-row">
                            <button type="submit" class="SubmitButton">Submit</button>
                         </div>
                    </div>
                </form>
      </div>
    );
    }else if(user.role == "admin"){
    //}else if(role == "admin"){
    const unansweredQuestions = questions.filter((q) => !q.isanswered);

    return (
        <div className="containerForAdmin">
            {unansweredQuestions.length ? (
                unansweredQuestions.map((q) => (
                    <div key={q.id} className="admin-content">
                        <h2 className="FormTitle">Student Details</h2>
                        <div className="student-details">
                            <p>
                            <span className="ContactFormLabel">Student Name: </span>
                            {q.name}
                            </p>
                            <p>
                            <span className="ContactFormLabel">Student Email: </span>
                            {q.email}
                            </p>
                            <p>
                            <span className="ContactFormLabel">Student Question: </span>
                            {q.query}
                            </p>
                        </div>
                        <form className="AdminForm" onSubmit={(e) => handleSubmitRes(e, q.id)}>
                            <div className="form-row">
                            <label htmlFor="adminAnswer" className="ContactFormLabel">
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
                            <button type="submit" className="SubmitButtonAdmin">
                                Respond
                            </button>
                            </div>
                        </form>
                    </div>
                ))
                ) : (<p>All Questions have been answered</p>
            )}
    </div>
    )
    }
    }
   
}


export default ContactForm;