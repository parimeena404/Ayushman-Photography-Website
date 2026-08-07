const Razorpay = require('razorpay');

const keyId = 'rzp_test_TMSAlhSBWAt4fa';
const keySecret = 'rJIrVlDD0pX9EdzxHCee4u1r';

const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });

rzp.orders.create({
  amount: 10000,
  currency: 'INR',
  receipt: 'test_rcpt',
})
.then(res => console.log('SUCCESS:', res))
.catch(err => console.error('RAZORPAY ERROR:', err));
