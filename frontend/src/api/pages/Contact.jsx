export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto my-12 p-6 bg-white border rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input type="text" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input type="email" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea required rows="4" className="w-full border p-2 rounded"></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
}