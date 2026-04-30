function adicionar() {
    let input = document.getElementById("tarefa");
    let texto = input.value;

    let mensagem = document.getElementById("mensagem");

    if (texto === "") {
        mensagem.innerText = "Digite uma tarefa!";
        mensagem.style.color = "red";
        return;
    }

    let lista = document.getElementById("lista");

    let item = document.createElement("li");
    item.innerText = texto;

    lista.appendChild(item);

    mensagem.innerText = "Tarefa adicionada com sucesso!";
    mensagem.style.color = "green";

    input.value = "";
}
