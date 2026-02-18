import React from 'react';
import { motion } from 'framer-motion';
import CollapsibleSection from './CollapsibleSection';

const SPONSOR_RESOURCES = [
  {
    name: 'ElevenLabs API',
    description: 'AI voice generation and text-to-speech API. Perfect for accessibility projects.',
    type: 'API',
    url: 'https://elevenlabs.io/docs',
    logo: '🔊',
  },
  {
    name: 'RapidFire AI',
    description: 'AI-powered data analysis and visualization tools.',
    type: 'API',
    url: 'https://www.rapidfire.ai/',
    logo: '⚡',
  },
];

const SponsorResourcesSection: React.FC = () => {
  return (
    <CollapsibleSection
      title="Sponsor Resources"
      subtitle="Exclusive APIs and tools provided by our sponsors"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {SPONSOR_RESOURCES.map((resource, index) => (
          <motion.a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group p-4 rounded-xl bg-gray-800/50 border border-white/10 hover:border-purple-500/50 hover:bg-gray-800/80 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{resource.logo}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-sm">{resource.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    resource.type === 'API' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {resource.type}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">{resource.description}</p>
              </div>
              <svg className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Placeholder for more sponsor resources */}
      <div className="mt-4 p-4 rounded-xl bg-gray-800/30 border border-dashed border-white/10 text-center">
        <p className="text-sm text-gray-500">More sponsor resources coming soon! 🚀</p>
      </div>
    </CollapsibleSection>
  );
};

export default SponsorResourcesSection;