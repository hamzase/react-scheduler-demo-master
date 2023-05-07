import './Breadcrumb.style.css'

const Breadcrumb = ({ titulo, caminho }) => {
    return (
        <div className="barra-titulo">
            <h1>{titulo}</h1>   
            <div className="caminho">
                <nav>
                    <ol className="breadcrumb">
                        { 
                            caminho.map((item, index) => {
                                return ( 
                                    <li className="breadcrumb-item" key={index}>
                                        <a href={item.link}>{item.nome}</a>
                                    </li>
                                )
                            })
                         }
                    </ol>
                </nav>
            </div>
        </div>
    );

}

export default Breadcrumb;