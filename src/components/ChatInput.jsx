import { useState } from 'react';

export default function ChatInput({ step, onSubmit }) {
  const [text, setText] = useState('');
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(null);

  if (step.type === 'buttons') {
    return (
      <div className="input-area">
        <div className="button-options">
          {step.options.map(opt => (
            <button key={opt.value} className="option-btn" onClick={() => onSubmit(opt.value, opt.label)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step.type === 'multiselect') {
    const toggle = (val) => {
      setSelected(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
    };
    return (
      <div className="input-area">
        <div className="button-options multi">
          {step.options.map(opt => (
            <button
              key={opt.value}
              className={`option-btn ${selected.includes(opt.value) ? 'selected' : ''}`}
              onClick={() => toggle(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button className="send-btn" onClick={() => { onSubmit(selected, selected.length ? selected.join(', ') : 'None'); setSelected([]); }}>
          {selected.length ? `Continue (${selected.length})` : 'Skip'}
        </button>
      </div>
    );
  }

  if (step.type === 'text') {
    const handleSubmit = () => {
      const val = text.trim();
      if (!val && step.field !== 'notes') return;
      if (step.validate) {
        const err = step.validate(val);
        if (err) { setError(err); return; }
      }
      setError(null);
      onSubmit(val || '(none)', val || '(none)');
      setText('');
    };
    return (
      <div className="input-area">
        {error && <div className="input-error">{error}</div>}
        <div className="text-input-row">
          <input
            type="text"
            value={text}
            onChange={e => { setText(e.target.value); setError(null); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder={step.placeholder || 'Type your answer...'}
            autoFocus
          />
          <button className="send-btn" onClick={handleSubmit}>Send</button>
        </div>
      </div>
    );
  }

  return null;
}
