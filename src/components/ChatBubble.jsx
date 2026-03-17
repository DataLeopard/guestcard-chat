export function BotBubble({ children }) {
  return (
    <div className="bubble-row bot-row msg-slide-in-left">
      <div className="avatar bot-avatar">GC</div>
      <div className="bubble bot-bubble">{children}</div>
    </div>
  );
}

export function UserBubble({ children }) {
  return (
    <div className="bubble-row user-row msg-slide-in-right">
      <div className="bubble user-bubble">{children}</div>
    </div>
  );
}
