import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  MapPin,
  Star,
  Video,
  Heart,
  Package,
  Bell,
  Settings,
  Search,
  Filter,
  Calendar,
  Eye,
  MessageCircle,
  Upload,
  ChevronDown,
  Menu
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-lime-400 to-green-500 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">ArtisanHub</h1>
              </div>
              
              <nav className="hidden md:flex items-center space-x-1">
                <button className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
                  Dashboard
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center space-x-1">
                  <span>Products</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center space-x-1">
                  <span>Orders</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Customers
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Hello, User </h2>
                <p className="text-gray-600">Your total sales status is going right now</p>
              </div>

              {/* Circular Progress Chart */}
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="relative mb-8 lg:mb-0">
                  <div className="relative w-64 h-64">
                    {/* Background Circle */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="transparent"
                        stroke="#f3f4f6"
                        strokeWidth="8"
                      />
                      {/* Progress Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="transparent"
                        stroke="url(#gradient1)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${87 * 2.2} ${(100 - 87) * 2.2}`}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#84cc16" />
                          <stop offset="50%" stopColor="#65a30d" />
                          <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Center Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 mb-2">87%</div>
                        <div className="text-gray-600 text-sm font-medium">Returning customers</div>
                        <div className="text-gray-500 text-xs">from last 6 countries</div>
                      </div>
                    </div>

                    {/* Data Points */}
                    <div className="absolute top-4 left-12 bg-white rounded-full p-2 shadow-lg border border-gray-100">
                      <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
                    </div>
                    <div className="absolute top-12 right-8 bg-white rounded-full p-2 shadow-lg border border-gray-100">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-16 left-4 bg-white rounded-full p-2 shadow-lg border border-gray-100">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-8 right-12 bg-white rounded-full p-2 shadow-lg border border-gray-100">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Countries Count */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">37K</div>
                      <div className="text-xs text-gray-500">Countries</div>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 lg:ml-8">
                  <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-2xl p-6 border border-lime-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">16,523</div>
                        <div className="text-gray-600 text-sm">Customers</div>
                      </div>
                      <div className="bg-lime-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Fast Growth
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">Your last month customer growth rate is going faster than other months</p>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">₹80,000</div>
                        <div className="text-gray-600 text-sm">Revenue</div>
                      </div>
                      <div className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Record High
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">This quarter revenue has exceeded all expectations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue by Locations */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Revenue By Locations</h3>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-lg font-bold">₹ 86K</span>
                  <span className="text-sm">INDIA</span>
                </div>
              </div>

              {/* World Map Visualization */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 h-64 overflow-hidden">
                {/* Simplified world map representation */}
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <path d="M50,50 Q100,30 150,50 T250,50 Q300,40 350,60 L350,150 Q300,140 250,150 T150,150 Q100,160 50,150 Z" fill="#6b7280" />
                  </svg>
                </div>

                {/* Location markers */}
                <div className="absolute top-12 left-16 bg-red-400 rounded-full p-2 shadow-lg animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-20 left-32 bg-orange-400 rounded-full p-2 shadow-lg animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-16 right-24 bg-green-400 rounded-full p-2 shadow-lg animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute bottom-20 left-20 bg-blue-400 rounded-full p-2 shadow-lg animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute bottom-16 right-32 bg-purple-400 rounded-full p-2 shadow-lg animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                {/* Location pin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <MapPin className="w-8 h-8 text-lime-500 drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Metrics */}
          <div className="space-y-6">
            {/* Top Products */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top Products</h3>
              <div className="space-y-4">
                {[
                  { name: 'Ceramic Bowl Set', sales: 234, revenue: '₹2,340', trend: '+12%' },
                  { name: 'Handwoven Basket', sales: 189, revenue: '₹1,890', trend: '+8%' },
                  { name: 'Pottery Vase', sales: 156, revenue: '₹5000', trend: '+15%' }
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                      <div className="text-gray-500 text-xs">{product.sales} sold</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-sm">{product.revenue}</div>
                      <div className="text-green-500 text-xs">{product.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {[
                  { id: '#1234', customer: 'Sai Krishna', amount: '₹200', status: 'Completed' },
                  { id: '#1235', customer: 'hima kishore', amount: '₹300', status: 'Processing' },
                  { id: '#1236', customer: 'Varun kumar reddy', amount: '₹156', status: 'Shipped' }
                ].map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{order.id}</div>
                      <div className="text-gray-500 text-xs">{order.customer}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-sm">{order.amount}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials Inventory */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Materials Stock</h3>
              <div className="space-y-3">
                {[
                  { name: 'Clay', stock: 85, status: 'Good' },
                  { name: 'Glazes', stock: 23, status: 'Low' },
                  { name: 'Tools', stock: 67, status: 'Good' }
                ].map((material, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        material.status === 'Good' ? 'bg-green-400' : 'bg-yellow-400'
                      }`}></div>
                      <span className="text-gray-900 text-sm font-medium">{material.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900 font-bold text-sm">{material.stock}%</div>
                      <div className={`text-xs ${
                        material.status === 'Good' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {material.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;