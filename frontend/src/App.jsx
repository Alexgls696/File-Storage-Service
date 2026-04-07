import { useState } from 'react'
import FilesSection from './components/Sections/FilesSection/FilesSection';
import DownloadSection from './components/Sections/DownloadSection/DownloadSection';
import ManagementSection from './components/Sections/ManagementSection/ManagementSection';


import Header from './components/Header/Header';
import './GlobalStyles.css'
function App() {

  const [activeSection, setActiveSection] = useState('files');

  return (
    <>
      <Header setActiveSection={setActiveSection} />
      <div className="container">
        {activeSection === 'files' && <FilesSection />}
        {activeSection === 'download' && <DownloadSection />}
        {activeSection === 'management' && <ManagementSection />}
      </div>
    </>
  );
}

export default App
