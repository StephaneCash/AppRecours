import React from 'react';
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