import Breadcrumb from "../Breadcrumb/Breadcrumb";

const ContentPage = ({ children, titulo, caminho }) => {

    return (
        <>
            <Breadcrumb
                titulo={titulo}
                caminho={caminho}
            />

            <div className="content">
                {children}
            </div>
        </>
    );
}

export default ContentPage;