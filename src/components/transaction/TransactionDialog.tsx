import { useState } from "react";
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Wallet, Download, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { connectWallet, sendTransaction, formatAddress, convertToEth } from "@/utils/ethereum";
import { Separator } from "@/components/ui/separator";
import { createTransaction } from "@/utils/database";
import { isAuthenticated } from "@/utils/supabaseClient";
import { useNavigate } from "react-router-dom";

interface TransactionDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dataItem: {
    id: number;
    title: string;
    price: string;
    provider: string;
  } | null;
  onTransactionComplete: () => void;
}

const TransactionDialog = ({
  isOpen,
  setIsOpen,
  dataItem,
  onTransactionComplete
}: TransactionDialogProps) => {
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Demo receiver address (in a real app, this would be the data provider's address)
  const receiverAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
  
  const ethPrice = dataItem ? convertToEth(dataItem.price) : "0";

  const handleConnectWallet = async () => {
    // First check if user is authenticated
    const userIsAuthenticated = await isAuthenticated();
    
    if (!userIsAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You must be logged in to purchase data. Please sign in first.",
      });
      setIsOpen(false);
      navigate('/login');
      return;
    }
    
    setError("");
    const { connected, address, error } = await connectWallet();
    
    if (connected && address) {
      setWalletConnected(true);
      setWalletAddress(address);
    } else if (error) {
      setError(error);
      toast({
        variant: "destructive",
        title: "Wallet Connection Failed",
        description: error,
      });
    }
  };

  const handlePayment = async () => {
    if (!walletConnected || !dataItem) return;
    
    setProcessing(true);
    setError("");
    
    const { success, hash, error } = await sendTransaction(
      receiverAddress,
      ethPrice,
      async (hash) => {
        setTxHash(hash);
        
        // Record transaction in Supabase
        if (dataItem) {
          try {
            const result = await createTransaction(
              dataItem.id,
              dataItem.title,
              dataItem.price,
              ethPrice,
              dataItem.provider,
              hash
            );
            
            if (!result.success) {
              console.error("Failed to record transaction:", result.error);
              // Continue anyway as the blockchain transaction was successful
            }
          } catch (err) {
            console.error("Error recording transaction:", err);
            // Continue anyway as the blockchain transaction was successful
          }
        }
        
        setCompleted(true);
        setProcessing(false);
        
        setTimeout(() => {
          setIsOpen(false);
          onTransactionComplete();
          
          toast({
            title: "Purchase Successful",
            description: `You have successfully purchased ${dataItem.title}`,
          });
          
          // Reset state for next time dialog is opened
          setTimeout(() => {
            setCompleted(false);
            setTxHash("");
          }, 500);
        }, 1500);
      },
      (errorMsg) => {
        setError(errorMsg);
        setProcessing(false);
        
        toast({
          variant: "destructive",
          title: "Transaction Failed",
          description: errorMsg,
        });
      }
    );
  };

  const handleClose = () => {
    setIsOpen(false);
    
    // Reset state for next time dialog is opened
    setTimeout(() => {
      setWalletConnected(false);
      setWalletAddress("");
      setCompleted(false);
      setTxHash("");
      setError("");
    }, 500);
  };

  const openEtherscan = () => {
    if (txHash) {
      window.open(`https://sepolia.etherscan.io/tx/${txHash}`, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {completed ? "Purchase Complete" : "Blockchain Data Purchase"}
          </DialogTitle>
          <DialogDescription>
            {completed 
              ? "Your transaction has been confirmed on the blockchain." 
              : "Purchase this dataset securely using Ethereum"}
          </DialogDescription>
        </DialogHeader>
        
        {dataItem && (
          <div className="border rounded-md p-4 my-4">
            <h3 className="font-medium mb-2">{dataItem.title}</h3>
            <div className="flex justify-between mt-2">
              <span className="text-muted-foreground">Price (USD):</span>
              <span className="font-semibold">{dataItem.price}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Price (ETH):</span>
              <span className="font-semibold">{ethPrice} ETH</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Provider:</span>
              <span>{dataItem.provider}</span>
            </div>
          </div>
        )}
        
        {completed ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-1">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">Transaction Confirmed</p>
                <p className="text-sm text-green-700">Your data purchase is now recorded on the blockchain</p>
              </div>
            </div>
            
            {txHash && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Transaction Hash:</p>
                <div className="flex items-center gap-2">
                  <code className="bg-slate-100 px-2 py-1 rounded text-xs flex-grow overflow-hidden text-ellipsis">
                    {txHash}
                  </code>
                  <Button variant="outline" size="sm" onClick={openEtherscan}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {!walletConnected ? (
              <Button 
                className="w-full gap-2" 
                onClick={handleConnectWallet}
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 rounded-full p-1">
                      <Wallet className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Wallet Connected</span>
                  </div>
                  <span className="text-sm font-mono">{formatAddress(walletAddress)}</span>
                </div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>
        )}
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          {completed ? (
            <Button 
              className="w-full sm:w-auto gap-1 bg-green-600 hover:bg-green-700" 
              onClick={handleClose}
            >
              <Download className="h-4 w-4" />  
              Access Data
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={processing}
                className="sm:mt-0 mt-2"
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePayment} 
                disabled={!walletConnected || processing}
                className="gap-1"
              >
                {processing ? (
                  "Processing..."
                ) : (
                  <>
                    {walletConnected ? (
                      <>Pay {ethPrice} ETH</>
                    ) : (
                      <>Connect Wallet</>
                    )}
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
