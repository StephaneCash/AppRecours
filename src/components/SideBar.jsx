import React, { useContext, useEffect } from "react";
import "../css/SideBar.css";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai"
import { Book, Chat, MenuBook, Person, School} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { multiStepContext } from "../StepContext";
import axios from "axios";

function SideBar() {

    const { setUserLoggedIn, userLoggedIn } = useContext(multiStepContext);

    const auth = { "authorization": 'Bearer ' + userLoggedIn.jeton };
    //console.log('DATA SIDE BAR ::: ', userLoggedIn)

    const getOneUser = () => {
        axios.get(`http://localhost:5000/api/users/${userLoggedIn.id}`, { headers: auth }).then(resp => {
          //  console.log(resp)
        }).catch(err => {
            console.log(err.response)
        })
    };

    useEffect(() => {
        getOneUser()
    }, [])

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
                            <Chat className="icon"
                                style={{ marginRight: '10px', fontSize: '20px' }} />
                            <span className="textNavbar">Chat</span>
                        </NavLink>
                    </li>
                    <br />
                    <br />
                    <br />
                    <br />
                    <li>
                        <NavLink to="/">
                            <i className="icon fa fa-sign-out"
                                style={{ marginRight: '10px', fontSize: '20px' }} ></i>
                            <span className="textNavbar">Déconnexion</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;