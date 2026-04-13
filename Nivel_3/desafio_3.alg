algoritmo "O Sistema de Login"
// Disciplina  :  [Linguagem e Lógica de Programação]
// Professor   : Ricardo Silva
// Autor(a)    : Eduarda Carvalho
// Data atual  : 13/04/2026

var
   usuario, senha: caractere

inicio
   // Entrada de dados
   escreva("Digite o usuário: ")
   leia(usuario)
   escreva("Digite a senha: ")
   leia(senha)

   // Processamento com Operador Lógico "E"
   se (usuario = "admin") e (senha = "senai123") entao
      escreva("Acesso liberado ao portal de notas!")
   senao
      escreva("Erro: Credenciais inválidas")
   fimse
   
fimalgoritmo