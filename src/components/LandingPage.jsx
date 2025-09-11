import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="navbar bg-base-200 shadow-sm px-6 lg:px-10">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-2xl">
            🤖 DevTinder
          </Link>
        </div>
        <div className="flex gap-3">
          <Link to="/login" state={{mode: "login"}} className="btn btn-outline btn-primary">
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 bg-base-100">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Connect. Collaborate. <span className="text-primary">Code Together.</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl max-w-2xl text-base-content/80">
          DevTinder helps developers find like-minded peers, collaborate on projects, 
          and build meaningful connections in the tech community.
        </p>
        <div className="mt-6 flex gap-4">
          <Link to="/login" state={{mode: "signup"}} className="btn btn-primary btn-lg">
            Get Started
          </Link>
          <Link to="/feed" className="btn btn-outline btn-lg">
            Explore Feed
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-10">Why DevTinder?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="card bg-base-100 shadow-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">👥 Connect with Developers</h3>
            <p className="text-base-content/70">
              Meet developers across different tech stacks and grow your professional network.
            </p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">💻 Collaborate on Projects</h3>
            <p className="text-base-content/70">
              Find project partners, share ideas, and work together on exciting open-source or personal projects.
            </p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">🚀 Grow Your Skills</h3>
            <p className="text-base-content/70">
              Learn from peers, share your knowledge, and become a better developer together.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center bg-base-300 p-4 text-base-content">
        <aside>
          <p>
            © 2025 DevTinder. Built with ❤️ for developers.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default LandingPage;
