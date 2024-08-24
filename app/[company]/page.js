// app/[company]/page.js

import { notFound } from 'next/navigation';
import { prospects } from '../data/prospects';
import TextToSpeechButton from '../components/TextToSpeechButton';

function createSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '');
}

export function generateStaticParams() {
  return prospects.map((prospect) => ({
    company: createSlug(prospect.companyName),
  }));
}

export default function CompanyPage({ params }) {
  const prospect = prospects.find(
    (p) => createSlug(p.companyName) === params.company
  );

  if (!prospect) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col gap-10 text-center">
      <h1 className="text-2xl text-gray-700 font-semibold">
        A MESSAGE FOR <span className="text-indigo-900">{prospect.companyName}</span>
      </h1>
        <h1 className="text-lg text-gray-400 font-medium">Click a character</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-9'>
          <TextToSpeechButton text={prospect.personalizedText} />
          <TextToSpeechButton text={prospect.personalizedText} />
          <TextToSpeechButton text={prospect.personalizedText} />
          <TextToSpeechButton text={prospect.personalizedText} />
          <TextToSpeechButton text={prospect.personalizedText} />
          <TextToSpeechButton text={prospect.personalizedText} />
        </div>
      </div>
    </div>
  );
}