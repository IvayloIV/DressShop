import React from 'react';
import { Link } from 'react-router-dom';
import './pagination.scss';

function Pagination(props) {
    const { currentPage, length: lengthPage, itemsCount } = props;
    const totalPageCount = Math.ceil(itemsCount / lengthPage);

    const list = [];
    for (let i = 1; i <= totalPageCount; i++) {
        list.push(<Link key={i} to={'/dress/page/' + i} className={'page' + (currentPage === i ? ' active' : '')}><span>{i}</span></Link>);
    }

    return (
        <div className="pagination">
            {currentPage > 1 && <Link className="prev" to={'/dress/page/' + (currentPage - 1)}><span>&laquo;</span></Link>}
            {list}
            {totalPageCount !== 0 && currentPage !== totalPageCount && <Link className="next" to={'/dress/page/' + (currentPage + 1)}><span>&raquo;</span></Link>}
        </div>
    )
}

export default Pagination;
