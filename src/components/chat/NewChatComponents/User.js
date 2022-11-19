import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';

function User({ curr_user, selectUser, activeUser }) {

    const active_label = activeUser?.filter((user) => user.userId === curr_user._id);
    
    return (
        <div>
            <Container>
                <Card className='m-0' onClick={() => selectUser(curr_user)}>
                    <div className='d-flex m-2 align-items-center person'>
                        <div className="user">
                            <Card.Img className='img-fluid rounded-circle' src={`http://localhost:5000/${curr_user.image}`} alt="Profile Image" style={{ width: "40px", height: "40px" }} />
                            <span
                                className={(active_label && active_label?.length != 0) ? `status online` : null}
                            ></span>
                        </div>
                        <Card.Text className='ml-4'>{curr_user.userName}</Card.Text>
                    </div>
                </Card>
            </Container>
        </div>
    );
}

export default User;