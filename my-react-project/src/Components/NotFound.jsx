import {Button, Container, Card, Image} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {Nav } from 'react-bootstrap';
import gif from '../Images/not-found.gif';


function NotFound () {

    return(
        <Container className="text-center text-white bg-success border border-dark border-3 rounded p-0 m-4">
            <div>
                <h2>Error 404</h2>
                <p>Page not found</p>
                <div className='d-flex justify-content-center text-center text-white m-2'>
                    <Button>
                        <Nav>
                            <Nav.Link className='text-white' as={NavLink} to={'/'}>
                                Click here to return Home.
                            </Nav.Link>
                        </Nav>
                    </Button>
                </div>
            </div>
            <div className='text-center'>
                    <Image
                        src={gif}
                        rounded
                        fluid
                        alt='404 not found'
                    />
                </div>
        </Container>
    )
}

export default NotFound