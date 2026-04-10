algoritmo "Controle de estoque"

var
item:caractere


inicio
    escreval("__________")
    escreval("INVENTÁRIO")
    escreval("__________")
    escreval("Insira o nome do primeiro item:")
    leia(item)
    escreval("Primeiro item registrado com sucesso!")
    escreval("Insira o nome do segundo item:")
    leia(item)
    escreva("Item 1 descartado e item 2 registrado->"+item)
    item <- "vazio"
fimalgoritmo