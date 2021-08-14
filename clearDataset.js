function classifyAgeRange(age) {
    if (age <= 4) return "00-04"
    else if (age <= 9) return "05-09"
    else if (age <= 14) return "10-14"
    else if (age <= 19) return "15-19"
    else if (age <= 24) return "20-24"
    else if (age <= 29) return "25-29"
    else if (age <= 34) return "30-34"
    else if (age <= 39) return "34-39"
    else if (age <= 44) return "40-44"
    else if (age <= 49) return "45-49"
    else if (age <= 54) return "50-54"
    else if (age <= 59) return "55-59"
    else if (age <= 64) return "60-64"
    else if (age <= 59) return "65-69"
    else if (age <= 74) return "70-74"
    else if (age <= 79) return "75-79"
    else if (age == 80 || age >= 50000) return "80+"
    else return "N Info"
}
function classifyRegion(state) {
    if (state == 'AC' || state == 'RO' || state == 'AM' || state == 'RR' || state == 'RO' || state == 'PA' || state == 'AP' || state == 'TO')
        return "Norte"
    else if (state == 'MA' || state == 'PI' || state == 'CE' || state == 'RN' || state == 'PB' || state == 'PE' || state == 'AL' || state == 'SE' || state == 'BA')
        return "Nordeste"
    else if (state == 'GO' || state == 'MS' || state == 'MT')
        return "Centro-Oeste"
    else if (state == 'MG' || state == 'ES' || state == 'RJ' || state == 'SP')
        return "Suldeste"
    else if (state == 'PR' || state == 'SC' || state == 'RS')
        return "Sul"
    else if (state == 'DF')
        return "Distrito Federal"
    else
        return "Sem informacao"
}

function clearDataset(dataset)
{
    let parseDate = d3.timeParse("%Y-%m-%d")
    dataset.forEach(d => {
        d.vacina_dataAplicacao = parseDate(d.vacina_dataAplicacao.substr(0, 10));
        d.paciente_idade = parseInt(d.paciente_idade);
        d.region = classifyRegion(d.estabelecimento_uf)
        d.faixa_etaria = classifyAgeRange(d.paciente_idade);
        if(classifyRegion(d.estabelecimento_uf) == "Sem informacao"){
          d.estabelecimento_uf = "Sem informacao";
        }
    }) 
}