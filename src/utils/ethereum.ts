
import { ethers } from 'ethers';

// Get Ethereum provider
export const getEthereumProvider = () => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  return null;
};

// Connect wallet
export const connectWallet = async () => {
  try {
    const provider = getEthereumProvider();
    if (!provider) {
      throw new Error("No Ethereum wallet found. Please install MetaMask.");
    }
    
    // Request account access
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    return { 
      connected: true, 
      address, 
      provider,
      signer
    };
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    return { 
      connected: false, 
      address: "", 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
};

// Send Ethereum transaction
export const sendTransaction = async (
  toAddress: string,
  amount: string, 
  onSuccess?: (txHash: string) => void,
  onError?: (error: string) => void
) => {
  try {
    const provider = getEthereumProvider();
    if (!provider) {
      throw new Error("No Ethereum wallet found. Please install MetaMask.");
    }
    
    const signer = provider.getSigner();
    
    // Convert amount to Wei (1 ETH = 10^18 Wei)
    const amountInWei = ethers.utils.parseEther(amount);
    
    // Create transaction object
    const tx = {
      to: toAddress,
      value: amountInWei
    };
    
    // Send transaction
    const transaction = await signer.sendTransaction(tx);
    
    // Wait for transaction to be mined
    const receipt = await transaction.wait();
    
    if (receipt.status === 1) {
      if (onSuccess) onSuccess(transaction.hash);
      return {
        success: true,
        hash: transaction.hash
      };
    } else {
      throw new Error("Transaction failed");
    }
  } catch (error) {
    console.error("Transaction error:", error);
    if (onError) onError(error instanceof Error ? error.message : "Unknown error");
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Format Ethereum address for display
export const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Convert price from $ to ETH (using a simple fixed conversion rate for demo)
export const convertToEth = (dollarPrice: string): string => {
  // Remove $ and /month if present
  const cleanPrice = dollarPrice.replace('$', '').replace('/month', '');
  const priceInUsd = parseFloat(cleanPrice);
  
  // Use a fixed conversion rate (1 ETH = $3000 in this example)
  // In a real app, you would use an API to get the current rate
  const ethUsdRate = 3000;
  const priceInEth = priceInUsd / ethUsdRate;
  
  // Return formatted ETH amount with 6 decimal places
  return priceInEth.toFixed(6);
};
