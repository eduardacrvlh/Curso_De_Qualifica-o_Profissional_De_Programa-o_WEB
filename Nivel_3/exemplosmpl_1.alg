algoritmo "Exemplo: Repita senha"

var

SenhaDigitada:caractere
tentativas:inteiro

inicio

tentativas <- 0

repita
    escreval("Digite a senha:")
    leia(SenhaDigitada)

    tentativas <- tentativas + 1

    se (SenhaDigitada <> "1234") entao
       escreval ("Senha incorreta. Digite novaente.")
    fimse

ate (SenhaDigitada = "1234")


fimalgoritmo