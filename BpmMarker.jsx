function bpmmarker() {
    var bpmw = new Window('dialog{ text : "BPM Marker" , preferredSize : [400,100] , orientation : "column", properties : {resizeable : false} ,\
    gr    : Group{ orientation : "row" , alignment : ["fill","fill"]\
    title : StaticText{text : "BPM"},\
    bpm   : EditText{text : "183", characters:5},\
    beat1 : EditText{text : "4", characters:2},\
    beat0 : StaticText{text : "/"},\
    beat2 : EditText{text : "4", characters:2},\
    type1 : DropDownList{ properties : { items : ["New Null Object","Composition"] }},\
    btn   : Button{ text : "Apply"},\
    }\
    }');

    bpmw.gr.btn.onClick = function(){
        var selectComp = app.project.selection;
        if((selectComp.length == 1) && (selectComp[0].typeName == "コンポジション"||selectComp[0].typeName == "Composition")){ // matchNameはあるのか？
            var beat = bpmw.gr.beat1.text;
            var spb = 60/bpmw.gr.bpm.text; // second per beat
            var array = [];
            for(var i=1;i<=beat;i++){array.push(new MarkerValue(i));}
            var MkTime  = 0;
            switch(String(bpmw.gr.type1.selection)){
                case "Composition":
                    while(selectComp[0].duration>MkTime){
                        for(var i=0;i<beat;i++){
                            if(selectComp[0].duration<MkTime){break;}
                            selectComp[0].markerProperty.setValueAtTime(MkTime, array[i]);
                            MkTime += spb;
                        }
                    }
                    break;
                case "New Null Object":
                    var Bpmnull = selectComp[0].layers.addNull();
                    while(selectComp[0].duration>MkTime){
                        for(var i=0;i<beat;i++){
                            if(selectComp[0].duration<MkTime){break;}
                            Bpmnull.property("ADBE Marker").setValueAtTime(MkTime, array[i]);
                            MkTime += spb;
                        }
                    }
                    break;
                case "Selected Layer":
                    //todo
                    break;
            }
        }else{
            alert("Select Composition");
        }

    }
    bpmw.show();
}

bpmmarker();