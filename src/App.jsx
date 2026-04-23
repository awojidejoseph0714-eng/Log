import { useState, useEffect, useRef } from "react";
import { BookOpen, Eye, EyeOff, ChevronRight, ChevronDown, ArrowLeft, Settings, Plus, X, Clock, Pencil, Moon, Sun, Trash2, AlertTriangle, Check } from "lucide-react";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#111110;}

[data-theme="dark"]{
  --bg:#111110;--surf:#1B1B19;--elev:#252521;--brd:#2E2E2A;
  --t1:#F0EFE8;--t2:#7A7A72;--t3:#4A4A44;
  --acc:#C8392A;--acc-h:#E03D30;
  --btn-bg:#F0EFE8;--btn-tc:#111110;
  --shadow:rgba(0,0,0,0.4);
}
[data-theme="light"]{
  --bg:#F5F3EE;--surf:#FFFFFF;--elev:#ECEAE5;--brd:#DDDAD4;
  --t1:#111110;--t2:#666660;--t3:#AAAAA4;
  --acc:#C8392A;--acc-h:#E03D30;
  --btn-bg:#111110;--btn-tc:#F0EFE8;
  --shadow:rgba(0,0,0,0.12);
}
.la{
  font-family:'Plus Jakarta Sans',sans-serif;
  background:var(--bg);color:var(--t1);
  min-height:100vh;max-width:430px;
  margin:0 auto;position:relative;
  transition:background .3s,color .3s;
}
.la-logo{font-family:'Lora',serif;font-weight:600;}
.la-input{
  background:var(--elev);border:1.5px solid var(--brd);
  border-radius:10px;padding:13px 16px;color:var(--t1);
  font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;
  width:100%;outline:none;transition:border-color .2s;
}
.la-input:focus{border-color:var(--t2);}
.la-input::placeholder{color:var(--t3);}
.la-btn{
  background:var(--btn-bg);color:var(--btn-tc);border:none;
  border-radius:10px;padding:14px;
  font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:600;
  cursor:pointer;width:100%;transition:opacity .15s;
  display:flex;align-items:center;justify-content:center;gap:8px;
}
.la-btn:hover:not(:disabled){opacity:.82;}
.la-btn:disabled{opacity:.32;cursor:default;}
.la-btn-red{background:var(--acc);color:#fff;border:none;border-radius:10px;
  padding:13px 20px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;
  font-weight:600;cursor:pointer;transition:opacity .15s;}
.la-btn-red:hover{opacity:.88;}
.la-ghost{background:transparent;border:none;color:var(--t2);cursor:pointer;
  font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;padding:8px;
  display:flex;align-items:center;gap:6px;transition:color .15s;}
.la-ghost:hover{color:var(--t1);}
.la-card{background:var(--surf);border:1px solid var(--brd);border-radius:14px;}
.la-div{height:1px;background:var(--brd);}
.la-fake-ta{
  background:var(--elev);border:1.5px solid var(--brd);
  border-radius:10px;padding:13px 16px;
  min-height:90px;cursor:text;font-size:15px;line-height:1.65;
  position:relative;transition:border-color .2s;user-select:none;
}
.la-fake-ta:hover{border-color:var(--t3);}

/* Full-screen editor */
.fse{
  position:fixed;top:0;bottom:0;
  left:50%;transform:translateX(-50%);
  width:100%;max-width:430px;
  z-index:9999;background:var(--bg);
  display:flex;flex-direction:column;
}
.fse-head{
  padding:52px 20px 14px;
  border-bottom:1px solid var(--brd);
  display:flex;align-items:flex-start;gap:12px;
}
.fse-q{
  font-family:'Lora',serif;font-size:16px;
  line-height:1.55;color:var(--t2);flex:1;
}
.fse-ta{
  flex:1;padding:24px 22px;background:transparent;
  border:none;outline:none;
  color:var(--t1);
  font-family:'JetBrains Mono',monospace;
  font-size:15px;line-height:1.9;
  resize:none;width:100%;
  caret-color:var(--acc);
}
.fse-ta::placeholder{color:var(--t3);}
.fse-foot{
  padding:12px 20px 28px;
  border-top:1px solid var(--brd);
  display:flex;align-items:center;justify-content:space-between;
}
.fse-stat{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--t3);}

/* Nav / header */
.nav{
  display:flex;align-items:center;justify-content:space-between;
  padding:52px 20px 16px;
}
.nav-mid{flex:1;text-align:center;}

/* Entry/goal rows */
.row{
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 16px;cursor:pointer;transition:background .12s;
}
.row:hover{background:var(--elev);}
.acc-row{
  display:flex;align-items:center;gap:10px;
  padding:12px 0;cursor:pointer;user-select:none;
}
.note-card{background:var(--elev);border-radius:10px;padding:12px 14px;}

/* Onboarding dots */
.ob-dot{width:6px;height:6px;border-radius:50%;background:var(--brd);
  transition:all .3s;display:inline-block;}
.ob-dot.on{width:20px;border-radius:3px;background:var(--t1);}

/* Modal */
.modal-bg{
  position:fixed;inset:0;z-index:999;
  background:rgba(0,0,0,0.55);backdrop-filter:blur(4px);
  display:flex;align-items:flex-end;justify-content:center;
}
.modal-sh{
  background:var(--surf);border-radius:20px 20px 0 0;
  padding:24px 20px 40px;width:100%;max-width:430px;
  border-top:1px solid var(--brd);
}

/* Danger zone */
.danger{border:1.5px solid rgba(200,57,42,.28);border-radius:12px;padding:16px;}

