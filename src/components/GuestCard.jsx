import { properties } from '../data/properties';

export default function GuestCard({ data, selectedProperties, onSend, sending }) {
  const selectedProps = properties.filter(p => selectedProperties.includes(p.id));
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="guest-card">
      <div className="gc-header">
        <div className="gc-logo">GC</div>
        <div>
          <h3>Guest Card</h3>
          <div className="gc-date">{today}</div>
        </div>
      </div>

      <div className="gc-section">
        <div className="gc-label">Prospect Information</div>
        <div className="gc-grid">
          <div className="gc-field"><span>Name</span><strong>{data.fullName}</strong></div>
          <div className="gc-field"><span>Email</span><strong>{data.email}</strong></div>
          <div className="gc-field"><span>Phone</span><strong>{data.phone}</strong></div>
          <div className="gc-field"><span>Move-In</span><strong>{data.moveIn}</strong></div>
        </div>
      </div>

      <div className="gc-section">
        <div className="gc-label">Search Criteria</div>
        <div className="gc-grid">
          <div className="gc-field"><span>Bedrooms</span><strong>{data.beds} BR</strong></div>
          <div className="gc-field"><span>Budget</span><strong>Up to ${Number(data.budget).toLocaleString()}/mo</strong></div>
          <div className="gc-field"><span>Pets</span><strong>{data.pets === false ? 'None' : data.pets === 'dog' ? 'Dog' : data.pets === 'cat' ? 'Cat' : 'Dog & Cat'}</strong></div>
          <div className="gc-field"><span>Must-Haves</span><strong>{data.extras?.length ? data.extras.join(', ') : 'None specified'}</strong></div>
        </div>
      </div>

      {data.notes && data.notes !== '(none)' && (
        <div className="gc-section">
          <div className="gc-label">Additional Notes</div>
          <p className="gc-notes">{data.notes}</p>
        </div>
      )}

      <div className="gc-section">
        <div className="gc-label">Sending To ({selectedProps.length})</div>
        <div className="gc-recipients">
          {selectedProps.map(p => (
            <div key={p.id} className="gc-recipient">
              <strong>{p.name}</strong>
              <span>{p.email}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="gc-section">
        <div className="gc-label">Referred By</div>
        <div className="gc-referral">DataLeopard Locating &middot; Georgetown, TX</div>
      </div>

      <button
        className="send-card-btn"
        onClick={onSend}
        disabled={sending || !selectedProps.length}
      >
        {sending ? 'Sending...' : `Send Guest Card to ${selectedProps.length} ${selectedProps.length === 1 ? 'Property' : 'Properties'}`}
      </button>
    </div>
  );
}
