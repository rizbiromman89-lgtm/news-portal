export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-6 text-center border-t border-slate-800 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} NewsPortal Platform. All Rights Reserved.</p>
      </div>
    </footer>
  );
}