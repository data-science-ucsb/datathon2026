import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Import split components
import ScheduleModal from './ScheduleModal';
import QuickLinks from './QuickLinks';
import TracksSection from './TracksSection';
import SponsorResourcesSection from './SponsorResourcesSection';
import SubmissionSection from './SubmissionSection';

const StudentResources: React.FC = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Quick Links */}
      <QuickLinks onOpenSchedule={() => setShowScheduleModal(true)} />

      {/* Tracks Section */}
      <TracksSection />

      {/* Sponsor Resources Section */}
      <SponsorResourcesSection />

      {/* Submission Section */}
      <SubmissionSection />

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <ScheduleModal onClose={() => setShowScheduleModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentResources;