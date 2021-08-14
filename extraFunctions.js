function calculateSumTotal(source_group){
    let infos = source_group.all()
    let sum = 0;
    infos.forEach(i => {
      sum += i.value;
    })
    return sum
  }
  function transformPercentagem(source_group){
    let infos = source_group.all();
    let sumTotal = calculateSumTotal(source_group)
    infos.forEach(i => {
      i.value = (i.value/sumTotal)*100;
    })
  }

  function describeNoRepetions(source_group) {
      let sorted = source_group.top(Infinity)
      return sorted.map(d => d.key)
  }

  function accumulate_group(source_group) {
      let infos = source_group.all()
      let cumulate = 0
      infos.forEach(mont => {
          cumulate += mont.value;
          mont.value = cumulate
      })
  }

  function addNullValues(source_group) {
      let infos = source_group.all()
      let parseDate = d3.timeParse("%Y-%m-%d")
      let addInfos = [{"key": [parseDate("2021-02-02"), "05-09"], "value": 0}, {"key": [parseDate("2021-02-03"), "00-04"], "value": 0},
                      {"key": [parseDate("2021-02-03"), "05-09"], "value": 0}, {"key": [parseDate("2021-02-04"), "00-04"], "value": 0},
                      {"key": [parseDate("2021-02-04"), "10-14"], "value": 0}, {"key": [parseDate("2021-02-05"), "00-04"], "value": 0},
                      {"key": [parseDate("2021-02-05"), "05-09"], "value": 0}, {"key": [parseDate("2021-02-06"), "00-04"], "value": 0},
                      {"key": [parseDate("2021-02-06"), "05-09"], "value": 0}, {"key": [parseDate("2021-02-07"), "00-04"], "value": 0},
                      {"key": [parseDate("2021-02-07"), "05-09"], "value": 0}, {"key": [parseDate("2021-02-07"), "10-14"], "value": 0},
                      {"key": [parseDate("2021-02-08"), "00-04"], "value": 0}, {"key": [parseDate("2021-02-08"), "05-09"], "value": 0},
                      {"key": [parseDate("2021-02-08"), "10-14"], "value": 0}, {"key": [parseDate("2021-02-09"), "00-04"], "value": 0},
                      {"key": [parseDate("2021-02-09"), "10-14"], "value": 0}, {"key": [parseDate("2021-02-10"), "00-04"], "value": 0},
                      {"key": [parseDate("2021-02-10"), "05-09"], "value": 0}, {"key": [parseDate("2021-02-10"), "10-14"], "value": 0},
                      {"key": [parseDate("2021-02-11"), "00-04"], "value": 0}, {"key": [parseDate("2021-02-11"), "05-09"], "value": 0},
                      {"key": [parseDate("2021-02-11"), "10-14"], "value": 0}, {"key": [parseDate("2021-02-12"), "00-04"], "value": 0},
                      {"key": [parseDate("2021-02-12"), "05-09"], "value": 0}, {"key": [parseDate("2021-02-12"), "10-14"], "value": 0},
                      {"key": [parseDate("2021-02-20"), "00-04"], "value": 0}, {"key": [parseDate("2021-02-20"), "05-09"], "value": 0},
                      {"key": [parseDate("2021-02-20"), "10-14"], "value": 0}, {"key": [parseDate("2021-02-20"), "15-19"], "value": 0},
                      {"key": [parseDate("2021-02-20"), "20-24"], "value": 0}, {"key": [parseDate("2021-02-20"), "25-29"], "value": 0},
                      {"key": [parseDate("2021-02-20"), "30-34"], "value": 0},{"key": [parseDate("2021-02-20"), "34-39"], "value": 0},
                      {"key": [parseDate("2021-02-20"), "40-44"], "value": 0}, {"key": [parseDate("2021-02-20"), "45-49"], "value": 0},
                      {"key": [parseDate("2021-02-20"), "50-54"], "value": 0}, {"key": [parseDate("2021-02-20"), "60-64"], "value": 0},
                      {"key": [parseDate("2021-02-20"), "70-74"], "value": 0},
                      {"key": [parseDate("2021-02-20"), "75-79"], "value": 0}, {"key": [parseDate("2021-02-20"), "80+"], "value": 0},
                      {"key": [parseDate("2021-02-20"), "N Info"], "value": 0}]
      addInfos.forEach(i => {
          infos.push(i)
      })
  }

  function modifyClassToNumber(source_group) {
      let infos = source_group.all()
      let i = 0;
      infos.forEach(a => {
          a.key = i;
          i++;
      })
  }

  function normalizePop(object_state){
    listPop = [894470,3351543,4207714,861773,
    14930634,9187103,3055149,4064052,7113540,7114598,21292666,2809394,3526220,8690745,4039277,9616621,
    3281480,11516840,17366189,3534165,1796460,631181,11422973,7252502,2318822,46289333,1590248]
    listJaneiro = [9076,29898,40241,8383,94227,53077,27647,45990,70521,59890,114556,29417,
    41655,51805,57475,84781,26579,91714,100913,50627,15237,6862,120301,40630,16280,34347,9416,]
    if (object_state.key == "AC"){
      return (object_state.value)/listPop[0];
    }
    else if(object_state.key == "AL"){
      return (object_state.value)/listPop[1];
    }
    else if(object_state.key == "AM"){
      return (object_state.value)/listPop[2];
    }
    else if(object_state.key == "AP"){
      return (object_state.value)/listPop[3];
    }
    else if(object_state.key == "BA"){
      return (object_state.value)/listPop[4];
    }
    else if(object_state.key == "CE"){
      return (object_state.value)/listPop[5];
    }
    else if(object_state.key == "DF"){
      return (object_state.value)/listPop[6];
    }
    else if(object_state.key == "ES"){
      return (object_state.value)/listPop[7];
    }
    else if(object_state.key == "GO"){
      return (object_state.value)/listPop[8];
    }
    else if(object_state.key == "MA"){
      return (object_state.value)/listPop[9];
    }
    else if(object_state.key == "MG"){
      return (object_state.value)/listPop[10];
    }
    else if(object_state.key == "MS"){
      return (object_state.value)/listPop[11];
    }
    else if(object_state.key == "MT"){
      return (object_state.value)/listPop[12];
    }
    else if(object_state.key == "PA"){
      return (object_state.value)/listPop[13];
    }
    else if(object_state.key == "PB"){
      return (object_state.value)/listPop[14];
    }
    else if(object_state.key == "PE"){
      return (object_state.value)/listPop[15];
    }
    else if(object_state.key == "PI"){
      return (object_state.value)/listPop[16];
    }
    else if(object_state.key == "PR"){
      return (object_state.value)/listPop[17];
    }
    else if(object_state.key == "RJ"){
      return (object_state.value)/listPop[18];
    }
    else if(object_state.key == "RN"){
      return (object_state.value)/listPop[19];
    }
    else if(object_state.key == "RO"){
      return (object_state.value)/listPop[20];
    }
    else if(object_state.key == "RR"){
      return (object_state.value)/listPop[21];
    }
    else if(object_state.key == "RS"){
      return (object_state.value)/listPop[22];
    }
    else if(object_state.key == "SC"){
      return (object_state.value)/listPop[23];
    }
    else if(object_state.key == "SE"){
      return (object_state.value)/listPop[24];
    }
    else if(object_state.key == "SP"){
      return (object_state.value)/listPop[25];
    }
    else if(object_state.key == "TO"){
      return (object_state.value)/listPop[26];
    }
    else
      return 0
  }  
  
  function JoinJanuary(object_state){
    listPop = [894470,3351543,4207714,861773,
    14930634,9187103,3055149,4064052,7113540,7114598,21292666,2809394,3526220,8690745,4039277,9616621,
    3281480,11516840,17366189,3534165,1796460,631181,11422973,7252502,2318822,46289333,1590248]
    listJaneiro = [9076,29898,40241,8383,94227,53077,27647,45990,70521,59890,114556,29417,
    41655,51805,57475,84781,26579,91714,100913,50627,15237,6862,120301,40630,16280,34347,9416,]
    // listCity = ['AC','AL',
    //             'AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB',
    //             'PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']
    if (object_state.key == "AC"){
      return (object_state.value) + (listJaneiro[0]/listPop[0])*100;
    }
    else if(object_state.key == "AL"){
      return (object_state.value) + (listJaneiro[1]/listPop[1])*100;
    }
    else if(object_state.key == "AM"){
      return (object_state.value) + (listJaneiro[2]/listPop[2])*100;
    }
    else if(object_state.key == "AP"){
      return (object_state.value) + (listJaneiro[3]/listPop[3])*100;
    }
    else if(object_state.key == "BA"){
      return (object_state.value) + (listJaneiro[4]/listPop[4])*100;
    }
    else if(object_state.key == "CE"){
      return (object_state.value) + (listJaneiro[5]/listPop[5])*100;
    }
    else if(object_state.key == "DF"){
      return (object_state.value) + (listJaneiro[6]/listPop[6])*100;
    }
    else if(object_state.key == "ES"){
      return (object_state.value) + (listJaneiro[7]/listPop[7])*100;
    }
    else if(object_state.key == "GO"){
      return (object_state.value) + (listJaneiro[8]/listPop[8]*100);
    }
    else if(object_state.key == "MA"){
      return (object_state.value) + (listJaneiro[9]/listPop[9]*100);
    }
    else if(object_state.key == "MG"){
      return (object_state.value) + (listJaneiro[10]/listPop[10]*100);
    }
    else if(object_state.key == "MS"){
      return (object_state.value) + (listJaneiro[11]/listPop[11]*100);
    }
    else if(object_state.key == "MT"){
      return (object_state.value) + (listJaneiro[12]/listPop[12]*100);
    }
    else if(object_state.key == "PA"){
      return (object_state.value) + (listJaneiro[13]/listPop[13]*100);
    }
    else if(object_state.key == "PB"){
      return (object_state.value) + (listJaneiro[14]/listPop[14]*100);
    }
    else if(object_state.key == "PE"){
      return (object_state.value) + (listJaneiro[15]/listPop[15]*100);
    }
    else if(object_state.key == "PI"){
      return (object_state.value) + (listJaneiro[16]/listPop[16]*100);
    }
    else if(object_state.key == "PR"){
      return (object_state.value) + (listJaneiro[17]/listPop[17]*100);
    }
    else if(object_state.key == "RJ"){
      return (object_state.value) + (listJaneiro[18]/listPop[18]*100);
    }
    else if(object_state.key == "RN"){
      return (object_state.value) + (listJaneiro[19]/listPop[19]*100);
    }
    else if(object_state.key == "RO"){
      return (object_state.value) + (listJaneiro[20]/listPop[20]*100);
    }
    else if(object_state.key == "RR"){
      return (object_state.value) + (listJaneiro[21]/listPop[21]*100);
    }
    else if(object_state.key == "RS"){
      return (object_state.value) + (listJaneiro[22]/listPop[22]*100);
    }
    else if(object_state.key == "SC"){
      return (object_state.value) + (listJaneiro[23]/listPop[23]*100);
    }
    else if(object_state.key == "SE"){
      return (object_state.value) + (listJaneiro[24]/listPop[24]*100);
    }
    else if(object_state.key == "SP"){
      return (object_state.value) + (listJaneiro[25]/listPop[25]*100);
    }
    else if(object_state.key == "TO"){
      return (object_state.value) + (listJaneiro[26]/listPop[26]*100);
    }
    else
      return (object_state.value+listJaneiro[27])
  } 