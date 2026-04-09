algoritmo "Crachá de Acesso"
// Disciplina  :  [Linguagem e Lógica de Programação]
// Professor   : Ricardo Silva
// Descrição   : Um técnico precisa configurar o painel de boas-vindas da intranet do laboratório. O sistema pede o nome do usuário e, emseguida, o turno em que ele estuda. A regra é simples: o paineldeve juntar as duas informações e exibir a mensagem: "Bem-vindo, [Nome] do turno da [Turno]!". Se o aluno se chamaCarlos e estuda na Manhã, como o computador processa isso passo a passo?
// Autora    : Eduarda Carvalho

var

    naluno:caractere
    turno:caractere


inicio

    naluno <- "Antônio de Sousa"
    turno <- "Noite"

escreval("__________________________________________________")
escreval("----------ACESSO RESTRITO Á FUNCIONÁRIOS----------")
escreval("__________________________________________________")
escreval("")
escreval ("DIGITE SEU NOME:")
//leia(naluno)
escreval ("INFORME SEU TURNO:")
//leia(turno)
escreva("Bem vindo ",naluno," o seu turno é de ",turno)
escreval("")


fimalgoritmo