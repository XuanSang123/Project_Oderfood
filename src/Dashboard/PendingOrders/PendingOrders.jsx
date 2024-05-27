import './PendingOrders.css';

const PendingOrders = () => {
  return (
   <>
    <div id='pending-orders'>
      <h2>Quản lý đơn hàng</h2>
      <div className='searchOrder'>
        <input type='text' placeholder='Search order' />
        <button>Search</button>
        <button>Sắp xếp</button>
      </div>
      <div className='pagination'>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
    <div id='pending-orders-table'>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên đơn hàng</th>
            <th>Tên người đặt</th>
            <th>Ngày đặt</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Đơn hàng 1</td>
            <td>Nguyễn Văn A</td>
            <td>27/05/2024</td>
            <td><input type="radio" /></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Đơn hàng 2</td>
            <td>Nguyễn Văn B</td>
            <td>27/05/2024</td>
            <td><input type="radio" /></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Đơn hàng 3</td>
            <td>Nguyễn Văn c</td>
            <td>27/05/2024</td>
            <td><input type="radio" /></td>
          </tr>
        </tbody>
      </table>
    </div>
   </>   
  )
};

export default PendingOrders;
