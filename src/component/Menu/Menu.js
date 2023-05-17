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
                <img src="/images/ntt.png" className="logo" />
                <hr className="divisor" />

                <ul className="conteudo-menu">
                    {/* Menu sem Dropdow */}
                    {/* <li className="item-menu">
                        <NavLink className="link-menu" to="/">
                            <i class="fa-solid fa-chart-simple"></i>
                            <span>Appointment</span>
                        </NavLink>
                    </li> */}

                    {/* Menu com Dropdow */}
                    {/* <ItemMenu title="List Employee" icon="fa-solid fa-user">
                        <li>
                            <NavLink className="link-menu" to="/usuarios/cadastrar">
                                <i class="fa-solid fa-user-plus"></i>
                                <span>All reservation</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="link-menu" to="/usuarios/listar">
                                <i class="fa-solid fa-user-plus"></i>
                                <span>Test</span>
                            </NavLink>
                        </li>
                    </ItemMenu> */}

                    <ItemMenu title="Doctor Test" icon="fa-solid fa-user">
                        <li>
                            <NavLink className="link-menu" to="/scheduler">
                                <i class="fa-solid fa-hospital"></i>
                                <span>Tetouan</span>
                            </NavLink>
                        </li>
                        
                        <li>
                            <NavLink className="link-menu" to="/EmployeeS">
                                <i class="fa-solid fa-hospital"></i>
                                <span>Casablanca</span>
                            </NavLink>
                        </li>
                        
                        <li>
                            <NavLink className="link-menu" to="/Tet">
                                <i class="fa-solid fa-calendar-check"></i>
                                <span>My Appointment</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="link-menu" to="/Welcome">
                                <i class="fa-solid fa-calendar-check"></i>
                                <span> welcome</span>
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