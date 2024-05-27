import './RevenueStatistics.css';

const RevenueStatistics = () => {
  return (
   <>
   <div id='revenue'>
      <h2>Thống kê doanh thu</h2>
    <div className='pagination'>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      </div>
   </div>
   <div id='revenueTable'>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Ngày</th>
          <th>Doanh thu</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>01/01/2021</td>
          <td>1000000</td>
          <td>
            <button>Sửa</button>
            <button>Xóa</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>02/01/2021</td>
          <td>2000000</td>
          <td>
            <button>Sửa</button>
            <button>Xóa</button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>03/01/2021</td>
          <td>3000000</td>
          <td>
            <button>Sửa</button>
            <button>Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
   </div>
   </>
  );
};

export default RevenueStatistics;
