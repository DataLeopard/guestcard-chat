import { useState, useRef, useEffect, useCallback } from 'react';
import { getStep } from './data/chatFlow';
import { matchProperties, properties } from './data/properties';
import { BotBubble, UserBubble } from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import PropertyMatch from './components/PropertyMatch';
import GuestCard from './components/GuestCard';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [currentStepId, setCurrentStepId] = useState('welcome');
  const [formData, setFormData] = useState({});
  const [matchedProps, setMatchedProps] = useState([]);
  const [selectedProps, setSelectedProps] = useState([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  const currentStep = getStep(currentStepId);

  // Show first bot message on mount and step change
  useEffect(() => {
    if (!currentStep || !currentStep.message) return;

    // Don't duplicate messages
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.stepId === currentStep.id && lastMsg?.from === 'bot') return;

    setTyping(true);
    const delay = currentStep.id === 'welcome' ? 600 : 800;
    const timer = setTimeout(() => {
      const text = typeof currentStep.message === 'function'
        ? currentStep.message(formData)
        : currentStep.message;
      setMessages(prev => [...prev, { from: 'bot', text, stepId: currentStep.id }]);
      setTyping(false);

      // Auto-advance matching step
      if (currentStep.type === 'matching') {
        setTimeout(() => {
          const matches = matchProperties({
            beds: formData.beds,
            budget: formData.budget,
            pets: !!formData.pets,
          });
          setMatchedProps(matches);
          setSelectedProps(matches.map(p => p.id));
          setCurrentStepId('review');
        }, 1200);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentStepId]);

  useEffect(() => { scrollToBottom(); }, [messages, typing, scrollToBottom]);

  const handleSubmit = (value, displayText) => {
    // Add user message
    setMessages(prev => [...prev, { from: 'user', text: displayText }]);

    // Save form data
    if (currentStep.field) {
      setFormData(prev => ({ ...prev, [currentStep.field]: value }));
    }

    // Advance to next step
    const nextId = currentStep.next(value, formData);
    setTimeout(() => setCurrentStepId(nextId), 300);
  };

  const handleToggleProp = (id) => {
    setSelectedProps(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    setSending(true);

    // Build mailto links for each selected property
    const selectedList = properties.filter(p => selectedProps.includes(p.id));
    const subject = encodeURIComponent(`Guest Card — ${formData.fullName}`);

    const bodyLines = [
      `GUEST CARD`,
      ``,
      `Prospect: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Move-In: ${formData.moveIn}`,
      ``,
      `SEARCH CRITERIA`,
      `Bedrooms: ${formData.beds} BR`,
      `Budget: Up to $${Number(formData.budget).toLocaleString()}/mo`,
      `Pets: ${formData.pets === false ? 'None' : formData.pets}`,
      `Must-Haves: ${formData.extras?.length ? formData.extras.join(', ') : 'None'}`,
      ``,
      formData.notes && formData.notes !== '(none)' ? `Notes: ${formData.notes}\n` : '',
      `Referred by: DataLeopard Locating — Georgetown, TX`,
      `Date: ${new Date().toLocaleDateString()}`,
    ];

    const body = encodeURIComponent(bodyLines.filter(Boolean).join('\n'));
    const emails = selectedList.map(p => p.email).join(',');

    // Simulate brief send delay, then open mailto and save to localStorage
    setTimeout(() => {
      window.open(`mailto:${emails}?subject=${subject}&body=${body}`, '_blank');

      // Save guest card to localStorage for dashboard
      const record = {
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        moveIn: formData.moveIn,
        beds: formData.beds,
        budget: formData.budget,
        pets: formData.pets === false ? 'None' : formData.pets,
        extras: formData.extras?.length ? formData.extras.join(', ') : 'None',
        notes: formData.notes && formData.notes !== '(none)' ? formData.notes : '',
        sentTo: selectedList.map(p => p.name).join(', '),
        sentToEmails: selectedList.map(p => p.email).join(', '),
        propertyCount: selectedList.length,
        status: 'sent',
      };
      const existing = JSON.parse(localStorage.getItem('guestcard_submissions') || '[]');
      existing.push(record);
      localStorage.setItem('guestcard_submissions', JSON.stringify(existing));
      // Dispatch storage event for same-tab listeners
      window.dispatchEvent(new StorageEvent('storage', { key: 'guestcard_submissions' }));

      setSending(false);
      setSent(true);
      setMessages(prev => [...prev, {
        from: 'bot',
        text: `Your guest card has been prepared for ${selectedList.length} ${selectedList.length === 1 ? 'property' : 'properties'}! The email should have opened in your mail app. The properties will reach out to schedule tours. Good luck with your apartment search!`,
        stepId: 'sent',
      }]);
    }, 1500);
  };

  const handleRestart = () => {
    setMessages([]);
    setFormData({});
    setMatchedProps([]);
    setSelectedProps([]);
    setSending(false);
    setSent(false);
    setCurrentStepId('welcome');
  };

  return (
    <div className="chat-shell">
      <header className="chat-header">
        <div className="header-avatar">GC</div>
        <div>
          <h1>GuestCard</h1>
          <p>Georgetown Apartment Search Assistant</p>
        </div>
      </header>

      <div className="chat-body">
        {messages.map((msg, i) => (
          msg.from === 'bot'
            ? <BotBubble key={i}>{msg.text}</BotBubble>
            : <UserBubble key={i}>{msg.text}</UserBubble>
        ))}

        {typing && (
          <div className="bubble-row bot-row">
            <div className="avatar bot-avatar">GC</div>
            <div className="bubble bot-bubble typing">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}

        {currentStepId === 'review' && !sent && matchedProps.length > 0 && (
          <div className="review-section">
            <PropertyMatch
              properties={matchedProps}
              selected={selectedProps}
              onToggle={handleToggleProp}
            />
            <GuestCard
              data={formData}
              selectedProperties={selectedProps}
              onSend={handleSend}
              sending={sending}
            />
          </div>
        )}

        {sent && (
          <div className="sent-section">
            <div className="sent-badge">Guest Card Sent</div>
            <button className="restart-btn" onClick={handleRestart}>Start New Search</button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {!sent && currentStep && currentStep.type !== 'matching' && currentStep.type !== 'review' && currentStep.type !== 'sent' && !typing && (
        <div className="chat-footer">
          <ChatInput step={currentStep} onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
}
