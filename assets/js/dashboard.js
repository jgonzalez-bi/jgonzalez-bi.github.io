const REGION_DATA = {
  total:{label:{es:'Total',en:'Total'},rs:8420,yoy:3.1,acp:28.1,online:38,accounts:[94,81,68,55,39],channels:[86,68,52,41]},
  na:{label:{es:'Norteamérica',en:'North America'},rs:3120,yoy:1.8,acp:26.4,online:31,accounts:[90,76,61,47,35],channels:[91,60,47,34]},
  uk:{label:{es:'Reino Unido',en:'United Kingdom'},rs:640,yoy:-2.4,acp:24.9,online:45,accounts:[88,70,58,43,31],channels:[72,58,42,64]},
  euem:{label:{es:'EUEM',en:'EUEM'},rs:1980,yoy:4.6,acp:29.8,online:36,accounts:[96,83,67,52,43],channels:[84,69,57,38]},
  apac:{label:{es:'APAC',en:'APAC'},rs:1150,yoy:5.2,acp:30.6,online:41,accounts:[92,79,72,50,42],channels:[76,65,55,48]},
  china:{label:{es:'China',en:'China'},rs:1180,yoy:7.9,acp:33.2,online:63,accounts:[98,89,71,56,45],channels:[68,74,61,89]},
  latam:{label:{es:'LATAM',en:'LATAM'},rs:350,yoy:2.2,acp:25.1,online:28,accounts:[87,73,59,46,33],channels:[82,61,44,29]}
};
const accountNames=['Aurora Beauty','Northgate Group','Lumen Retail','Casa Bloom','Meridian Online'];
const channelNames={es:['Prestige','Mid-Tier','Specialty','Pure Play'],en:['Prestige','Mid-Tier','Specialty','Pure Play']};
let region='total';
function num(n){return n>=1000?(n/1000).toFixed(2)+'B':Math.round(n)+'M'}
function renderDashboard(){
  const d=REGION_DATA[region]; const lang=document.documentElement.lang || 'es';
  const tabs=document.getElementById('region-tabs'); if(!tabs)return;
  tabs.innerHTML=Object.entries(REGION_DATA).map(([k,v])=>`<button class="demo-tab" data-region="${k}" aria-pressed="${k===region}">${v.label[lang]}</button>`).join('');
  tabs.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{region=b.dataset.region;renderDashboard()}));
  const gs=d.rs*1.13, ns=gs*.502, ac=gs*d.acp/100, gross=gs*.635;
  const items=[['Retail Sales',num(d.rs),d.yoy],['GSRV',num(gs),d.yoy+.4],['Gross Sales',num(gross),d.yoy+.9],['Net Sales',num(ns),d.yoy-.3],['Account Contribution',num(ac),d.yoy+1.5],['AC % GSRV',d.acp.toFixed(1)+'%',d.acp-27.2]];
  document.getElementById('demo-kpis').innerHTML=items.map(([l,v,p])=>`<div class="demo-kpi"><small>${l}</small><strong>${v}</strong><i class="${p<0?'down':''}">${p>0?'+':''}${p.toFixed(1)}%</i></div>`).join('');
  document.getElementById('account-ranking').innerHTML=d.accounts.map((v,i)=>`<div class="rank-row"><span>${accountNames[i]}</span><span class="rank-track"><i style="width:${v}%"></i></span><em>${(v/100*gs*.24).toFixed(0)}M</em></div>`).join('');
  document.getElementById('channel-bars').innerHTML=d.channels.map((v,i)=>`<div class="channel-col"><div class="channel-bar" style="height:${v*1.65}px" title="${v}%"></div><span>${channelNames[lang][i]}</span></div>`).join('');
}
document.addEventListener('languagechange',renderDashboard); renderDashboard();
