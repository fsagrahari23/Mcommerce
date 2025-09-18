
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <section className="relative bg-gray-900 text-white h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold"
          >
            Welcome to Mcommerce
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 text-lg"
          >
            The best place to shop with exclusive offers and discounts. Join us
            today!
          </motion.p>
        </div>
      </section>
      <div className="text-center py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center gap-6"
        >
          <Link to="/auth/login">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg"
            >
              Login
            </motion.button>
          </Link>
          <Link to="/auth/register">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-green-500 text-white py-2 px-6 rounded-lg"
            >
              Sign Up
            </motion.button>
          </Link>
        </motion.div>
      </div>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-yellow-500 mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-yellow-500 mx-2">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
