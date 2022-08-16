import React from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from '../components/SideBar'
 
function Filieres() {
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
                                <h4>Liste de filières</h4>
                                <div className='col-sm-12'>
                                    
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filieres