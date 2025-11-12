function JobList({ users }) {
    return (
        <>
            <h2>Users</h2>
            <ul>
                {users?.map((user) => {
                    const { id, email } = user;
                    return <li key={id}>{email}</li>
                })}
            </ul>
        </>
    )
}

export default JobList;