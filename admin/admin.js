/* ═══════════════════════════════════════════════════════════
   CryptoNites Admin Panel  ·  Split-pane live preview
═══════════════════════════════════════════════════════════ */
const { useState, useEffect, useRef } = React;

// admin/ is one level below root, so prepend ../ when loading local screenshots
const ADMIN_THUMB_PREFIX = '../';

const GIST_RAW_URL = 'https://gist.githubusercontent.com/houseferroccite/b909d0117f57de64cf90c34e9b35a49d/raw/content.json';

/* ── CONTENT DEFAULT ── */
const CONTENT_DEFAULT = {
  hero: {
    badge: 'Эксклюзивно для macOS · Версия 1.0',
    titleLine1: 'Торговый журнал',
    titleLine2: 'нового поколения',
    titleLine3: 'крипто-трейдеров',
    sub: 'CryptoNites — это не просто журнал сделок. Это AI-powered аналитический центр, построенный нативно для macOS с глубокой интеграцией в экосистему Apple.',
    btnPrimary: 'Скачать для Mac',
    btnSecondary: 'Смотреть возможности',
  },
  features: [
    {icon:'🧠',bg:'rgba(124,111,255,0.15)',title:'AI-анализ через OpenRouter',desc:'Подключите GPT-4o, Claude Sonnet или бесплатные Llama/Mistral модели. AI анализирует ваши сделки, находит паттерны и даёт рекомендации прямо в приложении.',badge:'Эксклюзивно',bCls:'badge-unique'},
    {icon:'📊',bg:'rgba(0,201,107,0.12)',title:'Живой Dashboard',desc:'Win Rate, Profit Factor, equity-кривая, рекордные дни и тепловая карта активности — всё обновляется в реальном времени.',badge:'Актуально',bCls:'badge-new'},
    {icon:'📈',bg:'rgba(245,158,11,0.12)',title:'Свечной график прямо в приложении',desc:'Встроенные OHLCV-графики через CoinGecko — без браузера. BTC, ETH, SOL и тысячи других монет.',badge:'macOS Native',bCls:'badge-macos'},
    {icon:'🔐',bg:'rgba(124,111,255,0.15)',title:'PIN + Touch ID блокировка',desc:'Полная защита в Keychain с флагом kSecAttrAccessibleWhenUnlockedThisDeviceOnly. Автоблокировка с таймером.',badge:'Уникально',bCls:'badge-unique'},
    {icon:'🔄',bg:'rgba(255,59,92,0.12)',title:'Импорт из BingX',desc:'Автоматически подтягивайте историю сделок через официальный API BingX. Ключи зашифрованы в системном Keychain.',badge:'Интеграция',bCls:'badge-new'},
    {icon:'📤',bg:'rgba(0,201,107,0.12)',title:'Мультиформатный экспорт',desc:'CSV, JSON, Markdown, TXT — одним кликом из журнала. Экспортируется именно то, что видите с активным фильтром.',badge:'4 формата',bCls:'badge-macos'},
    {icon:'⌘',bg:'rgba(124,111,255,0.15)',title:'Command Palette (⌘K)',desc:'Быстрая навигация, поиск по сделкам и запуск AI-анализа — всё с клавиатуры без мыши.',badge:'macOS Native',bCls:'badge-macos'},
    {icon:'📰',bg:'rgba(245,158,11,0.12)',title:'Новостной фон + AI-саммари',desc:'Последние новости по любой монете через CryptoPanic API с автоматическим AI-резюме на русском.',badge:'Новинка',bCls:'badge-new'},
    {icon:'📖',bg:'rgba(0,201,107,0.12)',title:'Встроенный справочник ошибок',desc:'22 статьи с пошаговыми решениями внутри приложения. Поиск и фильтрация по категориям.',badge:'Только здесь',bCls:'badge-unique'},
  ],
  slides: [
    {src:'assets/screenshots/dashbord.png',                      cap:'📊 Dashboard — обзор портфеля и статистика'},
    {src:'assets/screenshots/Viewing transactions is common.png', cap:'📋 Журнал сделок — полный список'},
    {src:'assets/screenshots/Viewing the transaction in detail.png', cap:'🔍 Просмотр сделки в деталях'},
    {src:'assets/screenshots/Transactions addendum.png',          cap:'✏️ Добавление новой сделки'},
    {src:'assets/screenshots/AI_annalization.png',                cap:'🧠 AI-анализ сделок — OpenRouter · 9 моделей'},
    {src:'assets/screenshots/money.png',                          cap:'📈 Рынок — свечные графики в реальном времени'},
    {src:'assets/screenshots/depozit.png',                        cap:'💰 Депозит — история пополнений'},
    {src:'assets/screenshots/account.png',                        cap:'👤 Профиль — API ключи и настройки'},
  ],
  unique: [
    {n:1,title:'Нативный SwiftUI без Electron',desc:'Написан полностью на SwiftUI и SwiftData. Минимум памяти, максимум скорости.'},
    {n:2,title:'AI с автофоллбэком на 5 моделей',desc:'Если модель недоступна — переключается на следующую бесплатную автоматически.'},
    {n:3,title:'Данные никогда не покидают Mac',desc:'Все сделки в SwiftData. API-ключи в Keychain с самым строгим флагом.'},
    {n:4,title:'Аватар + профиль трейдера',desc:'Фото, цвет, имя — приложение персонализируется под вас.'},
    {n:5,title:'Единый центр сделок, рынка и AI',desc:'TradingView, Telegram и ChatGPT заменены одной нативной Mac-программой.'},
  ],
  compareRows: [
    ['Нативный macOS (SwiftUI)','✓ Да','✗ Нет','✗ Electron'],
    ['AI-анализ с выбором модели','✓ 9 моделей','✗ Нет','✗ Нет'],
    ['Автофоллбэк при недоступности AI','✓ Автомат.','✗ Нет','✗ Нет'],
    ['Импорт из биржи (BingX)','✓ API','✗ CSV вручную','✗ Только CSV'],
    ['Свечной график внутри','✓ Встроен','✗ Нет','✗ Нет'],
    ['PIN + Touch ID','✓ Keychain','✗ Нет','✗ Нет'],
    ['Данные остаются локально','✓ Всегда','✗ Облако','✗ Сервер'],
    ['Экспорт CSV/JSON/MD/TXT','✓ 4 формата','✗ 1 формат','✗ Только CSV'],
    ['Command Palette (⌘K)','✓ Есть','✗ Нет','✗ Нет'],
    ['Встроенный справочник ошибок','✓ 22 статьи','✗ Нет','✗ Нет'],
  ],
};

