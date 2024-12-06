import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center h-dvh flex flex-col items-center justify-center max-w-screen-xl px-10">
      <h1 className="text-3xl font-extrabold mb-5 text-theme">Error - 404</h1>
      <p>Page not found.</p>
      <Link href={"/"}>Go to Home</Link>
    </div>
  );
}
