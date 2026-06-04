/* script.js COMPLETO CORRIGIDO */

let currentUser = '';
let currentPhoto = '';

function login(){

const username =
document.getElementById('username').value;

const photo =
document.getElementById('userphoto').value;

if(username === ''){
alert('Digite um nome.');
return;
}

currentUser = username;

currentPhoto =
photo || 'https://i.imgur.com/HeIi0wU.png';

document.getElementById('loginScreen')
.style.display = 'none';

document.getElementById('mainSite')
.style.display = 'block';

document.getElementById('navUser')
.innerText = username;

document.getElementById('navPhoto')
.src = currentPhoto;

startChart();

}

function openExplorer(){

document.getElementById('explorerModal')
.style.display = 'flex';

}

function closeExplorer(){

document.getElementById('explorerModal')
.style.display = 'none';

}

function openPrefeituraMode(){

document.getElementById('prefeituraModal')
.style.display = 'flex';

}

function closePrefeituraMode(){

document.getElementById('prefeituraModal')
.style.display = 'none';

}

function scrollToAlerts(){

document
.getElementById('alertas')
.scrollIntoView({
behavior:'smooth'
});

}

/* GRÁFICO CORRIGIDO */

function startChart(){

const ctx =
document.getElementById('chart');

window.urbanChart = new Chart(ctx, {

type:'radar',

data:{

labels:[
'Fluxo',
'Segurança',
'Mobilidade',
'Saúde',
'Satisfação',
'Turismo'
],

datasets:[{

label:'Índice Urbano',

data:[87,72,81,90,91,84],

backgroundColor:'rgba(255,215,0,0.15)',

borderColor:'#ffd700',

borderWidth:2,

pointBackgroundColor:'#ffd700',

pointBorderColor:'#fff',

pointRadius:4,

pointHoverRadius:6

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

labels:{
color:'white',
font:{
size:13
}
}

}

},

scales:{

r:{

min:0,
max:100,

ticks:{
display:false
},

pointLabels:{

color:'white',

font:{
size:13,
weight:'600'
}

},

grid:{
color:'rgba(255,255,255,.08)'
},

angleLines:{
color:'rgba(255,255,255,.08)'
}

}

},

animation:{
duration:1400
}

}

});

}

/* DASHBOARD */

function updateDashboard(){

const posts =
document.querySelectorAll('.post');

const total = posts.length;

document.getElementById('flowMetric')
.innerText = (80 + total) + '%';

document.getElementById('alertMetric')
.innerText = 126 + total;

document.getElementById('satisfactionMetric')
.innerText = (92 - Math.floor(total/3)) + '%';

document.getElementById('safetyMetric')
.innerText = (70 + Math.floor(total/2)) + '%';

}

/* POSTS */

const feed =
document.getElementById('feed');

function createPost(){

const bairro =
document.getElementById('bairro').value;

const categoria =
document.getElementById('categoria').value;

const descricao =
document.getElementById('descricao').value;

const imagem =
document.getElementById('imagem').value;

if(
bairro === '' ||
descricao === ''
){
alert('Preencha tudo.');
return;
}

const post =
document.createElement('div');

post.classList.add('post');

post.innerHTML = `

<div class="post-user">

<img src="${currentPhoto}">

<div>

<h4>${currentUser}</h4>

<p>${categoria} • 📍 ${bairro}</p>

</div>

</div>

<div class="post-text">
${descricao}
</div>

${imagem ? `
<img
class="post-image"
src="${imagem}"
onerror="this.style.display='none'"
>
` : ''}

<div class="post-actions">

<button class="action-btn like-btn">
❤️ Curtir <span>0</span>
</button>

<button
class="action-btn"
onclick="toggleComments(this)"
>
💬 Comentários
</button>

</div>

<div class="comment-box">

<input
type="text"
placeholder="Comentário..."
>

<button
class="action-btn"
onclick="addComment(this)"
>
Enviar
</button>

<div class="comments-list"></div>

</div>

`;

feed.prepend(post);

/* LIKE */

const likeBtn =
post.querySelector('.like-btn');

let likes = 0;
let liked = false;

likeBtn.addEventListener('click',()=>{

if(!liked){

likes++;
liked = true;

likeBtn.innerHTML =
`❤️ Curtido <span>${likes}</span>`;

}else{

likes--;
liked = false;

likeBtn.innerHTML =
`❤️ Curtir <span>${likes}</span>`;

}

});

updateDashboard();

}

