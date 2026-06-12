const { useState, useEffect, useRef, useCallback } = React;

// ===== EMOJI DATA =====
const EMOJI_CATEGORIES = {
  '😊': ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🫢','🫣','🤫','🤔','🫡','🤐','🤨','😐','😑','😶','🫥','😏','😒','🙄','😬','😮‍💨','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥴','😵','🤯','🥳','🥺','😢','😭','😤','😠','😡','🤬','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖'],
  '❤️': ['❤️','🧡','💛','💚','💙','💜','🖤','🩷','🧡','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','💕','💞','💓','💗','💖','💘','💝','💟','♥️','🫶','🤝','👍','👎','👊','✊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦵','🦶','👂','🦻','👃','🧠','🫀','🫁','👀','👁️','👅','👄'],
  '🐱': ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🪳','🦟','🦗','🕷️','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🪸','🐊','🦭'],
  '🍎': ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🫒','🧄','🧅','🥔','🍠','🫘','🥐','🍞','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🦴','🌭','🍔','🍟','🍕','🫓','🥪','🥙','🧆','🌮','🌯','🫔','🥗','🥘','🫕','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥠','🥮','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🥛','🍼','🫖','☕','🍵','🧃','🥤','🧋','🍶','🍺','🍻','🥂','🍷','🫗','🥃','🍸','🍹','🧉','🍾'],
  '⚽': ['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒','🏑','🥍','🏏','🪃','🥅','⛳','🪁','🏹','🎣','🤿','🥊','🥋','🎽','🛹','🛼','🛷','⛸️','🥌','🎿','⛷️','🏂','🪂','🏋️','🤼','🤸','🤺','⛹️','🤾','🏌️','🏇','🧘','🏄','🏊','🤽','🚣','🧗','🚵','🚴','🏆','🥇','🥈','🥉','🏅','🎖️','🏵️','🎗️','🎫','🎟️','🎪','🤹','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🪘','🎷','🎺','🪗','🎸','🪕','🎻','🎲','♟️','🎯','🎳','🎮','🕹️'],
  '🚗': ['🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🏍️','🛵','🛺','🚲','🛴','🛹','🚏','🛣️','🛤️','⛽','🛞','🚨','🚥','🚧','⚓','🛳️','⛵','🛶','🚤','🛴','✈️','🛩️','🛫','🛬','🪁','💺','🚁','🚟','🚠','🚡','🛰️','🚀','🛸','🏠','🏡','🏘️','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌','🛕','🕍','⛩️','🕋','⛲','🌋','🏔️','🏕️','🏖️','🏜️','🏝️','🏟️','🏛️','🛖'],
  '💡': ['⌚','📱','💻','⌨️','🖥️','🖨️','🖱️','🖲️','🕹️','🗜️','💽','💾','💿','📀','📼','📷','📸','📹','🎥','📽️','🎞️','📞','☎️','📟','📠','📺','📻','🎙️','🎚️','🎛️','🧭','⏰','⏲️','⏱️','🕰️','🪫','🔋','🛢️','💵','💴','💶','💷','🪙','💰','💳','💎','⚖️','🪜','🧰','🪛','🔧','🔨','⚒️','🛠️','⛏️','🪚','🔩','⚙️','🪤','🧱','⛓️','🧲','🔫','💣','🧨','🪓','🔪','🗡️','⚔️','🛡️','🚬','⚰️','🪦','⚱️','🏺','🔮','📿','💈','⚗️','🔭','🔬','🕳️','🩻','🩹','🩺','💊','💉','🩸','🧬','🦠','🧫','🧪','🌡️','🧹','🪠','🧺','🧻','🚽','🚰','🚿','🛁','🛀','🧼','🪥','🪒','🧽','🪣','🧴','🛎️','🔑','🗝️','🚪','🪑','🛋️','🛏️','🛌','🧸','🪆','🖼️','🪞','🪟','🛍️','🛒','🎁','🎈','🎏','🎀','🪄','🪅','🎊','🎉','🎎','🏮','🎐','🧧','✉️','📩','📨','📧','💌','📥','📤','📦','🏷️','📪','📫','📬','📭','📮','📯','📜','📃','📄','📑','🧾','📊','📈','📉','🗒️','🗓️','📆','📅','📇','🗃️','🗳️','🗄️','📋','📁','📂','🗂️','🗞️','📰','📓','📔','📒','📕','📗','📘','📙','📚','📖','🔖','🧷','🔗','📎','🖇️','📐','📏','🧮','📌','📍','✂️','🖊️','🖋️','✒️','🖌️','🖍️','📝','📝','✏️','🔍','🔎','🔏','🔐','🔒','🔓']
};

