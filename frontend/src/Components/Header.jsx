// Hooks
import { useState } from "react";

// Components
import Navbar from "./Navbar";
import SearchForm from "./SearchForm";

// Styles
import "./Header.css"


function Header({ setResults }) {
    const [query, setQuery] = useState('');

    const onSearch = async () => {
        if (!query.trim()) {
            setQuery('');
            setResults([]);
            return;
        }
        try {

            const response = await fetch(`http://localhost:3000/jobs/search?query=${query}`);
            if (!response.ok) throw new Error("Error while searching");
            const data = await response.json();
            setResults(data);
        } catch (err) {
            console.error(err);
        } finally {
            setQuery('');
        }
    };

    return <>
        <header className='search-header'>
            <SearchForm query={query} setQuery={setQuery} onSearch={onSearch} />
            <Navbar />
        </header>
    </>
}

export default Header;