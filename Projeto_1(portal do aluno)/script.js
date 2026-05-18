// Banco de dados persistente
let db = JSON.parse(localStorage.getItem('portal_db')) || {
    produtos: [],
    mensagens: [
        { id: 1, remetente: "Suporte Técnico", texto: "Seja bem-vindo ao portal! Caso precise de ajuda, entre em contato." }
    ],
    user: { nome: "Ana Silva", foto: "" }
};

// Garante que a propriedade de mensagens exista se o banco antigo não a tiver
if (!db.mensagens) {
    db.mensagens = [];
}

let telaAtual = 'inicio';
// Variável de controle para guardar a aba selecionada no momento
let categoriaAtivaGlobal = 'Todos';

// Função de Busca pelo Enter
function verificarEnter(event) {
    if (event.key === 'Enter') {
        const termo = document.getElementById('inputPesquisa').value.toLowerCase();
        navegar('produtos', termo);
    }
}

// Função criada especificamente para a Missão da Fase 3
function filtrarCategoria(categoria, botao) {
    categoriaAtivaGlobal = categoria;
    
    // Altera a classe ativa entre os botões de abas
    document.querySelectorAll('.btn-aba').forEach(btn => btn.classList.remove('aba-ativa'));
    botao.classList.add('aba-ativa');

    // Executa novamente a renderização da tela de produtos aplicando o filtro da aba
    navegar('produtos');
}

