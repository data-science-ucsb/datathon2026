import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface ApplicationFormProps {
  uid: string;
  onComplete: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ uid, onComplete }) => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const [phone, setPhone] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [hasTeam, setHasTeam] = useState('');
  const [hackathonExperience, setHackathonExperience] = useState<number>(0);
  const [codingExperience, setCodingExperience] = useState<number>(0);
  const [heardFrom, setHeardFrom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hackathonExperience === 0 || codingExperience === 0) {
      setError('Please select your experience levels');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await updateDoc(doc(db, 'registrations', uid), {
        name,
        school,
        year,
        major,
        phone: phone || null,
        dietaryRestrictions,
        hasTeam,
        hackathonExperience,
        codingExperience,
        heardFrom,
        status: 'submitted',
        applicationCompleted: true,
        applicationSubmittedAt: new Date().toISOString()
      });

      onComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Complete Your Application</h2>
        <p className="text-gray-400">Fill out the details below to complete your registration for Data4Good 2026</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">School/University *</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="UC Santa Barbara"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Year *</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
            >
              <option value="">Select Year</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Graduate">Graduate</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Major *</label>
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="Computer Science"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number (Optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="(123) 456-7890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Dietary Restrictions</label>
          <textarea
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="e.g., Vegetarian, Vegan, Gluten-Free, Nut Allergy, etc."
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Do you have a team? *</label>
          <select
            value={hasTeam}
            onChange={(e) => setHasTeam(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
          >
            <option value="">Select an option</option>
            <option value="yes">Yes, I have a team</option>
            <option value="no">No, I'm looking for a team</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Hackathon Experience Level * <span className="text-gray-500">(1 = Beginner, 5 = Expert)</span>
          </label>
          <div className="flex items-center justify-between gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <label
                key={level}
                className="flex-1 cursor-pointer"
              >
                <input
                  type="radio"
                  name="hackathonExperience"
                  value={level}
                  checked={hackathonExperience === level}
                  onChange={(e) => setHackathonExperience(Number(e.target.value))}
                  className="sr-only"
                />
                <div className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${hackathonExperience === level
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-white/10 bg-gray-950/50 hover:border-white/20'
                  }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${hackathonExperience === level
                    ? 'bg-blue-500 text-white scale-110'
                    : 'bg-gray-800 text-gray-400'
                    }`}>
                    {level}
                  </div>
                  <span className="text-xs text-gray-500">
                    {level === 1 ? 'Beginner' : level === 5 ? 'Expert' : ''}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Coding Experience Level * <span className="text-gray-500">(1 = Beginner, 5 = Expert)</span>
          </label>
          <div className="flex items-center justify-between gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <label
                key={level}
                className="flex-1 cursor-pointer"
              >
                <input
                  type="radio"
                  name="codingExperience"
                  value={level}
                  checked={codingExperience === level}
                  onChange={(e) => setCodingExperience(Number(e.target.value))}
                  className="sr-only"
                />
                <div className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${codingExperience === level
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-white/10 bg-gray-950/50 hover:border-white/20'
                  }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${codingExperience === level
                    ? 'bg-blue-500 text-white scale-110'
                    : 'bg-gray-800 text-gray-400'
                    }`}>
                    {level}
                  </div>
                  <span className="text-xs text-gray-500">
                    {level === 1 ? 'Beginner' : level === 5 ? 'Expert' : ''}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Where did you hear about this event? *</label>
          <select
            value={heardFrom}
            onChange={(e) => setHeardFrom(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
          >
            <option value="">Select an option</option>
            <option value="Friend/Word of mouth">Data Science UCSB Weekly Newsletter</option>
            <option value="Professor/Class">UCSB Mailing List</option>
            <option value="Campus flyer/poster">In-Class Presentation/Message</option>
            <option value="Data Science UCSB website">DevPost</option>
            <option value="Other club/organization">Data Science UCSB website</option>
            <option value="Other">Word of Mouth</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;