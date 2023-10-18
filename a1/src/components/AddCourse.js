import React from 'react'
import { useRef } from 'react'
const AddCourse = ({handleSubmit, handleChange, newCourse}) => {
    const inputRef = useRef();

    return (
        <div className="courseFormContainer">
            <form className="CourseForm" onSubmit={handleSubmit}>
                <table>
                <h2 className="CourseFormTitle">Add Course Details</h2>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="code" className="courseFormLabel">Course Code</label>
                            </td>
                            <td>
                            <input
                                type="text"
                                name="code"
                                id='code'
                                value={newCourse.code}
                                placeholder="Course Code"
                                required
                                autoFocus
                                ref={inputRef}
                                onChange={handleChange}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="title" className="courseFormLabel">Course Title</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    id='title'
                                    value={newCourse.title}
                                    placeholder="Course Title"
                                    required
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="startdate" className="courseFormLabel">Course Start Date</label>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    name="startdate"
                                    id='startdate'
                                    value={newCourse.startdate}
                                    placeholder="Date"
                                    required
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="enddate" className="courseFormLabel">Course Start Date</label>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    name="enddate"
                                    id='enddate'
                                    value={newCourse.enddate}
                                    placeholder="Date"
                                    required
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="days" className="courseFormLabel">Course Days</label>
                            </td>
                            <td>
                                <select id='days' type="select" name='days' value={newCourse.days}
                                placeholder='CourseDays' onChange={handleChange} required>
                                    <option>Choose Days</option>
                                    <option>Monday - Wednesday</option>
                                    <option>Tuesday - Thursday</option>
                                    <option>Friday</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="starttime" className="courseFormLabel">Course Start Time</label>
                            </td>
                            <td>
                            
                                <input
                                    type="time"
                                    name="starttime"
                                    id='starttime'
                                    value={newCourse.starttime}
                                    placeholder="Course Start Time"
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="endtime" className="courseFormLabel">Course End Time</label>
                            </td>
                            <td>
                            
                                <input
                                    type="time"
                                    name="endtime"
                                    id='endtime'
                                    value={newCourse.endtime}
                                    placeholder="Course End Time"
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="instructor" className="courseFormLabel">Course Instructor</label>
                            </td>
                            <td>
                            
                                <input
                                    type="text"
                                    name="instructor"
                                    id='instructor'
                                    value={newCourse.instructor}
                                    placeholder="Course Instructor"
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit" onClick={() => inputRef.current.focus()}>Add Course</button>
                            </td>
                        </tr>                                   
                    </tbody>
                </table>    
            </form>
        </div>
    )
}

export default AddCourse
