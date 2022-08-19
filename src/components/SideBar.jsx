import React from "react";
import "../css/SideBar.css";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai"
import { Book, MenuBook, Person, School, Work } from "@material-ui/icons"
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
                            <AiOutlineDashboard className="icon"
                                style={{ marginRight: '10px', fontSize: '20px' }} />

                            <span className="textNavbar">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/recours">
                            <Book className="icon"
                                style={{ marginRight: '10px', fontSize: '20px' }} />

                            <span className="textNavbar">Recours</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cours">
                            <School className="icon"
                                style={{ marginRight: '10px', fontSize: '20px' }} />
                            <span className="textNavbar">Cours</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/filieres">
                            <MenuBook className="icon"
                                style={{ marginRight: '10px', fontSize: '20px' }} />
                            <span className="textNavbar">Filières</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/professeurs">
                            <Person className="icon"
                                style={{ marginRight: '10px', fontSize: '20px' }} />
                            <span className="textNavbar">Professeurs</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Communication">
                            <Work className="icon"
                                style={{ marginRight: '10px', fontSize: '20px' }} />
                            <span className="textNavbar">Chat</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;