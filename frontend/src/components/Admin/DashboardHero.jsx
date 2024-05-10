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
  const { users } = useSelector((state) => state.user);
  const [deliveredOrder, setDeliveredOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin(admin._id));
    dispatch(getAllProductsAdmin(admin._id));
    dispatch(getAllUsers());

    const orderData =
      orders && orders.filter((item) => item.status === 'Delivered');
    setDeliveredOrder(orderData);
  }, [dispatch, admin._id, orders]);

  const totalEarningWithoutTax =
    deliveredOrder &&
    deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax * 0.1;

  const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2);

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
            <span className="text-sm text-gray-500 font-light">Total Sales (less shipping cost)</span>
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
            <span className="text-sm text-gray-500 font-light">Total Expenses / Cost of Sales</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">$3423 (Mock)</strong>
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
                <strong className="text-xl text-gray-700 font-semibold">{users && users.length} 43 </strong>
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
        {transactionChart()}
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

const transactionChart = () => {
  // mock data, this should be from the database we should get the 
  // month - income - expenses - number of orders in the month 
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

	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Transactions</strong>
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
