
import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon, Users, Box, Truck, Zap, Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

// Sample user data
const USERS = [
  { id: 1, name: "Admin User", email: "admin@asterisk.com", role: "Administrator", lastLogin: "2023-08-15 09:32" },
  { id: 2, name: "Sarah Johnson", email: "sarah@asterisk.com", role: "Branch Manager", lastLogin: "2023-08-14 12:45" },
  { id: 3, name: "Mike Peterson", email: "mike@asterisk.com", role: "Inventory Manager", lastLogin: "2023-08-15 08:15" },
  { id: 4, name: "John Smith", email: "john@asterisk.com", role: "Staff", lastLogin: "2023-08-13 17:20" },
];

// Sample supplier data
const SUPPLIERS = [
  { id: 1, name: "Fresh Foods Inc.", contact: "David Miller", phone: "(555) 123-4567", email: "david@freshfoods.com", category: "Produce" },
  { id: 2, name: "Quality Meats", contact: "Linda Carter", phone: "(555) 987-6543", email: "linda@qualitymeats.com", category: "Meat" },
  { id: 3, name: "Creamy Dairy", contact: "Michael Brown", phone: "(555) 456-7890", email: "michael@creamydairy.com", category: "Dairy" },
  { id: 4, name: "Baked Goods Co.", contact: "Jennifer White", phone: "(555) 234-5678", email: "jennifer@bakedgoods.com", category: "Bakery" },
];

const Settings = () => {
  // State for different dialogs
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [deleteSupplierOpen, setDeleteSupplierOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  
  // System settings state
  const [settings, setSettings] = useState({
    inventoryThreshold: 10,
    performanceThreshold: 75,
    automaticOrders: true,
    feedbackReminders: true,
    dataBackup: true,
    emailNotifications: true
  });
  
  // Handle system settings change
  const handleSettingChange = (setting: string, value: any) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };
  
  // Handle saving settings
  const handleSaveSettings = () => {
    toast.success("Settings Saved", {
      description: "Your system settings have been updated successfully"
    });
  };
  
  // User management functions
  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setDeleteUserOpen(true);
  };
  
  const confirmDeleteUser = () => {
    setDeleteUserOpen(false);
    toast.success("User Deleted", {
      description: `${selectedUser?.name} has been removed from the system`
    });
  };
  
  const handleAddUser = () => {
    setAddUserOpen(false);
    toast.success("User Added", {
      description: "New user has been added to the system"
    });
  };
  
  // Supplier management functions
  const handleDeleteSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setDeleteSupplierOpen(true);
  };
  
  const confirmDeleteSupplier = () => {
    setDeleteSupplierOpen(false);
    toast.success("Supplier Deleted", {
      description: `${selectedSupplier?.name} has been removed from the system`
    });
  };
  
  const handleAddSupplier = () => {
    setAddSupplierOpen(false);
    toast.success("Supplier Added", {
      description: "New supplier has been added to the system"
    });
  };

  return (
    <div className="space-y-8">
      <Header
        title="Settings"
        subtitle="Configure system preferences and manage users"
      />
      
      {/* Save Settings Button */}
      <div className="flex justify-end">
        <Button 
          className="flex items-center gap-2" 
          onClick={handleSaveSettings}
        >
          <Save size={18} />
          <span>Save All Settings</span>
        </Button>
      </div>
      
      {/* System Preferences */}
      <Card className="glass-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <SettingsIcon className="w-5 h-5 text-asterisk-primary mr-2" />
            <h3 className="font-medium text-lg text-asterisk-text">System Preferences</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="inventoryThreshold" className="text-sm font-medium block mb-1">
                  Low Inventory Threshold
                </label>
                <input 
                  id="inventoryThreshold" 
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.inventoryThreshold}
                  onChange={(e) => handleSettingChange('inventoryThreshold', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Items below this quantity will trigger low stock alerts
                </p>
              </div>
              
              <div>
                <label htmlFor="performanceThreshold" className="text-sm font-medium block mb-1">
                  Performance Alert Threshold
                </label>
                <input 
                  id="performanceThreshold" 
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.performanceThreshold}
                  onChange={(e) => handleSettingChange('performanceThreshold', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Branches below this performance percentage will be flagged
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="automaticOrders" className="text-sm font-medium">
                    Automatic Orders
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    System will automatically place orders for low stock items
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.automaticOrders}
                    onChange={() => handleSettingChange('automaticOrders', !settings.automaticOrders)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-asterisk-primary"></div>
                </label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="feedbackReminders" className="text-sm font-medium">
                    Customer Feedback Reminders
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Remind cashiers to encourage customers to leave feedback
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.feedbackReminders}
                    onChange={() => handleSettingChange('feedbackReminders', !settings.feedbackReminders)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-asterisk-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="dataBackup" className="text-sm font-medium">
                    Automatic Data Backup
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    System will back up all data every 24 hours
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.dataBackup}
                    onChange={() => handleSettingChange('dataBackup', !settings.dataBackup)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-asterisk-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="emailNotifications" className="text-sm font-medium">
                    Email Notifications
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Send email alerts for important system events
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.emailNotifications}
                    onChange={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-asterisk-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* User Management */}
      <Card className="glass-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-asterisk-primary mr-2" />
              <h3 className="font-medium text-lg text-asterisk-text">User Management</h3>
            </div>
            <Button 
              size="sm"
              onClick={() => setAddUserOpen(true)}
            >
              Add User
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Last Login</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-asterisk-text">Actions</th>
                </tr>
              </thead>
              <tbody>
                {USERS.map(user => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-sm">{user.email}</td>
                    <td className="py-3 px-4 text-sm">{user.role}</td>
                    <td className="py-3 px-4 text-sm">{user.lastLogin}</td>
                    <td className="py-3 px-4 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-2">
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="h-8 px-2"
                          onClick={() => handleDeleteUser(user)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      
      {/* Supplier Management */}
      <Card className="glass-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Truck className="w-5 h-5 text-asterisk-primary mr-2" />
              <h3 className="font-medium text-lg text-asterisk-text">Supplier Management</h3>
            </div>
            <Button 
              size="sm"
              onClick={() => setAddSupplierOpen(true)}
            >
              Add Supplier
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Supplier Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Contact Person</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-asterisk-text">Actions</th>
                </tr>
              </thead>
              <tbody>
                {SUPPLIERS.map(supplier => (
                  <tr key={supplier.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{supplier.name}</td>
                    <td className="py-3 px-4 text-sm">{supplier.contact}</td>
                    <td className="py-3 px-4 text-sm">{supplier.phone}</td>
                    <td className="py-3 px-4 text-sm">{supplier.email}</td>
                    <td className="py-3 px-4 text-sm">{supplier.category}</td>
                    <td className="py-3 px-4 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-2">
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="h-8 px-2"
                          onClick={() => handleDeleteSupplier(supplier)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      
      {/* Integration Settings */}
      <Card className="glass-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Zap className="w-5 h-5 text-asterisk-primary mr-2" />
            <h3 className="font-medium text-lg text-asterisk-text">Integration Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="text-sm font-medium block mb-1">
                  API Key
                </label>
                <div className="flex">
                  <input 
                    id="apiKey" 
                    type="password" 
                    className="flex-1 p-2 border border-gray-300 rounded-l-md"
                    value="sk_test_asterisk_integration_key"
                    readOnly
                  />
                  <Button className="rounded-l-none" variant="secondary">
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Use this key to connect external systems to Asterisk
                </p>
              </div>
              
              <div>
                <label htmlFor="webhookUrl" className="text-sm font-medium block mb-1">
                  Webhook URL
                </label>
                <input 
                  id="webhookUrl" 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value="https://api.asterisk.example.com/webhooks"
                  readOnly
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Send data to this URL to integrate with Asterisk
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Connected Services</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Order Processing System</p>
                        <p className="text-xs text-muted-foreground">Connected since Aug 12, 2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Disconnect
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Notification Service</p>
                        <p className="text-xs text-muted-foreground">Connected since Aug 15, 2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Disconnect
                    </Button>
                  </div>
                  
                  <Button className="w-full mt-2" variant="outline">
                    Connect New Service
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with appropriate permissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="userName" className="text-sm font-medium">Full Name</label>
              <input 
                id="userName" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter user's full name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="userEmail" className="text-sm font-medium">Email Address</label>
              <input 
                id="userEmail" 
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="user@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="userRole" className="text-sm font-medium">Role</label>
              <select 
                id="userRole" 
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a role</option>
                <option value="Administrator">Administrator</option>
                <option value="Branch Manager">Branch Manager</option>
                <option value="Inventory Manager">Inventory Manager</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="userPassword" className="text-sm font-medium">Temporary Password</label>
              <input 
                id="userPassword" 
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter temporary password"
              />
              <p className="text-xs text-muted-foreground">
                User will be prompted to change this on first login
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Supplier Dialog */}
      <Dialog open={addSupplierOpen} onOpenChange={setAddSupplierOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>
              Add a new supplier to the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="supplierName" className="text-sm font-medium">Supplier Name</label>
              <input 
                id="supplierName" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Company name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contactPerson" className="text-sm font-medium">Contact Person</label>
              <input 
                id="contactPerson" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Full name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="supplierPhone" className="text-sm font-medium">Phone Number</label>
              <input 
                id="supplierPhone" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="supplierEmail" className="text-sm font-medium">Email Address</label>
              <input 
                id="supplierEmail" 
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="contact@supplier.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="supplierCategory" className="text-sm font-medium">Category</label>
              <select 
                id="supplierCategory" 
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a category</option>
                <option value="Produce">Produce</option>
                <option value="Meat">Meat</option>
                <option value="Dairy">Dairy</option>
                <option value="Bakery">Bakery</option>
                <option value="Beverages">Beverages</option>
                <option value="Dry Goods">Dry Goods</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSupplierOpen(false)}>Cancel</Button>
            <Button onClick={handleAddSupplier}>Add Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Confirmation */}
      {selectedUser && (
        <AlertDialog open={deleteUserOpen} onOpenChange={setDeleteUserOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete User</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedUser.name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={confirmDeleteUser}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      
      {/* Delete Supplier Confirmation */}
      {selectedSupplier && (
        <AlertDialog open={deleteSupplierOpen} onOpenChange={setDeleteSupplierOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Supplier</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedSupplier.name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={confirmDeleteSupplier}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default Settings;
