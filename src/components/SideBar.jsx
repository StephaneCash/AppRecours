import React from "react";
import "../css/SideBar.css";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai"
import { Book, MenuBook, School, Work } from "@material-ui/icons"
import { Avatar } from "@material-ui/core";

function SideBar() {
    return (
        <div className="sideBar">
            <div className="image">
                    <Avatar>R</Avatar>
                <h4>Richard</h4>
            </div>
            <div className="linkContainer">
                <ul>
                    <li>

                        <NavLink to="/dashboard">
                            <AiOutlineDashboard style={{ marginRight: '10px', fontSize: '20px' }} />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/listrecours">
                            <Book style={{ marginRight: '10px', fontSize: '20px' }} />
                            Recours
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/se_plaindre">
                            <School style={{ marginRight: '10px', fontSize: '20px' }} />
                            Se plaindre
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Communication">
                            <Work style={{ marginRight: '10px', fontSize: '20px' }} />
                            Communication
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/resultats">
                            <MenuBook style={{ marginRight: '10px', fontSize: '20px' }} />
                            Résultats
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;