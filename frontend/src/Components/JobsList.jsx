function JobsList({ jobs }) {
    return (
        <>
            <h2>Jobs</h2>
            <ul>
                {jobs?.map((job) => {
                    const { _id, _source } = job;
                    const { title } = _source;
                    return <li key={_id}>{title}</li>;
                })}
            </ul>
        </>
    )
}

export default JobsList;