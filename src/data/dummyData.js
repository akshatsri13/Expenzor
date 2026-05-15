import { 
  MdFastfood, 
  MdDirectionsCar, 
  MdShoppingBag, 
  MdHome, 
  MdMovie, 
  MdMedicalServices, 
  MdSchool, 
  MdAttachMoney 
} from 'react-icons/md';

export const iconMap = {
  MdFastfood, 
  MdDirectionsCar, 
  MdShoppingBag, 
  MdHome, 
  MdMovie, 
  MdMedicalServices, 
  MdSchool, 
  MdAttachMoney 
};

export const categories = [
  { id: 'food', name: 'Food & Dining', icon: 'MdFastfood', color: '#f59e0b' },
  { id: 'transport', name: 'Transport', icon: 'MdDirectionsCar', color: '#3b82f6' },
  { id: 'shopping', name: 'Shopping', icon: 'MdShoppingBag', color: '#ec4899' },
  { id: 'housing', name: 'Housing', icon: 'MdHome', color: '#10b981' },
  { id: 'entertainment', name: 'Entertainment', icon: 'MdMovie', color: '#8b5cf6' },
  { id: 'health', name: 'Health', icon: 'MdMedicalServices', color: '#ef4444' },
  { id: 'education', name: 'Education', icon: 'MdSchool', color: '#6366f1' },
  { id: 'other', name: 'Other', icon: 'MdAttachMoney', color: '#64748b' },
];

export const initialExpenses = [
  {
    id: '1',
    title: 'Grocery Store',
    amount: 120.50,
    category: 'food',
    date: new Date().toISOString().split('T')[0],
    notes: 'Weekly groceries'
  },
  {
    id: '2',
    title: 'Gas Station',
    amount: 45.00,
    category: 'transport',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  },
  {
    id: '3',
    title: 'Netflix Subscription',
    amount: 15.99,
    category: 'entertainment',
    date: new Date().toISOString().split('T')[0],
    notes: 'Monthly plan'
  },
  {
    id: '4',
    title: 'Rent',
    amount: 1200.00,
    category: 'housing',
    date: new Date().toISOString().split('T')[0],
    notes: 'May rent'
  }
];
