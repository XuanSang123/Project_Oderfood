const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];//tạo mang rỗng để chứa số trang
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {//dùng vòng lặp để tạo số trang, Math.ceil để làm tròn số trang
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;