import React from 'react'
import { NavLink } from 'react-router-dom'
import SideBar from '../components/SideBar'

function Cours() {
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
                                <h4>Liste de cours</h4>
                                <div className='d-flex'>
                                    <div className="col-2">Cours</div>

                                    <div className='col-10'>
                                        <NavLink to='add-cours' style={{ textAlign: 'right' }}>
                                            <button style={{
                                                flex: '1', float: 'right', textAlign: 'right', marginBottom: '10px',
                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                            }} >Ajouter un cours</button>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className='col-sm-12'>
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>Nom</th>
                                                <th>Pondération</th>
                                                <th>Cours</th>
                                                <th style={{ width: '230px' }}>Date de création</th>
                                                <th style={{ width: '230px' }}>Date de modification</th>
                                                <th style={{ width: "200px" }}>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cours