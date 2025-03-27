
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
import { Check, CreditCard, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handlePurchase = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      
      // Add transaction to localStorage for demo purposes
      const existingTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      const newTransaction = {
        id: Date.now(),
        dataId: dataItem?.id,
        dataTitle: dataItem?.title,
        price: dataItem?.price,
        provider: dataItem?.provider,
        date: new Date().toISOString(),
        status: "completed"
      };
      
      localStorage.setItem(
        "transactions", 
        JSON.stringify([newTransaction, ...existingTransactions])
      );
      
      setTimeout(() => {
        setIsOpen(false);
        setCompleted(false);
        onTransactionComplete();
        
        toast({
          title: "Purchase Successful",
          description: `You have successfully purchased ${dataItem?.title}`,
        });
      }, 1500);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Purchase</DialogTitle>
          <DialogDescription>
            You are about to purchase the following data set:
          </DialogDescription>
        </DialogHeader>
        
        {dataItem && (
          <div className="border rounded-md p-4 my-4">
            <h3 className="font-medium mb-2">{dataItem.title}</h3>
            <div className="flex justify-between mt-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-semibold">{dataItem.price}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Provider:</span>
              <span>{dataItem.provider}</span>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          {!completed ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={processing}
                className="sm:mt-0 mt-2"
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePurchase} 
                disabled={processing}
                className="gap-1"
              >
                {processing ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" /> 
                    Complete Purchase
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button className="w-full sm:w-auto gap-1 bg-green-600 hover:bg-green-700" onClick={() => setIsOpen(false)}>
              <Check className="h-4 w-4" /> Transaction Complete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
