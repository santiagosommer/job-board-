import { useState } from 'react';
import useFetch from '../../hooks/useFetch'
import { Link } from "react-router";

function createUser(user) {
    return (
        <div key={user.id}>
            {user.email}
        </div>
    )
}


function Home() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const { data: users, error: errorUsers } = useFetch("http://localhost:5174/users");

    const search = async () => {
        try {
            const response = await fetch(`http://localhost:5174/jobs/search?query=${query}`);
            if (!response.ok) throw new Error("Error while searching");
            const data = await response.json();
            setResults(data);
            setQuery('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <header className='search-header'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    search();
                }}>
                    <input
                        type='text'
                        placeholder='Search jobs'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type='submit' className='search-button'>Search</button>
                </form>
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/jobs/create">Create Job</Link>
                </nav>
            </header>

            <ul>
                {results.map((job) => {
                    const { _id, _source } = job;
                    const { title } = _source;
                    return <li key={_id}>{title}</li>;
                })}
            </ul>

            {users?.map((user) => {
                return createUser(user)
            })}

        </>
    )
}

export default Home;