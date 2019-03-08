import React from 'react'
import './dress-selection.scss';

function DressSelection(props) {
    const { changeCountPerPage, countPerPage } = props;
    
    return (
        <div className="dress-selection">
            <div>Dress per page: </div>
            <div>
                <a href="javascript:void(0)" onClick={() => changeCountPerPage(3)} className={countPerPage === 3 ? 'active' : ''}><i className="fas fa-th-large"></i></a>
                <a href="javascript:void(0)" onClick={() => changeCountPerPage(6)} className={countPerPage === 6 ? 'active' : ''}><i className="fas fa-align-justify"></i></a>
                <a href="javascript:void(0)" onClick={() => changeCountPerPage(8)} className={countPerPage === 8 ? 'active' : ''}><i className="fas fa-th"></i></a>
            </div>
        </div>
    )
}

export default DressSelection;
