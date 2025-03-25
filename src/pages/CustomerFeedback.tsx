
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
  PieChart,
  Pie,
  Cell
} from "recharts";
import { QrCode, MessageSquare, Download, ThumbsUp, ThumbsDown, TrendingUp } from "lucide-react";
import Printer from "@/components/ui/icons/Printer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Sample feedback data
const FEEDBACK_DATA = [
  { id: 1, customer: "John D.", branch: "Downtown", rating: 4, sentiment: "positive", comment: "Great food and service, will come back!", date: "2023-08-15" },
  { id: 2, customer: "Sarah M.", branch: "Eastside", rating: 5, sentiment: "positive", comment: "Absolutely love the new menu items!", date: "2023-08-14" },
  { id: 3, customer: "Robert K.", branch: "Westside", rating: 2, sentiment: "negative", comment: "Waited too long for my order.", date: "2023-08-13" },
  { id: 4, customer: "Emily J.", branch: "Downtown", rating: 5, sentiment: "positive", comment: "The staff was incredibly friendly and helpful.", date: "2023-08-12" },
  { id: 5, customer: "Michael P.", branch: "Northside", rating: 3, sentiment: "neutral", comment: "Food was good but prices seem higher than before.", date: "2023-08-11" },
  { id: 6, customer: "Amanda L.", branch: "Eastside", rating: 1, sentiment: "negative", comment: "Cold food and slow service. Very disappointed.", date: "2023-08-10" },
  { id: 7, customer: "David S.", branch: "Downtown", rating: 4, sentiment: "positive", comment: "Great atmosphere, really enjoy the music selection.", date: "2023-08-09" },
  { id: 8, customer: "Jessica R.", branch: "Westside", rating: 5, sentiment: "positive", comment: "Best coffee in town, hands down!", date: "2023-08-08" },
];

// Sentiment distribution data
const SENTIMENT_DATA = [
  { name: "Positive", value: 5, color: "#4CAF50" },
  { name: "Neutral", value: 1, color: "#FFC107" },
  { name: "Negative", value: 2, color: "#F44336" },
];

// Branch ratings data
const BRANCH_RATINGS = [
  { branch: "Downtown", rating: 4.3 },
  { branch: "Eastside", rating: 3.8 },
  { branch: "Westside", rating: 3.5 },
  { branch: "Northside", rating: 4.0 },
];

const CustomerFeedback = () => {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [generatingQR, setGeneratingQR] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  
  // Filter feedback based on selections
  const filteredFeedback = FEEDBACK_DATA.filter(item => {
    const branchMatch = selectedBranch === "all" || item.branch === selectedBranch;
    const ratingMatch = selectedRating === null || item.rating === selectedRating;
    return branchMatch && ratingMatch;
  });

  const handleGenerateQR = () => {
    setGeneratingQR(true);
    setQrCode(null);
    
    // Simulate QR code generation with timeout
    setTimeout(() => {
      // Generate a sample QR code URL (in a real app, this would be an API call)
      const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://asterisk-feedback.example.com/feedback?branch=Downtown";
      
      setQrCode(qrUrl);
      setGeneratingQR(false);
      
      // Show toast notification when QR code is generated
      toast.success("QR Code Generated Successfully", {
        description: "Ready to be printed and displayed at your branch",
        position: "bottom-right"
      });
    }, 2000);
  };

  const handleExportReport = () => {
    toast.success("Report Exported", {
      description: "Customer feedback report has been exported to CSV"
    });
  };

  return (
    <div className="space-y-8">
      <Header
        title="Customer Feedback"
        subtitle="Analyze and improve based on customer opinions"
      />
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          className="flex items-center gap-2" 
          onClick={() => setQrDialogOpen(true)}
        >
          <QrCode size={18} />
          <span>Generate Feedback QR Code</span>
        </Button>
        
        <Button 
          className="flex items-center gap-2" 
          variant="outline"
          onClick={handleExportReport}
        >
          <Download size={18} />
          <span>Export Report</span>
        </Button>
      </div>
      
      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Branch Ratings" description="Average customer ratings">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={BRANCH_RATINGS}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="branch" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 5]} />
              <Tooltip />
              <Bar 
                dataKey="rating" 
                fill="#82B8D9" 
                radius={[4, 4, 0, 0]} 
                name="Average Rating" 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Sentiment Analysis" description="Overall feedback sentiment">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={SENTIMENT_DATA}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {SENTIMENT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      
      {/* Feedback Table */}
      <Card className="glass-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 text-asterisk-primary mr-2" />
              <h3 className="font-medium text-asterisk-text">Customer Feedback</h3>
            </div>
            
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    {selectedBranch === "all" ? "All Branches" : selectedBranch}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Filter by Branch</p>
                    <div className="space-y-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start" 
                        onClick={() => setSelectedBranch("all")}
                      >
                        All Branches
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start" 
                        onClick={() => setSelectedBranch("Downtown")}
                      >
                        Downtown
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start" 
                        onClick={() => setSelectedBranch("Eastside")}
                      >
                        Eastside
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start" 
                        onClick={() => setSelectedBranch("Westside")}
                      >
                        Westside
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start" 
                        onClick={() => setSelectedBranch("Northside")}
                      >
                        Northside
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    {selectedRating === null ? "All Ratings" : `${selectedRating} Stars`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Filter by Rating</p>
                    <div className="space-y-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start" 
                        onClick={() => setSelectedRating(null)}
                      >
                        All Ratings
                      </Button>
                      {[5, 4, 3, 2, 1].map(rating => (
                        <Button 
                          key={rating}
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start" 
                          onClick={() => setSelectedRating(rating)}
                        >
                          {rating} Stars
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Branch</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Rating</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Sentiment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Comment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedback.map(feedback => (
                  <tr key={feedback.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{feedback.customer}</td>
                    <td className="py-3 px-4 text-sm">{feedback.branch}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${feedback.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                          feedback.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                      >
                        {feedback.sentiment === 'positive' ? <ThumbsUp className="w-3 h-3 mr-1" /> : 
                         feedback.sentiment === 'negative' ? <ThumbsDown className="w-3 h-3 mr-1" /> :
                         <TrendingUp className="w-3 h-3 mr-1" />}
                        {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm max-w-xs truncate">{feedback.comment}</td>
                    <td className="py-3 px-4 text-sm">{new Date(feedback.date).toLocaleDateString()}</td>
                  </tr>
                ))}
                {filteredFeedback.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-sm text-gray-500">
                      No feedback matches your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      
      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Feedback QR Code</DialogTitle>
            <DialogDescription>
              Create a QR code for customers to scan and provide feedback
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="branch" className="text-sm font-medium text-asterisk-text">Branch</label>
              <select 
                id="branch" 
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Downtown">Downtown</option>
                <option value="Eastside">Eastside</option>
                <option value="Westside">Westside</option>
                <option value="Northside">Northside</option>
              </select>
            </div>
            
            {qrCode ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="border border-gray-200 p-4 rounded-md">
                  <img src={qrCode} alt="Feedback QR Code" width={200} height={200} />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" />
                    Download PNG
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer size={16} className="mr-2" />
                    Print
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-4">
                {generatingQR ? (
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Generating QR code...</p>
                  </div>
                ) : (
                  <Button onClick={handleGenerateQR}>Generate QR Code</Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerFeedback;
