import React, { useEffect, useState, useRef} from 'react';
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from 'react-icons/ai';
import styles from '../../styles/style';
import { Link } from 'react-router-dom';
import { MdBorderClear } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfAdmin } from '../../redux/action/order';
import { getAllProductsAdmin } from '../../redux/action/product';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FiShoppingBag } from 'react-icons/fi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { getAllUsers } from '../../redux/action/user';
import { LuUser2 } from 'react-icons/lu';
import {IoBagHandle, IoPieChart, IoPeople, IoCart} from 'react-icons/io5' 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ApexCharts from 'apexcharts';
 

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { admin } = useSelector((state) => state.admin);
  const { products } = useSelector((state) => state.products);
  const { usersList } = useSelector((state) => state.user);
  const [deliveredOrder, setDeliveredOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin(admin._id));
    dispatch(getAllProductsAdmin(admin._id));
    dispatch(getAllUsers());

    const orderData =
      orders && orders.filter((item) => item.status === 'Delivered');
    setDeliveredOrder(orderData);
  }, [dispatch, admin._id, orders]);

  // total earning in the dashboard 
  const totalEarningWithoutTax =
    deliveredOrder &&
    deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax * 0.1;

  const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2);

  // total expenses of the dashboard, this is just based on product and stock only. Monthy/Yearly expenses is yet to develop
 const ComputetotalExpenses = () => {
    if (!products || products.length === 0) {
      return 0;
    }

    // Iterate over each product and calculate its total cost based on stock and original price
    const totalExpenses = products.reduce((total, product) => {
      const productExpense = product.stock * product.grossPrice;
      return total + productExpense;
    }, 0);

    return totalExpenses;
 }

 const totalExpenses = ComputetotalExpenses();

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  // stats grid
  const BoxWrapper = ({children}) =>{
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
  }

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: '₱ ' + item.totalPrice,
        status: item.status,
      });
    });

  const refundApprovedCount = orders
    ? orders.filter((order) => order.status === 'Refund Approved').length
    : 0;


  // computes the total expenses for the whole month

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <br />

      {/* data analytics  */}
      <div className="data-drid-analytic grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {/* total sales */}
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <IoBagHandle className='text-2xl text-white'/>
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Sales</span>
            <div className="flex items-center">
              <strong className='text-xl text-gray-700 font-semibold'>₱ {availableBalance.toFixed(2)}</strong>
            </div>
          </div>
        </BoxWrapper>

        {/* total expenses */}
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
            <IoPieChart className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Expenses</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">{totalExpenses}</strong>
            </div>
          </div>
        </BoxWrapper>

        {/* total customers */}
        <Link to="/dashboard-users">
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                <IoPeople className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">Total Customers</span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">{usersList && usersList.length}</strong>
              </div>
            </div>
          </BoxWrapper>
        </Link>

        {/* total # of orders */}
        <Link to="/dashboard-orders">
          <BoxWrapper>
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
                  <IoCart className="text-2xl text-white" />
              </div>
              <div className="pl-4">
                <span className="text-sm text-gray-500 font-light">Total Orders</span>
                <div className="flex items-center">
                  <strong className="text-xl text-gray-700 font-semibold">{orders && orders.length}</strong>
                </div>
              </div>
          </BoxWrapper>
        </Link>
      </div>

      {/* transactions */}
      <div className="transaction-analytic">
        {TransactionChart()}
      </div>

      <h3 className="text-[22px] font-Poppins pb-2 text-[171203]">
        Latest Orders
      </h3>
      <div className="w-full min-h-[40vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>

      
      
    </div>
  );
};


const TransactionChart = () => {
  const data = [
    {
      month: 'Feb',
      expense: 3000,
      income: 1398,
      orders: 900
    },
    {
      month: 'Mar',
      expense: 2000,
      income: 9800,
      orders: 1100
    },
    {
      month: 'Apr',
      expense: 2780,
      income: 3908,
      orders: 1200
    },
    {
      month: 'May',
      expense: 1890,
      income: 4800,
      orders: 1050
    }
  ];

  const downloadCsv = () => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <div className='flex justify-between items-center'>
        <div className='align-middle'>
          <strong className="text-gray-700 font-medium">Transactions</strong>
        </div>
        <div className="mb-2 align-middle">
          <button className="bg-blue-400 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded" onClick={downloadCsv}>
            Download CSV
          </button>
        </div>
      </div>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={600}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis tickCount={1000} tick={{ fontSize: 12, fontFamily: 'Arial', dy: 5 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#0ea5e9" />
            <Bar dataKey="expense" fill="#ea580c" />
            <Bar dataKey="orders" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardHero;
