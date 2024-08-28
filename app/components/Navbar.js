import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-7 left-0 right-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-7/8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Image
              src="/eleven_labs_logo.png"
              alt="Eleven Labs Logo"
              width={60}
              height={20}
            />
          </div>
          <div>
            <Link
              href="https://elevenlabs.io/app/sign-up?utm_source=publisher&utm_medium=customlanding"
              className="bg-gray-900 hover:bg-gray-600 text-gray-200 hover:text-gray-100 font-semibold py-3 px-3 rounded-full transition duration-300"
            >
              Get Access
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
