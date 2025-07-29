export interface User {
  id: string;
  firstName:string;
  lastName:string;
  email: string;
  phoneNumber: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  street: string;
  city: string;
  country: string;
}

// Utility function for response checking
async function checkResponse(response: Response): Promise<any> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
}

// Fetch user data
export async function fetchUser(userId: string): Promise<User> {
  if (!userId) throw new Error('User ID is required to fetch user data');

  const response = await fetch(`http://localhost:8080/api/customers/${userId}`);
  return checkResponse(response);
}

// Fetch orders
export async function fetchOrders(userId: string): Promise<Order[]> {
  if (!userId) throw new Error('User ID is required to fetch orders');

  const response = await fetch(`http://localhost:8080/api/customers/${userId}`);
  return checkResponse(response);
}

// Fetch addresses
export async function fetchAddresses(userId: string): Promise<Address[]> {
  if (!userId) throw new Error('User ID is required to fetch addresses');

  const response = await fetch(`http://localhost:8080/api/customers/${userId}`);
  return checkResponse(response);
}

// Update user
export async function updateUser(userId: string, data: Partial<User>): Promise<User> {
  if (!userId) throw new Error('User ID is required to update user data');

  const response = await fetch(`http://localhost:8080/api/customers/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return checkResponse(response);
}
