import React from 'react'

const SearchCourse = ({searchCourse, setSearch}) => {
    return (
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='search'>Search</label>
            <input 
                id='search'
                type='text'
                role='searchbox'
                placeholder='Search Course'
                value={searchCourse}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    )
}

export default SearchCourse
