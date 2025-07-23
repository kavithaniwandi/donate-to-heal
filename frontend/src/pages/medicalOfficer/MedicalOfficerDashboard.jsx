import { Link } from 'react-router-dom';

export default function MedicalOfficerDashboard() {
    // Sample data - replace with actual data from your API
    const patientCases = [
        {
            _id: '1',
            patientId: { name: 'John Doe' },
            caseDescription: 'Severe back pain',
            medicalCondition: 'Herniated disc',
            caseStatus: 'Pending',
            priority: 'High',
            submissionDate: new Date('2023-05-15')
        },
        {
            _id: '2',
            patientId: { name: 'Jane Smith' },
            caseDescription: 'Chronic headaches',
            medicalCondition: 'Migraine',
            caseStatus: 'Under Review',
            priority: 'Medium',
            submissionDate: new Date('2023-05-10')
        },
        {
            _id: '3',
            patientId: { name: 'Robert Johnson' },
            caseDescription: 'Knee injury',
            medicalCondition: 'ACL tear',
            caseStatus: 'Approved',
            priority: 'High',
            submissionDate: new Date('2023-05-05')
        }
    ];

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <nav className="bg-blue-600 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold">Medical Officer Dashboard</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link 
                                    to="/medical-officer" 
                                    className="px-3 py-2 rounded-md text-sm font-medium bg-blue-700"
                                >
                                    Home
                                </Link>
                                <Link 
                                    to="/patientCase" 
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                                >
                                    New Case
                                </Link>
                                <Link 
                                    to="/medical-officer/donation-history" 
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                                >
                                    Donation History
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Patient Cases</h2>
                    </div>
                    
                    {/* Patient Cases Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Patient Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Case Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Medical Condition
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Priority
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Submission Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {patientCases.map((caseItem) => (
                                    <tr key={caseItem._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {caseItem.patientId.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {caseItem.caseDescription}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {caseItem.medicalCondition}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${caseItem.caseStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                  caseItem.caseStatus === 'Under Review' ? 'bg-blue-100 text-blue-800' : 
                                                  caseItem.caseStatus === 'Approved' ? 'bg-green-100 text-green-800' : 
                                                  'bg-red-100 text-red-800'}`}>
                                                {caseItem.caseStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${caseItem.priority === 'Low' ? 'bg-green-100 text-green-800' : 
                                                  caseItem.priority === 'Medium' ? 'bg-blue-100 text-blue-800' : 
                                                  caseItem.priority === 'High' ? 'bg-yellow-100 text-yellow-800' : 
                                                  'bg-red-100 text-red-800'}`}>
                                                {caseItem.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(caseItem.submissionDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                Edit
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

