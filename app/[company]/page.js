import { notFound } from "next/navigation";
import { prospects } from "../data/prospects";
import TextToSpeechButton from "../components/TextToSpeechButton";
import Navbar from "../components/Navbar";
import { AudioProvider } from "../components/AudioContext";

function createSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "");
}

export function generateStaticParams() {
  return prospects.map((prospect) => ({
    company: createSlug(prospect.companyName),
  }));
}

const voices = [
  { id: "pqHfZKP75CvOlQylNhV4", name: "Bill" },
  { id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice" },
  { id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel" },
  { id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily" },
  { id: "XrExE9yKIg1WjnnlVkGX", name: "Matilda" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
];

export default function CompanyPage({ params }) {
  const prospect = prospects.find(
    (p) => createSlug(p.companyName) === params.company
  );

  if (!prospect) {
    notFound();
  }

  return (
    <AudioProvider>
      <div>
        <Navbar />
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex flex-col gap-2 md:gap-10 text-center mt-11 md:mt-0 ">
            <h1 className="text-xl md:text-3xl text-gray-700 font-semibold mb-3 mt-12 md:mt-0">
              <span className="mt-6 md:mt-0 block md:inline">
                A MESSAGE FOR
              </span>{" "}
              <span className="block md:inline text-indigo-900">
                {prospect.companyName}
              </span>
            </h1>
            <h1 className="text-lg text-gray-400 font-medium">
              Click a character
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 mt-9">
              {voices.map((voice, index) => (
                <TextToSpeechButton
                  key={index}
                  text={prospect.personalizedText}
                  voiceId={voice.id}
                  voiceName={voice.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AudioProvider>
  );
}
