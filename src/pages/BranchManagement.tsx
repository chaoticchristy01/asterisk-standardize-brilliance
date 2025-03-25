
import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import ChartCard from "@/components/dashboard/ChartCard";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from "recharts";
import { Building2, Plus, Edit, AlertTriangle, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { stockItems } from "@/utils/demoData";

// Branch data
const BRANCHES = [
  { 
    id: 1, 
    name: "Downtown", 
    address: "123 Main St", 
    manager: "Sarah Johnson", 
    employees: 15, 
    openDate: "2020-05-12",
    performance: { service: 87, speed: 82, cleanliness: 90, overall: 86 },
    alertLevel: "normal" 
  },
  { 
    id: 2, 
    name: "Eastside", 
    address: "456 Oak Ave", 
    manager: "Michael Davis", 
    employees: 12, 
    openDate: "2021-01-18",
    performance: { service: 82, speed: 78, cleanliness: 85, overall: 81 },
    alertLevel: "normal" 
  },
  { 
    id: 3, 
    name: "Westside", 
    address: "789 Elm Blvd", 
    manager: "Jennifer Wilson", 
    employees: 10, 
    openDate: "2021-08-05",
    performance: { service: 72, speed: 70, cleanliness: 80, overall: 74 },
    alertLevel: "warning" 
  },
  { 
    id: 4, 
    name: "Northside", 
    address: "234 Pine St", 
    manager: "Robert Brown", 
    employees: 14, 
    openDate: "2022-03-15",
    performance: { service: 85, speed: 75, cleanliness: 88, overall: 83 },
    alertLevel: "normal" 
  },
];

// Branch comparison data
const BRANCH_PERFORMANCE = [
  { branch: "Downtown", service: 87, speed: 82, cleanliness: 90, revenue: 42500 },
  { branch: "Eastside", service: 82, speed: 78, cleanliness: 85, revenue: 38200 },
  { branch: "Westside", service: 72, speed: 70, cleanliness: 80, revenue: 31000 },
  { branch: "Northside", service: 85, speed: 75, cleanliness: 88, revenue: 39800 },
];

// Radar chart data
const RADAR_DATA = [
  { subject: 'Service', Downtown: 87, Eastside: 82, Westside: 72, Northside: 85, fullMark: 100 },
  { subject: 'Speed', Downtown: 82, Eastside: 78, Westside: 70, Northside: 75, fullMark: 100 },
  { subject: 'Cleanliness', Downtown: 90, Eastside: 85, Westside: 80, Northside: 88, fullMark: 100 },
  { subject: 'Staff', Downtown: 88, Eastside: 80, Westside: 75, Northside: 86, fullMark: 100 },
  { subject: 'Menu', Downtown: 85, Eastside: 83, Westside: 78, Northside: 84, fullMark: 100 },
];

// Weekly revenue data
const WEEKLY_REVENUE = [
  { week: 'Week 1', Downtown: 9800, Eastside: 8900, Westside: 7200, Northside: 9100 },
  { week: 'Week 2', Downtown: 10200, Eastside: 9300, Westside: 7500, Northside: 9700 },
  { week: 'Week 3', Downtown: 10800, Eastside: 9600, Westside: 7800, Northside: 10300 },
  { week: 'Week 4', Downtown: 11700, Eastside: 10400, Westside: 8500, Northside: 10700 },
];

// Filter low stock items by branch
const getLowStockByBranch = (branchName: string) => {
  return stockItems.filter(item => item.status === "low" && item.branch === branchName);
};

const BranchManagement = () => {
  const [addBranchOpen, setAddBranchOpen] = useState(false);
  const [editBranchOpen, setEditBranchOpen] = useState(false);
  const [deleteBranchOpen, setDeleteBranchOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [comparisonView, setComparisonView] = useState<"radar" | "bar">("radar");
  
  const handleEditBranch = (branch: any) => {
    setSelectedBranch(branch);
    setEditBranchOpen(true);
  };
  
  const handleDeleteBranch = (branch: any) => {
    setSelectedBranch(branch);
    setDeleteBranchOpen(true);
  };
  
  const handleSaveBranch = () => {
    setAddBranchOpen(false);
    toast.success("Branch Added Successfully", {
      description: "The new branch has been added to the system"
    });
  };
  
  const handleUpdateBranch = () => {
    setEditBranchOpen(false);
    toast.success("Branch Updated", {
      description: "Branch information has been updated successfully"
    });
  };
  
  const confirmDeleteBranch = () => {
    setDeleteBranchOpen(false);
    toast.success("Branch Deleted", {
      description: `${selectedBranch?.name} branch has been removed from the system`
    });
  };
  
  const toggleComparisonView = () => {
    setComparisonView(comparisonView === "radar" ? "bar" : "radar");
  };

  return (
    <div className="space-y-8">
      <Header
        title="Branch Management"
        subtitle="Monitor and manage all branch locations"
      />
      
      {/* Action Button */}
      <div className="flex justify-end">
        <Button 
          className="flex items-center gap-2" 
          onClick={() => setAddBranchOpen(true)}
        >
          <Plus size={18} />
          <span>Add New Branch</span>
        </Button>
      </div>
      
      {/* Branch Performance Comparison */}
      <ChartCard 
        title="Branch Performance Comparison" 
        description="Key metrics across all branches"
        action={
          <Button variant="outline" size="sm" onClick={toggleComparisonView}>
            {comparisonView === "radar" ? "Show Bar Chart" : "Show Radar Chart"}
          </Button>
        }
      >
        {comparisonView === "radar" ? (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart outerRadius={150} data={RADAR_DATA}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Downtown" dataKey="Downtown" stroke="#5C98BA" fill="#5C98BA" fillOpacity={0.5} />
              <Radar name="Eastside" dataKey="Eastside" stroke="#3E7A99" fill="#3E7A99" fillOpacity={0.5} />
              <Radar name="Westside" dataKey="Westside" stroke="#82B8D9" fill="#82B8D9" fillOpacity={0.5} />
              <Radar name="Northside" dataKey="Northside" stroke="#C0D6E4" fill="#C0D6E4" fillOpacity={0.5} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={BRANCH_PERFORMANCE}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="branch" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="service" name="Service" fill="#5C98BA" radius={[4, 4, 0, 0]} />
              <Bar dataKey="speed" name="Speed" fill="#3E7A99" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cleanliness" name="Cleanliness" fill="#82B8D9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
      
      {/* Weekly Revenue Chart */}
      <ChartCard title="Weekly Revenue" description="Last 4 weeks performance">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={WEEKLY_REVENUE}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
            <Legend />
            <Bar dataKey="Downtown" name="Downtown" fill="#5C98BA" />
            <Bar dataKey="Eastside" name="Eastside" fill="#3E7A99" />
            <Bar dataKey="Westside" name="Westside" fill="#82B8D9" />
            <Bar dataKey="Northside" name="Northside" fill="#C0D6E4" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      
      {/* Branch List */}
      <Card className="glass-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Building2 className="w-5 h-5 text-asterisk-primary mr-2" />
            <h3 className="font-medium text-asterisk-text">Branch Locations</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRANCHES.map(branch => {
              const lowStockItems = getLowStockByBranch(branch.name);
              
              return (
                <Card key={branch.id} className={`border ${branch.alertLevel === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-gray-200'}`}>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-asterisk-text flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-asterisk-primary" />
                          {branch.name}
                          {branch.alertLevel === 'warning' && (
                            <span className="ml-2 text-amber-500">
                              <AlertTriangle className="w-4 h-4" />
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{branch.address}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => handleEditBranch(branch)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Manager</p>
                        <p className="text-sm font-medium">{branch.manager}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Employees</p>
                        <p className="text-sm font-medium">{branch.employees}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Opening Date</p>
                        <p className="text-sm font-medium">{new Date(branch.openDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Performance</p>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                            <div 
                              className={`h-1.5 rounded-full ${branch.performance.overall >= 85 ? 'bg-green-500' : branch.performance.overall >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${branch.performance.overall}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{branch.performance.overall}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {lowStockItems.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs flex items-center text-amber-600">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {lowStockItems.length} low stock items
                        </p>
                      </div>
                    )}
                    
                    {branch.alertLevel === 'warning' && (
                      <div className="mt-4 p-2 bg-amber-100 rounded text-xs text-amber-800">
                        <p className="font-medium">Attention needed</p>
                        <p>This branch has below-target performance metrics.</p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Card>
      
      {/* Add Branch Dialog */}
      <Dialog open={addBranchOpen} onOpenChange={setAddBranchOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Branch</DialogTitle>
            <DialogDescription>
              Enter the details for the new branch location
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Branch Name</label>
              <input 
                id="name" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g. Southside"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Address</label>
              <input 
                id="address" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter full address"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="manager" className="text-sm font-medium">Branch Manager</label>
              <input 
                id="manager" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Full name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="employees" className="text-sm font-medium">Number of Employees</label>
              <input 
                id="employees" 
                type="number" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g. 15"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="openDate" className="text-sm font-medium">Opening Date</label>
              <input 
                id="openDate" 
                type="date" 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddBranchOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveBranch}>Add Branch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Branch Dialog */}
      {selectedBranch && (
        <Dialog open={editBranchOpen} onOpenChange={setEditBranchOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Branch</DialogTitle>
              <DialogDescription>
                Update information for {selectedBranch.name} branch
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">Branch Name</label>
                <input 
                  id="edit-name" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={selectedBranch.name}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-address" className="text-sm font-medium">Address</label>
                <input 
                  id="edit-address" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={selectedBranch.address}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-manager" className="text-sm font-medium">Branch Manager</label>
                <input 
                  id="edit-manager" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={selectedBranch.manager}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-employees" className="text-sm font-medium">Number of Employees</label>
                <input 
                  id="edit-employees" 
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={selectedBranch.employees}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleDeleteBranch(selectedBranch)}>
                  Delete Branch
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditBranchOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateBranch}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Confirmation Dialog */}
      {selectedBranch && (
        <AlertDialog open={deleteBranchOpen} onOpenChange={setDeleteBranchOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Branch</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedBranch.name} branch? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={confirmDeleteBranch}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default BranchManagement;
