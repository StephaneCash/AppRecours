import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar'

function AttributesCours() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [formData, setFormData] = useState({});

    const { id, nom, postnom } = formData;

    useEffect(() => {
        if (state) {
            setFormData(state.val)
        }
    }, []);

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
                                    <label> Attribuer de cours </label> <br /><br />
                                    <h6>
                                        <NavLink to="/professeurs"><i className='fa fa-angle-left'></i> Retour</NavLink>
                                    </h6><br />
                                    <div className='row'>

                                        <div className="col-sm-6">
                                            <div className="alert alert-success">
                                                Professeur :   {nom + " " + postnom}
                                            </div>
                                            <button type='button' style={{
                                                padding: '4px', borderRadius: '5px', color: 'white', backgroundColor: '#14234a'
                                            }}>
                                                Attributer
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

export default AttributesCours