/* ════════════════════════════════════════════════════════════
   GIST LOADER
════════════════════════════════════════════════════════════ */
function useGistContent(cfg) {
  const [content, setContent] = useState(CONTENT_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState('');

  useEffect(() => {
    if (!cfg || !cfg.gistId || !cfg.gistOwner) {
      setLoading(false);
      return;
    }
    const url = `https://gist.githubusercontent.com/${cfg.gistOwner}/${cfg.gistId}/raw/content.json?t=${Date.now()}`;
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => { setContent({ ...CONTENT_DEFAULT, ...data }); setLoading(false); })
      .catch(e => { setFetchErr(e.message); setLoading(false); });
  }, []);

  return [content, setContent, loading, fetchErr];
}

/* ════════════════════════════════════════════════════════════
   SHARED UI PRIMITIVES
════════════════════════════════════════════════════════════ */
function Field({ label, value, onChange, multiline, rows = 2 }) {
  return (
    <div>
      <span className="adm-label">{label}</span>
      {multiline
        ? <textarea className="adm-textarea" rows={rows} value={value} onChange={e => onChange(e.target.value)} />
        : <input className="adm-input" value={value} onChange={e => onChange(e.target.value)} />
      }
    </div>
  );
}

function Collapsible({ title, icon, onDelete, onMoveUp, onMoveDown, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="adm-card">
      <div className="adm-card-header" onClick={() => setOpen(o => !o)}>
        {icon && <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>}
        <span className="adm-card-title">{title}</span>
        <span style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
          {onMoveUp   && <button className="btn-del" style={{ padding: '3px 7px' }} onClick={onMoveUp}>↑</button>}
          {onMoveDown && <button className="btn-del" style={{ padding: '3px 7px' }} onClick={onMoveDown}>↓</button>}
          {onDelete   && <button className="btn-del" onClick={onDelete}>🗑</button>}
        </span>
        <span className="adm-chevron" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
      </div>
      {open && <div className="adm-card-body">{children}</div>}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PREVIEW COMPONENTS  (right-hand live preview)
════════════════════════════════════════════════════════════ */
function PreviewHero({ hero }) {
  return (
    <div className="preview-section">
      <div className="preview-section-title">Hero</div>
      <div className="prev-hero">
        <div className="prev-badge-pill">
          <div className="prev-badge-dot" />
          {hero.badge}
        </div>
        <div className="prev-h1">
          <span className="prev-gradient">{hero.titleLine1}</span><br />
          {hero.titleLine2}<br />
          для <span className="prev-highlight">{hero.titleLine3}</span>
        </div>
        <div className="prev-sub">{hero.sub}</div>
        <div className="prev-btns">
          <div className="prev-btn-p">⌘ {hero.btnPrimary}</div>
          <div className="prev-btn-s">{hero.btnSecondary}</div>
        </div>
      </div>
    </div>
  );
}

const BADGE_LABELS = { 'badge-new': 'badge-new', 'badge-unique': 'badge-unique', 'badge-macos': 'badge-macos' };

function PreviewFeatures({ features }) {
  return (
    <div className="preview-section">
      <div className="preview-section-title">Features ({features.length} карточек)</div>
      <div className="prev-feat-grid">
        {features.map((f, i) => (
          <div className="prev-feat-card" key={i}>
            <div className="prev-feat-icon" style={{ background: f.bg }}>{f.icon}</div>
            <div className="prev-feat-title">{f.title}</div>
            <div className="prev-feat-desc">{f.desc}</div>
            <span className={`prev-feat-badge ${f.bCls}`}>{f.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewGallery({ slides }) {
  return (
    <div className="preview-section">
      <div className="preview-section-title">Gallery ({slides.length} слайдов)</div>
      <div className="prev-slides">
        {slides.map((s, i) => (
          <div className="prev-slide" key={i}>
            <img
              className="prev-slide-thumb"
              src={ADMIN_THUMB_PREFIX + s.src}
              alt={s.cap}
              onError={e => { e.target.style.background = 'var(--bg3)'; e.target.src = ''; }}
            />
            <div className="prev-slide-cap">{s.cap}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewUnique({ unique }) {
  return (
    <div className="preview-section">
      <div className="preview-section-title">Уникальность</div>
      <div className="prev-unique">
        {unique.map((u, i) => (
          <div className="prev-unique-item" key={i}>
            <div className="prev-unique-num">{u.n}</div>
            <div>
              <div className="prev-unique-title">{u.title}</div>
              <div className="prev-unique-desc">{u.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewCompare({ compareRows }) {
  return (
    <div className="preview-section">
      <div className="preview-section-title">Сравнение ({compareRows.length} строк)</div>
      <div className="prev-compare">
        <table className="prev-table">
          <thead>
            <tr>
              <th>Функция</th>
              <th className="our">CryptoNites</th>
              <th>Notion</th>
              <th>Прочие</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row, i) => (
              <tr key={i}>
                <td>{row[0]}</td>
                <td className="our-col"><span className="prev-check">{row[1]}</span></td>
                <td><span className="prev-cross">{row[2]}</span></td>
                <td><span className="prev-cross">{row[3]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   EDITOR TABS  (left-hand editors)
════════════════════════════════════════════════════════════ */
function HeroEditor({ hero, onChange }) {
  const set = (k, v) => onChange({ ...hero, [k]: v });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Field label="Badge-текст" value={hero.badge} onChange={v => set('badge', v)} />
      <Field label="Заголовок — строка 1 (градиент)" value={hero.titleLine1} onChange={v => set('titleLine1', v)} />
      <Field label="Заголовок — строка 2" value={hero.titleLine2} onChange={v => set('titleLine2', v)} />
      <Field label="Заголовок — строка 3 (зелёный акцент)" value={hero.titleLine3} onChange={v => set('titleLine3', v)} />
      <Field label="Подзаголовок" value={hero.sub} onChange={v => set('sub', v)} multiline rows={4} />
      <div className="adm-row">
        <div className="adm-col"><Field label="Кнопка 1 (главная)" value={hero.btnPrimary} onChange={v => set('btnPrimary', v)} /></div>
        <div className="adm-col"><Field label="Кнопка 2 (вторичная)" value={hero.btnSecondary} onChange={v => set('btnSecondary', v)} /></div>
      </div>
    </div>
  );
}

function FeaturesEditor({ features, onChange }) {
  const update  = (i, patch) => onChange(features.map((f, j) => j === i ? { ...f, ...patch } : f));
  const del     = (i)        => onChange(features.filter((_, j) => j !== i));
  const moveUp  = (i)        => { if (i === 0) return; const a = [...features]; [a[i-1], a[i]] = [a[i], a[i-1]]; onChange(a); };
  const moveDown = (i)       => { if (i === features.length - 1) return; const a = [...features]; [a[i], a[i+1]] = [a[i+1], a[i]]; onChange(a); };
  const add = () => onChange([...features, { icon: '⭐', bg: 'rgba(124,111,255,0.15)', title: 'Новая функция', desc: 'Описание', badge: 'Новое', bCls: 'badge-new' }]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {features.map((f, i) => (
        <Collapsible
          key={i}
          icon={f.icon}
          title={f.title}
          onDelete={() => del(i)}
          onMoveUp={i > 0 ? () => moveUp(i) : null}
          onMoveDown={i < features.length - 1 ? () => moveDown(i) : null}
        >
          <div className="adm-row">
            <div>
              <span className="adm-label">Иконка (emoji)</span>
              <input className="adm-icon-inp" value={f.icon} onChange={e => update(i, { icon: e.target.value })} />
            </div>
            <div className="adm-col">
              <Field label="Заголовок" value={f.title} onChange={v => update(i, { title: v })} />
            </div>
          </div>
          <Field label="Описание" value={f.desc} onChange={v => update(i, { desc: v })} multiline rows={3} />
          <div className="adm-row">
            <div className="adm-col">
              <Field label="Badge текст" value={f.badge} onChange={v => update(i, { badge: v })} />
            </div>
            <div className="adm-col">
              <span className="adm-label">Badge цвет</span>
              <select className="adm-select" value={f.bCls} onChange={e => update(i, { bCls: e.target.value })}>
                <option value="badge-new">Зелёный (badge-new)</option>
                <option value="badge-unique">Фиолетовый (badge-unique)</option>
                <option value="badge-macos">Жёлтый (badge-macos)</option>
              </select>
            </div>
          </div>
          <Field label="Фон иконки (CSS rgba)" value={f.bg} onChange={v => update(i, { bg: v })} />
        </Collapsible>
      ))}
      <button className="btn-add" onClick={add}>+ Добавить карточку</button>
    </div>
  );
}

function GalleryEditor({ slides, onChange }) {
  const update = (i, patch) => onChange(slides.map((s, j) => j === i ? { ...s, ...patch } : s));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {slides.map((s, i) => (
        <div className="adm-card" key={i}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <img
              src={ADMIN_THUMB_PREFIX + s.src}
              alt=""
              style={{ width: 72, height: 46, objectFit: 'cover', borderRadius: 6, background: 'var(--bg3)', flexShrink: 0 }}
              onError={e => { e.target.style.background = 'var(--bg3)'; e.target.src = ''; }}
            />
            <div style={{ flex: 1 }}>
              <Field label={`Слайд ${i + 1} · ${s.src}`} value={s.cap} onChange={v => update(i, { cap: v })} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UniqueEditor({ unique, onChange }) {
  const update = (i, k, v) => onChange(unique.map((u, j) => j === i ? { ...u, [k]: v } : u));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {unique.map((u, i) => (
        <Collapsible key={i} title={`${u.n}. ${u.title}`}>
          <Field label="Заголовок" value={u.title} onChange={v => update(i, 'title', v)} />
          <Field label="Описание" value={u.desc} onChange={v => update(i, 'desc', v)} multiline rows={3} />
        </Collapsible>
      ))}
    </div>
  );
}

function CompareEditor({ compareRows, onChange }) {
  const updateCell = (r, c, v) =>
    onChange(compareRows.map((row, ri) => ri === r ? row.map((cell, ci) => ci === c ? v : cell) : row));
  const addRow = () => onChange([...compareRows, ['Новая функция', '✓ Есть', '✗ Нет', '✗ Нет']]);
  const delRow = (r) => onChange(compareRows.filter((_, ri) => ri !== r));
  const cols = ['Функция', 'CryptoNites', 'Notion / Таблицы', 'Прочие журналы'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {compareRows.map((row, r) => (
        <div className="adm-card" key={r}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span className="adm-label" style={{ margin: 0 }}>Строка {r + 1}</span>
            <button className="btn-del" onClick={() => delRow(r)}>🗑 Удалить</button>
          </div>
          <div className="adm-grid4">
            {row.map((cell, c) => (
              <div key={c}>
                <span className="adm-label">{cols[c]}</span>
                <input className="adm-input" value={cell} onChange={e => updateCell(r, c, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={addRow}>+ Добавить строку</button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   LOGIN / NO-CONFIG
════════════════════════════════════════════════════════════ */
function LoginScreen({ onLogin }) {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const cfg = window.ADMIN_CONFIG;

  const submit = () => {
    if (!cfg) { setErr('admin-config.js не загружен. Откройте через локальный сервер.'); return; }
    if (pwd === (cfg.adminPassword || '')) {
      onLogin();
    } else {
      setErr('Неверный пароль');
      setPwd('');
    }
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-box">
        <div className="adm-login-title">⚡ CryptoNites Admin</div>
        <div className="adm-login-sub">Введите пароль из admin-config.js</div>
        <input
          className="adm-input"
          type="password"
          placeholder="Пароль"
          value={pwd}
          onChange={e => { setPwd(e.target.value); setErr(''); }}
          onKeyDown={e => e.key === 'Enter' && submit()}
          autoFocus
        />
        {err && <div className="adm-err">{err}</div>}
        <button className="btn-save" style={{ width: '100%', marginTop: 16 }} onClick={submit}>
          Войти
        </button>
      </div>
    </div>
  );
}

function NoConfigScreen() {
  return (
    <div className="adm-noconfig">
      <div style={{ fontSize: 48 }}>🔒</div>
      <h2>admin-config.js не найден</h2>
      <p>
        Этот файл хранится только на вашем ноуте и не попадает в git.<br />
        Откройте <code>admin/admin.html</code> через локальный сервер:<br />
        <code>cd /путь/к/проекту && npx serve .</code><br />
        затем <code>http://localhost:3000/admin/admin.html</code>
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════════════════════ */
function AdminApp() {
  const cfg = window.ADMIN_CONFIG;
  const [authed, setAuthed]  = useState(false);
  const [tab, setTab]        = useState('hero');
  const [status, setStatus]  = useState(null); // {msg, type:'ok'|'err'|'info'}
  const [saving, setSaving]  = useState(false);
  const [content, setContent, loading, fetchErr] = useGistContent(cfg);

  if (!cfg)    return <NoConfigScreen />;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text2)', fontSize: 14 }}>
      Загружаю контент из Gist...
    </div>
  );

  /* ── Save to Gist ── */
  const save = async () => {
    if (!cfg.gistId)    { setStatus({ msg: 'gistId не задан в admin-config.js', type: 'err' }); return; }
    if (!cfg.githubPat) { setStatus({ msg: 'githubPat не задан в admin-config.js', type: 'err' }); return; }
    setSaving(true);
    setStatus({ msg: 'Сохраняю...', type: 'info' });
    try {
      const res = await fetch(`https://api.github.com/gists/${cfg.gistId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${cfg.githubPat}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: { 'content.json': { content: JSON.stringify(content, null, 2) } },
        }),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message || `HTTP ${res.status}`);
      }
      setStatus({ msg: '✓ Сохранено в Gist! Обновите сайт чтобы увидеть изменения.', type: 'ok' });
    } catch (e) {
      setStatus({ msg: 'Ошибка: ' + e.message, type: 'err' });
    }
    setSaving(false);
  };

  /* ── Tab config ── */
  const TABS = [
    { id: 'hero',     label: '🏠 Hero' },
    { id: 'features', label: '⚡ Features' },
    { id: 'gallery',  label: '🖼 Gallery' },
    { id: 'unique',   label: '✨ Unique' },
    { id: 'compare',  label: '📊 Compare' },
  ];

  const renderEditor = () => {
    switch (tab) {
      case 'hero':     return <HeroEditor     hero={content.hero}               onChange={v => setContent(c => ({ ...c, hero: v }))} />;
      case 'features': return <FeaturesEditor features={content.features}       onChange={v => setContent(c => ({ ...c, features: v }))} />;
      case 'gallery':  return <GalleryEditor  slides={content.slides}           onChange={v => setContent(c => ({ ...c, slides: v }))} />;
      case 'unique':   return <UniqueEditor   unique={content.unique}           onChange={v => setContent(c => ({ ...c, unique: v }))} />;
      case 'compare':  return <CompareEditor  compareRows={content.compareRows} onChange={v => setContent(c => ({ ...c, compareRows: v }))} />;
    }
  };

  const renderPreview = () => {
    switch (tab) {
      case 'hero':     return <PreviewHero     hero={content.hero} />;
      case 'features': return <PreviewFeatures features={content.features} />;
      case 'gallery':  return <PreviewGallery  slides={content.slides} />;
      case 'unique':   return <PreviewUnique   unique={content.unique} />;
      case 'compare':  return <PreviewCompare  compareRows={content.compareRows} />;
    }
  };

  return (
    <div className="adm-wrap">
      {/* ── Header ── */}
      <div className="adm-header">
        <div className="adm-logo">
          <div className="adm-logo-icon">⚡</div>
          CryptoNites Admin
        </div>

        {fetchErr && (
          <span className="adm-badge adm-badge-warn">⚠ Gist: {fetchErr} — редактируете дефолт</span>
        )}

        <div className="adm-header-right">
          {cfg.gistId
            ? <span className="adm-badge">Gist: {cfg.gistId.slice(0, 8)}…</span>
            : <span className="adm-badge adm-badge-warn">Gist не настроен</span>
          }
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? 'Сохраняю...' : '💾 Сохранить в Gist'}
          </button>
          <button className="btn-close" onClick={() => window.close()}>✕</button>
        </div>
      </div>

      {/* ── Status bar ── */}
      {status && (
        <div className={`adm-status ${status.type}`}>{status.msg}</div>
      )}

      {/* ── Tabs ── */}
      <div className="adm-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`adm-tab${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Split pane: editor | preview ── */}
      <div className="adm-main">
        {/* Left: editor */}
        <div className="adm-editor">
          <div className="adm-editor-body">
            <div className="adm-inner">
              {renderEditor()}
            </div>
          </div>
        </div>

        {/* Right: live preview */}
        <div className="adm-preview">
          <div className="preview-label">Предпросмотр — обновляется на лету</div>
          <div className="preview-scale-wrap">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminApp />);
