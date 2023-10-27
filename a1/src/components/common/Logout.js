export const Logout = () => {
    const logout = () => {
        localStorage.removeItem('loggedIn')
        alert('Log out successfully!')
        window.location.href = '/'
    }
    return(
        <button onClick={logout}>Log out</button>
    )
} 