const CATEGORY_ICONS = ['😊','❤️','🐱','🍎','⚽','🚗','💡'];
const CATEGORY_LABELS = ['笑脸','爱心','动物','食物','运动','旅行','物品'];

// ===== HOOK: CLICK OUTSIDE =====
function useClickOutside(ref, handler) {
  useEffect(() => {
    function onMouseDown(e) {
      if (ref.current && !ref.current.contains(e.target)) handler(e);
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [ref, handler]);
}

// ===== EMOJI PICKER COMPONENT =====
function EmojiPicker({ onSelect, onClose }) {
  const [category, setCategory] = useState('😊');
  const pickerRef = useRef(null);
  useClickOutside(pickerRef, onClose);

  return (
    <div className="emoji-picker-overlay" ref={pickerRef}>
      <div className="emoji-header">
        {CATEGORY_ICONS.map((icon, i) => (
          <span
            key={icon}
            className={category === icon ? 'active' : ''}
            onClick={() => setCategory(icon)}
            title={CATEGORY_LABELS[i]}
          >
            {icon}
          </span>
        ))}
      </div>
      <div className="emoji-grid">
        {(EMOJI_CATEGORIES[category] || []).map((emoji) => (
          <span
            key={emoji}
            className="emoji-item"
            onClick={() => { onSelect(emoji); }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

// ===== LEFT DRAWER (with AI button at avatar top-left) =====
function LeftDrawer({ isOpen, onClose, username, avatarEmoji, isActive, onToggle }) {
  const [showApiInput, setShowApiInput] = useState(false);
  const [apiKeyValue, setApiKeyValue] = useState(localStorage.getItem('ai_api_key') || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (showApiInput && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [showApiInput]);

  function handleApiSubmit() {
    const trimmed = apiKeyValue.trim();
    if (trimmed) {
      localStorage.setItem('ai_api_key', trimmed);
      onToggle(true);
    } else {
      localStorage.removeItem('ai_api_key');
      onToggle(false);
    }
    setShowApiInput(false);
  }

  function handleApiKeyDown(e) {
    if (e.key === 'Enter') handleApiSubmit();
    if (e.key === 'Escape') setShowApiInput(false);
  }

  return (
    <>
      <div className={`left-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`left-drawer ${isOpen ? 'open' : ''}`}>
        {/* Avatar + AI button at its top-left */}
        <div className="drawer-avatar-wrapper">
          <div className="drawer-avatar">{avatarEmoji}</div>
          <button
            className={`drawer-ai-btn ${isActive ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setShowApiInput((p) => !p); }}
            title="AI 设置"
          >
            <i className={`fas ${isActive ? 'fa-robot' : 'fa-power-off'}`}></i>
          </button>
        </div>
        <div className="drawer-username">{username}</div>

        {/* API Key input (inside drawer) */}
        {showApiInput && (
          <div className="drawer-api-input">
            <label>输入 API Key 激活 AI</label>
            <input
              ref={inputRef}
              type="password"
              placeholder="sk-..."
              value={apiKeyValue}
              onChange={(e) => setApiKeyValue(e.target.value)}
              onKeyDown={handleApiKeyDown}
            />
            <div className="drawer-api-actions">
              <button className="dbtn-cancel" onClick={() => setShowApiInput(false)}>取消</button>
              <button className="dbtn-confirm" onClick={handleApiSubmit}>确认</button>
            </div>
          </div>
        )}

        {/* Centered menu buttons */}
        <div className="drawer-menu">
          <button className="drawer-menu-item" onClick={() => alert('登录功能')}>
            <i className="fas fa-sign-in-alt"></i>
            <span>登录</span>
          </button>
          <button className="drawer-menu-item" onClick={() => alert('帮助中心')}>
            <i className="fas fa-question-circle"></i>
            <span>帮助</span>
          </button>
          <button className="drawer-menu-item" onClick={() => alert('设置页面')}>
            <i className="fas fa-cog"></i>
            <span>设置</span>
          </button>
        </div>
      </div>
    </>
  );
}

// ===== MESSAGE COMPONENT =====
function MessageItem({ msg }) {
  const timeStr = new Date(msg.time).toLocaleTimeString('zh-CN', {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className={`message ${msg.role}`}>
      <div className="msg-avatar">
        {msg.role === 'user' ? '👤' : '🤖'}
      </div>
      <div>
        <div className="msg-bubble">
          {msg.text}
          {msg.image && <img src={msg.image} alt="发送的图片" />}
        </div>
        <div className="msg-time">{timeStr}</div>
      </div>
    </div>
  );
}

// ===== VIDEO CHAT BAR =====
function VideoChatBar({ aiSpeaking }) {
  const myVideoRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    if (cameraOn && myVideoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (myVideoRef.current) myVideoRef.current.srcObject = stream;
        })
        .catch(() => {
          setCameraOn(false);
        });
    }
    return () => {
      if (myVideoRef.current && myVideoRef.current.srcObject) {
        myVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, [cameraOn]);

  return (
    <div className="video-chat-bar">
      {/* My Video */}
      <div className="video-frame">
        <div className="video-circle my-video" onClick={() => setCameraOn((c) => !c)}>
          {cameraOn ? (
            <video ref={myVideoRef} autoPlay muted playsInline />
          ) : (
            <div className="no-video-placeholder">👤</div>
          )}
        </div>
        <span className="video-label">{cameraOn ? '📷 我的视频' : '👤 我的头像'}</span>
      </div>

      <div style={{ color: '#555', fontSize: 20 }}>vs</div>

      {/* AI Avatar — message icon with stick-figure eyes */}
      <div className="video-frame">
        <div className={`ai-avatar-wrapper ${aiSpeaking ? 'speaking' : ''}`}>
          <div className="ripple-ring"></div>
          <div className="ripple-ring"></div>
          <div className="ripple-ring"></div>
          <div className="video-circle ai-avatar">
            <svg viewBox="0 0 100 100" width="60" height="60" fill="none">
              {/* Message bubble */}
              <rect x="10" y="10" width="80" height="60" rx="16" ry="16" fill="url(#msgGrad)" />
              {/* Tail */}
              <polygon points="35,70 25,88 45,70" fill="url(#msgGrad)" />
              {/* Eyes — simple strokes */}
              <circle cx="38" cy="42" r="4" fill="#fff" />
              <circle cx="62" cy="42" r="4" fill="#fff" />
              <defs>
                <linearGradient id="msgGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#4d96ff" />
                  <stop offset="100%" stop-color="#9b59b6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <span className="video-label">💬 AI 伴侣</span>
      </div>
    </div>
  );
}

// ===== WELCOME MESSAGE =====
function WelcomeMessages({ onSendDemo }) {
  const demos = [
    '你好，介绍一下自己',
    '今天有什么新闻？',
    '帮我写一首诗',
    '推荐一本好书',
  ];

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      padding: 20,
      color: '#888',
    }}>
      <div style={{ fontSize: 64, opacity: 0.3 }}>💬</div>
      <div style={{ fontSize: 20, color: '#aaa', marginBottom: 8 }}>AI 智能伴侣</div>
      <div style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
        输入 API Key 激活 AI，开始对话
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {demos.map((text) => (
          <button
            key={text}
            onClick={() => onSendDemo(text)}
            style={{
              padding: '8px 18px',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              color: '#999',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(77,150,255,0.1)';
              e.target.style.color = '#4d96ff';
              e.target.style.borderColor = 'rgba(77,150,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.03)';
              e.target.style.color = '#999';
              e.target.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== MAIN APP =====
function App() {
  const [apiKeyActive, setApiKeyActive] = useState(!!localStorage.getItem('ai_api_key'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [pendingImages, setPendingImages] = useState([]);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [username] = useState('旅行者');
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const toggleDrawer = useCallback(() => setDrawerOpen((d) => !d), []);

  // Auto scroll messages
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function handleApiToggle(active) {
    setApiKeyActive(active);
  }

  function addMessage(role, text, image) {
    const msg = {
      id: Date.now() + Math.random(),
      role,
      text,
      image: image || null,
      time: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }

  function handleSend() {
    const text = inputText.trim();
    if (!text && pendingImages.length === 0) return;

    const image = pendingImages[0] || null;
    addMessage('user', text, image);
    setInputText('');
    setPendingImages([]);
    setShowEmoji(false);

    // Simulate AI response
    setAiSpeaking(true);
    setTimeout(() => {
      const AI_REPLIES = [
        '这是一个很有意思的问题，让我想想 🤔',
        '好的，我明白了！让我来帮你解决 💡',
        '很高兴和你聊天 😊',
        '你说得对，我也有同感！',
        '让我查一下资料... 找到了！📚',
        '这个问题很有深度，我来分析一下 🔍',
      ];
      const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
      addMessage('ai', reply);
      setAiSpeaking(false);
    }, 1500 + Math.random() * 1000);
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files || []);
    const newImages = [];
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setPendingImages((prev) => [...prev, ev.target.result]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = '';
  }

  function removePendingImage(idx) {
    setPendingImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleEmojiSelect(emoji) {
    setInputText((prev) => prev + emoji);
    setShowEmoji(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleDemoSend(text) {
    setInputText(text);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.value = text;
      }
      handleSend();
    }, 10);
  }

  // Adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputText]);

  const hasContent = messages.length > 0;

  return (
    <div className="app-container">
      {/* Menu toggle (top-left) */}
      <button
        onClick={toggleDrawer}
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 999,
          background: 'rgba(42,42,74,0.6)',
          backdropFilter: 'blur(8px)',
          border: 'none',
          color: '#c0c0d0',
          fontSize: 20,
          cursor: 'pointer',
          padding: '10px 14px',
          borderRadius: 12,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(77,150,255,0.15)';
          e.target.style.color = '#4d96ff';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(42,42,74,0.6)';
          e.target.style.color = '#c0c0d0';
        }}
      >
        <i className={`fas ${drawerOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Left Drawer (contains AI button at avatar top-left) */}
      <LeftDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        username={username}
        avatarEmoji="🧑‍🚀"
        isActive={apiKeyActive}
        onToggle={handleApiToggle}
      />

      {/* Main Area */}
      <div className={`main-area ${drawerOpen ? 'drawer-open' : ''}`}>
        {/* Video Chat Bar */}
        <VideoChatBar aiSpeaking={aiSpeaking} />

        {/* Chat Messages */}
        {hasContent ? (
          <div className="chat-messages" ref={chatRef}>
            {messages.map((msg) => (
              <MessageItem key={msg.id} msg={msg} />
            ))}
          </div>
        ) : (
          <WelcomeMessages onSendDemo={handleDemoSend} />
        )}

        {/* Image Preview */}
        {pendingImages.length > 0 && (
          <div className="image-preview-bar">
            {pendingImages.map((img, i) => (
              <div key={i} className="preview-item">
                <img src={img} alt="preview" />
                <button className="remove-preview" onClick={() => removePendingImage(i)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="input-area">
          <div className="input-wrapper">
            {/* Image upload button */}
            <button
              className="action-btn"
              onClick={() => fileInputRef.current?.click()}
              title="发送图片"
            >
              <i className="fas fa-image"></i>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="file-input-hidden"
              onChange={handleImageUpload}
            />

            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息... (Shift+Enter 换行)"
              rows={1}
            />

            {/* Emoji button */}
            <button
              className="action-btn"
              onClick={() => setShowEmoji((e) => !e)}
              title="表情"
              style={{ color: showEmoji ? '#4d96ff' : undefined }}
            >
              <i className="fas fa-smile"></i>
            </button>
          </div>

          <button className="send-btn" onClick={handleSend} title="发送">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmoji && (
          <EmojiPicker
            onSelect={handleEmojiSelect}
            onClose={() => setShowEmoji(false)}
          />
        )}
      </div>
    </div>
  );
}

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
