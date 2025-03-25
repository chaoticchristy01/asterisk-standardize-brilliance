
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { stockItems as initialStockItems } from "@/utils/demoData";
import { Package, PackagePlus, AlertTriangle, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import AddItemModal from "@/components/inventory/AddItemModal";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBranch, setFilterBranch] = useState("All Branches");
  const [stockItems, setStockItems] = useState(initialStockItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Calculate branch options
  const branchOptions = ["All Branches", ...new Set(stockItems.map(item => item.branch))];
  
  // Filter stock items based on search and branch filter
  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = filterBranch === "All Branches" || item.branch === filterBranch;
    return matchesSearch && matchesBranch;
  });
  
  // Count low stock items
  const lowStockCount = stockItems.filter(item => item.status === "low").length;
  
  // Calculate overall stock level
  const calculateStockLevel = () => {
    const totalItems = stockItems.length;
    if (totalItems === 0) return 0;
    
    const normalItems = stockItems.filter(item => item.status === "normal").length;
    return Math.round((normalItems / totalItems) * 100);
  };
  
  const stockLevel = calculateStockLevel();
  
  // Handle adding a new item
  const handleAddItem = (newItem: any) => {
    const newItemWithId = {
      id: stockItems.length + 1,
      name: newItem.name,
      quantity: newItem.quantity,
      threshold: newItem.threshold,
      branch: newItem.branch,
      status: newItem.quantity < newItem.threshold ? "low" : "normal"
    };
    
    setStockItems([...stockItems, newItemWithId]);
    toast({
      title: "Success",
      description: `${newItem.name} has been added to inventory.`,
    });
  };
  
  return (
    <div className="space-y-8">
      <Header 
        title="Inventory Management" 
        subtitle="Track and manage stock across all branches"
      />
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6 hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Items</p>
              <h3 className="text-2xl font-bold mt-2 text-asterisk-text">{stockItems.length}</h3>
            </div>
            <div className="rounded-full p-2 bg-asterisk-primary/10 text-asterisk-primary">
              <Package size={20} />
            </div>
          </div>
        </Card>
        
        <Card className="glass-card p-6 hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Low Stock Alert</p>
              <h3 className="text-2xl font-bold mt-2 text-asterisk-text">{lowStockCount} items</h3>
            </div>
            <div className="rounded-full p-2 bg-amber-100 text-amber-500">
              <AlertTriangle size={20} />
            </div>
          </div>
        </Card>
        
        <Card className="glass-card p-6 hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Stock Level</p>
              <h3 className="text-2xl font-bold mt-2 text-asterisk-text">{stockLevel}%</h3>
              <div className="mt-2 w-full">
                <Progress value={stockLevel} className="h-2" />
              </div>
            </div>
            <div className="rounded-full p-2 bg-green-100 text-green-500">
              <Check size={20} />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search inventory items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border-gray-200"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-asterisk-primary focus:border-transparent"
          >
            {branchOptions.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          <Button 
            className="bg-asterisk-primary hover:bg-asterisk-secondary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <PackagePlus size={16} className="mr-2" />
            Add New Item
          </Button>
        </div>
      </div>
      
      {/* Inventory Table */}
      <Card className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-medium">Item Name</TableHead>
              <TableHead className="font-medium">Branch</TableHead>
              <TableHead className="font-medium text-right">Quantity</TableHead>
              <TableHead className="font-medium text-right">Threshold</TableHead>
              <TableHead className="font-medium text-center">Status</TableHead>
              <TableHead className="font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map(item => (
              <TableRow key={item.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.branch}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">{item.threshold}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant="outline" 
                    className={`
                      ${item.status === 'low' 
                        ? 'border-red-200 text-red-500 bg-red-50' 
                        : 'border-green-200 text-green-500 bg-green-50'
                      }
                    `}
                  >
                    {item.status === 'low' ? 'Low Stock' : 'Normal'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`
                      ${item.status === 'low' 
                        ? 'text-asterisk-primary hover:text-asterisk-primary hover:bg-asterisk-primary/10' 
                        : 'text-muted-foreground hover:text-asterisk-primary hover:bg-asterisk-primary/10'
                      }
                    `}
                  >
                    Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      {/* Add Item Modal */}
      <AddItemModal 
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default Inventory;
