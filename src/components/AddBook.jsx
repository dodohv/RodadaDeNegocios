import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/book.services"

const AddBook = ({id, setBookId}) => {

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

    try {
        if (id !== undefined && id !== "") {
            await BookDataService.updateBook(id, newBook);
            setBookId("");
            setMessage({error: false, msg: "Atualizado com sucesso!"});

        }
        else {
            await BookDataService.addBooks(newBook);
            setMessage({error: false, msg: "Novo Livro adicionado com sucesso!"});

        }


           } catch(err) {
        setMessage({ error: true, msg: err.message})
    }
    setTitle("");
    setAuthor("");
};

    const editHandler = async(e) => {
        setMessage("");
        try{
            const docSnap = await BookDataService.getBook(id);
            console.log("O Registro é: ", docSnap.data());
            setTitle(docSnap.data().title)
            setAuthor(docSnap.data().author)
            setStatus(docSnap.data().status)
        } catch (err) {
            setMessage({ error: true, msg: err.message});
        }
    }
    useEffect(() => {
        console.log("O id está aqui:", id )
        if(id !== undefined && id !== "") {
            editHandler();
        }    
    },[id])

    return (
        <>
        {message?.msg && (
        <Alert 
            variant={ message?.error ? "danger": "success"} 
            dismissible 
            onClose={() => setMessage("")}
        > 
            {message?.msg}
        </Alert> 
        )}
        <div className="p-4 box">
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
                <div className="gap-2">
                    <Button variant="primary" type="submit">
                        Adicionar / Atualizar
                    </Button>
                </div>                
            </Form>

        </div>
        </>
      );
}
 
export default AddBook;