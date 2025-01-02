import { useState } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Activity,
  TrendingUp,
  TrendingDown,
  Package,
} from "lucide-react";

const Dashboard = () => {
  const [analytics] = useState({
    totalUsers: 1200,
    activeUsers: 456,
    totalOrders: 234,
    totalRevenue: 12345,
  });

  const [recentActivity] = useState([
    { content: "User John placed an order.", timestamp: new Date() },
    { content: "New product added to the inventory.", timestamp: new Date() },
    { content: "Monthly revenue report generated.", timestamp: new Date() },
  ]);

  const stats = [
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
      trend: TrendingUp,
      trendColor: "text-green-500",
    },
    {
      title: "Active Users",
      value: analytics.activeUsers,
      icon: Activity,
      color: "bg-green-500",
      change: "+5%",
      trend: TrendingUp,
      trendColor: "text-green-500",
    },
    {
      title: "Total Orders",
      value: analytics.totalOrders,
      icon: ShoppingBag,
      color: "bg-purple-500",
      change: "-3%",
      trend: TrendingDown,
      trendColor: "text-red-500",
    },
    {
      title: "Revenue",
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-yellow-500",
      change: "+8%",
      trend: TrendingUp,
      trendColor: "text-green-500",
    },
  ];

  const quickStats = [
    {
      label: "Products in Stock",
      value: "1,234",
      icon: Package,
      color: "text-blue-500",
    },
    {
      label: "Pending Orders",
      value: "23",
      icon: ShoppingBag,
      color: "text-yellow-500",
    },
    {
      label: "Active Users Today",
      value: "456",
      icon: Users,
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6 font-Roobert changeFontSpacing">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-transdashboard rounded-lg shadow-sm p-6 flex items-center space-x-4"
          >
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">{stat.title}</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <div className={`flex items-center ${stat.trendColor} text-sm`}>
                  <stat.trend className="h-4 w-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-transparent rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center space-x-3 p-4 bg-transdashboard rounded-lg"
            >
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-transdashboard rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 hover:bg-menu rounded-lg transition-colors"
            >
              <div className="flex-shrink-0">
                <Activity className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.content}</p>
                <p className="text-xs text-gray-500">
                  {(activity.timestamp, "PPp")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
