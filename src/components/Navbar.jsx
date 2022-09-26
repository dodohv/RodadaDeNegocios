import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className = "navbar">
            
            <div className="links">
                <Link to="/" style={{
                    color:"white",
                    backgroundColor: "#264653",
                    borderRadius: "5px",
                    padding: '5px',
                    marginTop:'10px',
                    marginLeft:'10px'
                }}> Home</Link>
                <Link to="/configurador" style={{
                    color:"white",
                    backgroundColor: "#264653",
                    borderRadius: "5px",
                    padding: '5px',
                    marginTop:'10px',
                    marginLeft:'10px'
                }}>Configurações</Link>
                <Link to="/novogrupo" style={{
                    color:"white",
                    backgroundColor: "#264653",
                    borderRadius: "5px",
                    padding: '5px',
                    marginTop:'10px',
                    marginLeft:'10px'
                }} > Apresentações Grupo</Link>
                <Link to="/gerador" style={{
                    color:"white",
                    backgroundColor: "#264653",
                    borderRadius: "5px",
                    padding: '5px',
                    marginLeft:'10px'
                }}> Gerador</Link>
                <Link to="/gerador/:id" style={{
                    color:"white",
                    backgroundColor: "#264653",
                    borderRadius: "5px",
                    padding: '5px',
                    marginTop:'10px',
                    marginLeft:'10px'
                }}> Gerador 2</Link>
                
            </div>
        </nav>
      );
}
 

export default Navbar;