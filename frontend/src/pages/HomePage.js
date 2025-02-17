import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Hero from "../components/Hero";
import JobCategories from "../components/JobCategories";
import FeaturedCompanies from "../components/FeaturedCompanies";
import Footer from "../components/Footer";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch session but allow guest access
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });

        if (response.data?.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.warn("No active session found. User is browsing as guest.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} />
      <main>
        <Hero user={user} />
        <JobCategories />
        <FeaturedCompanies />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
