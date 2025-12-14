import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-8 py-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
