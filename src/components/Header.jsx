import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <Link to="/">Home</Link>
            <Link to="/lang">Lang</Link>
            <Link to="/profile/1234">Profile</Link>
        </header>
    )
}