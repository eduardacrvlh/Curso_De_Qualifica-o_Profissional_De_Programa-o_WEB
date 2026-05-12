function adicionarTarefa() {

    // --- 1. CAPTURA E ARMAZENAMENTO DE DADOS ---
    
    // Acessa o valor (texto) digitado no elemento que possui o ID "inputTarefa"
    let inputTarefa = document.getElementById("inputTarefa").value
    
    // Cria uma nova variável chamada 'tarefa' para duplicar o valor obtido acima
    let tarefa = inputTarefa
    
    // Registra no console do navegador o conteúdo capturado para fins de teste
    console.log(inputTarefa)


    // --- 2. MANIPULAÇÃO DA LISTA NO HTML ---
    
    // Localiza no documento o elemento da lista (geralmente uma tag <ul> ou <ol>)
   let listaTarefas = document.getElementById("listaTarefas")
   
   // Gera um novo elemento de item de lista (tag <li>) na memória do navegador
   let novaTarefa = document.createElement("li")
   
   // Atribui o texto armazenado na variável 'tarefa' para dentro desse novo item criado
    novaTarefa.textContent = tarefa
    
   // Insere o novo item (li) como um elemento filho dentro da lista principal
   listaTarefas.appendChild(novaTarefa)


    // --- 3. COMUNICAÇÃO COM O USUÁRIO E RESET ---
    
    // Define uma frase padrão para confirmar que a ação funcionou
    let mensagem = "Tarefa adicionada com sucesso!"
    
    // Localiza o elemento de feedback e atualiza o conteúdo escrito nele
    document.getElementById("mensagem").textContent = mensagem
    
    // Tenta redefinir o conteúdo da variável para uma string vazia
    inputTarefa.value = ""
}
