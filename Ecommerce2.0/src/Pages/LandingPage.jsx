import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <section className="relative bg-gray-900 text-white h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold">
            Welcome to Mcommerce
          </h1>
          <p className="mt-4 text-lg">
            The best place to shop with exclusive offers and discounts. Join us today!
          </p>
        </div>
      </section>

      <div className="text-center py-8">
        <div className="flex justify-center gap-6">
          <Link to="/auth/login">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:scale-105 transition-transform duration-200">
              Login
            </button>
          </Link>
          <Link to="/auth/register">
            <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:scale-105 transition-transform duration-200">
              Sign Up
            </button>
          </Link>
        </div>
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
