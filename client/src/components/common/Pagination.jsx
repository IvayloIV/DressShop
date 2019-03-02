import React from 'react';
import { Link } from 'react-router-dom';

function Pagination(props) {
    const { currentPage, length, itemsCount } = props;
    const totalPageCount = Math.ceil(itemsCount / length);

    const list = [];
    for (let i = 1; i <= totalPageCount; i++) {
        list.push(<Link key={i} to={'/dress/' + i}><span className={currentPage === i ? 'current' : ''}>{i}</span></Link>);
    }

    return (
        <div>
            {currentPage > 1 && <Link to={'/dress/' + (currentPage - 1)}><span>Prev</span></Link>}
            {list}
            {totalPageCount !== 0 && currentPage !== totalPageCount && <Link to={'/dress/' + (currentPage + 1)}><span>Next</span></Link>}
        </div>
    )
}

export default Pagination;
