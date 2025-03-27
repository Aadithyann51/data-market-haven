
import { supabase } from './supabaseClient';

// Interface for IoT data listing
export interface IoTDataListing {
  id: number;
  title: string;
  description: string;
  price: string;
  provider: string;
  provider_id: string;
  category: string;
  update_frequency: string;
  sample_data: string;
  created_at: string;
  tags: string[];
}

// Interface for transaction
export interface Transaction {
  id: number;
  user_id: string;
  data_id: number;
  data_title: string;
  price: string;
  eth_price?: string;
  provider: string;
  date: string;
  status: string;
  tx_hash?: string;
}

// Fetch all IoT data listings
export const fetchAllDataListings = async (): Promise<IoTDataListing[]> => {
  const { data, error } = await supabase
    .from('iot_data_listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching data listings:', error);
    return [];
  }

  return data || [];
};

// Fetch a single IoT data listing by ID
export const fetchDataListingById = async (id: number): Promise<IoTDataListing | null> => {
  const { data, error } = await supabase
    .from('iot_data_listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching data listing with ID ${id}:`, error);
    return null;
  }

  return data;
};

// Create a new IoT data listing
export const createDataListing = async (dataListing: Omit<IoTDataListing, 'id' | 'created_at'>): Promise<{ success: boolean; id?: number; error?: string }> => {
  const { data, error } = await supabase
    .from('iot_data_listings')
    .insert([{ ...dataListing, created_at: new Date().toISOString() }])
    .select();

  if (error) {
    console.error('Error creating data listing:', error);
    return { success: false, error: error.message };
  }

  return { success: true, id: data?.[0]?.id };
};

// Fetch transactions for current user
export const fetchUserTransactions = async (): Promise<Transaction[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }

  return data || [];
};

// Create a new transaction
export const createTransaction = async (
  dataId: number, 
  dataTitle: string,
  price: string,
  ethPrice: string,
  provider: string,
  txHash: string
): Promise<{ success: boolean; id?: number; error?: string }> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { success: false, error: 'User not authenticated' };
  }

  const transaction = {
    user_id: user.id,
    data_id: dataId,
    data_title: dataTitle,
    price,
    eth_price: ethPrice,
    provider,
    date: new Date().toISOString(),
    status: 'completed',
    tx_hash: txHash
  };

  const { data, error } = await supabase
    .from('transactions')
    .insert([transaction])
    .select();

  if (error) {
    console.error('Error creating transaction:', error);
    return { success: false, error: error.message };
  }

  return { success: true, id: data?.[0]?.id };
};
