// Hooks
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

// Components
import Header from '../Components/Header';
import JobsList from '../Components/JobsList';
import UsersList from '../Components/UsersList';

// Styles
import './Home.css';


function Home() {

    const [results, setResults] = useState([]);
    const { data: users, error: errorUsers } = useFetch("http://localhost:3000/users");

    return (
        <>
            <Header setResults={setResults} />
            <JobsList jobs={results} />
            {!errorUsers ? (<UsersList users={users} />) : (<p>Error loading users</p>)}
        </>
    )
}

export default Home;