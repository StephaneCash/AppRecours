import React from 'react'
import { NavLink } from 'react-router-dom'
import SideBar from '../components/SideBar'

function AddCours() {

    const state = '';

    const changeValue = (e) =>{

    }

    return (
        <div className='col-md-12'>
            <div className='d-flex'>
                <div className='col-2'>
                    <SideBar />
                </div>
                <div className='col-10'>
                    <div className='mainRecours container'>
                        <main>
                            <section className="recent">
                                <div className="col-sm-12">
                                    <label> {state ? "Editer " : "Ajouter"} une cours</label> <br /><br />
                                    <h6>
                                        <NavLink to="/filieres"><i className='fa fa-angle-left'></i> Retour</NavLink>
                                    </h6><br />
                                    <div className='row'>
                                        <div className="col-sm-6">
                                            <label>Nom du cours</label>
                                            <input type="text" className="form-control" id="nom" />
                                        </div>
                                        <div className="col-sm-2">
                                            <button type='button' style={{
                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                            }}>
                                                {state ? "Editer" : "Ajouter"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCours