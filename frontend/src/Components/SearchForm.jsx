function SearchForm({ query, setQuery, onSearch }) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSearch();
        }}>
            <input
                type='text'
                placeholder='Search jobs'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type='submit' className='search-button'>Search</button>
        </form>
    )
}

export default SearchForm;