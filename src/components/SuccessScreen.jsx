import { properties } from '../data/properties';

export default function SuccessScreen({ formData, selectedProps, onRestart }) {
  const selectedList = properties.filter(p => selectedProps.includes(p.id));

  return (
    <div className="success-screen msg-slide-in-left">
      <div className="success-icon-ring">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="#4ade80" strokeWidth="2" opacity="0.3" />
          <path d="M14 24.5L21 31.5L34 18.5" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="success-check" />
        </svg>
      </div>

      <h2 className="success-title">Guest Card Sent!</h2>
      <p className="success-subtitle">
        Your information has been prepared for <strong>{selectedList.length}</strong>{' '}
        {selectedList.length === 1 ? 'property' : 'properties'} in Georgetown, TX
      </p>

      <div className="success-summary">
        <div className="success-summary-header">What was sent</div>
        <div className="success-summary-grid">
          <div className="success-field">
            <span>Prospect</span>
            <strong>{formData.fullName}</strong>
          </div>
          <div className="success-field">
            <span>Move-In</span>
            <strong>{formData.moveIn}</strong>
          </div>
          <div className="success-field">
            <span>Bedrooms</span>
            <strong>{formData.beds} BR</strong>
          </div>
          <div className="success-field">
            <span>Budget</span>
            <strong>Up to ${Number(formData.budget).toLocaleString()}/mo</strong>
          </div>
        </div>
      </div>

      <div className="success-properties">
        <div className="success-summary-header">Sent to</div>
        {selectedList.map(p => (
          <div key={p.id} className="success-prop-row">
            <div className="success-prop-dot" />
            <div>
              <strong>{p.name}</strong>
              <span>{p.email}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="success-next-steps">
        The properties will review your guest card and reach out to schedule tours. Check your email for responses!
      </p>

      <button className="restart-btn success-restart" onClick={onRestart}>
        Start New Search
      </button>
    </div>
  );
}
