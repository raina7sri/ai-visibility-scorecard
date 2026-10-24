/* v2 measurement contract. No collection, network calls or inferred observations. */
(function(root){
  'use strict';
  const VERSION='visibility-v2';
  const AIO='Google AI Overviews';
  const STATUSES=['not_run','complete','no_overview','unavailable','invalid','legacy_review'];
  const blank=()=>({status:'not_run',mentioned:false,rec:false,pos:'',cited:false,acc:'',comps:[],note:'',capturedAt:'',evidence:'',location:'',device:'',language:'',mode:'',method:'manual'});
  function errors(c,surface){
    const e=[];
    if(!STATUSES.includes(c.status))e.push('Unknown status');
    if(c.status==='no_overview'&&surface!==AIO)e.push('No-overview status only applies to AI Overviews');
    if(c.status==='no_overview'&&(c.mentioned||c.rec||c.cited||c.pos||c.acc||(c.comps||[]).length))e.push('No-overview record cannot contain answer scores');
    if(c.rec&&!c.mentioned)e.push('Recommendation requires a mention');
    if(c.pos&&(!c.mentioned||!Number.isInteger(Number(c.pos))||Number(c.pos)<1))e.push('Position requires a mention and a positive integer');
    if(c.acc&&!['Correct','Partial','Wrong'].includes(c.acc))e.push('Unknown accuracy label');
    if(c.acc&&!c.mentioned)e.push('Brand accuracy requires a mention');
    if(c.capturedAt&&(Number.isNaN(Date.parse(c.capturedAt))||!/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(c.capturedAt)))e.push('Capture time needs ISO date, time and timezone');
    return e;
  }
  function metrics(rows,surface){
    let complete=0,noOverview=0,mentioned=0,rec=0,cited=0,both=0,accuracyN=0,correct=0,partial=0,wrong=0,posSum=0,posN=0,competitorMentions=0,invalid=0,missingEvidence=0;
    rows.forEach(({c,surface:s})=>{
      if(errors(c,s).length){invalid++;return;}
      if(c.status==='no_overview'){noOverview++;if(!c.evidence||!c.capturedAt||!c.location||!c.device||!c.language||!c.mode||!c.method)missingEvidence++;return;}
      if(c.status!=='complete')return;
      complete++;
      if(!c.evidence||!c.capturedAt||!c.location||!c.device||!c.language||!c.mode||!c.method)missingEvidence++;
      if(c.mentioned)mentioned++;
      if(c.rec)rec++;
      if(c.cited)cited++;
      if(c.mentioned&&c.cited)both++;
      if(c.acc){accuracyN++;if(c.acc==='Correct')correct++;else if(c.acc==='Partial')partial++;else wrong++;}
      if(c.pos){posSum+=Number(c.pos);posN++;}
      competitorMentions+=new Set(c.comps||[]).size;
    });
    const ratio=(n,d)=>({n,d,value:d?n/d:null});
    return {version:VERSION,surface,planned:rows.length,complete,noOverview,invalid,missingEvidence,
      coverage:ratio(complete+noOverview,rows.length),mention:ratio(mentioned,complete),recommendation:ratio(rec,complete),citation:ratio(cited,complete),conditionalCitation:ratio(both,mentioned),accuracy:ratio(correct,accuracyN),partial,wrong,
      sov:ratio(mentioned,mentioned+competitorMentions),position:{n:posSum,d:posN,value:posN?posSum/posN:null},
      trigger:surface===AIO?ratio(complete,complete+noOverview):ratio(0,0),searchCitation:surface===AIO?ratio(cited,complete+noOverview):ratio(0,0)};
  }
  function migrate(old){
    const copy=JSON.parse(JSON.stringify(old));
    copy.version=VERSION;copy.cfg.queryCohorts=copy.cfg.queryCohorts||{};
    ['baseline','current'].forEach(run=>Object.keys(copy[run]||{}).forEach(k=>{copy[run][k]={...blank(),...copy[run][k],status:'legacy_review'};}));
    return copy;
  }
  function csv(rows){
    const columns=['formula_version','run','brand','query','cohort','surface',...Object.keys(blank())];
    const safe=v=>{let s=Array.isArray(v)?JSON.stringify(v):String(v??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};
    return [columns.map(safe).join(','),...rows.map(r=>columns.map(k=>safe(r[k])).join(','))].join('\r\n');
  }
  const api={VERSION,AIO,STATUSES,blank,errors,metrics,migrate,csv};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Visibility=api;
})(typeof window!=='undefined'?window:globalThis);
