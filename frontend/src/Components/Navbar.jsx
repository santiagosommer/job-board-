import { Link } from "react-router";

function Navbar() {
    return (
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/jobs/create">Create Job</Link>
        </nav>
    )
}

export default Navbar;