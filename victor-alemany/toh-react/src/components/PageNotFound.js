import React from 'react';
import { Link, Redirect} from 'react-router-dom';

function PageNotFound(){
    const condition = false;
    return (
        <section>
            {condition === true && <Redirect to="/"/>}
            <h1>Error 404:</h1>
            <h2>Oops!! Page not found!!!!</h2>
            <Link to="/">Navigate to Dashboard</Link>
        </section>
    )
}

export default PageNotFound;