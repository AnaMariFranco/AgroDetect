import { useState } from 'react';
import { LoginPage } from './components/Screens/LoginPage';
import { Dashboard } from './components/Screens/Dashboard';
import { UploadSample } from './components/Screens/UploadSample';
import { AnalysisDetails } from './components/Screens/AnalysisDetails';
import { PricingPlans } from './components/Screens/PricingPlans';
import { ReportGeneration } from './components/Screens/ReportGeneration';

type Page = 'login' | 'dashboard' | 'upload' | 'analysis' | 'pricing' | 'report';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleViewAnalysis = (id: string) => {
    setSelectedAnalysisId(id);
    setCurrentPage('analysis');
  };

  const handleGenerateReport = (id: string) => {
    setSelectedAnalysisId(id);
    setCurrentPage('report');
  };

  if (!isAuthenticated && currentPage !== 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'dashboard' && (
        <Dashboard
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onViewAnalysis={handleViewAnalysis}
          onGenerateReport={handleGenerateReport}
        />
      )}
      {currentPage === 'upload' && (
        <UploadSample onNavigate={handleNavigate} onLogout={handleLogout} />
      )}
      {currentPage === 'analysis' && (
        <AnalysisDetails
          analysisId={selectedAnalysisId}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onGenerateReport={handleGenerateReport}
        />
      )}
      {currentPage === 'pricing' && (
        <PricingPlans onNavigate={handleNavigate} onLogout={handleLogout} />
      )}
      {currentPage === 'report' && (
        <ReportGeneration
          analysisId={selectedAnalysisId}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
