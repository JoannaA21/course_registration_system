export const ContactForm = () => {

    const user = JSON.parse(localStorage.getItem('loggedIn'));

    {if (user.role == "addfdsmin"){
        return (
            <div class="containerForContact">
                <form class="ContactFormStudent">
                    <h2 class="FormTitle">Ask a Question</h2>
                    <div class="form-content">
                        <div class="form-row">
                            <label for="name" class="ContactFormLabel">Name</label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            //value={} Add value of student Name
                            placeholder="Full Name"
                            required
                            />
                        </div>
                        <div class="form-row">
                            <label for="email" class="ContactFormLabel">Email</label>
                            <input
                            type="email"
                            name="email"
                            id="email"
                            //value={} Add value of student email
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
                            ></textarea>
                        </div>
                        <div class="form-row">
                            <button type="submit" class="SubmitButton">Submit</button>
                         </div>
                    </div>
                </form>
            </div>
    )
    }else if(user.role == "admin"){
        return (
            <div class="containerForAdmin">
                <div class="admin-content">
                    <h2 class="FormTitle">Student Details</h2>
                    <div class="student-details">
                        <p><span class="ContactFormLabel">Student Name: </span>student.name</p>
                        <p><span class="ContactFormLabel">Student Email: </span>student.email</p>
                        <p><span class="ContactFormLabel">Student Question: </span>student.question</p>
                </div>
                <form class="AdminForm">
                    <div class="form-row">
                        <label for="adminAnswer" class="ContactFormLabel">Admin Response</label>
                        <textarea
                            id="adminAnswer"
                            name="adminAnswer"
                            cols="50"
                            rows="6"
                            placeholder="Response"
                        ></textarea>
                    </div>
                    <div class="form-row">
                        <button type="submit" class="SubmitButtonAdmin">Submit</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
    }
   
}


export default ContactForm;