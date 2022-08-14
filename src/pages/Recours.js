import React from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from '../components/SideBar'

function Recours() {
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
                                <h4>Liste de recours</h4>
                                <div className='col-md-12'>
                                    <div className="card">
                                        <div className='card-header'>
                                            <div className='d-flex'>
                                                <div className="col-2">Recours</div>
                                                <div className='col-10'>
                                                    <NavLink to='addRecours' style={{ textAlign: 'right' }}>
                                                        <button style={{ flex: '1', float: 'right', textAlign: 'right', padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a' }}>Créer un recours</button>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card-body'>
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>N°</th>
                                                        <th>Cours</th>
                                                        <th>Pondération</th>
                                                        <th>Statut</th>
                                                        <th>Professeur</th>
                                                        <th>Date de création</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr></tr>
                                                </tbody>
                                            </table>
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

export default Recours