export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to Expensave</h1>
        <p className="text-lg text-gray-600 mb-8">
          Split bills, track expenses, and settle up with your friends easily.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/auth/register"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Get Started
          </a>
          <a
            href="/auth/login"
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Login
          </a>
        </div>
      </div>
    </main>
  );
}
