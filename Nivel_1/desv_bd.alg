algoritmo "Desvio do Banco de Dados"

var
   naluno:caractere
   nprof:caractere
   reserva:caractere


inicio
   escreval("Nome do aluno:")
   leia(naluno)
   escreval("Nome do professor")
   leia(nprof)
   reserva <- naluno
   naluno <- nprof
   nprof <- reserva

   escreva("O nome do aluno é ",naluno," e o nome do professor é ",nprof)

fimalgoritmo