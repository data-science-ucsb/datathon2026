import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast, { Toaster } from 'react-hot-toast';

interface ApplicationFormProps {
  uid: string;
  onComplete: () => void;
  onExit?: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ uid, onComplete, onExit }) => {
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Load existing draft data if available
    const loadDraft = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'registrations', uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || '');
          setSchool(data.school || '');
          setYear(data.year || '');
          setMajor(data.major || '');
          setPhone(data.phone || '');
          setDietaryRestrictions(data.dietaryRestrictions || '');
          setHasTeam(data.hasTeam || '');
          setHackathonExperience(data.hackathonExperience || 0);
          setCodingExperience(data.codingExperience || 0);
          setHeardFrom(data.heardFrom || '');
        }
      } catch (err) {
        console.error('Error loading draft:', err);
      } finally {
        setInitialLoad(false);
      }
    };

    loadDraft();
  }, [uid]);

  const handleSaveAndExit = async () => {
    setSaving(true);
    setError('');

    try {
      await updateDoc(doc(db, 'registrations', uid), {
        name: name || null,
        school: school || null,
        year: year || null,
        major: major || null,
        phone: phone || null,
        dietaryRestrictions: dietaryRestrictions || null,
        hasTeam: hasTeam || null,
        hackathonExperience: hackathonExperience || null,
        codingExperience: codingExperience || null,
        heardFrom: heardFrom || null,
        lastSavedAt: new Date().toISOString(),
      });

      setTimeout(() => {
        if (onExit) onExit();
      }, 1000);
    } catch (err: any) {
      toast.error('Failed to save progress');
      setError(err.message || 'Failed to save progress');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hackathonExperience === 0 || codingExperience === 0) {
      setError('Please select your experience levels');
      toast.error('Please select your experience levels');
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

      toast.success('Application submitted successfully!');
      setTimeout(() => {
        onComplete();
      }, 1000);
    } catch (err: any) {
      toast.error('Failed to submit application');
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <Toaster position="top-center" />
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Complete Your Application</h2>
        <p className="text-gray-400">Fill out the details below to complete your registration for Data4Good 2026</p>
        <p className="text-sm text-blue-400 mt-2">💡 Your progress is automatically saved as you fill out the form</p>
      </div>

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
            <option value="Data Science UCSB Weekly Newsletter">Data Science UCSB Weekly Newsletter</option>
            <option value="UCSB Mailing List">UCSB Mailing List</option>
            <option value="In-Class Presentation/Message">In-Class Presentation/Message</option>
            <option value="DevPost">DevPost</option>
            <option value="Data Science UCSB website">Data Science UCSB website</option>
            <option value="Word of Mouth">Word of Mouth</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handleSaveAndExit}
            disabled={saving}
            className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg font-medium transition flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save & Exit
              </>
            )}
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;