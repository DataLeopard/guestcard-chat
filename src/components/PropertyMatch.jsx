export default function PropertyMatch({ properties, selected, onToggle }) {
  if (!properties.length) {
    return (
      <div className="no-matches">
        <p>No exact matches found with your criteria. We'll still send your guest card to properties that are close to what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="property-matches">
      <div className="match-count">{properties.length} {properties.length === 1 ? 'property matches' : 'properties match'} your search</div>
      {properties.map(p => (
        <label key={p.id} className={`match-card ${selected.includes(p.id) ? 'checked' : ''}`}>
          <input
            type="checkbox"
            checked={selected.includes(p.id)}
            onChange={() => onToggle(p.id)}
          />
          <div className="match-info">
            <div className="match-name">{p.name}</div>
            <div className="match-details">
              {p.beds.join('/')} BR &middot; ${p.rent.min.toLocaleString()} – ${p.rent.max.toLocaleString()}/mo
            </div>
            <div className="match-address">{p.address}</div>
            {p.specials && <div className="match-special">{p.specials}</div>}
          </div>
        </label>
      ))}
    </div>
  );
}
