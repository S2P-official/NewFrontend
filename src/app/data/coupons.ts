import { Coupon } from '@/app/types';

export const coupons: Coupon[] = [
  {
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    minOrder: 50
  },
  {
    code: 'SAVE20',
    discount: 20,
    type: 'fixed',
    minOrder: 100
  },
  {
    code: 'KIDSTOYS15',
    discount: 15,
    type: 'percentage',
    minOrder: 30
  }
];