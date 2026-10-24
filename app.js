'use strict';
const D=window.SCORECARD_DATA, V=window.Visibility;
const LS='aeo-scorecard-v2', OLD='aeo-scorecard-v1';
const key=(q,a)=>JSON.stringify([q,a]);
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const uniq=a=>[...new Set(a)];
const freshStore=()=>({version:V.VERSION,cfg:{brand:D.brand,assistants:uniq([...D.assistants,V.AIO]),competitors:[...D.competitors],queries:[...D.queries],queryCohorts:Object.fromEntries(D.queries.map((q,i)=>[q,i<3?'discovery':'evaluation']))},baseline:convertDemo(D.demo.baseline),current:convertDemo(D.demo.current)});
function convertDemo(data){const out={};Object.entries(data||{}).forEach(([k,c])=>{const i=k.lastIndexOf(' ||| ');out[key(k.slice(0,i),k.slice(i+5))]={...V.blank(),...c,status:'complete',method:'synthetic',evidence:'Illustrative demo only'};});return out;}
let storageLocked=false;
function loadStore(){
 try{const saved=localStorage.getItem(LS);if(saved)return JSON.parse(saved);
 const legacy=localStorage.getItem(OLD);if(legacy){const old=V.migrate(JSON.parse(legacy));['baseline','current'].forEach(r=>{const out={};Object.entries(old[r]||{}).forEach(([k,c])=>{const i=k.lastIndexOf(' ||| ');out[key(k.slice(0,i),k.slice(i+5))]=c;});old[r]=out;});old.cfg.assistants=uniq([...old.cfg.assistants,V.AIO]);old.cfg.queryCohorts={};return old;}
 }catch(e){storageLocked=true;document.getElementById('storageNotice').textContent='Saved data could not be read. The original storage remains untouched. Export or recover it before resetting.';}
 return freshStore();
}
let store=loadStore(),run='baseline';
const cell=(q,a)=>(store[run][key(q,a)]||={...V.blank()});
function save(){if(storageLocked)return;try{localStorage.setItem(LS,JSON.stringify(store));}catch(e){document.getElementById('storageNotice').textContent='Browser storage unavailable. Download JSON before leaving.';}}
function setRun(r){run=r;render();}
function resetDemo(){if(confirm('Replace v2 working data with synthetic demo? Export JSON first. Legacy v1 data stays untouched.')){storageLocked=false;store=freshStore();save();render();}}
function clearRun(){if(confirm('Clear this v2 run? Export JSON first.')){store[run]={};save();render();}}
function saveCfg(){
 const list=id=>uniq(document.getElementById(id).value.split('\n').map(s=>s.trim()).filter(Boolean));
 const brand=document.getElementById('cfgBrand').value.trim();
 if(brand&&brand!==store.cfg.brand&& !confirm('Changing the brand starts empty runs. Export JSON first. Continue?'))return;
 if(brand&&brand!==store.cfg.brand){store.baseline={};store.current={};store.cfg.queryCohorts={};}
 store.cfg.brand=brand||store.cfg.brand;store.cfg.queries=list('cfgQ');store.cfg.assistants=list('cfgA');store.cfg.competitors=list('cfgC');save();render();
}
function input(k,c,type='text'){return `<input type="${type}" data-k="${k}" value="${esc(c[k])}" aria-label="${k}" ${k==='pos'?'min="1" step="1"':''}>`;}
function render(){
 const {brand,queries,assistants,competitors}=store.cfg;
 store.cfg.queryCohorts||={};
 document.getElementById('btnBase').classList.toggle('active',run==='baseline');document.getElementById('btnCur').classList.toggle('active',run==='current');
 document.getElementById('demoNote').textContent='· '+run+' · Bundled examples are synthetic; AI Overviews starts unrun.';
 document.getElementById('qCount').textContent='('+queries.length+' queries)';
 for(const [id,val] of [['cfgQ',queries.join('\n')],['cfgA',assistants.join('\n')],['cfgC',competitors.join('\n')],['cfgBrand',brand]])document.getElementById(id).value=val;
 for(const id of ['forkHero','forkStep','ghFoot'])document.getElementById(id).href=D.githubUrl;
 document.getElementById('auricsFoot').href=D.auricsUrl;
 const filter=document.getElementById('surfaceFilter'),selected=filter.value;
 filter.innerHTML='<option value="assistants">All assistants (excludes AI Overviews)</option>'+assistants.map(a=>`<option value="${esc(a)}">${esc(a)}</option>`).join('');
 if([...filter.options].some(o=>o.value===selected))filter.value=selected;
 const tb=document.getElementById('rows');tb.innerHTML='';
 queries.forEach(q=>assistants.forEach((a,ai)=>{
 const c=cell(q,a),tr=document.createElement('tr');
 const select=(k,values)=>`<select data-k="${k}" aria-label="${k}">${values.map(o=>`<option value="${esc(o)}" ${c[k]===o?'selected':''}>${esc(o||'Unscored')}</option>`).join('')}</select>`;
 tr.innerHTML=`<td class="q">${esc(q)}<br><select data-cohort aria-label="Prompt cohort">${['unclassified','discovery','evaluation'].map(o=>`<option ${(store.cfg.queryCohorts[q]||'unclassified')===o?'selected':''}>${o}</option>`).join('')}</select></td><td class="a">${esc(a)}</td><td>${select('status',V.STATUSES)}</td>`+
 ['mentioned','rec'].map(k=>`<td><input aria-label="${k}" type="checkbox" data-k="${k}" ${c[k]?'checked':''}></td>`).join('')+
 `<td>${input('pos',c,'number')}</td><td><input aria-label="cited" type="checkbox" data-k="cited" ${c.cited?'checked':''}></td><td>${select('acc',['','Correct','Partial','Wrong'])}</td>`+
 `<td class="comps">${competitors.map(cm=>`<label><input type="checkbox" data-comp="${esc(cm)}" ${(c.comps||[]).includes(cm)?'checked':''}>${esc(cm)}</label>`).join('')}</td>`+
 ['capturedAt','evidence','location','device','language','mode','method','note'].map(k=>`<td>${input(k,c)}</td>`).join('')+`<td class="validation">${esc(V.errors(c,a).join('; '))}</td>`;
 tr.querySelector('[data-cohort]').addEventListener('change',e=>{store.cfg.queryCohorts[q]=e.target.value;save();dash();});
 tr.querySelectorAll('[data-k],[data-comp]').forEach(el=>el.addEventListener('change',()=>{
 if(el.dataset.comp){c.comps||=[];c.comps=el.checked?uniq([...c.comps,el.dataset.comp]):c.comps.filter(x=>x!==el.dataset.comp);}
 else c[el.dataset.k]=el.type==='checkbox'?el.checked:el.value;
 tr.querySelector('.validation').textContent=V.errors(c,a).join('; ');save();dash();}));tb.appendChild(tr);
 }));dash();
}
function rows(which,filter=true){
 const s=document.getElementById('surfaceFilter').value,cohort=document.getElementById('cohortFilter').value;
 const list=[];store.cfg.queries.forEach(q=>store.cfg.assistants.forEach(a=>{
 const group=store.cfg.queryCohorts[q]||'unclassified';
 if(filter&&((s==='assistants'?a===V.AIO:a!==s)||(cohort!=='all'&&cohort!==group)))return;
 list.push({q,surface:a,cohort:group,c:store[which][key(q,a)]||V.blank()});}));return list;
}
const fmt=r=>r.value===null?'Not estimable':Math.round(r.value*100)+'%';
function dash(){
 const surface=document.getElementById('surfaceFilter').value,selected=rows(run),m=V.metrics(selected,surface);
 const cards=[['Recommendation',m.recommendation],['Mention',m.mention],['Owned-site citation',m.citation],['Citation among mentions',m.conditionalCitation],['Sample share of voice',m.sov],['Fully correct responses',m.accuracy]];
 if(surface===V.AIO)cards.push(['Overview trigger rate',m.trigger],['Citation across valid searches',m.searchCitation]);
 document.getElementById('cards').innerHTML=cards.map(([label,r])=>`<div class="card"><div class="n">${fmt(r)}</div><div class="l">${label}</div><div class="d">${r.n}/${r.d}</div></div>`).join('')+`<div class="card"><div class="n">${m.position.value===null?'Not estimable':m.position.value.toFixed(1)}</div><div class="l">Position when explicitly ranked</div><div class="d">${m.position.d} ranked responses</div></div>`;
 const groups=uniq(selected.map(r=>r.surface));
 document.getElementById('byAsst').innerHTML='<table>'+groups.map(a=>{const x=V.metrics(selected.filter(r=>r.surface===a),a);return `<tr><td>${esc(a)}</td><td>${fmt(x.mention)} mentioned (${x.mention.n}/${x.mention.d})</td><td>${fmt(x.citation)} cited (${x.citation.n}/${x.citation.d})</td></tr>`;}).join('')+'</table>';
 const legacy=selected.filter(r=>r.c.status==='legacy_review').length;
 document.getElementById('summary').textContent=`${store.cfg.brand}: ${m.complete} valid answer observations; ${m.noOverview} valid searches without an overview; ${m.planned} planned. ${m.invalid} invalid records excluded. ${legacy} legacy records need review. ${m.missingEvidence} answer records lack full provenance. Accuracy: ${m.partial} partial, ${m.wrong} wrong. ${V.VERSION}. Values describe this prompt sample, not market reach or causal lift. AI Overviews answer metrics exclude valid searches with no overview; its trigger and across-search metrics retain those searches.`;
}
function download(text,name,type){const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}
function exportCSV(){const data=rows(run,false).map(r=>({formula_version:V.VERSION,run,brand:store.cfg.brand,query:r.q,cohort:r.cohort,surface:r.surface,...r.c}));download(V.csv(data),'visibility-'+run+'.csv','text/csv');}
function exportJSON(){download(JSON.stringify(store,null,2),'visibility-v2-backup.json','application/json');}
render();
