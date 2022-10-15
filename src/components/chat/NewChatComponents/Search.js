import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';

function Search({ searchedUser, users }) {
    
    const[searchValue, setSearchValue] = useState();

    const handleChange = async (e) => {

        setSearchValue(e.target.value)
        
        let condition = new RegExp(searchValue);
  
        let result = await users?.filter(function (el) {
          return condition.test(el.userName);
        });
        
        searchedUser(result)
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        let condition = new RegExp(searchValue);
  
        let result = await users?.filter(function (el) {
          return condition.test(el.userName);
        });

        searchedUser(result)
    }

    return (
        <div>
            <Container>
                <Form onSubmit={submitHandler} className="d-flex mb-2">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleChange}
                    />
                    <Button variant="outline-success" type="submit"> <SearchIcon /> </Button>
                </Form> 
            </Container>
        </div>
    );
}

export default Search;