algoritmo "Controle de Acesso"

var
   usuario: caractere
   senha: caractere
   tentativas : inteiro
   sucesso : logico

inicio
   // Inicialização de variáveis
   tentativas <- 3
   sucesso <- falso
   
   // Laço que roda enquanto houver tentativas e o login não for correto
   enquanto (tentativas > 0) e (nao sucesso) faca
      escreval("--- LOGIN DO SISTEMA ---")
      escreva("Digite o usuário: ")
      leia(usuario)
      escreva("Digite a senha: ")
      leia(senha)
      
      // Verificação das credenciais
      se (usuario = "admin") e (senha = "1234") entao
         sucesso <- verdadeiro
         escreval("Login efetuado com sucesso!")
      senao
         tentativas <- tentativas - 1
         
         se (tentativas > 0) entao
            escreval("Usuário ou senha incorretos!")
            escreval("Você ainda tem ", tentativas, " tentativa(s) restante(s).")
            escreval("")
         senao
            escreval("Acesso bloqueado! Você excedeu o limite de tentativas.")
         fimse
      fimse
   fimenquanto

fimalgoritmo
