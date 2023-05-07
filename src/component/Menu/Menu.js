import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Nabar/Navbar";
import ItemMenu from "./ItemMenu";
import "./Menu.style.css";



const Menu = ({ children }) => {

    const [open, setOpen] = useState('aberto');

    const handleMenu = () => {
        (open === 'aberto') ? setOpen('fechado') : setOpen('aberto');
    };

    return (
        <>
            <div className={`menu ${open}`}>
                <h1 className="logo">Logo Aqui</h1>
                <hr className="divisor" />

                <ul className="conteudo-menu">
                    {/* Menu sem Dropdow */}
                    <li className="item-menu">
                        <NavLink className="link-menu" to="/">
                            <i class="fa-solid fa-chart-simple"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    {/* Menu com Dropdow */}
                    <ItemMenu title="Usuários" icon="fa-solid fa-user">
                        <li>
                            <NavLink className="link-menu" to="/usuarios/cadastrar">
                                <i class="fa-solid fa-user-plus"></i>
                                <span>Novo Usuário</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="link-menu" to="/usuarios/listar">
                                <i class="fa-solid fa-user-plus"></i>
                                <span>Todos os Usuários</span>
                            </NavLink>
                        </li>
                    </ItemMenu>

                    <ItemMenu title="Clientes" icon="fa-solid fa-user">
                        <li>
                            <NavLink className="link-menu" to="/clientes/cadastrar">
                                <i class="fa-solid fa-user-plus"></i>
                                <span>Novo Cliente</span>
                            </NavLink>
                        </li>
                        
                        <li>
                            <NavLink className="link-menu" to="/Tet">
                                <i class="fa-solid fa-user-plus"></i>
                                <span>Todos os Clientes</span>
                            </NavLink>
                        </li>
                    </ItemMenu>
                </ul>
            </div>

            <div className={`site ${open}`}>
                <Navbar
                    tipoMenu={open}
                    handleMenu={handleMenu}
                />

                {children}
            </div>
        </>
    );
};

export default Menu;