algoritmo "O Sensor do Servidor"
// Disciplina  :  [Linguagem e Lógica de Programação]
// Professor   : Ricardo Silva
// Autor(a)    : Eduarda Carvalho
// Data atual  : 13/04/2026

var

temperatura:inteiro

inicio

escreval("Insira a temperatura atual da sala (em graus):")
leia(temperatura)

   //lógica de status da temperatura
   se (temperatura <= 20) entao
   escreval("Status: Climatização ideal")
   senao
   se (temperatura <= 25) entao
   escreval("Status: Normal/Atenção.")
   senao
   escreval("Status: PERIGO! Servidor superaquecendo!")
   fimse
fimse

fimalgoritmo