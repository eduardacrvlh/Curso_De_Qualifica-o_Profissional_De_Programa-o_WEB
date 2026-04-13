algoritmo "Catraca do laboratório"
// Disciplina  :  [Linguagem e Lógica de Programação]
// Professor   : Ricardo Silva
// Autor(a)    : Eduarda Carvalho
// Data atual  : 13/04/2026
var

idade: inteiro

inicio

escreval("Insira a idade do aluno:")
leia(idade)

 // Lógica de liberação da catraca
   se (idade >= 18) entao
   escreval("Acesso liberado: Máquina habilitada.")
   senao
   se (idade >= 0) e (idade < 18) entao
   escreval("Acesso negado: Risco de segurança. Procure o professor")
   fimse
fimse

fimalgoritmo