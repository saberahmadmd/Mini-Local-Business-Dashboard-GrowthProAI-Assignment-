import { useState } from 'react';
import BusinessForm from './components/BusinessForm';
import DisplayCard from './components/DisplayCard';
import './App.css';

function App() {
  const [businessData, setBusinessData] = useState(null);
  const [formInfo, setFormInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


  const handleFormSubmit = async (info) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/business-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      });

      const data = await res.json();
      setFormInfo(info);
      setBusinessData(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    setRegenerating(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/regenerate-headline?name=${formInfo.name}&location=${formInfo.location}`
      );
      const data = await res.json();
      setBusinessData((prev) => ({ ...prev, headline: data.headline }));
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Local Business Dashboard</h1>
      <BusinessForm onSubmit={handleFormSubmit} isLoading={loading} />
      <DisplayCard data={businessData} onRegenerate={regenerateHeadline} isRegenerating={regenerating} />
    </div>
  );
}

export default App;