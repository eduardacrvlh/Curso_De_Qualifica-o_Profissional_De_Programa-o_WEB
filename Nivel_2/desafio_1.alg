algoritmo "Sala de servidores"
// Disciplina  :  [Linguagem e Lógica de Programação]
// Professor   : [Ricardo Silva]
// Descrição   : Você foi encarregado de calcular o material necessário para construir uma nova sala de servidores. O programa deve pedir a largura e o comprimento da sala em metros.
// Autora    : Eduarda Carvalho
// Data atual  : 09/04/2026

var
largura:inteiro
comprimento:inteiro
produto1:inteiro
produto2:inteiro


inicio

escreval("______________________")
escreval("--Sala de Servidores--")
escreval("______________________")
escreval("")
escreval("Informe a largura da sala-em metros:")
leia(largura)
escreval("Digite o comprimento da sala-em metros:")
leia(comprimento)
produto1 <- largura * comprimento
escreval("Área=",produto1)
produto2 <- 2 * (largura+comprimento)
escreval("Perímetro=",produto2)


fimalgoritmo