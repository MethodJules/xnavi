(function($) {

    /**
     * Adds library to the global d3 object.
     *
     * @param select
     * @param settings
     *   Array of values passed to d3_draw.
     *   id: required. This will be needed to attach your
     *       visualization to the DOM.
     */
    Drupal.d3.network_aachen = function (select, settings) {
        var relationsart = 1;
        var aspekte = 1;
        var demografischerAspekt = 1;
        var zielgruppe = 1;
        var netz1, netz2,netz3,netz4;
        var w = 816;
        var h = 612;
        var linkDistance = 200;
        var farben1 = ["","#FF0000","#00FF00","#0000FF","#FFFF00","#00FFFF","#FF00FF","#FFFFFF"]
        var farben2 = function(farbcode) {
            switch (farbcode) {
                case 0: return "#ff0000";
                case 1: return "#00ff00";
                case 9: return "#FFFFFF";
            }
        }

        var div = (settings.id) ? settings.id : 'visualization';
        console.log("Created div");
        var dataset = {"nodes":[
            {"name":"4C4Learn","id":1,"x":0.1937,"y":0.9338,"fg":4,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":1,"zg7":0,"zg3":0,"zg4":0},{"name":"ABEKO","id":2,"x":0.39,"y":0.698,"fg":4,"ak1":1,"ak2":0,"ak3":0,"ak4":1,"ak5":0,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"AKiP","id":3,"x":0.0699,"y":0.4948,"fg":2,"ak1":9,"ak2":9,"ak3":9,"ak4":9,"ak5":9,"zg1":9,"zg2":9,"zg7":9,"zg3":9,"zg4":9},
                {"name":"ALFA_AGRAR","id":4,"x":0.0773,"y":0.2457,"fg":2,"ak1":0,"ak2":0,"ak3":0,"ak4":1,"ak5":1,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"AlFaClu","id":5,"x":0.1275,"y":0.7686,"fg":4,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"ArKoH","id":6,"x":0.5331,"y":0.8944,"fg":4,"ak1":0,"ak2":0,"ak3":0,"ak4":0,"ak5":1,"zg1":1,"zg2":1,"zg7":0,"zg3":0,"zg4":0},{"name":"BePeSo","id":7,"x":0.3108,"y":0.5123,"fg":2,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":1,"zg1":0,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"Brofessio","id":8,"x":0.7169,"y":0.3417,"fg":6,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"ChampNet","id":9,"x":0.8177,"y":0.757,"fg":6,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"EngAGE","id":10,"x":0.7344,"y":0.5874,"fg":1,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":0,"zg2":1,"zg7":1,"zg3":1,"zg4":0},{"name":"EPO-KAD","id":11,"x":0.9301,"y":0.4883,"fg":3,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":1,"zg7":0,"zg3":0,"zg4":0},{"name":"Facharzt_plus","id":12,"x":0.6889,"y":0.8387,"fg":3,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":0,"zg2":1,"zg7":0,"zg3":0,"zg4":0},{"name":"FLIP","id":13,"x":0.8525,"y":0.6373,"fg":3,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":0,"zg2":1,"zg7":0,"zg3":0,"zg4":0},{"name":"Handel_Kompetent","id":14,"x":0.5031,"y":0.4478,"fg":6,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":0,"zg2":1,"zg7":0,"zg3":0,"zg4":0},{"name":"iLInno","id":15,"x":0.4268,"y":0.0631,"fg":7,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"In-K-Ha","id":16,"x":0.3996,"y":0.4705,"fg":2,"ak1":1,"ak2":0,"ak3":0,"ak4":1,"ak5":0,"zg1":1,"zg2":1,"zg7":0,"zg3":0,"zg4":0},{"name":"KM³","id":17,"x":0.3358,"y":0.8633,"fg":4,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":1,"zg7":0,"zg3":0,"zg4":1},{"name":"LerndA","id":18,"x":0.8116,"y":0.4364,"fg":1,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"PIKOMA","id":19,"x":0.2103,"y":0.1086,"fg":5,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":1,"zg1":1,"zg2":0,"zg7":1,"zg3":0,"zg4":0},{"name":"PLUG+LEARN","id":20,"x":0.1606,"y":0.4157,"fg":5,"ak1":1,"ak2":1,"ak3":1,"ak4":1,"ak5":1,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"PM-Kompare","id":21,"x":0.4975,"y":0.3054,"fg":1,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"PROKOM_4.0","id":22,"x":0.4855,"y":0.5698,"fg":5,"ak1":0,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":1,"zg7":0,"zg3":0,"zg4":0},{"name":"RAKOON","id":23,"x":0.817,"y":0.1424,"fg":5,"ak1":1,"ak2":1,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":1,"zg7":1,"zg3":0,"zg4":0},{"name":"ReBeKo","id":24,"x":0.2577,"y":0.3662,"fg":3,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":1,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"ReFo","id":25,"x":0.6434,"y":0.0627,"fg":7,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":0,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"Resilire","id":26,"x":0.6635,"y":0.2668,"fg":1,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":1,"zg2":1,"zg7":1,"zg3":0,"zg4":0},{"name":"staySMART","id":27,"x":0.6316,"y":0.5979,"fg":6,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":0,"zg2":1,"zg7":0,"zg3":1,"zg4":1},{"name":"StraKosphere","id":28,"x":0.5074,"y":0.1433,"fg":7,"ak1":1,"ak2":0,"ak3":0,"ak4":1,"ak5":0,"zg1":1,"zg2":0,"zg7":0,"zg3":0,"zg4":0},{"name":"TRANSDEMO","id":29,"x":0.3308,"y":0.1919,"fg":5,"ak1":1,"ak2":1,"ak3":0,"ak4":0,"ak5":1,"zg1":1,"zg2":1,"zg7":1,"zg3":1,"zg4":1},{"name":"Webutatio","id":30,"x":0.3585,"y":0.4157,"fg":2,"ak1":1,"ak2":0,"ak3":0,"ak4":0,"ak5":0,"zg1":0,"zg2":1,"zg7":0,"zg3":0,"zg4":0},{"name":"ZielKom","id":31,"x":0.2169,"y":0.6064,"fg":6,"ak1":9,"ak2":9,"ak3":9,"ak4":9,"ak5":9,"zg1":9,"zg2":9,"zg7":9,"zg3":9,"zg4":9}],
            "links":[
                {"source":0,"target":1},
                {"source":0,"target":4},
                {"source":0,"target":5},
                {"source":1,"target":4},
                {"source":1,"target":5},
                {"source":1,"target":8},
                {"source":1,"target":11},
                {"source":1,"target":16},
                {"source":1,"target":21},
                {"source":1,"target":27},
                {"source":3,"target":2},
                {"source":3,"target":6},
                {"source":3,"target":15},
                {"source":4,"target":1},
                {"source":4,"target":2},
                {"source":4,"target":16},
                {"source":4,"target":23},
                {"source":5,"target":4},
                {"source":5,"target":16},
                {"source":6,"target":2},
                {"source":6,"target":4},
                {"source":6,"target":8},
                {"source":6,"target":9},
                {"source":6,"target":14},
                {"source":6,"target":15},
                {"source":6,"target":16},
                {"source":6,"target":18},
                {"source":6,"target":21},
                {"source":6,"target":23},
                {"source":6,"target":25},
                {"source":6,"target":28},
                {"source":6,"target":29},
                {"source":7,"target":21},
                {"source":7,"target":30},
                {"source":9,"target":1},
                {"source":9,"target":7},
                {"source":9,"target":12},
                {"source":9,"target":16},
                {"source":9,"target":17},
                {"source":9,"target":21},
                {"source":9,"target":22},
                {"source":9,"target":25},
                {"source":10,"target":11},
                {"source":10,"target":12},
                {"source":10,"target":21},
                {"source":11,"target":6},
                {"source":11,"target":8},
                {"source":11,"target":9},
                {"source":11,"target":10},{"source":11,"target":12},{"source":11,"target":17},
                {"source":11,"target":21},{"source":12,"target":5},{"source":12,"target":11},
                {"source":13,"target":1},{"source":13,"target":2},{"source":13,"target":3},
                {"source":13,"target":5},{"source":13,"target":6},{"source":13,"target":7},
                {"source":13,"target":8},{"source":13,"target":9},{"source":13,"target":10},
                {"source":13,"target":12},{"source":13,"target":14},{"source":13,"target":15},
                {"source":13,"target":17},{"source":13,"target":18},{"source":13,"target":20},
                {"source":13,"target":22},{"source":13,"target":23},{"source":13,"target":25},
                {"source":13,"target":27},{"source":15,"target":1},{"source":15,"target":2},
                {"source":15,"target":3},{"source":15,"target":5},{"source":15,"target":7},
                {"source":15,"target":8},{"source":15,"target":9},{"source":15,"target":12},
                {"source":15,"target":14},{"source":15,"target":16},{"source":15,"target":17},
                {"source":15,"target":18},{"source":15,"target":19},{"source":15,"target":25},{"source":15,"target":26},{"source":15,"target":27},{"source":15,"target":28},{"source":15,"target":29},{"source":16,"target":1},{"source":16,"target":4},{"source":16,"target":5},{"source":16,"target":11},{"source":17,"target":9},{"source":17,"target":22},{"source":17,"target":25},{"source":19,"target":18},{"source":20,"target":1},{"source":20,"target":3},{"source":20,"target":7},{"source":20,"target":9},{"source":20,"target":10},{"source":20,"target":12},{"source":20,"target":13},{"source":20,"target":14},{"source":20,"target":15},{"source":20,"target":17},{"source":20,"target":19},{"source":20,"target":21},{"source":20,"target":22},{"source":20,"target":23},{"source":20,"target":24},{"source":20,"target":25},{"source":20,"target":26},{"source":20,"target":27},{"source":20,"target":30},{"source":21,"target":1},{"source":21,"target":4},{"source":21,"target":5},{"source":21,"target":10},{"source":21,"target":13},{"source":21,"target":15},{"source":21,"target":16},{"source":21,"target":19},{"source":21,"target":30},{"source":23,"target":3},{"source":23,"target":4},{"source":23,"target":6},{"source":23,"target":17},{"source":23,"target":21},{"source":23,"target":27},{"source":23,"target":30},{"source":24,"target":14},{"source":24,"target":27},{"source":25,"target":2},{"source":25,"target":9},{"source":25,"target":10},{"source":25,"target":15},{"source":25,"target":26},{"source":26,"target":1},{"source":26,"target":5},{"source":26,"target":6},{"source":26,"target":7},{"source":26,"target":8},{"source":26,"target":12},{"source":26,"target":13},{"source":26,"target":17},{"source":26,"target":30},
                {"source":28,"target":3},{"source":28,"target":18},{"source":28,"target":19},{"source":28,"target":21},{"source":28,"target":22},{"source":29,"target":15}]};

        var colors = d3.scale.category10();


        var svg = d3.select('#' + div).append("svg").attr({"width":w,"height":h})
            .call(d3.behavior.zoom().on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
            }))
            .append("g");

        var force = d3.layout.force()
            .nodes(dataset.nodes)
            .links(dataset.edges)
            .size([w,h])
            .linkDistance([linkDistance])
            .charge([-500])
            .theta(0.1)
            .gravity(0.05)
            .start();



        var edges = svg.selectAll("line")
            .data(dataset.edges)
            .enter()
            .append("line")
            .attr("id",function(d,i) {return 'edge'+i})
            .attr('marker-end','url(#arrowhead)')
            .style("stroke","#ccc")
            .style("pointer-events", "none");

        var nodes = svg.selectAll("circle")
            .data(dataset.nodes)
            .enter()
            .append("circle")
            .attr({"r":15})
            .style("fill",function(d,i){return colors(i);})
            //.style("fill", "green")
            .call(force.drag)
            .on('dblclick', connectedNodes)
            .on('mouseover', handleMouseOver);

        var nodelabels = svg.selectAll(".nodelabel")
            .data(dataset.nodes)
            .enter()
            .append("text")
            .attr({"x":function(d){return d.x;},
                "y":function(d){return d.y;},
                "class":"nodelabel",
                'font-size':12,
                "stroke":"black"})
            .text(function(d){return d.name;});

        var edgepaths = svg.selectAll(".edgepath")
            .data(dataset.edges)
            .enter()
            .append('path')
            .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
                'class':'edgepath',
                'fill-opacity':0,
                'stroke-opacity':0,
                'fill':'blue',
                'stroke':'red',
                'id':function(d,i) {return 'edgepath'+i}})
            .style("pointer-events", "none");

        var edgelabels = svg.selectAll(".edgelabel")
            .data(dataset.edges)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attr({'class':'edgelabel',
                'id':function(d,i){return 'edgelabel'+i},
                'dx':80,
                'dy':0,
                'font-size':10,
                'fill':'#aaa'});

        //edgelabels.append('textPath')
        //    .attr('xlink:href',function(d,i) {return '#edgepath'+i})
        //    .style("pointer-events", "none")
        //    .text(function(d,i){return praedikate[i]});

        svg.append('defs').append('marker')
            .attr({'id':'arrowhead',
                'viewBox':'-0 -5 10 10',
                'refX':25,
                'refY':0,
                //'markerUnits':'strokeWidth',
                'orient':'auto',
                'markerWidth':10,
                'markerHeight':10,
                'xoverflow':'visible'})
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#ccc')
            .attr('stroke','#ccc');


        force.on("tick", function(){

            edges.attr({"x1": function(d){return d.source.x;},
                "y1": function(d){return d.source.y;},
                "x2": function(d){return d.target.x;},
                "y2": function(d){return d.target.y;}
            });

            nodes.attr({"cx":function(d){return d.x;},
                "cy":function(d){return d.y;}
            });

            nodelabels.attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; });

            edgepaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
                //console.log(d)
                return path});

            edgelabels.attr('transform',function(d,i){
                if (d.target.x<d.source.x){
                    bbox = this.getBBox();
                    rx = bbox.x+bbox.width/2;
                    ry = bbox.y+bbox.height/2;
                    return 'rotate(180 '+rx+' '+ry+')';
                }
                else {
                    return 'rotate(0)';
                }
            });

            //nodes.each(collide(0.5));
        });
        //------------------------------------------------------------
        //Toggle stores whether the highlighting is on
        var toggle = 0;
        //Create an array logging what is connected to what
        var linkedByIndex = {};
        for (i = 0; i < dataset.nodes.length; i++) {
            linkedByIndex[i + "," + i] = 1;
        };
        dataset.edges.forEach(function (d) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });
        //This function looks up whether a pair are neighbours
        function neighboring(a, b) {
            return linkedByIndex[a.index + "," + b.index];
        }
        function connectedNodes() {
            if (toggle == 0) {
                //Reduce the opacity of all but the neighbouring nodes
                d = d3.select(this).node().__data__;
                nodes.style("opacity", function (o) {
                    return neighboring(d, o) | neighboring(o, d) ? 1 : 0.05;
                });
                edges.style("opacity", function (o) {
                    return d.index == o.source.index | d.index == o.target.index ? 1 : 0.1;
                });
                //Reduce the op
                toggle = 1;
            } else {
                //Put them back to opacity=1
                nodes.style("opacity", 1);
                edges.style("opacity", 1);
                toggle = 0;
            }
        }

        //MouseOver
        function handleMouseOver(d) {
            //alert("You over " + d.name);
        }

        //-------Collision Detection
        var padding = 1, // separation between circles
            radius=8;
        function collide(alpha) {
            var quadtree = d3.geom.quadtree(graph.nodes);
            return function(d) {
                var rb = 2*radius + padding,
                    nx1 = d.x - rb,
                    nx2 = d.x + rb,
                    ny1 = d.y - rb,
                    ny2 = d.y + rb;
                quadtree.visit(function(quad, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== d)) {
                        var x = d.x - quad.point.x,
                            y = d.y - quad.point.y,
                            l = Math.sqrt(x * x + y * y);
                        if (l < rb) {
                            l = (l - rb) / l * alpha;
                            d.x -= x *= l;
                            d.y -= y *= l;
                            quad.point.x += x;
                            quad.point.y += y;
                        }
                    }
                    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                });
            };
        }



    }





})(jQuery);
