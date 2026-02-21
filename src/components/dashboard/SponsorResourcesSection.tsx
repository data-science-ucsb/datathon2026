import React from 'react';
import { motion } from 'framer-motion';
import CollapsibleSection from './CollapsibleSection';

const SPONSOR_RESOURCES = [
  {
    name: 'ElevenLabs API',
    description: 'AI voice generation and text-to-speech API. Perfect for accessibility projects.<br/><br/><strong>How to claim your free credits:</strong><br/>1. Join the Discord: <a href="https://discord.com/invite/VnBvbbcdEC" target="_blank" rel="noopener noreferrer" style="color:#a78bfa;text-decoration:underline;">discord.com/invite/VnBvbbcdEC</a><br/>2. Go to the #🎟️│coupon-codes channel<br/>3. Click "Start Redemption"<br/>4. Select the event & fill out the form with your registration email<br/>5. The bot will send your unique coupon code<br/><br/><a href="https://youtu.be/S143_JtCtV8" target="_blank" rel="noopener noreferrer" style="color:#a78bfa;text-decoration:underline;">📺 Video Tutorial</a> &nbsp;|&nbsp; <a href="https://docs.google.com/document/d/1mCh5MtOzBw0aJpurQVUmIVFfPMAHW3MjNemE-LNiMto/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style="color:#a78bfa;text-decoration:underline;">📄 Hacker Guide</a>',
    type: 'API',
    url: 'https://elevenlabs.io/docs',
    logo: '🔊',
  },
  {
    name: 'Live Data Technologies',
    description: 'Massive datasets for training. Feel free to access the documentation + datasets below. <br/><br/><a href="https://docs.gotlivedata.com/docs/notion-dd-preview" target="_blank" rel="noopener noreferrer" style="color:#a78bfa;text-decoration:underline;">📄 Documentation</a> &nbsp;|&nbsp; <a href="https://drive.google.com/drive/folders/1JmlTU29fWV-NDpMfJyCHcw-1uMEzRjqF?usp=sharing" target="_blank" rel="noopener noreferrer" style="color:#a78bfa;text-decoration:underline;">🗄️ Datasets (Google Drive)</a>',
    type: 'Tool',
    url: 'https://drive.google.com/drive/folders/1JmlTU29fWV-NDpMfJyCHcw-1uMEzRjqF?usp=sharing',
  },
  {
    name: 'RapidFire AI',
    description: 'AI-powered data analysis and visualization tools. Access the docs <a href="https://www.rapidfire.ai/" target="_blank" rel="noopener noreferrer" style="color:#a78bfa;text-decoration:underline;">here</a>.',
    type: 'API',
    url: 'https://www.rapidfire.ai/',
    logo: '',
  },
  {
    name: 'Balsamiq',
    description: 'Wireframing and UI mockup tool. Use code <strong>DATA4GOOD2026</strong> to redeem your free credits <a href="https://balsamiq.com/" target="_blank" rel="noopener noreferrer" style="color:#a78bfa;text-decoration:underline;">here</a>.',
    type: 'Tool',
    url: 'https://balsamiq.com/',
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
          <motion.div
            key={index}
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
                <p 
                  className="text-xs text-gray-400"
                  dangerouslySetInnerHTML={{ __html: resource.description }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      
    </CollapsibleSection>
  );
};

export default SponsorResourcesSection;