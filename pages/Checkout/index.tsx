import { Layout } from '../../components/imports';
import PrivateRoute from '../../helpers/auth/PrivateRoute';

const Checkout = () => {
  return (
    <PrivateRoute>
      <Layout>
        <div className='min-h-screen bg-white'>
          <div className='bg-gray-50 border-b border-gray-200'>Checkout</div>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Checkout;
