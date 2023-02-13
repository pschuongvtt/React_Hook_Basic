import '../components/Nav.scss';

//Function component - Nav
const Nav = () => {
    return( 
        <nav className="nav">
            <ul>
                <li className="active"><a href="/">Home</a></li>
                <li><a href="/todo">Todo App</a></li>
                <li><li><a href="https://reactjs.org/docs/hooks-effect.html" target="_blank">Router Link</a></li></li>
            </ul>
        </nav>
    );
}

export default Nav;
