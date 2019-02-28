import React from 'react'

function DressSelection(props) {
    const { changeCountPerPage } = props;
    return (
        <div>
            <a href="javascript:void(0)" onClick={() => changeCountPerPage(3)}><i className="fas fa-th-large"></i></a>
            <a href="javascript:void(0)" onClick={() => changeCountPerPage(6)}><i className="fas fa-align-justify"></i></a>
            <a href="javascript:void(0)" onClick={() => changeCountPerPage(9)}><i className="fas fa-th"></i></a>
        </div>
    )
}

export default DressSelection;
