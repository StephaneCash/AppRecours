import React, { useContext, useState, useEffect } from 'react'
import { multiStepContext } from "../StepContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ReceivedDataForm() {

    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);
    const [data, setData] = useState([userData]);

    let navigate = useNavigate();

    console.log(userData)

    useEffect(() => {
        axios.post(`http://localhost:5000/api/recours`, {
            nomEtudiant: userData.nom, postnomEtudiant: userData.postnom, promotion: userData.promotion,
            objetRecours: userData.objetRecours, coteExamen: userData.coteExamen, coteAnnee: userData.coteAnnee,
            nomCompletProf: userData.nomProf, cours: userData.cours
        }).then(resp => {
            if (resp.status === 201) {
                swal({ title: "Succès", icon: "success", text: resp.data.message });
                navigate("/recours");
                setUserData({ nom: "", postnom: "", promotion: "", objetRecours: "", coteAnnee: "", coteExamen: "", nomProf: "", cours: "" })
            } else {
                navigate("/recours/addRecours");
                setCurrentStep(1);
                swal({ title: "Echec", icon: "error", text: "Pas de recours créé, vous serez redirectionné pour recommencer merci." });
            }
        }).catch(err => {
            navigate("/recours/addRecours");
            setCurrentStep(1);
            console.log(err);
        })
    }, [data]);

    useEffect(() => {
        if (!userData) {
            navigate("/recours/addRecours");
        }
    }, [userData])

    return (
        <div className='col-md-12 container'>
            <h3 className="text-center">Identité Etudiant</h3>

        </div>
    )
}

export default ReceivedDataForm