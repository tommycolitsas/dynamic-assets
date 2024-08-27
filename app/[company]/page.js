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
      <div className="font-custom flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col justify-center items-center py-12 md:py-0">
          <div className="w-full mt-16 md:mt-0 max-w-4xl px-4 md:px-0 md:max-w-3xl">
            <div className="flex flex-col gap-6 md:gap-10 text-center">
              <h1 className="text-lg md:text-xl text-gray-700 font-semibold leading-[1.8] md:leading-[2]">
                {prospect.personalizedIntro}
              </h1>
              <h2 className="text-lg text-gray-400 mb-2">Click a character</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
        </main>
      </div>
    </AudioProvider>
  );
}
