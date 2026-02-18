import React from 'react';
import { motion } from 'framer-motion';
import CollapsibleSection from './CollapsibleSection';

const TRACKS = [
  {
    name: 'Public Health & Wellbeing',
    description: 'This track focuses on using data and technology to improve physical, mental, and community health outcomes. Participants are encouraged to analyze health trends, identify inequities in access to care, and design tools or models that promote healthier communities and preventive care.',
    icon: '',
    color: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/30',
    examples: [
      'Predictive models for identifying communities at higher risk for chronic diseases.',
      'Mental health mapping tools that identify gaps in service availability across regions.',
      'Dashboards analyzing disparities in healthcare access by race, income, or geography.',
      'Food insecurity or nutrition access analytics using census and public data.',
    ],
    datasets: [
      {
        name: 'Screentime vs Sleep Quality Survey 2025',
        url: 'https://www.kaggle.com/datasets/adharshinikumar/screentime-vs-mentalwellness-survey-2025',
        source: 'Kaggle',
      },
      {
        name: 'Health & Lifestyle Dataset',
        url: 'https://www.kaggle.com/datasets/mahdimashayekhi/health-and-lifestyle-dataset',
        source: 'Kaggle',
      },
      {
        name: 'COVID-19 2025 Data by Country & Income',
        url: 'https://github.com/KFFData/COVID-19-Data/blob/kff_master/Country%20Trend%20Data/global_covid_metrics2025_Q4.csv',
        source: 'GitHub',
      },
    ],
  },
  {
    name: 'Environmental Sustainability',
    description: 'This track focuses on climate, environmental justice, and sustainable development. Participants will use data to analyze environmental risks, resource usage, and sustainability challenges, proposing solutions that promote resilience and responsible environmental stewardship.',
    icon: '',
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    examples: [
      'Climate risk mapping (e.g., heat, flooding, wildfire, air pollution exposure).',
      'Analysis of environmental justice issues using demographic and pollution datasets.',
      'Optimization models for waste management, recycling, or energy efficiency.',
      'Carbon footprint estimation tools for individuals or organizations.',
    ],
    datasets: [
      {
        name: 'NOAA Climate Data Records',
        url: 'https://www.ncei.noaa.gov/products/climate-data-records',
        source: 'NOAA',
      },
      {
        name: 'Data.gov Environmental Datasets',
        url: 'https://catalog.data.gov/dataset?tags=sustainability',
        source: 'Data.gov',
      },
      {
        name: 'EPA Air Quality Data',
        url: 'https://www.epa.gov/outdoor-air-quality-data',
        source: 'EPA',
      },
      {
        name: 'EPA Water Quality Data',
        url: 'https://www.epa.gov/waterdata/water-quality-data',
        source: 'EPA',
      },
      {
        name: 'Climate Change Knowledge Portal',
        url: 'https://climateknowledgeportal.worldbank.org/',
        source: 'World Bank',
      },
    ],
  },
  {
    name: 'Education & Digital Equity',
    description: ' This track addresses inequities in education and technology access. Teams will explore data-driven solutions to improve learning outcomes, reduce achievement gaps, and expand access to digital tools and educational resources.',
    icon: '',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    examples: [
      'Models predicting student performance or dropout risk using school district data.',
      'Analysis of broadband access and its relationship to academic outcomes.',
      'Personalized learning recommendation systems for students or educators.',
      'Tools that identify underserved schools or communities for targeted interventions.',
    ],
    datasets: [
      {
        name: 'K-12 Civil Rights Data (Discipline, Access, Staffing)',
        url: 'https://crdc.communities.ed.gov/',
        source: 'Dept of Ed',
      },
      {
        name: 'K-12 School & District Data (IDs, Enrollment, Staffing)',
        url: 'https://nces.ed.gov/ccd/ccddata.asp',
        source: 'NCES',
      },
      {
        name: 'Digital Divide (Household Internet by Geography)',
        url: 'https://data.census.gov/table/ACSDT5Y2023.B28002',
        source: 'Census',
      },
      {
        name: 'College Scorecard API (Costs, Completion, Earnings)',
        url: 'https://collegescorecard.ed.gov/data/api/',
        source: 'Dept of Ed',
      },
    ],
  },
  {
    name: 'Civic Engagement & Policy',
    description: 'This track explores how data can inform public policy, improve government transparency, and increase civic participation. Teams will analyze public datasets to identify policy gaps, evaluate program effectiveness, or design tools that empower citizens and policymakers.',
    icon: '',
    color: 'from-purple-500/20 to-violet-500/20',
    borderColor: 'border-purple-500/30',
    examples: [
      'Public service access dashboards (e.g., housing, transportation, social services).',
      'Voter turnout and civic participation analysis by demographic and geographic factors.',
      'Tools for tracking legislative activity or community feedback.',
      'Build a tool to simplify understanding legislation',
    ],
    datasets: [
      {
        name: 'SB County Housing Data Dashboard',
        url: 'https://www.sbcag.org/housing-data-dashboard/',
        source: 'SBCAG',
      },
      {
        name: 'American Trends Panel Datasets (Survey Data)',
        url: 'https://www.pewresearch.org/american-trends-panel-datasets/',
        source: 'Pew Research',
      },
    ],
  },
];

const TracksSection: React.FC = () => {
  return (
    <CollapsibleSection
      title="Tracks"
      subtitle="Choose a track that aligns with your project idea"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {TRACKS.map((track, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-5 rounded-xl bg-gradient-to-br ${track.color} border ${track.borderColor} hover:scale-[1.02] transition-transform duration-200`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{track.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-1">{track.name}</h4>
                <p className="text-sm text-gray-300 mb-3">{track.description}</p>
                
                {/* Example Project Ideas */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs font-semibold text-gray-400 mb-2"> Example Project Ideas:</p>
                  <ul className="space-y-1">
                    {track.examples.map((example, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-gray-500 mt-0.5">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optional Datasets & APIs */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs font-semibold text-gray-400 mb-2"> Optional Datasets & APIs:</p>
                  <ul className="space-y-2">
                    {track.datasets.map((dataset, i) => (
                      <li key={i} className="text-xs">
                        <a
                          href={dataset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-gray-500">•</span>
                          <span className="group-hover:underline">{dataset.name}</span>
                          <span className="text-gray-500 text-[10px] px-1.5 py-0.5 bg-gray-800/50 rounded">
                            {dataset.source}
                          </span>
                          <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </CollapsibleSection>
  );
};

export default TracksSection;