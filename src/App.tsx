import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import { LayoutDashboard, Layers, FileText, Database, XIcon, File, Plus, MonitorDot, DollarSign, Users, X } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'Admin' | 'Editor' | 'Subscriber';
  joined: string;
  status: 'PENDING' | 'APPROVED' | 'DENIED';
}

interface FormErrors {
  name?: string;
  email?: string;
  userType?: string;
}

const initialFormData = {
  name: '',
  email: '',
  userType: 'Subscriber' as const,
};

function App() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Max Brand', email: 'maxbrand@mail.com', userType: 'Admin', joined: '25 Apr 2024', status: 'PENDING' },
    { id: '2', name: 'Andrew Simon', email: 'info@gmail.com', userType: 'Editor', joined: '25 Apr 2024', status: 'APPROVED' },
    { id: '3', name: 'Ron Kiperman', email: 'ronkiperman@gmail.com', userType: 'Subscriber', joined: '25 Apr 2024', status: 'APPROVED' },
    { id: '4', name: 'Mike Hardy', email: 'mikehardy@gmail.com', userType: 'Admin', joined: '25 Apr 2024', status: 'DENIED' },
    { id: '5', name: 'Kevin Peterson', email: 'kevinp@gmail.com', userType: 'Admin', joined: '25 Apr 2024', status: 'PENDING' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Growth',
        data: [30, 45, 57, 75, 85, 100],
        fill: false,
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.userType) {
      errors.userType = 'User type is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    if (editingUserId) {
      setUsers(users.map(user => 
        user.id === editingUserId
          ? { ...user, ...formData }
          : user
      ));
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        joined: currentDate,
        status: 'PENDING'
      };
      setUsers([...users, newUser]);
    }

    handleCloseModal();
  };

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      userType: user.userType,
    });
    setEditingUserId(user.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
    setFormErrors({});
    setEditingUserId(null);
  };

  const handleStatusChange = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const nextStatus = {
          'PENDING': 'APPROVED',
          'APPROVED': 'DENIED',
          'DENIED': 'PENDING'
        } as const;
        return { ...user, status: nextStatus[user.status] };
      }
      return user;
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center mb-8">
          <span className="text-2xl font-bold text-blue-500">blueBox</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-lg">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span className="font-medium">Dashboard</span>
          </div>
          <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Layers className="w-5 h-5 mr-3" />
            <span>UI Elements</span>
          </div>
          <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FileText className="w-5 h-5 mr-3" />
            <span>Components</span>
          </div>
          <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Database className="w-5 h-5 mr-3" />
            <span>Data Table</span>
          </div>
          <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <XIcon className="w-5 h-5 mr-3" />
            <span>Icons</span>
          </div>
          <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <File className="w-5 h-5 mr-3" />
            <span>Sample Page</span>
          </div>
        </div>

        <button className="mt-8 w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search Project..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between mb-4">
                <MonitorDot className="w-8 h-8" />
                <span className="text-purple-200">+60%</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">$150000</h3>
              <p className="text-purple-100">Stock Total</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8" />
                <span className="text-blue-200">+30%</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">$25000</h3>
              <p className="text-blue-100">Total Profit</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8" />
                <span className="text-orange-200">+80%</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">250000</h3>
              <p className="text-orange-100">Unique Visitors</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Growth Overview</h2>
            <div className="h-[300px] w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Standard Table Design</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.userType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleStatusChange(user.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' :
                            user.status === 'PENDING' ? 'bg-purple-100 text-purple-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingUserId ? 'Edit User' : 'Add New User'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter email"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">User Type</label>
                <select
                  value={formData.userType}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value as User['userType'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Subscriber">Subscriber</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
                {formErrors.userType && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.userType}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
                >
                  {editingUserId ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;