import React from 'react'

function addFiliere() {
    return (
        <div className='row'>
            <div className="col-sm-6">
                <label>Filière</label> <br />
                <input type="text" className='form-control' placeholder="Entrer le nom de la filière" />
            </div>
        </div>
    )
}

export default addFiliere