/* Completed goal row */
.g-completed{opacity:.42;}
.g-completed:hover{opacity:.6;}

/* Badge */
.badge{
  display:inline-flex;align-items:center;
  background:var(--elev);color:var(--t2);
  border-radius:5px;padding:2px 8px;font-size:11px;font-weight:500;
}

/* Scrollbar */
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--brd);border-radius:2px;}

@keyframes up{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
@keyframes fi{from{opacity:0;}to{opacity:1;}}
.up{animation:up .22s ease forwards;}
.fi{animation:fi .18s ease forwards;}

/* Red eye brand mark */
.red-eye{color:var(--acc);}
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const gid = () => Math.random().toString(36).slice(2,9);

const NOW = new Date();
const futureEdit = new Date(NOW.getTime() + 10*60000).toISOString();

const INIT = [
  {
    id:'g1',title:'Morning Clarity',status:'active',
    questions:['What am I grateful for today?','What is my main focus?','What challenged me?'],
    createdAt:'2024-11-24',
    entries:[
      {id:'e1',dayNumber:1,date:'2024-11-24',
        answers:['Woke up before 6 for the first time in months. Genuinely peaceful.','Getting the first draft of the business brief done.','Distracting myself with YouTube when I should have been writing.'],
        notes:{},savedAt:'2024-11-24T06:45:00',editableUntil:'2024-11-24T06:50:00'},
      {id:'e2',dayNumber:2,date:'2024-11-25',
        answers:['My sister called out of nowhere. We talked for 45 minutes.','Restructuring the project timeline.','A call that ran 2 hours over. I never know how to exit gracefully.'],
        notes:{},savedAt:'2024-11-25T07:12:00',editableUntil:'2024-11-25T07:17:00'},
      {id:'e8',dayNumber:8,date:'2024-12-08',
        answers:['I am grateful for the quiet morning. The coffee was perfect and I had a moment of real stillness before the day began.','Finishing the proposal draft. I need to stop overthinking the structure and just write.','Staying focused after lunch. The noise from construction was relentless.'],
        notes:{
          0:[
            {id:'n1',text:"Looking back, this was the day things started shifting. I didn't realize it then.",createdAt:'2024-12-10T09:41:00'},
            {id:'n2',text:'The gratitude was genuine. I should revisit this feeling more often.',createdAt:'2024-12-09T14:15:00'}
          ]
        },
        savedAt:'2024-12-08T07:30:00',editableUntil:futureEdit},
    ]
  },
  {
    id:'g2',title:'Deep Work Practice',status:'active',
    questions:['What did I work on deeply today?','How many focused hours?'],
    createdAt:'2024-11-28',
    entries:[
      {id:'dw1',dayNumber:1,date:'2024-11-28',
        answers:['Rebuilt the API layer from scratch. Zero interruptions.','3 hours'],
        notes:{},savedAt:'2024-11-28T20:00:00',editableUntil:'2024-11-28T20:05:00'}
    ]
  },
  {
    id:'g3',title:'Relationship Reflection',status:'active',
    questions:['How did I show up for others today?','What connection mattered most?'],
    createdAt:'2024-12-01',entries:[]
  },
  {
    id:'g4',title:'30-Day Meditation Challenge',status:'completed',
    questions:['How long did I meditate?','What did I notice?'],
    createdAt:'2024-10-01',entries:[]
  },
  {
    id:'g5',title:'Reading Habit',status:'completed',
    questions:['Pages read today?','Best insight from reading?'],
    createdAt:'2024-09-01',entries:[]
  },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
const fmt  = d => new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric'});
const fmtL = d => new Date(d).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
const fmtN = d => {
  const dt = new Date(d);
  return dt.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) +
    ' · ' + dt.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
};
const isEd = u => new Date() < new Date(u);
const minsLeft = u => Math.max(0,Math.ceil((new Date(u)-new Date())/60000));
const wc = t => t.trim().split(/\s+/).filter(Boolean).length;
const today = () => new Date().toISOString().split('T')[0];

// ─── SHARED UI ───────────────────────────────────────────────────────────────
function ThemeBtn({theme,toggle}){
  return(
    <button onClick={toggle} className="la-ghost" style={{padding:'6px'}}>
      {theme==='dark'?<Sun size={17}/>:<Moon size={17}/>}
    </button>
  );
}
function Nav({left,center,right}){
  return(
    <div className="nav">
      <div style={{minWidth:40}}>{left}</div>
      <div className="nav-mid">{center}</div>
      <div style={{minWidth:40,display:'flex',justifyContent:'flex-end',gap:4}}>{right}</div>
    </div>
  );
}
function Back({go}){
  return(
    <button onClick={go} className="la-ghost" style={{padding:'4px'}}>
      <ArrowLeft size={20}/>
    </button>
  );
}

// ─── FULL SCREEN EDITOR ───────────────────────────────────────────────────────
function FSE({question,value,onChange,onClose,theme}){
  const ref = useRef(null);
  useEffect(()=>{
    ref.current?.focus();
    const l = value.length;
    ref.current?.setSelectionRange(l,l);
  },[]);
  const words = wc(value);
  const chars = value.length;
  return(
    <div className="fse fi" data-theme={theme}>
      <div className="fse-head">
        <button onClick={onClose} className="la-ghost" style={{padding:'2px',flexShrink:0}}>
          <ArrowLeft size={20}/>
        </button>
        <p className="fse-q">{question}</p>
      </div>
      <textarea
        ref={ref}
        className="fse-ta"
        value={value}
        onChange={e=>onChange(e.target.value)}
        onKeyDown={e=>e.key==='Escape'&&onClose()}
        placeholder="Begin writing…"
        autoFocus
      />
      <div className="fse-foot">
        <span className="fse-stat">{words} {words===1?'word':'words'} · {chars} chars</span>
        <button onClick={onClose} className="la-btn" style={{width:'auto',padding:'9px 22px',fontSize:14}}>Done</button>
      </div>
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
const OB=[
  {icon:<BookOpen size={38}/>,title:'Welcome to Log',
   desc:'A fiercely minimalist journal for goal-oriented reflection. Set your goals, ask yourself the right questions, and track your progress day by day.'},
  {icon:<Clock size={38}/>,title:'The 5-Minute Edit Window',
   desc:"Once you save an entry, you can only edit it for 5 minutes. After that, your words become permanent — preserving an authentic record of your journey."},
  {icon:<Pencil size={38}/>,title:'Start Journaling',
   desc:'Create goals, define your daily questions, and build a consistent reflection practice. Your journey begins now.'},
];
function Onboarding({step,setStep,onDone}){
  const s=OB[step];
  return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',
      justifyContent:'center',minHeight:'100vh',padding:'40px 32px',textAlign:'center'}}>
      <div className="up" key={step}>
        <div style={{color:'var(--t1)',marginBottom:28}}>{s.icon}</div>
        <h2 className="la-logo" style={{fontSize:26,marginBottom:14}}>{s.title}</h2>
        <p style={{color:'var(--t2)',lineHeight:1.65,fontSize:15,maxWidth:280,margin:'0 auto'}}>{s.desc}</p>
      </div>
      <div style={{display:'flex',gap:6,margin:'44px auto 36px'}}>
        {OB.map((_,i)=><span key={i} className={`ob-dot ${i===step?'on':''}`}/>)}
      </div>
      {step<2?(
        <div style={{width:'100%'}}>
          <button className="la-btn" onClick={()=>setStep(s=>s+1)}>Next</button>
          <div style={{height:10}}/>
          <button className="la-ghost" onClick={onDone} style={{width:'100%',justifyContent:'center'}}>Skip</button>
        </div>
      ):(
        <div style={{width:'100%'}}>
          <button className="la-btn" onClick={onDone}>Get Started</button>
          <div style={{height:10}}/>
          <button className="la-ghost" onClick={()=>setStep(s=>s-1)} style={{width:'100%',justifyContent:'center'}}>Back</button>
        </div>
      )}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({onLogin,onSignup,theme,toggle}){
  const [email,setEmail]=useState('');
  const [pw,setPw]=useState('');
  const [show,setShow]=useState(false);
  return(
    <div style={{padding:'0 24px',display:'flex',flexDirection:'column',
      justifyContent:'center',minHeight:'100vh',position:'relative'}}>
      <div style={{position:'absolute',top:20,right:24,display:'flex',gap:4}}>
        <ThemeBtn theme={theme} toggle={toggle}/>
      </div>
      <div className="up" style={{textAlign:'center',marginBottom:44}}>
        <div style={{width:54,height:54,borderRadius:14,background:'var(--elev)',
          display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px'}}>
          <BookOpen size={22} color="var(--t1)"/>
        </div>
        <h1 className="la-logo" style={{fontSize:30,marginBottom:6}}>Log</h1>
        <p style={{color:'var(--t2)',fontSize:15}}>Sign in to your journal</p>
      </div>
      <div className="up" style={{display:'flex',flexDirection:'column',gap:16}}>
        <div>
          <label style={{display:'block',marginBottom:8,fontSize:14,fontWeight:500}}>Email</label>
          <input className="la-input" type="email" placeholder="you@example.com"
            value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div>
          <label style={{display:'block',marginBottom:8,fontSize:14,fontWeight:500}}>Password</label>
          <div style={{position:'relative'}}>
            <input className="la-input" type={show?'text':'password'}
              placeholder="Enter your password" value={pw} onChange={e=>setPw(e.target.value)}
              style={{paddingRight:48}}
              onKeyDown={e=>e.key==='Enter'&&email&&pw&&onLogin(email)}/>
            <button onClick={()=>setShow(!show)}
              style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',
                background:'none',border:'none',cursor:'pointer',color:'var(--t2)',display:'flex'}}>
              {show?<EyeOff size={17}/>:<Eye size={17}/>}
            </button>
          </div>
        </div>
        <div style={{height:4}}/>
        <button className="la-btn" onClick={()=>onLogin(email)} disabled={!email||!pw}>Sign In</button>
        <p style={{textAlign:'center',color:'var(--t2)',fontSize:14,marginTop:6}}>
          Don't have an account?{' '}
          <button onClick={onSignup} style={{background:'none',border:'none',cursor:'pointer',
            color:'var(--t1)',fontWeight:600,fontFamily:'inherit',fontSize:14}}>Create one</button>
        </p>
      </div>
    </div>
  );
}

// ─── SIGNUP ───────────────────────────────────────────────────────────────────
function Signup({onSignup,onLogin,theme,toggle}){
  const [email,setEmail]=useState('');
  const [pw,setPw]=useState('');
  const [cf,setCf]=useState('');
  const [show,setShow]=useState(false);
  const mis=cf&&pw!==cf;
  return(
    <div style={{padding:'0 24px',display:'flex',flexDirection:'column',
      justifyContent:'center',minHeight:'100vh',position:'relative'}}>
      <div style={{position:'absolute',top:20,right:24}}><ThemeBtn theme={theme} toggle={toggle}/></div>
      <div className="up" style={{textAlign:'center',marginBottom:44}}>
        <div style={{width:54,height:54,borderRadius:14,background:'var(--elev)',
          display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px'}}>
          <BookOpen size={22} color="var(--t1)"/>
        </div>
        <h1 className="la-logo" style={{fontSize:30,marginBottom:6}}>Log</h1>
        <p style={{color:'var(--t2)',fontSize:15}}>Create your account</p>
      </div>
      <div className="up" style={{display:'flex',flexDirection:'column',gap:16}}>
        <div>
          <label style={{display:'block',marginBottom:8,fontSize:14,fontWeight:500}}>Email</label>
          <input className="la-input" type="email" placeholder="you@example.com"
            value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div>
          <label style={{display:'block',marginBottom:8,fontSize:14,fontWeight:500}}>Password</label>
          <div style={{position:'relative'}}>
            <input className="la-input" type={show?'text':'password'}
              placeholder="Create a password" value={pw} onChange={e=>setPw(e.target.value)} style={{paddingRight:48}}/>
            <button onClick={()=>setShow(!show)}
              style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',
                background:'none',border:'none',cursor:'pointer',color:'var(--t2)',display:'flex'}}>
              {show?<EyeOff size={17}/>:<Eye size={17}/>}
            </button>
          </div>
          <p style={{fontSize:12,color:'var(--t2)',marginTop:6}}>Must be at least 8 characters</p>
        </div>
        <div>
          <label style={{display:'block',marginBottom:8,fontSize:14,fontWeight:500}}>Confirm Password</label>
          <input className="la-input" type="password" placeholder="Confirm your password"
            value={cf} onChange={e=>setCf(e.target.value)}
            style={{borderColor:mis?'var(--acc)':undefined}}/>
          {mis&&<p style={{fontSize:12,color:'var(--acc)',marginTop:6}}>Passwords don't match</p>}
        </div>
        <div style={{height:4}}/>
        <button className="la-btn" onClick={()=>onSignup(email)} disabled={!email||pw.length<8||pw!==cf}>
          Create Account
        </button>
        <p style={{textAlign:'center',color:'var(--t2)',fontSize:14,marginTop:6}}>
          Already have an account?{' '}
          <button onClick={onLogin} style={{background:'none',border:'none',cursor:'pointer',
            color:'var(--t1)',fontWeight:600,fontFamily:'inherit',fontSize:14}}>Sign in</button>
        </p>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({theme,toggle,goals,openGoal,go,logout}){
  const active=goals.filter(g=>g.status==='active');
  const done=goals.filter(g=>g.status==='completed');
  return(
    <div style={{paddingBottom:40}}>
      <Nav
        left={<div style={{display:'flex',alignItems:'center',gap:7}}>
          <Eye size={17} className="red-eye" color="var(--acc)"/>
          <span className="la-logo" style={{fontSize:18}}>Log</span>
        </div>}
        right={<>
          <ThemeBtn theme={theme} toggle={toggle}/>
          <button onClick={logout} className="la-ghost" style={{padding:'4px 6px',fontSize:12}}>Sign out</button>
        </>}
      />
      <div style={{padding:'0 16px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
          <span style={{fontSize:11,fontWeight:600,color:'var(--t2)',textTransform:'uppercase',letterSpacing:'.08em'}}>Active Goals</span>
          <button onClick={()=>go('new-goal')}
            style={{display:'flex',alignItems:'center',gap:4,background:'var(--acc)',color:'#fff',
              border:'none',borderRadius:8,padding:'6px 12px',fontSize:13,fontWeight:600,
              cursor:'pointer',fontFamily:'inherit'}}>
            <Plus size={13}/> New Goal
          </button>
        </div>

        {active.length===0?(
          <div className="la-card" style={{padding:'40px 24px',textAlign:'center'}}>
            <div style={{color:'var(--t3)',marginBottom:12}}><BookOpen size={28}/></div>
            <p style={{fontWeight:500,marginBottom:5}}>No goals yet</p>
            <p style={{fontSize:13,color:'var(--t2)'}}>Create your first goal to start journaling.</p>
            <div style={{height:20}}/>
            <button onClick={()=>go('new-goal')} className="la-btn" style={{width:'auto',padding:'10px 24px'}}>
              <Plus size={14}/> New Goal
            </button>
          </div>
        ):(
          <div className="la-card" style={{overflow:'hidden'}}>
            {active.map((g,i)=>{
              const last=g.entries[g.entries.length-1];
              return(
                <div key={g.id}>
                  {i>0&&<div className="la-div"/>}
                  <div className="row" onClick={()=>openGoal(g.id)}>
                    <div>
                      <p style={{fontWeight:600,fontSize:15,marginBottom:3}}>{g.title}</p>
                      <p style={{fontSize:13,color:'var(--t2)'}}>
                        {g.entries.length} {g.entries.length===1?'entry':'entries'}{last?` · Last: ${fmt(last.date)}`:''}
                      </p>
                    </div>
                    <ChevronRight size={16} color="var(--t3)"/>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {done.length>0&&(
          <div style={{marginTop:28}}>
            <span style={{fontSize:11,fontWeight:600,color:'var(--t2)',
              textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:12}}>
              Completed
            </span>
            <div className="la-card g-completed" style={{overflow:'hidden'}}>
              {done.map((g,i)=>(
                <div key={g.id}>
                  {i>0&&<div className="la-div"/>}
                  <div className="row" onClick={()=>openGoal(g.id)}>
                    <div>
                      <p style={{fontWeight:500,fontSize:14,marginBottom:2}}>{g.title}</p>
                      <p style={{fontSize:12,color:'var(--t2)'}}>{g.entries.length} entries · Completed</p>
                    </div>
                    <ChevronRight size={15} color="var(--t3)"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── NEW GOAL ─────────────────────────────────────────────────────────────────
function NewGoal({go,setGoals,theme,toggle}){
  const [title,setTitle]=useState('');
  const [qs,setQs]=useState(['']);
  const addQ=()=>setQs(q=>[...q,'']);
  const upQ=(i,v)=>setQs(q=>q.map((x,j)=>j===i?v:x));
  const rmQ=(i)=>setQs(q=>q.filter((_,j)=>j!==i));
  const ok=title.trim()&&qs.some(q=>q.trim());
  const create=()=>{
    setGoals(gs=>[...gs,{
      id:gid(),title:title.trim(),status:'active',
      questions:qs.filter(q=>q.trim()),
      createdAt:today(),entries:[]
    }]);
    go('home');
  };
  return(
    <div style={{paddingBottom:40}}>
      <Nav left={<Back go={()=>go('home')}/>}
        center={<span style={{fontWeight:600,fontSize:16}}>New Goal</span>}
        right={<ThemeBtn theme={theme} toggle={toggle}/>}/>
      <div style={{padding:'0 20px',display:'flex',flexDirection:'column',gap:24}}>
        <div>
          <label style={{display:'block',marginBottom:9,fontSize:14,fontWeight:500}}>Goal Title</label>
          <input className="la-input" placeholder="e.g. Morning Clarity"
            value={title} onChange={e=>setTitle(e.target.value)}/>
        </div>
        <div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
            <label style={{fontSize:14,fontWeight:500}}>Daily Questions</label>
            <span style={{fontSize:13,color:'var(--t2)'}}>{qs.filter(q=>q.trim()).length} {qs.filter(q=>q.trim()).length===1?'question':'questions'}</span>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {qs.map((q,i)=>(
              <div key={i} style={{display:'flex',gap:8,alignItems:'center'}}>
                <input className="la-input" placeholder="What did you learn today?"
                  value={q} onChange={e=>upQ(i,e.target.value)} style={{flex:1}}/>
                {qs.length>1&&(
                  <button onClick={()=>rmQ(i)} style={{background:'none',border:'none',
                    color:'var(--t2)',cursor:'pointer',flexShrink:0}}>
                    <X size={17}/>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button onClick={addQ} className="la-ghost" style={{marginTop:10,paddingLeft:0}}>
            <Plus size={15}/> Add another question
          </button>
        </div>
        <button className="la-btn" onClick={create} disabled={!ok}>Create Goal</button>
      </div>
    </div>
  );
}

// ─── GOAL DETAIL ─────────────────────────────────────────────────────────────
function GoalDetail({go,goals,goalId,openEntry,openNew,theme,toggle}){
  const goal=goals.find(g=>g.id===goalId);
  if(!goal)return null;
  const sorted=[...goal.entries].sort((a,b)=>a.dayNumber-b.dayNumber);
  return(
    <div style={{paddingBottom:40}}>
      <Nav
        left={<Back go={()=>go('home')}/>}
        center={
          <div style={{textAlign:'center'}}>
            <p style={{fontWeight:600,fontSize:15}}>{goal.title}</p>
            {goal.status==='completed'&&<span className="badge">Completed</span>}
          </div>
        }
        right={<>
          <ThemeBtn theme={theme} toggle={toggle}/>
          <button onClick={()=>go('goal-settings')} className="la-ghost" style={{padding:'5px'}}>
            <Settings size={17}/>
          </button>
        </>}
      />
      <div style={{padding:'0 16px'}}>
        {goal.status==='active'&&(
          <button onClick={()=>openNew(goal.id)} className="la-btn" style={{marginBottom:24}}>
            <Pencil size={15}/> Log Today
          </button>
        )}
        <div style={{marginBottom:22}}>
          <p style={{fontSize:11,fontWeight:600,color:'var(--t2)',
            textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10}}>Daily Questions</p>
          <div style={{display:'flex',flexDirection:'column',gap:7}}>
            {goal.questions.map((q,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:8}}>
                <span style={{width:5,height:5,borderRadius:'50%',background:'var(--t2)',
                  marginTop:8,flexShrink:0}}/>
                <span style={{fontSize:14,color:'var(--t1)',lineHeight:1.55}}>{q}</span>
              </div>
            ))}
          </div>
        </div>
        {sorted.length>0?(
          <div>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t2)',
              textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10}}>History</p>
            <div className="la-card" style={{overflow:'hidden'}}>
              {sorted.map((e,i)=>(
                <div key={e.id}>
                  {i>0&&<div className="la-div"/>}
                  <div className="row" onClick={()=>openEntry(goal.id,e.id,'view')}>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      <span style={{fontWeight:700,fontSize:14,minWidth:48}}>Day {e.dayNumber}</span>
                      <span style={{color:'var(--t2)',fontSize:14}}>{fmt(e.date)}</span>
                    </div>
                    <ChevronRight size={16} color="var(--t3)"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ):(
          <div style={{textAlign:'center',padding:'52px 0'}}>
            <div style={{color:'var(--t3)',marginBottom:12}}><BookOpen size={26}/></div>
            <p style={{fontWeight:500,color:'var(--t2)',marginBottom:5}}>No entries yet</p>
            <p style={{fontSize:13,color:'var(--t3)'}}>Start your first log by answering today's questions.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LOG ENTRY (with full-screen editor) ─────────────────────────────────────
function LogEntry({go,goals,goalId,entryId,mode,setGoals,theme,toggle}){
  const goal=goals.find(g=>g.id===goalId);
  const ex=goal?.entries.find(e=>e.id===entryId);
  const [answers,setAnswers]=useState(()=>ex?[...ex.answers]:goal?.questions.map(()=>'')||[]);
  const [date,setDate]=useState(()=>ex?.date||today());
  const [fse,setFse]=useState(null); // {qi, value}
  if(!goal)return null;
  const isEdit=mode==='edit';
  const isBack=date!==today();
  const openFSE=(qi)=>setFse({qi,value:answers[qi]});
  const closeFSE=()=>{
    if(fse){
      setAnswers(a=>a.map((v,i)=>i===fse.qi?fse.value:v));
      setFse(null);
    }
  };
  const save=()=>{
    const now=new Date();
    const eu=new Date(now.getTime()+5*60000).toISOString();
    if(isEdit&&ex){
      setGoals(gs=>gs.map(g=>g.id!==goalId?g:{...g,
        entries:g.entries.map(e=>e.id!==ex.id?e:{...e,answers,savedAt:now.toISOString(),editableUntil:eu})}));
    } else {
      const maxD=goal.entries.reduce((m,e)=>Math.max(m,e.dayNumber),0);
      setGoals(gs=>gs.map(g=>g.id!==goalId?g:{...g,
        entries:[...g.entries,{id:gid(),dayNumber:maxD+1,date,answers,
          notes:{},savedAt:now.toISOString(),editableUntil:eu}]}));
    }
    go('goal-detail');
  };
  return(
    <div style={{paddingBottom:40}}>
      {fse&&<FSE question={goal.questions[fse.qi]} value={fse.value}
        onChange={v=>setFse(s=>({...s,value:v}))} onClose={closeFSE} theme={theme}/>}
      <Nav left={<Back go={()=>go('goal-detail')}/>}
        center={<span style={{fontWeight:600,fontSize:16}}>Log Entry</span>}
        right={<ThemeBtn theme={theme} toggle={toggle}/>}/>
      <div style={{padding:'0 20px',display:'flex',flexDirection:'column',gap:22}}>
        {/* Date row */}
        <div style={{display:'flex',alignItems:'center',gap:10,padding:'11px 14px',
          background:'var(--elev)',borderRadius:10}}>
          <Clock size={14} color="var(--t2)"/>
          <span style={{fontSize:14,color:'var(--t1)',fontWeight:500,flex:1}}>{fmtL(date)}</span>
          {isBack&&<span style={{fontSize:12,color:'var(--acc)',fontWeight:500}}>Backdated</span>}
          {isEdit&&<span style={{fontSize:12,color:'var(--t2)',fontWeight:500}}>Editing</span>}
          <input type="date" value={date} onChange={e=>setDate(e.target.value)}
            style={{background:'transparent',border:'none',color:'var(--t3)',fontSize:12,
              cursor:'pointer',fontFamily:'inherit',outline:'none'}}/>
        </div>
        {/* Questions */}
        {goal.questions.map((q,i)=>(
          <div key={i}>
            <label style={{display:'block',fontSize:14,fontWeight:600,
              marginBottom:9,color:'var(--t1)',lineHeight:1.45}}>{q}</label>
            <div className="la-fake-ta" onClick={()=>openFSE(i)}>
              {answers[i]?(
                <span style={{color:'var(--t1)'}}>{answers[i]}</span>
              ):(
                <span style={{color:'var(--t3)'}}>Write your reflection…</span>
              )}
              <span style={{position:'absolute',bottom:9,right:12,
                fontSize:11,color:'var(--t3)'}}>
                {answers[i]?`${wc(answers[i])} words`:'Tap to write'}
              </span>
            </div>
            {isEdit&&ex&&(
              <p style={{fontSize:12,color:'var(--t2)',marginTop:6,
                display:'flex',alignItems:'center',gap:4}}>
                <Clock size={11}/>
                {isEd(ex.editableUntil)
                  ?`Editable for ${minsLeft(ex.editableUntil)} more ${minsLeft(ex.editableUntil)===1?'minute':'minutes'}`
                  :'Edit window closed'}
              </p>
            )}
          </div>
        ))}
        <button className="la-btn" onClick={save}>{isEdit?'Save Changes':'Save Entry'}</button>
      </div>
    </div>
  );
}

// ─── VIEW ENTRY ───────────────────────────────────────────────────────────────
function ViewEntry({go,goals,goalId,entryId,openEntry,setGoals,theme,toggle}){
  const goal=goals.find(g=>g.id===goalId);
  const entry=goal?.entries.find(e=>e.id===entryId);
  const [open,setOpen]=useState({0:true});
  const [noteV,setNoteV]=useState({});
  const [addN,setAddN]=useState(null);
  if(!goal||!entry)return null;
  const canEdit=isEd(entry.editableUntil);
  const toggleOpen=i=>setOpen(o=>({...o,[i]:!o[i]}));
  const submitNote=qi=>{
    const t=(noteV[qi]||'').trim();
    if(!t)return;
    const n={id:gid(),text:t,createdAt:new Date().toISOString()};
    setGoals(gs=>gs.map(g=>g.id!==goalId?g:{...g,
      entries:g.entries.map(e=>e.id!==entryId?e:{...e,
        notes:{...e.notes,[qi]:[...(e.notes[qi]||[]),n]}})}));
    setNoteV(v=>({...v,[qi]:''}));
    setAddN(null);
  };
  return(
    <div style={{paddingBottom:40}}>
      <Nav
        left={<Back go={()=>go('goal-detail')}/>}
        center={
          <div style={{textAlign:'center'}}>
            <p style={{fontWeight:600,fontSize:15}}>Day {entry.dayNumber}</p>
            <p style={{fontSize:12,color:'var(--t2)'}}>{fmtL(entry.date)}</p>
          </div>
        }
        right={<>
          <ThemeBtn theme={theme} toggle={toggle}/>
          {canEdit&&(
            <button onClick={()=>openEntry(goalId,entryId,'edit')} className="la-ghost" style={{padding:'5px'}}>
              <Pencil size={17}/>
            </button>
          )}
        </>}
      />
      <div style={{padding:'0 16px'}}>
        <div className="la-card" style={{overflow:'hidden'}}>
          {goal.questions.map((q,i)=>{
            const isOpen=open[i];
            const notes=entry.notes[i]||[];
            const ans=entry.answers[i]||'';
            const hasCt=ans.trim();
            return(
              <div key={i}>
                {i>0&&<div className="la-div"/>}
                <div style={{padding:'2px 16px 14px'}}>
                  <div className="acc-row" onClick={()=>toggleOpen(i)}>
                    {isOpen?<ChevronDown size={15} color="var(--t2)"/>
                      :<ChevronRight size={15} color="var(--t2)"/>}
                    {hasCt&&<span style={{width:5,height:5,borderRadius:'50%',
                      background:'var(--acc)',flexShrink:0}}/>}
                    <span style={{fontSize:14,fontWeight:hasCt?500:400,
                      color:hasCt?'var(--t1)':'var(--t2)'}}>{q}</span>
                  </div>
                  {isOpen&&(
                    <div className="up" style={{paddingLeft:25}}>
                      {hasCt&&(
                        <p style={{fontSize:14,color:'var(--t1)',lineHeight:1.7,
                          marginBottom:notes.length>0||addN===i?14:6}}>{ans}</p>
                      )}
                      {!hasCt&&(
                        <p style={{fontSize:13,color:'var(--t3)',fontStyle:'italic',marginBottom:8}}>No answer recorded.</p>
                      )}
                      {notes.length>0&&(
                        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:10}}>
                          {notes.map(n=>(
                            <div key={n.id} className="note-card">
                              <p style={{fontSize:13,color:'var(--t1)',lineHeight:1.6,marginBottom:4}}>{n.text}</p>
                              <p style={{fontSize:11,color:'var(--t3)'}}>{fmtN(n.createdAt)}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {addN===i?(
                        <div style={{display:'flex',gap:8,alignItems:'center'}}>
                          <input className="la-input"
                            style={{flex:1,fontSize:13,padding:'9px 12px'}}
                            placeholder="Add a note…"
                            value={noteV[i]||''}
                            onChange={e=>setNoteV(v=>({...v,[i]:e.target.value}))}
                            onKeyDown={e=>e.key==='Enter'&&submitNote(i)}
                            autoFocus/>
                          <button onClick={()=>submitNote(i)}
                            style={{background:'var(--btn-bg)',color:'var(--btn-tc)',border:'none',
                              borderRadius:8,padding:'9px 12px',cursor:'pointer',flexShrink:0}}>
                            <ChevronRight size={15}/>
                          </button>
                        </div>
                      ):(
                        <button onClick={()=>setAddN(i)} className="la-ghost"
                          style={{paddingLeft:0,fontSize:13,color:'var(--t3)'}}>
                          <Plus size={13}/> Add a note…
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── GOAL SETTINGS ────────────────────────────────────────────────────────────
function GoalSettings({go,goals,goalId,setGoals,theme,toggle}){
  const goal=goals.find(g=>g.id===goalId);
  const [title,setTitle]=useState(goal?.title||'');
  const [qs,setQs]=useState(goal?.questions||[]);
  const [del,setDel]=useState(false);
  if(!goal)return null;
  const upQ=(i,v)=>setQs(q=>q.map((x,j)=>j===i?v:x));
  const save=()=>{
    setGoals(gs=>gs.map(g=>g.id!==goalId?g:{...g,
      title:title.trim()||g.title,questions:qs.filter(q=>q.trim())}));
    go('goal-detail');
  };
  const complete=()=>{
    setGoals(gs=>gs.map(g=>g.id!==goalId?g:{...g,status:'completed'}));
    go('home');
  };
  const destroy=()=>{
    setGoals(gs=>gs.filter(g=>g.id!==goalId));
    go('home');
  };
  return(
    <div style={{paddingBottom:50}}>
      {del&&(
        <div className="modal-bg fi" onClick={()=>setDel(false)}>
          <div className="modal-sh" onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <AlertTriangle size={21} color="var(--acc)"/>
              <div>
                <p style={{fontWeight:700,fontSize:16}}>Delete Goal</p>
                <p style={{fontSize:13,color:'var(--t2)'}}>This cannot be undone.</p>
              </div>
            </div>
            <p style={{fontSize:14,color:'var(--t2)',lineHeight:1.65,marginBottom:24}}>
              All entries, answers, and notes associated with "{goal.title}" will be permanently deleted.
              There is no way to recover this data.
            </p>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setDel(false)} className="la-btn"
                style={{background:'var(--elev)',color:'var(--t1)'}}>Cancel</button>
              <button onClick={destroy} className="la-btn-red" style={{flex:1}}>Delete</button>
            </div>
          </div>
        </div>
      )}
      <Nav left={<Back go={()=>go('goal-detail')}/>}
        center={<span style={{fontWeight:600,fontSize:16}}>Goal Settings</span>}
        right={<ThemeBtn theme={theme} toggle={toggle}/>}/>
      <div style={{padding:'0 20px',display:'flex',flexDirection:'column',gap:24}}>
        <div>
          <label style={{display:'block',fontSize:14,fontWeight:500,marginBottom:9}}>Goal Title</label>
          <input className="la-input" value={title} onChange={e=>setTitle(e.target.value)}/>
        </div>
        <div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
            <label style={{fontSize:14,fontWeight:500}}>Daily Questions</label>
            <button onClick={()=>setQs(q=>[...q,''])} className="la-ghost"
              style={{padding:0,color:'var(--acc)',fontWeight:600,fontSize:13}}>
              + Add
            </button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {qs.map((q,i)=>(
              <div key={i} style={{display:'flex',gap:8,alignItems:'center'}}>
                <span style={{width:18,height:18,borderRadius:4,border:'1.5px solid var(--brd)',
                  display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <span style={{width:7,height:7,borderRadius:2,background:'var(--t2)'}}/>
                </span>
                <input className="la-input" value={q} onChange={e=>upQ(i,e.target.value)} style={{flex:1}}/>
                <button onClick={()=>setQs(q=>q.filter((_,j)=>j!==i))}
                  style={{background:'none',border:'none',color:'var(--t3)',cursor:'pointer'}}>
                  <X size={16}/>
                </button>
              </div>
            ))}
          </div>
        </div>
        {goal.status==='active'&&(
          <div>
            <label style={{display:'block',fontSize:14,fontWeight:500,marginBottom:9}}>Status</label>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
              padding:'12px 14px',background:'var(--elev)',borderRadius:10}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <Clock size={14} color="var(--t2)"/>
                <span style={{fontSize:14}}>Active</span>
              </div>
              <button onClick={complete}
                style={{background:'none',border:'1.5px solid var(--brd)',borderRadius:8,
                  padding:'6px 14px',color:'var(--t1)',cursor:'pointer',
                  fontSize:13,fontWeight:500,fontFamily:'inherit'}}>
                Mark Complete
              </button>
            </div>
          </div>
        )}
        <button className="la-btn" onClick={save}>Save Changes</button>
        <div className="danger">
          <p style={{fontSize:12,fontWeight:700,color:'var(--acc)',marginBottom:12,
            textTransform:'uppercase',letterSpacing:'.06em'}}>Danger Zone</p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <p style={{fontSize:14,fontWeight:500,marginBottom:3}}>Delete Goal</p>
              <p style={{fontSize:12,color:'var(--t2)'}}>Permanently remove this goal and all entries.</p>
            </div>
            <button onClick={()=>setDel(true)} className="la-btn-red"
              style={{width:'auto',padding:'8px 16px',fontSize:13,flexShrink:0}}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App(){
  const [theme,setTheme]=useState('dark');
  const [screen,setScreen]=useState('login');
  const [user,setUser]=useState(null);
  const [obStep,setObStep]=useState(0);
  const [goals,setGoals]=useState(INIT);
  const [goalId,setGoalId]=useState(null);
  const [entryId,setEntryId]=useState(null);
  const [entryMode,setEntryMode]=useState('new');

  // CSS injection
  useEffect(()=>{
    const el=document.createElement('style');
    el.id='log-css';el.textContent=CSS;
    document.head.appendChild(el);
    return()=>el.remove();
  },[]);

  // Load persisted state
  useEffect(()=>{
    const load=async()=>{
      try{const t=await localstorage.get('log-theme');if(t)setTheme(t.value);}catch{}
      try{
        const u=await localstorage.get('log-user');
        if(u){
          setUser(JSON.parse(u.value));
          try{const g=await localstorage.get('log-goals');if(g)setGoals(JSON.parse(g.value));}catch{}
          setScreen('home');
        }
      }catch{}
    };
    load();
  },[]);

  useEffect(()=>{localstorage?.set('log-theme',theme).catch(()=>{});},[theme]);
  useEffect(()=>{if(user)localstorage?.set('log-goals',JSON.stringify(goals)).catch(()=>{});},[goals,user]);

  const go=s=>setScreen(s);
  const toggle=()=>setTheme(t=>t==='dark'?'light':'dark');

  const login=email=>{
    const u={email};setUser(u);
    localstorage?.set('log-user',JSON.stringify(u)).catch(()=>{});
    setObStep(0);go('onboarding');
  };
  const logout=()=>{
    setUser(null);
    localstorage?.delete('log-user').catch(()=>{});
    go('login');
  };

  const openGoal=id=>{setGoalId(id);go('goal-detail');};
  const openEntry=(gid,eid,mode)=>{
    setGoalId(gid);setEntryId(eid);setEntryMode(mode);
    go(mode==='view'?'view-entry':'log-entry');
  };
  const openNew=gid=>{setGoalId(gid);setEntryId(null);setEntryMode('new');go('log-entry');};

  const ctx={go,goals,setGoals,goalId,theme,toggle};

  return(
    <div className="la" data-theme={theme}>
      {screen==='login'&&<Login onLogin={login} onSignup={()=>go('signup')} theme={theme} toggle={toggle}/>}
      {screen==='signup'&&<Signup onSignup={login} onLogin={()=>go('login')} theme={theme} toggle={toggle}/>}
      {screen==='onboarding'&&<Onboarding step={obStep} setStep={setObStep} onDone={()=>go('home')}/>}
      {screen==='home'&&<Home {...ctx} openGoal={openGoal} logout={logout}/>}
      {screen==='new-goal'&&<NewGoal {...ctx}/>}
      {screen==='goal-detail'&&<GoalDetail {...ctx} openEntry={openEntry} openNew={openNew}/>}
      {screen==='log-entry'&&<LogEntry {...ctx} entryId={entryId} mode={entryMode}/>}
      {screen==='view-entry'&&<ViewEntry {...ctx} entryId={entryId} openEntry={openEntry}/>}
      {screen==='goal-settings'&&<GoalSettings {...ctx}/>}
    </div>
  );
}
