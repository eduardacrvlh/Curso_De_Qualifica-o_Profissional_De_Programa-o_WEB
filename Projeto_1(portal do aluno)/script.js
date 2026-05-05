let db = JSON.parse(localStorage.getItem('projeto_db')) || { produtos: [], user: { nome: "Ana Silva", foto: "" } };

function navegar(tela) {
    const view = document.getElementById('dynamic-view');
    document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
    document.getElementById(`btn-${tela}`).classList.add('active');

    if (tela === 'inicio') {
        view.innerHTML = `
            <div style="text-align:center; padding:50px; background:white; border-radius:15px; border: 2px solid var(--rosa);">
                <h1 style="color:var(--verde); margin-bottom:10px;">Bem vindos ao nosso site! <3</h1>
                <p style="font-weight:bold;">~ feito por: bella e duda ~</p>
            </div>`;
    } 
    else if (tela === 'cadastrar') {
        view.innerHTML = `
            <h2 class="form-title">Cadastro de Novo Produto - Passo a Passo</h2>
            <p class="form-subtitle">Olá, Aluna! Preencha as informações abaixo para adicionar um produto.</p>
            <div class="steps-container">
                <div class="step-card">
                    <h3><span class="circle">1</span> Informações Básicas 📦</h3>
                    <div class="input-group"><label>Nome do Produto</label><input type="text" id="nome" placeholder="Camisa Polo Básica"></div>
                    <div class="input-group"><label>Descrição Curta</label><textarea id="desc" placeholder="Descrita Polo Básica"></textarea></div>
                    <div class="input-group"><label>Categoria</label><select id="cat"><option>Vestuário</option><option>Eletrônicos</option></select></div>
                </div>
                <div class="step-card">
                    <h3><span class="circle">2</span> Definição de Preços 💰</h3>
                    <div class="input-group"><label>Preço de Venda (R$)</label><input type="number" id="pv" value="59.90"><p class="info-text">ℹ️ Preço final para o cliente</p></div>
                    <div class="input-group"><label>Preço de Custo (R$)</label><input type="number" id="pc" value="25.00"><p class="info-text">ℹ️ Quanto você pagou pelo item</p></div>
                </div>
                <div class="step-card">
                    <h3><span class="circle">3</span> Estoque e Mídia 📷</h3>
                    <div class="input-group"><label>Quantidade em Estoque</label><input type="number" id="est" value="100"></div>
                    <div class="upload-box" onclick="document.getElementById('img-in').click()">📷 Upload de Imagem<input type="file" id="img-in" hidden></div>
                </div>
            </div>
            <div class="btn-row">
                <button class="btn btn-blue" onclick="salvar()">Cadastrar Produto</button>
                <button class="btn btn-gray" onclick="navegar('cadastrar')">Limpar Form</button>
            </div>`;
    } 
    else if (tela === 'produtos' || tela === 'precos') {
        let lista = `<h2>${tela === 'produtos' ? 'Meus Produtos' : 'Tabela de Preços'}</h2><br>`;
        db.produtos.forEach(p => {
            lista += `<div style="background:white; padding:15px; margin-bottom:10px; border-radius:8px; display:flex; gap:15px; align-items:center; border: 1px solid var(--rosa);">
                <img src="${p.img || ''}" style="width:50px; height:50px; object-fit:cover; border-radius:4px; background:#eee;">
                <div><b>${p.nome}</b> - ${tela === 'produtos' ? p.desc : 'Venda: R$ '+p.pv}</div>
            </div>`;
        });
        view.innerHTML = lista || "<p>Nada cadastrado.</p>";
    }
    else if (tela === 'config') {
        view.innerHTML = `
            <div class="steps-container" style="display:block; max-width:400px; margin:auto;">
                <h3>Configurações de Login</h3>
                <label>Seu Nome:</label><input type="text" id="u-nome" value="${db.user.nome}"><br><br>
                <label>Foto de Perfil:</label><input type="file" id="u-foto"><br><br>
                <button class="btn btn-blue" onclick="atualizarPerfil()">Salvar Alterações</button>
            </div>`;
    }
}

function salvar() {
    const file = document.getElementById('img-in').files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        db.produtos.push({
            nome: document.getElementById('nome').value,
            desc: document.getElementById('desc').value,
            pv: document.getElementById('pv').value,
            img: reader.result
        });
        localStorage.setItem('projeto_db', JSON.stringify(db));
        alert("Cadastrado com sucesso!");
        navegar('produtos');
    };
    if(file) reader.readAsDataURL(file); else reader.onloadend();
}

function atualizarPerfil() {
    db.user.nome = document.getElementById('u-nome').value;
    const file = document.getElementById('u-foto').files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        if(file) db.user.foto = reader.result;
        localStorage.setItem('projeto_db', JSON.stringify(db));
        document.getElementById('user-name-top').innerText = db.user.nome;
        if(db.user.foto) document.getElementById('user-photo').innerHTML = `<img src="${db.user.foto}">`;
        alert("Perfil atualizado!");
    };
    if(file) reader.readAsDataURL(file); else reader.onloadend();
}

// Início
navegar('cadastrar');