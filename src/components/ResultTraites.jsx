import React from 'react';
import "../css/ResultTrait.css";
import { ArrowDownward, ArrowUpwardTwoTone, Book, MenuBook } from '@material-ui/icons';

function ResultTraites() {
  return (
    <div className='ResultTrait'>
        <div className='col1 d-flex'>
            <div className='bloc-col'>
                <Book />
            </div>
            <h5>Recours</h5>
        </div>
        <div className='col2 mt-4'>
            <div className='result'>
                <MenuBook /> <span>Résultats</span>
            </div>
            <div className='d-flex'>
                <div className='trait'><ArrowUpwardTwoTone /> 45</div>
                <div className='NonTrait'><ArrowDownward /> 12 </div>
            </div>
        </div>
    </div>
  )
}

export default ResultTraites