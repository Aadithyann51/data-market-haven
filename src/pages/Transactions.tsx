
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileDown, ExternalLink, ReceiptText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchUserTransactions, Transaction } from "@/utils/database";
import { isAuthenticated } from "@/utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndLoadTransactions = async () => {
      const userAuthenticated = await isAuthenticated();
      
      if (!userAuthenticated) {
        navigate('/login');
        toast({
          title: "Authentication Required",
          description: "Please log in to view your transactions.",
          variant: "destructive",
        });
        return;
      }
      
      // Load transactions from Supabase
      try {
        const userTransactions = await fetchUserTransactions();
        setTransactions(userTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast({
          title: "Error Loading Transactions",
          description: "Failed to load your transactions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthAndLoadTransactions();
  }, [navigate, toast]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDownload = (transaction: Transaction) => {
    toast({
      title: "Download Started",
      description: `${transaction.data_title} is being downloaded`,
    });
    
    // Simulate download completion
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${transaction.data_title} has been successfully downloaded`,
      });
    }, 2000);
  };

  const handleExportReceipt = (transaction: Transaction) => {
    toast({
      title: "Exporting Receipt",
      description: `Receipt for ${transaction.data_title} is being generated`,
    });
    
    // Simulate export completion
    setTimeout(() => {
      toast({
        title: "Receipt Ready",
        description: "Transaction receipt has been downloaded",
      });
    }, 1500);
  };

  const openEtherscan = (txHash: string | undefined) => {
    if (txHash) {
      window.open(`https://sepolia.etherscan.io/tx/${txHash}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Transactions</h1>
          <p className="text-muted-foreground">View and manage your data purchases</p>
        </header>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{transaction.data_title}</CardTitle>
                      <CardDescription>
                        Transaction ID: {transaction.id}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {transaction.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Provider</p>
                      <p className="font-medium">{transaction.provider}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Purchase Date</p>
                      <p className="font-medium">{formatDate(transaction.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-bold">{transaction.price}</p>
                    </div>
                  </div>
                  
                  {transaction.tx_hash && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Blockchain Transaction</p>
                      <div className="flex items-center gap-2">
                        <code className="bg-slate-100 px-2 py-1 rounded text-xs flex-grow overflow-hidden text-ellipsis">
                          {transaction.tx_hash}
                        </code>
                        <Button variant="outline" size="sm" onClick={() => openEtherscan(transaction.tx_hash)}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handleDownload(transaction)}
                    >
                      <Download className="h-4 w-4" /> Download Data
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handleExportReceipt(transaction)}
                    >
                      <ReceiptText className="h-4 w-4" /> Export Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Transactions Found</CardTitle>
              <CardDescription>
                You haven't made any purchases yet. Browse our available data sets to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/browse-data')}
                className="gap-1"
              >
                <FileDown className="h-4 w-4" /> Browse Data Sets
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Transactions;