/* COMENTÁRIOS */

function toggleComments(button){

const box =
button.parentElement.nextElementSibling;

box.style.display =
box.style.display === 'block'
? 'none'
: 'block';

}

function addComment(button){

const input =
button.parentElement.querySelector('input');

const list =
button.parentElement.querySelector('.comments-list');

if(input.value==='') return;

const comment =
document.createElement('div');

comment.classList.add('comment');

comment.innerHTML =
`💬 <strong>${currentUser}:</strong> ${input.value}`;

list.appendChild(comment);

input.value='';

}

/* IA */

const chat =
document.getElementById('chat');

function addMessage(text,type){

const msg =
document.createElement('div');

msg.classList.add('message',type);

msg.innerHTML = text;

chat.appendChild(msg);

chat.scrollTop =
chat.scrollHeight;

}

addMessage(
'👋 Olá. Sou a IA Urbana de São João Viva.',
'ai'
);

function sendMessage(){

const input =
document.getElementById('question');

const text =
input.value.trim();

if(text==='') return;

addMessage(text,'user');

const q =
text.toLowerCase();

let response =
'📡 Analisando dados urbanos em tempo real...';

if(
q.includes('trânsito') ||
q.includes('fluxo')
){

response =
'🚦 Detectamos fluxo intenso próximo ao Centro Histórico e região da Avenida Leite de Castro.';

}

else if(
q.includes('segurança') ||
q.includes('crime')
){

response =
'🛡 O índice de segurança urbana está estável neste momento.';

}

else if(
q.includes('saúde') ||
q.includes('hospital')
){

response =
'🏥 A UPA Central opera com fluxo moderado atualmente.';

}

else if(
q.includes('evento') ||
q.includes('seresta')
){

response =
'🎭 Hoje ocorrerão apresentações culturais e serestas no Centro Histórico.';

}

else if(
q.includes('turismo') ||
q.includes('igreja')
){

response =
'⛪ O Centro Histórico apresenta alto fluxo turístico hoje.';

}

else if(
q.includes('mobilidade')
){

response =
'🚲 Mobilidade urbana funcionando normalmente neste momento.';

}

else{

response =
'🤖 Você pode perguntar sobre trânsito, turismo, segurança, saúde, eventos e mobilidade urbana.';

}

setTimeout(()=>{

addMessage(response,'ai');

},900);

input.value='';

}

/* STATUS DINÂMICO */

setInterval(()=>{

const statusItems =
document.querySelectorAll('.status-item');

const random =
Math.floor(Math.random()*3);

if(random === 0){

statusItems[1].innerText =
'🚦 Fluxo intenso no Centro';

}

if(random === 1){

statusItems[1].innerText =
'🟢 Mobilidade normal';

}

if(random === 2){

statusItems[1].innerText =
'🚨 Alto fluxo em Matosinhos';

}

},4000);

/* CONTADOR PREFEITURA */

setInterval(()=>{

const urbanCounter =
document.getElementById('urbanCounter');

if(urbanCounter){

let current =
parseInt(urbanCounter.innerText);

current += Math.floor(Math.random()*3);

urbanCounter.innerText = current;

}

},5000);

/* ENTER ENVIA MENSAGEM */

document.addEventListener('keypress',function(e){

if(e.key === 'Enter'){

const active =
document.activeElement;

if(active.id === 'question'){

sendMessage();

}

}

});