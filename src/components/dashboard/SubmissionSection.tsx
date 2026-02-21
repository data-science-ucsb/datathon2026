import React from 'react';
import { motion } from 'framer-motion';
import CollapsibleSection from './CollapsibleSection';

interface SubmissionStep {
  step: number;
  title: string;
  description: string;
  url?: string;
}

const SUBMISSION_STEPS: SubmissionStep[] = [
  {
    step: 1,
    title: 'Build Your Project',
    description: 'Work with your team to create a data-driven solution during the event.',
  },
  {
    step: 2,
    title: 'Join on Devpost',
    description: 'Register your team on our official Devpost page.',
    url: 'https://datathon-2026-data4good.devpost.com/',
  },
  {
    step: 3,
    title: 'Prepare GitHub Repo',
    description: 'Gather all code, documentation, and instructions to reproduce your results.',
  },
  {
    step: 4,
    title: 'Record Presentation',
    description: 'Create a video up to 5 MIN explaining the problem, methodology, findings, and impact.',
  },
  {
    step: 5,
    title: 'Submit Before Deadline',
    description: 'Submit presentation slides, recording link, and all team member names & emails.',
  },
];

const SubmissionSection: React.FC = () => {
  return (
    <CollapsibleSection
      title="How to Submit"
      subtitle="Follow these steps to submit your project on Devpost"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {SUBMISSION_STEPS.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative p-5 rounded-xl bg-gray-800/50 border border-white/10"
          >
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-sm">
              {item.step}
            </div>
            <h4 className="font-bold mb-2 mt-2">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.description}</p>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-xs text-green-400 hover:text-green-300 transition-colors"
              >
                <span>Open Devpost</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-start">
        <a
          href="https://datathon-2026-data4good.devpost.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Go to Devpost
        </a>
      </div>
    </CollapsibleSection>
  );
};

export default SubmissionSection;