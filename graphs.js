const width = 700;
        const height = 500;
        var format = d3.format(".2f");

        let promises = [
            d3.csv("FevereiroMin.csv"),
        ]

        Promise.all(promises).then(ready);

        function ready([primeiroMes]){            
            var data = [].concat(primeiroMes)
            clearDataset(data)
            var facts = crossfilter(data);

            //###################################     BAR     #############################################
            let barChart = dc.barChart("#cor-chart");
            corDim = facts.dimension(data => data.paciente_racaCor_valor);
            corGroup = corDim.group();
            racaCor = describeNoRepetions(corGroup)
            scaleTypes = d3.scaleOrdinal().domain(racaCor);
            barChart.width(width)
            .height(height)
            .controlsUseVisibility(true)
            .margins({top: 10, right: 20, bottom: 20, left: 50})
            .dimension(corDim)
            .group(corGroup, 'Por Cores')
            .elasticY(true)
            .x(scaleTypes)
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .gap(30)
            //###################################     BAR     #############################################
            
            //###################################  COMPOSITE  ##############################################
            let compositeChart = dc.compositeChart("#compositeChart");
            let dateDim = facts.dimension(data => data.vacina_dataAplicacao);
            let dateGroup = dateDim.group();
            let coronaVacGroup = dateDim.group().reduceSum(function(d) { return d.vacina_nome === "Covid-19-Coronavac-Sinovac/Butantan"});
            let coviShieldGroup = dateDim.group().reduceSum(function(d) { return d.vacina_nome === "Vacina Covid-19 - Covishield"});
            let parseDate = d3.timeParse("%Y-%m-%d")
            let xScale = d3.scaleTime()
                .domain([parseDate("2021-02-01"), parseDate("2021-02-25")])

            compositeChart.width(width)
              .height(height)
              .margins({top: 60, right: 50, bottom: 25, left: 80})
              .dimension(dateDim)
              .x(xScale)
              .xUnits(d3.timeWeeks)
              .legend(dc.legend().x(width-300).y(5).itemHeight(12).gap(5))
              .brushOn(true)  
              .compose([
                  dc.lineChart(compositeChart)
                    .group(coronaVacGroup, 'Covid-19-Coronavac-Sinovac/Butantan')
                    .ordinalColors(['#d8b365']),
                  dc.lineChart(compositeChart)
                    .group(coviShieldGroup, 'Vacina Covid-19 - Covishield')
                    .ordinalColors(['#5ab4ac']),
                ])
            //###################################  COMPOSITE  ##############################################

            //###################################   HEATMAP   #############################################
            let heatmapChart = new dc.HeatMap("#heatmap");
            let dimensionTypeVacina = facts.dimension(data => [data.vacina_dataAplicacao, data.faixa_etaria]);
            let groupRangeAge = dimensionTypeVacina.group();
            let dados = []
            groupRangeAge.all().forEach(element => {
                dados.push(element.value)
                
            });
            blues = ["#deebf7","#c6dbef", "#9ecae1", "#6baed6",
                "#4292c6",
                "#2171b5",
                "#08519c",
                "#08306b"]
            let heatColorMapping = d3.scaleQuantile()
            .domain(dados)
            .range(blues);
            addNullValues(groupRangeAge);
            heatmapChart
                .width(width)
                .height(height)
                .margins({top: 10, right: 10, bottom: 30, left: 30})
                .dimension(dimensionTypeVacina)
                .group(groupRangeAge)
                .xBorderRadius(0)
                .yBorderRadius(0)
                .keyAccessor(function(d) {return d.key[0]; })
                .valueAccessor(function(d) { return d.key[1]; })
                .colorAccessor(function(d) { return d.value; })
                .colsLabel(function(d) {return d.toString().substring(4,10)})
                .title(function(d) {
                    return "  Quantidade:" + d.value + "\n" +
                           "  Vacina: " + d.key[0] + "\n" +
                           "  Faixa Etaria: " +  d.key[1];})
                .colors(heatColorMapping);
            //###################################   HEATMAP   #############################################
            
            //###################################     PIE     #############################################
            var pie03 = new dc.PieChart("#pieFM");
            var pie03Dim = facts.dimension(function (d) {return d.paciente_enumSexoBiologico});
            var pie03Group = pie03Dim.group();  
            pie03
            .width(180)
            .height(150)
            .radius(70)
            .dimension(pie03Dim)
            .group(pie03Group)
            .legend(dc.legend())
            .on('pretransition', function(chart) {
              pie03.selectAll('text.pie-slice').text(function(d) {
                  return d.data.key + ': ' + d.value;
              })
            });
            //###################################     PIE     #############################################

            //###################################     MAP     #############################################
            var mapChart = new dc.GeoChoroplethChart("#map-chart");
            var estados = facts.dimension(function (d) {return d.estabelecimento_uf});
            var estadosGroup = estados.group()
            let dadosMap = []
            console.log(estadosGroup.all())

            estadosGroup.all().forEach(element => {
                console.log(format(normalizePop(element)*100))
                dadosMap.push(format(normalizePop(element)*100))
            })

            let listColor = ["#4292c6","#2171b5","#08519c","#08306b"]
            
            let mapColorMapping = d3.scaleQuantile()
                .domain(dadosMap)
                .range(listColor);

            var projection = d3.geoMercator()
                        .center([-55, -10])
                        .scale(750);

            let legendSVG = d3.select("#map-chart").append("div", "legend").text("Legenda");

            for(let a=0;a<listColor.length;a++){
              legendSVG.append("ul")
                  .append("li")
                  .style("color", listColor[a])
                  .style("font-size", "24px")
                  .append("span")
                  .text(format(mapColorMapping.invertExtent(listColor[a])[0]) + " - " + format(mapColorMapping.invertExtent(listColor[a])[1]))
                  .style("color", "#222")
                  .style("font-size", "12px");
            }
    
            d3.json("br-states.json").then(function (statesJson){
              var states = topojson.feature(statesJson, statesJson.objects.estados);
              mapChart.width(1000)
                .height(600)
                .dimension(estados)
                .group(estadosGroup)
                .overlayGeoJson(states.features, "nome", function (d) {
                  return d.id;
                })  
                .projection(projection)
                .valueAccessor(function (kv) {
                  return normalizePop(kv)*100;
                })
                .colors(mapColorMapping)
                .colorCalculator(function(d) {return d ? mapChart.colors()(d) : "#ccc"})
                .title(function (d) {
                        return "State: " + d.key +"\n Quantidade:"+format(d.value) + " %"+"\n Acumulado:"+ format(JoinJanuary(d)) + " %";
                    });


                dc.renderAll();
            })
            //###################################     MAP     #############################################

        }