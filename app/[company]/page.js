import { notFound } from 'next/navigation';
import { prospects } from '../data/prospects';
import TextToSpeechButton from '../components/TextToSpeechButton';
import Navbar from '../components/Navbar';
import { Spectral } from "next/font/google";


const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
});

function createSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '');
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
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" }
];

export default function CompanyPage({ params }) {
  const prospect = prospects.find(
    (p) => createSlug(p.companyName) === params.company
  );

  if (!prospect) {
    notFound();
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col gap-10 text-center mt-11 md:mt-0 ">
        <h1 className=" text-xl md:text-3xl text-gray-700 font-semibold mb-3 mt-9 md:mt-0">
          A MESSAGE FOR <span className="text-indigo-900">{prospect.companyName}</span>
        </h1>
        <h1 className="text-lg text-gray-400 font-medium">Click a character</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 mt-9'>
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
  );
}