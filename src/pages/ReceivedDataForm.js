import React, { useContext, useState, useEffect } from 'react'
import { multiStepContext } from "../StepContext";


function ReceivedDataForm() {

    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);
    const [data, setData] = useState([userData]);

    console.log(data, 'DONNEES')
    const fetchData = () => {
        for (let i = 0; i < userData.length; i++) {
            console.log(i, 'DATA')
        }
    }

    return (
        <div className='col-md-12 container'>
            <h3 className="text-center">Identité Etudiant</h3>

            <table className="table table-striped table-bordered table-borderless mt-2">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Postnom </th>
                        <th>Promotion</th>
                        <th>Object du recours</th>
                        <th>Cotes marquées sur le bulletin</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((val, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{val.nom}</td>
                                <td>{val.postnom}</td>
                                <td>{val.promotion}</td>
                                <td>{val.objetRecours}</td>
                                <td>
                                    Cote examen : {val.coteExamen} <br />
                                    Cote Année : {val.coteAnnee}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h3 className="text-center mt-5">Identité Professeur</h3>
            <table className="table table-striped table-bordered table-borderless mt-2">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Postnom </th>
                        <th>Cours</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((val, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{val.nomProf}</td>
                                <td>{val.postnomProf}</td>
                                <td>{val.cours}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ReceivedDataForm