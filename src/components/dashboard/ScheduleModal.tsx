import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Schedule data
const SCHEDULE_DAY1 = [
  { time: '8:30 - 9:00 AM', event: 'Check-In' },
  { time: '9:00 - 9:30 AM', event: 'Kickoff' },
  { time: '9:30 - 10:30 AM', event: 'Group Formation Social' },
  { time: '9:30 - 12:00 PM', event: 'Group Sign-Ups + Build Time' },
  { time: '12:00 - 1:00 PM', event: 'Lunch' },
  { time: '1:00 - 2:00 PM', event: 'Tech Dev Workshop #1' },
  { time: '2:00 - 4:00 PM', event: 'Build Time (Tech Dev OH)' },
  { time: '4:00 - 5:00 PM', event: 'Tech Dev Workshop #2' },
  { time: '5:00 - 6:00 PM', event: 'Professional Dev Workshop' },
  { time: '6:00 - 7:00 PM', event: 'Dinner' },
  { time: '7:00 - 8:00 PM', event: 'Tech Dev Workshop #3' },
  { time: '8:00 - 9:00 PM', event: 'Build Time' },
  { time: '9:00 - 10:00 PM', event: 'Silent Disco' },
  { time: '10:00 - 12:00 AM', event: 'Build Time' },
];

const SCHEDULE_DAY2 = [
  { time: '9:00 - 10:00 AM', event: 'Breakfast + Announcements' },
  { time: '10:00 - 12:00 PM', event: 'Build Time (Tech Dev OH)' },
  { time: '12:00 - 1:00 PM', event: 'Lunch' },
  { time: '1:00 - 3:00 PM', event: 'Build Time' },
  { time: '3:00 - 3:30 PM', event: 'Submissions Window' },
  { time: '3:30 - 4:30 PM', event: 'Initial Screening' },
  { time: '3:30 - 4:30 PM', event: 'Judges Panel + Networking' },
  { time: '4:30 - 4:40 PM', event: 'Finalist Announcements' },
  { time: '5:00 - 6:30 PM', event: 'Finalist Presentations' },
  { time: '6:30 - 7:00 PM', event: 'Dinner' },
  { time: '7:00 - 8:00 PM', event: 'Final Results + Closing' },
];

interface ScheduleModalProps {
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ onClose }) => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const getEventColor = (event: string) => {
    if (event.includes('Lunch') || event.includes('Dinner') || event.includes('Breakfast')) {
      return 'text-yellow-400';
    }
    if (event.includes('Workshop')) {
      return 'text-purple-400';
    }
    if (event.includes('Silent Disco')) {
      return 'text-pink-400';
    }
    if (event.includes('Presentation') || event.includes('Results') || event.includes('Closing')) {
      return 'text-blue-400';
    }
    if (event.includes('Submission')) {
      return 'text-red-400';
    }
    return 'text-gray-200';
  };

  const currentSchedule = activeDay === 1 ? SCHEDULE_DAY1 : SCHEDULE_DAY2;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Datathon Agenda</h2>
            <p className="text-sm text-gray-400">Full event schedule for both days</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition p-1"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Day Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveDay(1)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeDay === 1 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Day 1
          </button>
          <button
            onClick={() => setActiveDay(2)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeDay === 2 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Day 2
          </button>
        </div>

        {/* Schedule Table */}
        <div className="bg-gray-800/30 rounded-xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr]">
            {/* Header Row */}
            <div className="bg-gray-800/50 px-4 py-3 font-semibold text-sm text-gray-300 border-b border-white/10">
              Time
            </div>
            <div className="bg-gray-800/50 px-4 py-3 font-semibold text-sm text-gray-300 border-b border-white/10">
              Event
            </div>

            {/* Schedule Items */}
            {currentSchedule.map((item, index) => (
              <React.Fragment key={index}>
                <div className={`px-4 py-3 text-sm font-medium text-gray-400 ${
                  index % 2 === 0 ? 'bg-gray-800/20' : ''
                } ${index !== currentSchedule.length - 1 ? 'border-b border-white/5' : ''}`}>
                  {item.time}
                </div>
                <div className={`px-4 py-3 text-sm ${
                  index % 2 === 0 ? 'bg-gray-800/20' : ''
                } ${index !== currentSchedule.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <span className={getEventColor(item.event)}>
                    {item.event}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-400"></span>
            <span className="text-gray-400">Workshops</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="text-gray-400">Meals</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-400"></span>
            <span className="text-gray-400">Presentations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-400"></span>
            <span className="text-gray-400">Social Events</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScheduleModal;