import React, { useState } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";


const AddBook = () => {

const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [status, setStatus] = useState("Disponivel");
const [flag, setFlag] = useState(true);
const [message, setMessage] = useState({error: false, msg: ""});

const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage("");
    if(title === "" || author === "") {
        setMessage({error: true, msg: "Todos os campos são obrigatórios"});
        return;
    }
    const newBook = {
        title,
        author,
        status
    }
    console.log(newBook)
};

    return (
        <div>
            <Form onSubmit= {handleSubmit}>
                <Form.Group controlId="formBookTitle">
                    <InputGroup>
                        <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
                        <Form.Control 
                        type="text" 
                        placeholder="Book Title" 
                        value={title} 
                        onChange={ (e) => setTitle(e.target.value)}
                        
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="formBookAuthor">
                    <InputGroup>
                        <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
                        <Form.Control 
                        type="text" 
                        placeholder="Book Author"  
                        value={author} 
                        onChange={ (e) => setAuthor(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <ButtonGroup
                arial-label="Basic example" className="mb-3"
                >
                    <Button
                    disable={flag}
                    variant="success"
                    onClick={ (e) => {
                        setStatus("Disponivel");
                        setFlag(true);
                    }}
                    >
                        Disponivel
                    </Button>
                    <Button
                    variant="danger"
                    disable={!flag}
                    onClick={(e) => {
                        setStatus("Indisponivel");
                        setFlag(false);
                    }}
                    >
                        Indisponivel
                    </Button>
                </ButtonGroup>

                
            </Form>

        </div>
      );
}
 
export default AddBook;