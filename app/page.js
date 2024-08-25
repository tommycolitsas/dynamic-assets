import Navbar from "./components/Navbar";

export default function Page() {

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col gap-10 text-center">
        <h1 className=" text-xl md:text-3xl text-gray-700 font-normal mb-3">
          Increase engagement and accessibility
        </h1>
        <h1 className=" text-xl md:text-3xl text-indigo-900 font-bold mb-3 mt-9 md:mt-0">
         with ElevenLabs
        </h1>
      </div>
    </div>
    </div>
  );
}