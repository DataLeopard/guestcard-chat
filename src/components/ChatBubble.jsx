export function BotBubble({ children }) {
  return (
    <div className="bubble-row bot-row">
      <div className="avatar bot-avatar">GC</div>
      <div className="bubble bot-bubble">{children}</div>
    </div>
  );
}

export function UserBubble({ children }) {
  return (
    <div className="bubble-row user-row">
      <div className="bubble user-bubble">{children}</div>
    </div>
  );
}
