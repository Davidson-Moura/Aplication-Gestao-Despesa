class Gasto{
    constructor(valor,mes,tipo,descricao){
        this.valor = valor
        this.mes = mes
        this.tipo = tipo
        this.descricao = descricao
        this.indice = 0
    }
}

var salva = function (gast,obj){
    if(obj.valorSeguinte==null){
        obj.valorSeguinte=1
    }
    gast.indice =  obj.valorSeguinte
    localStorage.setItem(obj.valorSeguinte,JSON.stringify(gast))
    obj.valorSeguinte++
    localStorage.setItem('id',obj.valorSeguinte)
}


class Bd{
    constructor(){
        if(localStorage.getItem('id')===undefined){
            console.log("entrou")
            localStorage.setItem('id',1)
            this.valorSeguinte = 1
        }else{
            this.valorSeguinte = localStorage.getItem('id')
        }
        
    }
    
    recupera(){
        
        let valor = document.getElementById("valor").value        
        let mes = document.getElementById("mes").value        
        let tipo = document.getElementById("tipo").value
        let descricao = document.getElementById("descricao").value
        

        if(valor==="" || mes==="" || tipo==="" || descricao==="" || isNaN(valor)){
            $("#Erro").modal("show");
        }else{
            let gast = new Gasto(valor,mes,tipo,descricao)
            salva(gast,this)
            $("#Sucesso").modal("show");
        }
    }
    carrega(){
        let tab = document.getElementById('tabela')
        tab.innerHTML=""
        let despesas = Array()
        let id = localStorage.getItem('id')
        for(let i=1;i<id;i++){
            despesas.push(JSON.parse(localStorage.getItem(i)))
        }

        despesas.forEach(function(i){
            if(i!=null){
                let linha = tab.insertRow()
                linha.insertCell(0).innerHTML = i.valor
                linha.insertCell(1).innerHTML = i.mes
                linha.insertCell(2).innerHTML = i.tipo
                linha.insertCell(3).innerHTML = i.descricao
                linha.insertCell(4).innerHTML = `<button class="btn"  onclick="Deleta(${i.indice})">X</button>`
            }
        })
            

    }
    
}

var bd = new Bd()

function enviar(){
    bd.recupera()
}

function Carrega(){
    bd.carrega()
}

function Deleta(i){
    localStorage.removeItem(i)

    bd.carrega()
}