function navegar(tela, filtro = "") {
    telaAtual = tela;
    const view = document.getElementById('dynamic-view');
   
    // Se mudou de tela para outra que não seja produtos, reseta a aba ativa para 'Todos'
    if (tela !== 'produtos' && !filtro) {
        categoriaAtivaGlobal = 'Todos';
    }

    // Atualiza Menu Lateral
    document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
    const btn = document.getElementById(`btn-${tela}`);
    if(btn) btn.classList.add('active');

    // Atualiza badge superior e os dados do cabeçalho
    const badgeTop = document.getElementById('msg-badge-top');
    if (badgeTop) {
        badgeTop.textContent = db.mensagens.length;
        badgeTop.style.display = db.mensagens.length > 0 ? 'inline-block' : 'none';
    }
    
    // Mantém o cabeçalho atualizado com os dados do banco
    if(document.getElementById('user-name-top')) {
        document.getElementById('user-name-top').textContent = db.user.nome;
    }
    if(document.getElementById('user-photo') && db.user.foto) {
        document.getElementById('user-photo').innerHTML = `<img src="${db.user.foto}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
    }

    if (tela === 'inicio') {
        view.innerHTML = `
            <div style="text-align:center; padding:80px; background:white; border-radius:20px; border: 2px solid var(--azul-escuro);">
                <h1 style="color:var(--azul-escuro);">Bem-vindo ao Portal do Aluno</h1>
                <p style="margin-top:20px; font-weight:bold; color:#666;">Sistema de Gestão Bella e Duda</p>
            </div>`;
    }
    else if (tela === 'cadastrar') {
        view.innerHTML = `
            <h2 style="margin-bottom:20px;">Cadastrar Novo Produto</h2>
            <div class="steps-container">
                <div class="step-card">
                    <h3>📦 Identificação</h3><br>
                    <div class="input-group"><label for="nome">Nome do Produto</label><input type="text" id="nome"></div>
                    <div class="input-group"><label for="desc">Descrição Detalhada</label><textarea id="desc" rows="3"></textarea></div>
                    <div class="input-group"><label for="cat">Categoria</label><select id="cat"><option value="Vestuário">Vestuário</option><option value="Eletrônicos">Eletrônicos</option><option value="Acessórios">Acessórios</option></select></div>
                </div>
                <div class="step-card">
                    <h3>💰 Financeiro</h3><br>
                    <div class="input-group"><label for="pc">Preço de Custo (R$)</label><input type="number" id="pc" step="0.01"></div>
                    <div class="input-group"><label for="pv">Preço de Venda (R$)</label><input type="number" id="pv" step="0.01"></div>
                </div>
                <div class="step-card">
                    <h3>🔢 Logística</h3><br>
                    <div class="input-group"><label for="est">Quantidade em Estoque</label><input type="number" id="est"></div>
                    <div class="input-group"><label>Foto do Produto</label><input type="file" id="img-in"></div>
                </div>
            </div>
            <div style="margin-top:20px;"><button class="btn btn-primary" onclick="salvarProduto()">Finalizar Cadastro</button></div>`;
    }
    else if (tela === 'produtos') {
        let produtosParaExibir = db.produtos;
        
        // Aplica o filtro de pesquisa textual (se houver)
        if(filtro) {
            produtosParaExibir = db.produtos.filter(p => p.nome.toLowerCase().includes(filtro) || p.cat.toLowerCase().includes(filtro));
        } 
        // PASSO 3: Superpoder do .filter() - Filtra pela categoria da Aba ativa (se não for "Todos")
        else if (categoriaAtivaGlobal !== 'Todos') {
            produtosParaExibir = db.produtos.filter(p => p.cat.toLowerCase() === categoriaAtivaGlobal.toLowerCase());
        }

        // Cálculos Globais exigidos
        let custoTotalGeral = 0;
        let estoqueTotalGeral = 0;
        let lucroTotalGeral = 0;

        db.produtos.forEach(p => {
            custoTotalGeral += (p.pc * p.est);
            estoqueTotalGeral += p.est;
            lucroTotalGeral += ((p.pv - p.pc) * p.est);
        });

        // Painel Geral de Métricas
        let html = `
            <h2>Meus Produtos (${produtosParaExibir.length})</h2><br>
            
            <!-- PASSO 1: Estrutura de botões de Abas adicionada acima da listagem -->
            <div class="abas-container" style="margin-bottom: 20px; display: flex; gap: 10px;">
                <button class="btn-aba ${categoriaAtivaGlobal === 'Todos' ? 'aba-active aba-ativa' : ''}" onclick="filtrarCategoria('Todos', this)">Todos</button>
                <button class="btn-aba ${categoriaAtivaGlobal === 'Vestuário' ? 'aba-active aba-ativa' : ''}" onclick="filtrarCategoria('Vestuário', this)">Vestuário</button>
                <button class="btn-aba ${categoriaAtivaGlobal === 'Eletrônicos' ? 'aba-active aba-ativa' : ''}" onclick="filtrarCategoria('Eletrônicos', this)">Eletrônicos</button>
                <button class="btn-aba ${categoriaAtivaGlobal === 'Acessórios' ? 'aba-active aba-ativa' : ''}" onclick="filtrarCategoria('Acessórios', this)">Acessórios</button>
            </div>

            <div class="tabela-container" style="margin-bottom: 30px;">
                <table class="tabela-precos">
                    <thead>
                        <tr>
                            <th>Custo Total Investido</th>
                            <th>Total Itens em Estoque</th>
                            <th>Lucro Geral Estimado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>R$ ${custoTotalGeral.toFixed(2)}</strong></td>
                            <td><strong>${estoqueTotalGeral} un</strong></td>
                            <td style="color: green; font-weight: bold;"><strong>R$ ${lucroTotalGeral.toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        if(produtosParaExibir.length === 0) {
            html += "<p>Nenhum produto cadastrado nesta categoria.</p>";
        }

        const listaCategorias = categoriaAtivaGlobal === 'Todos' ? ["Vestuário", "Eletrônicos", "Acessórios"] : [categoriaAtivaGlobal];

        listaCategorias.forEach(catFiltro => {
            let produtosDaCategoria = produtosParaExibir.filter(p => p.cat.toLowerCase() === catFiltro.toLowerCase());

            if(produtosDaCategoria.length > 0) {
                html += `<h3 style="color: var(--azul-escuro); margin: 25px 0 10px 0; border-bottom: 2px solid var(--azul-claro); padding-bottom: 5px; text-transform: uppercase;">${catFiltro}</h3>`;
                
                produtosDaCategoria.forEach(p => {
                    let indexReal = db.produtos.findIndex(item => item === p);
                    let lucroUnitario = p.pv - p.pc;
                    let lucroTotalCard = lucroUnitario * p.est;

                    html += `
                    <div class="produto-card">
                        <img src="${p.img || ''}" class="produto-img">
                        <div class="produto-info">
                            <div style="display:flex; justify-content:space-between;">
                                <h3>${p.nome}</h3>
                                <button class="btn-delete" onclick="excluirProduto(${indexReal})">🗑️</button>
                            </div>
                            <p style="color:#666; font-size:14px; margin: 5px 0;">${p.desc}</p>
                            <div class="produto-detalhes">
                                <span><strong>Custo Unit:</strong> R$ ${p.pc.toFixed(2)}</span>
                                <span><strong>Venda Unit:</strong> R$ ${p.pv.toFixed(2)}</span>
                                <span style="color: green;"><strong>Lucro Total:</strong> R$ ${lucroTotalCard.toFixed(2)}</span>
                                <span>
                                    <strong>Estoque:</strong>
                                    <button class="btn-qty" onclick="atualizarEstoque(${indexReal}, -1)">-</button>
                                    <input type="number" value="${p.est}" style="width: 50px; text-align: center; font-weight: bold; border: 1px solid #ccc; border-radius: 4px;" onchange="editarEstoqueDireto(${indexReal}, this.value)">
                                    <button class="btn-qty" onclick="atualizarEstoque(${indexReal}, 1)">+</button>
                                </span>
                            </div>
                        </div>
                    </div>`;
                });
            }
        });

        view.innerHTML = html;
    }
    else if (tela === 'precos') {
        let html = `<h2>Tabela de Preços Geral</h2><br>
        <div class="tabela-container">
            <table class="tabela-precos">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Categoria</th>
                        <th>Custo</th>
                        <th>Venda</th>
                        <th>Estoque</th>
                        <th>Lucro Estimado (Total)</th>
                    </tr>
                </thead>
                <tbody>`;

        db.produtos.forEach(p => {
            let lucroTotal = (p.pv - p.pc) * p.est;
            html += `
                <tr>
                    <td><strong>${p.nome}</strong></td>
                    <td><span class="tag">${p.cat}</span></td>
                    <td>R$ ${p.pc.toFixed(2)}</td>
                    <td>R$ ${p.pv.toFixed(2)}</td>
                    <td>${p.est} un</td>
                    <td style="color:green; font-weight:bold;">R$ ${lucroTotal.toFixed(2)}</td>
                </tr>`;
        });

        html += `</tbody></table></div>`;
        view.innerHTML = html;
    }
    else if (tela === 'mensagens') {
        let html = `<h2>Mensagens Recebidas</h2><br>
        <div class="steps-container" style="grid-template-columns: 1fr;">`;

        db.mensagens.forEach(m => {
            html += `
                <div class="step-card">
                    <h3 style="color: var(--azul-escuro)">From: ${m.remetente}</h3><br>
                    <p>${m.texto}</p>
                </div>`;
        });

        if (db.mensagens.length === 0) {
            html += `<p>Nenhuma mensagem na caixa de entrada.</p>`;
        }

        html += `</div>`;
        view.innerHTML = html;
    }
    else if (tela === 'config') {
        view.innerHTML = `
            <h2>Configurações do Perfil</h2><br>
            <div class="steps-container" style="grid-template-columns: 1fr 1fr;">
                <div class="step-card">
                    <h3>👤 Meus Dados</h3><br>
                    <div class="input-group">
                        <label for="cfg-nome">Nome de Usuário</label>
                        <input type="text" id="cfg-nome" value="${db.user.nome}">
                    </div>
                    <button class="btn btn-primary" onclick="salvarConfig()">Salvar Alterações</button>
                </div>
                <div class="step-card">
                    <h3>📷 Foto de Perfil</h3><br>
                    <div class="input-group">
                        <label>Alterar Imagem</label>
                        <input type="file" id="cfg-foto">
                    </div>
                    <button class="btn btn-primary" onclick="salvarConfig()">Atualizar Imagem</button>
                </div>
            </div>`;
    }
}

// Inicializa a tela padrão ao carregar o sistema
navegar('inicio');

// ==========================================================================
// FUNÇÕES COMPLEMENTARES ORIGINAIS DO SISTEMA DO PORTAL
// ==========================================================================
function salvarProduto() {
    const nome = document.getElementById('nome').value;
    const desc = document.getElementById('desc').value;
    const cat = document.getElementById('cat').value;
    const pc = parseFloat(document.getElementById('pc').value) || 0;
    const pv = parseFloat(document.getElementById('pv').value) || 0;
    const est = parseInt(document.getElementById('est').value) || 0;
    const imgIn = document.getElementById('img-in');

    const novoProd = { nome, desc, cat, pc, pv, est, img: "" };

    if (imgIn && imgIn.files && imgIn.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            novoProd.img = e.target.result;
            db.produtos.push(novoProd);
            localStorage.setItem('portal_db', JSON.stringify(db));
            navegar('produtos');
        };
        reader.readAsDataURL(imgIn.files[0]);
    } else {
        db.produtos.push(novoProd);
        localStorage.setItem('portal_db', JSON.stringify(db));
        navegar('produtos');
    }
}

function excluirProduto(index) {
    if(confirm("Tem certeza que deseja excluir este produto?")) {
        db.produtos.splice(index, 1);
        localStorage.setItem('portal_db', JSON.stringify(db));
        navegar('produtos');
    }
}

function atualizarEstoque(index, qtd) {
    db.produtos[index].est += qtd;
    if(db.produtos[index].est < 0) db.produtos[index].est = 0;
    localStorage.setItem('portal_db', JSON.stringify(db));
    navegar('produtos');
}

function editarEstoqueDireto(index, valor) {
    let qtd = parseInt(valor) || 0;
    if(qtd < 0) qtd = 0;
    db.produtos[index].est = qtd;
    localStorage.setItem('portal_db', JSON.stringify(db));
    navegar('produtos');
}

function salvarConfig() {
    const nomeInput = document.getElementById('cfg-nome');
    const fotoInput = document.getElementById('cfg-foto');

    if(nomeInput) {
        db.user.nome = nomeInput.value;
    }

    if (fotoInput && fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            db.user.foto = e.target.result;
            localStorage.setItem('portal_db', JSON.stringify(db));
            navegar('config');
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        localStorage.setItem('portal_db', JSON.stringify(db));
        navegar('config');
    }
}