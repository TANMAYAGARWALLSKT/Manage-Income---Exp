import React, { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../Config/firebase";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Indexpage() {
  const [data, setData] = useState([]);
  
  const [filters, setFilters] = useState({
    EndDate: new Date().toLocaleDateString(),
    StartDate: new Date().toLocaleDateString(),
    paymentModeSelect: null,
    typeMode: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add these new state variables for card totals
  const [totals, setTotals] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
    dues: 0
  });

  const fetchDataAndFilter = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const selectData = collection(db, "Income");
      let queryRef = query(
        selectData,
        where("Date", ">=", filters.EndDate),
        where("userid", "==", auth?.currentUser?.uid)
      );
      if (filters.StartDate) {
        queryRef = query(queryRef, where("Date", "<=", filters.StartDate));
      }
      if (filters.paymentModeSelect) {
        queryRef = query(
          queryRef,
          where("PaymentMode", "==", filters.paymentModeSelect)
        );
      }

      if (filters.typeMode) {
        queryRef = query(queryRef, where("Type", "==", filters.typeMode));
      }

      const querySnapshot = await getDocs(queryRef);

      const tempData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Calculate totals from the fetched data
      const calculatedTotals = tempData.reduce((acc, item) => {
        const amount = Number(item.Amount) || 0;

        // Calculate regular income and expenses
        if (item.Type === 'Income') {
          if (item.PaymentMode === 'Due') {
            // If it's income that's due, add to dues
            acc.dues += amount;
          } else {
            // Only add to income if it's not a due payment
            acc.income += amount;
          }
        } else if (item.Type === 'Expense') {
          if (item.PaymentMode === 'Due') {
            // If it's an expense that's due, add to dues
            acc.dues += amount;
          } else {
            // Only add to expenses if it's not a due payment
            acc.expenses += amount;
          }
        }

        return acc;
      }, { income: 0, expenses: 0, dues: 0 });

      // Calculate net balance (excluding dues)
      calculatedTotals.balance = calculatedTotals.income - calculatedTotals.expenses;

      console.log('Calculated Totals:', calculatedTotals); // Debug log
      setTotals(calculatedTotals);
      console.log(tempData)
      setData(tempData);
    } catch (error) {
      console.warn("Error fetching data: ", error);
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchDataAndFilter();
  };
  
  useEffect(() => {
    console.log(data);
    fetchDataAndFilter();
  }, [fetchDataAndFilter]);

  // Chart data preparation
  const chartData = {
    labels: data.map(item => item.Date),
    datasets: [
      {
        label: 'Income',
        data: data.filter(item => item.Type === 'Income').map(item => item.Amount),
        borderColor: 'rgb(16, 185, 129)',
        tension: 0.1
      },
      {
        label: 'Expenses',
        data: data.filter(item => item.Type === 'Expense').map(item => item.Amount),
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="flex noto-sans w-full h-full pt-4 sm:pt-6  overflow-y-scroll justify-center content-center z-50 bg-[#111111]">
      {/* Dashboard Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4 sm:pt-6 ">
        {/* Dashboard Header */}
        <div className="mb-6 sm:mb-8  flex justify-between items-center backdrop-blur-sm px-4 py-2 border-b-2 border-gray-300/20">
          <div >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-2">Dashboard Overview</h1>
          <p className="text-sm sm:text-base text-gray-400 font-light">Track your financial activities and transactions</p>
          </div>
          <div className="Profile "> 
            <div className="border-2 border-gray-300 rounded-full w-10 h-10"></div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-4 sm:mb-4">
          {/* Income Card */}
          <div className="flex-1 min-w-[250px] rounded-xl bg-transparent p-1 border-2 border-emerald-500 shadow-emerald-500/50 shadow-lg">
            <div className="backdrop-blur-md bg-white/10 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1">Total Income</h3>
              <p className="text-xl sm:text-2xl font-bold text-emerald-500">₹{totals.income.toLocaleString()}</p>
              <span className="text-xs text-gray-400 mt-2 block">Current Period</span>
            </div>
          </div>

          {/* Expenses Card */}
          <div className="flex-1 min-w-[250px] rounded-xl bg-transparent p-1 border-2 border-red-500 shadow-red-700/50 shadow-lg">
            <div className="backdrop-blur-md bg-white/10 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1">Total Expenses</h3>
              <p className="text-xl sm:text-2xl font-bold text-red-500">₹{totals.expenses.toLocaleString()}</p>
              <span className="text-xs text-gray-400 mt-2 block">Current Period</span>
            </div>
          </div>

          {/* Balance Card */}
          <div className="flex-1 min-w-[250px] rounded-xl bg-transparent p-1 border-2 border-blue-500 shadow-blue-500/50 shadow-lg">
            <div className="backdrop-blur-md bg-white/10 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1">Net Balance</h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-500">₹{totals.balance.toLocaleString()}</p>
              <span className="text-xs text-gray-400 mt-2 block">Updated just now</span>
            </div>
          </div>

          {/* Dues Card */}
          <div className="flex-1 min-w-[250px] rounded-xl bg-transparent p-1 border-2 border-orange-500 shadow-red-500/50 shadow-lg">
            <div className="backdrop-blur-md bg-white/10 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1">Pending Dues</h3>
              <p className="text-xl sm:text-2xl font-bold text-orange-500">₹{totals.dues.toLocaleString()}</p>
              <span className="text-xs text-gray-400 mt-2 block">Pending payments</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions and Graph Section */}
        <div className="bg-black w-full h-auto min-h-[60%] rounded-3xl  flex gap-6">
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-[30%] h-full">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Transactions</h2>
            </div>
            
            <div className="divide-y divide-gray-100 overflow-y-scroll max-h-[500px]">
              {data.map((item, index) => (
                <div key={index} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <div className="flex items-center gap-2 justify-center">
                      {item.Type === 'Income' ? (
                        <>
                          <h3 className="text-sm font-medium text-gray-900">{item.Model}</h3>
                        </>
                      ) : (
                        <div className="flex flex-col justify-start items-center text-red-600">
                          <div className="text-xs sm:text-sm">{item.Notes}</div>
                        </div>
                      )}
                    </div>
                    <div className="sm:text-right">
                      <p className={`text-sm font-medium ${
                        item.Type === 'Income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.Type === 'Income' ? '+' : '-'}₹{item.Amount}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{item.Date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graph Section */}
          <div className="backdrop-blur-md bg-white/10 rounded-xl border-2 border-gray-500/30 shadow-lg flex-1 p-6">
            <div style={{ height: '500px' }}>
              <Line options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: '#e5e7eb',
                      padding: 20,
                      font: {
                        size: 12
                      }
                    }
                  },
                  title: {
                    display: true,
                    text: 'Income, Expenses & Dues',
                    color: '#e5e7eb',
                    font: {
                      size: 16,
                      weight: 'bold'
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                      drawBorder: false
                    },
                    ticks: {
                      color: '#e5e7eb',
                      font: {
                        size: 12
                      },
                      callback: function(value) {
                        return '₹' + value.toLocaleString();
                      }
                    }
                  },
                  x: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                      drawBorder: false
                    },
                    ticks: {
                      color: '#e5e7eb',
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }} data={chartData} />
            </div>
          </div>
        </div>

        {/* Mobile View Quick Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden">
          <div className="flex justify-around">
            <button className="text-blue-600 text-sm font-medium">
              Add Income
            </button>
            <button className="text-blue-600 text-sm font-medium">
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Indexpage;