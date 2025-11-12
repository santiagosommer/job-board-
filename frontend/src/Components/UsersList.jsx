function listUsers(users) {
    if (!users || users.length == 0) {
        return <p>No users found</p>
    }
    return <ul>
        {users.map((user) => {
            const { id, email } = user;
            return <li key={id}>{email}</li>
        })}
    </ul>
}

function UsersList({ users }) {
    return (
        <>
            <h2>Users</h2>
            {listUsers(users)}
        </>
    )
}

export default UsersList;