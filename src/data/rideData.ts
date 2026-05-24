export type RecentSearchItem = {
  id: string
  pickup: string
  destination: string
  date: string
  seats: number
}

export type AvailableRide = {
  id: string
  driverName: string
  rating: number
  matchPercentage: number
  pickupTime: string
  dropTime: string
  pickup: string
  drop: string
  seats: number
  vehicle: string
  price: string
}

export const recentSearches: RecentSearchItem[] = [
  {
    id: '1',
    pickup: 'Sector 17, Chandigarh',
    destination: 'DQ, Chandigarh',
    date: 'Today',
    seats: 2,
  },
  {
    id: '2',
    pickup: 'MG Road, Bengaluru',
    destination: 'Koramangala, Bengaluru',
    date: 'Tomorrow',
    seats: 1,
  },
  {
    id: '3',
    pickup: 'Cyber Hub, Gurugram',
    destination: 'Huda City Centre',
    date: 'Today',
    seats: 3,
  },
]

export const availableRides: AvailableRide[] = [
  {
    id: 'ride-1',
    driverName: 'Rohit Sharma',
    rating: 4.9,
    matchPercentage: 92,
    pickupTime: '08:00 AM',
    dropTime: '09:10 AM',
    pickup: 'Sector 17, Chandigarh',
    drop: 'Delhi Haat, Delhi',
    seats: 2,
    vehicle: 'Sedan · 4 seats',
    price: '₹420',
  },
  {
    id: 'ride-2',
    driverName: 'Aarti Singh',
    rating: 4.7,
    matchPercentage: 88,
    pickupTime: '08:30 AM',
    dropTime: '09:40 AM',
    pickup: 'MG Road, Bengaluru',
    drop: 'Electronic City',
    seats: 1,
    vehicle: 'Hatchback · 4 seats',
    price: '₹310',
  },
  {
    id: 'ride-3',
    driverName: 'Vikram Patel',
    rating: 4.8,
    matchPercentage: 95,
    pickupTime: '07:50 AM',
    dropTime: '09:00 AM',
    pickup: 'Cyber Hub, Gurugram',
    drop: 'Huda City Centre',
    seats: 3,
    vehicle: 'SUV · 6 seats',
    price: '₹560',
  },
]
