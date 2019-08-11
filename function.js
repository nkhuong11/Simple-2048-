var which=0;
var pending=[];
var available=0;
var n;
var z=100;
var move_divs=[];
var move_data=[];
var merge_divs=[];
var merge_data=[];
var extreme_data=[];
var check_3=0;
var ini_x;
var ini_y;
var pend_check=0;
function pend(){
  available=1;
  if(pending.length==0){
    available=0;
  }
  else{

    console.log(pending[0]);
    if(pending[0]==1){
      pend_check=1;
      moveTop();
    }
    else if(pending[0]==2){
      pend_check=1;
      moveBot();
    }
    else if(pending[0]==3){
      pend_check=1;
      moveRight();
    }
    else if(pending[0]==4){
      pend_check=1;
      moveLeft();
    }
  }
}
function new_game(){
  var z=100;
  move_divs=[];
  move_data=[];

  merge_divs=[];
  merge_data=[];
  extreme_data=[];

  extreme_pos=[];
  check_3=0;
  if(isNaN(parseInt(document.getElementById("side").value))){
    alert("Enter a valid number.");
    return 0;
  }
  n=parseInt(document.getElementById("side").value);
  if(n==1){
    alert("You know that it wouldn't work, but you still want to try it?");
  }

  if(n<=0){
    alert("I hope that you are doing fine...");
  }
  var tiles_top=0;
  var tiles_left=0;
  document.getElementById('con').innerHTML="";
  for (var i = 0; i <n; i++) {
    for (var j = 0; j <n; j++) {
      document.getElementById('con').innerHTML+="<span class='tiles' style='height: calc(100%/"+n+" - 10px);width: calc(100%/"+n+" - 10px);top:calc("+tiles_top+"*100%/"+n+" - 0px);left:calc("+tiles_left+"*100%/"+n+" - 0px);background-color:transparent;font-size: calc(100vmin/"+(n+8)+" - 10px);' tileValue='1'></span>";
      tiles_left++;
    }
    tiles_left=0;
    tiles_top++;
  }
  document.getElementById("main_score").innerHTML=0;
  newblock();
}

function score(x){
  document.getElementById("main_score").innerHTML=parseInt(document.getElementById("main_score").innerHTML)+x*2;
}
// I know that i could have integrated these four functions into one, but I was too lazy to do that.
function moveTop(){
  which=1;
  available=1;

  var check_2=0;
  for (var i =n+1; i<=n*n; i++) {
    var l=(i-1)%n;
    var t=(Math.ceil(i/n));
    var value=parseInt(document.getElementsByClassName("tiles")[i-1].getAttribute("tileValue"));
    if(value!=1){
      var count=1;
      var check=0;
      while((i - n*count)>0){
        if(parseInt(document.getElementsByClassName("tiles")[i - n*count-1].getAttribute("tileValue"))!=1){
          check=1;
          if(parseInt(document.getElementsByClassName("tiles")[i - n*count-1].getAttribute("tileValue"))==value){
            document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
            z++;
            check_2=1;
            document.getElementsByClassName("tiles")[i - n*(count)-1].setAttribute("tileValue",value*2);
            document.getElementsByClassName("tiles")[i - n*(count)-1].innerHTML=value*2;
            score(value);

            document.getElementsByClassName("tiles")[i - n*(count)-1].style.backgroundColor="rgb("+(50+(value*32)%155)+","+(50+(value*64)%155)+","+(50+(value*128)%155)+")";

            document.getElementsByClassName("tiles")[i - n*(count)-1].style.animationName="pulse";
            document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[i - n*(count)]);						
            var ggg=document.getElementsByClassName("tiles")[i - n*(count)];
            a_new = document.createElement("span");
            a_new.style="height: calc(100%/"+n+" - 10px);width: calc(100%/"+n+" - 10px);top:calc("+(t-1)+"*100%/"+n+" - 0px);left:calc("+l+"*100%/"+n+" - 0px);font-size: calc(100vmin/"+(n+8)+" - 10px);";
            a_new.className="tiles";
            a_new.setAttribute("tileValue",1);
            document.getElementById("con").insertBefore(a_new,document.getElementById("con").children[i]);
            ggg.style.zIndex=z;
            z++;
            document.getElementById("conn").appendChild(ggg);
            merge_divs.push(ggg);
            merge_data.push("calc("+(t-count-1)+"*100%/"+n+" - 0px)");
            break;
          }
          else{
            if(count==1){
              break;
            }
            else{
              check_2=1;
              document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
              z++;
              document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[i - n*(count-1)]);
              move_divs.push(document.getElementById("con").children[i - n*(count-1)]);
              move_data.push("calc("+(t-count)+"*100%/"+n+")");
              document.getElementById("con").insertBefore(	document.getElementsByClassName("tiles")[i - n*(count-1)-1],document.getElementById("con").children[i]);
              document.getElementById("con").children[i-1].style.top="calc("+(t-1)+"*100%/"+n+")";
              break;
            }
          }
        }
        count++;
      }	
      if(check==0){

        if(count!=1){
          check_2=1;
          document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
          z++;
          document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[l]);
          document.getElementsByClassName("tiles")[l+1].style.top="calc("+(t-1)+"*100%/"+n+" - 0px)";
          document.getElementsByClassName("tiles")[l+1].style.left="calc("+l+"*100%/"+n+" - 0px)";
          document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[l+1],document.getElementById("con").children[i]);
          extreme_data.push(document.getElementsByClassName("tiles")[l]);
          extreme_pos.push(0);
        }	
      }
    }
  }
                  setTimeout(function(){
                  if(which==1){
                  for(var cg=0;cg<merge_divs.length;cg++){								
                  merge_divs[cg].style.top=merge_data[cg];
                  }
                merge_divs=[];
                merge_data=[];
      
                  for(var g=0;g<move_divs.length;g++){								
                    move_divs[g].style.top=move_data[g];
                  }
                  move_divs=[];
                  move_data=[];
    
            for(var cg=0;cg<extreme_data.length;cg++){		
              extreme_data[cg].style.top=extreme_pos[cg]+"px";
            }
            extreme_data=[];
            extreme_pos=[];
            }
          if(pend_check==1){
            pending=pending.splice(1);
            pend_check=0;
          }
          pend();
          },16);
        if(check_2==1){
      newblock();
    }
  setTimeout(function(){
    document.getElementById("conn").innerHTML="";

  },300);
}
function moveBot(){
  which=2;
  var check_2=0;
  available=1;
  for (var i =n*n -n+1; i>0; i--) {
    var l=(i-1)%n;
    var t=(Math.ceil(i/n));
    var value=parseInt(document.getElementsByClassName("tiles")[i-1].getAttribute("tileValue"));
    if(value!=1){
      document.getElementsByClassName("tiles")[i -1].style.animationName="";
      var count=1;
      var check=0;
      while((i + n*count)<=n*n){

        if(parseInt(document.getElementsByClassName("tiles")[i + n*count-1].getAttribute("tileValue"))!=1){
          check=1;

          if(parseInt(document.getElementsByClassName("tiles")[i + n*count-1].getAttribute("tileValue"))==value){
            document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
            z++;
            check_2=1;

            
            var ggg=document.getElementsByClassName("tiles")[i -1];
            document.getElementsByClassName("tiles")[i + n*(count)-1].setAttribute("tileValue",value*2);
            document.getElementsByClassName("tiles")[i + n*(count)-1].innerHTML=value*2;
            score(value);
                  document.getElementsByClassName("tiles")[i + n*(count)-1].style.backgroundColor="rgb("+(50+(value*32)%155)+","+(50+(value*64)%155)+","+(50+(value*128)%155)+")";
            document.getElementsByClassName("tiles")[i + n*(count)-1].style.animationName="pulse";

            document.getElementsByClassName("tiles")[i + n*(count)-1].style.animationName="";

    
            document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[i + n*(count)-1]);						
            a_new = document.createElement("span");
            a_new.style="height: calc(100%/"+n+" - 10px);width: calc(100%/"+n+" -10px);top:calc("+(t-1)+"*100%/"+n+" - 0px);left:calc("+l+"*100%/"+n+" - 0px);font-size: calc(100vmin/"+(n+8)+" - 10px);";
            a_new.className="tiles";
            a_new.setAttribute("tileValue",1);
            document.getElementById("con").insertBefore(a_new,document.getElementById("con").children[i-1]);
            ggg.style.zIndex=z;
            z++;
            document.getElementById("conn").appendChild(ggg);
            merge_divs.push(ggg);
            merge_data.push("calc("+(t+count-1)+"*100%/"+n+" - 0px)");
            break;
          }
          else{
            if(count==1){
              break;
            }
            else{

              check_2=1;
              document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
              z++;
              move_divs.push(document.getElementById("con").children[i-1]);
               move_data.push("calc("+(t+count-2)+"*100%/"+n+")");		
              document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[i + n*(count-1)-1]);

              document.getElementById("con").children[i + n*(count-1)-1].style.top="calc("+(t-1)+"*100%/"+n+")";

              document.getElementById("con").insertBefore(document.getElementById("con").children[i + n*(count-1)-1],document.getElementById("con").children[i-1]);									
              break;
            }
          }
        }
        count++;
      }	
      if(check==0){
        if(count!=1){
          check_2=1;
          document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
          z++;

          extreme_data.push(document.getElementsByClassName("tiles")[i-1]);
          extreme_pos.push("calc("+((n-1)/n)+"*100%)");

          document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[n*n-n+l]);
           document.getElementsByClassName("tiles")[n*n-n+l].style.top="calc("+(t-1)+"*100%/"+n+" - 0px)";
          document.getElementsByClassName("tiles")[n*n-n+l].style.left="calc("+l+"*100%/"+n+" - 0px)";
          document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[n*n-n+l],document.getElementById("con").children[i-1]);
        }	
      }
    }
  }
            setTimeout(function(){
              if(which==2){
                  for(var cg=0;cg<merge_divs.length;cg++){								
                  merge_divs[cg].style.top=merge_data[cg];
                  }
                merge_divs=[];
                merge_data=[];

                  for(var g=0;g<move_divs.length;g++){								
                    move_divs[g].style.top=move_data[g];
                  }
                  move_divs=[];
                  move_data=[];
      
            for(var cg=0;cg<extreme_data.length;cg++){		
              extreme_data[cg].style.top=extreme_pos[cg];
            }
            extreme_data=[];
            extreme_pos=[];
          }

                if(pend_check==1){
            pending=pending.splice(1);
            pend_check=0;
          }
  pend();
          },16);
          if(check_2==1){
      newblock();
    }		
  setTimeout(function(){
    document.getElementById("conn").innerHTML="";

  },300);
}

function moveRight(){
  available=1;
  which=3;
  loop=1;
  loop_count=1;
  var check_2=0;
  for (var i =n-1; i>=loop; i--) {
    var l=(i-1)%n;
    var t=(Math.ceil(i/n));

    var value=parseInt(document.getElementsByClassName("tiles")[i-1].getAttribute("tileValue"));
    if(value!=1){
      document.getElementsByClassName("tiles")[i -1].style.animationName="";
      var count=1;
      var check=0;
      while((l+count)<=(n-1)){

        if(parseInt(document.getElementsByClassName("tiles")[i + count-1].getAttribute("tileValue"))!=1){
          check=1;

          if(parseInt(document.getElementsByClassName("tiles")[i + count-1].getAttribute("tileValue"))==value){
            document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
            z++;
            check_2=1;

            
            var ggg=document.getElementsByClassName("tiles")[i -1];
            document.getElementsByClassName("tiles")[i +(count)-1].setAttribute("tileValue",value*2);
            score(value);
                  document.getElementsByClassName("tiles")[i + (count)-1].style.backgroundColor="rgb("+(50+(value*32)%155)+","+(50+(value*64)%155)+","+(50+(value*128)%155)+")";
            document.getElementsByClassName("tiles")[i + (count)-1].innerHTML=value*2;
            document.getElementsByClassName("tiles")[i + (count)-1].style.animationName="pulse";


    
            document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[i + (count)-1]);						
            a_new = document.createElement("span");
            a_new.style="height: calc(100%/"+n+" - 10px);width: calc(100%/"+n+" - 10px);top:calc("+(t-1)+"*100%/"+n+" - 0px);left:calc("+l+"*100%/"+n+" - 0px);font-size: calc(100vmin/"+(n+8)+" - 10px);";
            a_new.className="tiles";
            a_new.setAttribute("tileValue",1);
            document.getElementById("con").insertBefore(a_new,document.getElementById("con").children[i-1]);
            ggg.style.zIndex=z;
            z++;
            document.getElementById("conn").appendChild(ggg);
            merge_divs.push(ggg);
            merge_data.push("calc("+((i + (count)-1)%n)+"*100%/"+n+" - 0px)");
            break;
          }
          else{
            if(count==1){
              break;
            }
            else{

              check_2=1;
              document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
              z++;
              move_divs.push(document.getElementById("con").children[i-1]);
               move_data.push("calc("+(l+count-1)+"*100%/"+n+")");		
              document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[i + (count-1)-1]);

              document.getElementById("con").children[i + (count-1)-1].style.left="calc("+(l)+"*100%/"+n+")";

              document.getElementById("con").insertBefore(document.getElementById("con").children[i + (count-1)-1],document.getElementById("con").children[i-1]);									
              break;
            }
          }
        }
        count++;
      }	

      

      if(check==0){
        if(count!=1){
          check_2=1;
          document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
          z++;

          extreme_data.push(document.getElementsByClassName("tiles")[i-1]);

          document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[(t-1)*n+n-1]);
           document.getElementsByClassName("tiles")[(t-1)*n+n-1].style.top="calc("+(t-1)+"*100%/"+n+" - 0px)";
          document.getElementsByClassName("tiles")[(t-1)*n+n-1].style.left="calc("+(l)+"*100%/"+n+" - 0px)";
          document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[(t-1)*n+n-1],document.getElementById("con").children[i-1]);
        }	
      }
    }
    if(i==loop){
      loop_count++;
      i=n*loop_count;
      loop=n*loop_count-n+1;

      if(i>n*n){
        break;
      }
    }
  }
    setTimeout(function(){
      if(which==3){
                  for(var cg=0;cg<merge_divs.length;cg++){								
                  merge_divs[cg].style.left=merge_data[cg];
                  }
                merge_divs=[];
                merge_data=[];

                  for(var g=0;g<move_divs.length;g++){								
                    move_divs[g].style.left=move_data[g];
                  }
                  move_divs=[];
                  move_data=[];
            
            for(var cg=0;cg<extreme_data.length;cg++){		
              extreme_data[cg].style.left="calc("+((n-1)/n)+"*100%)";
            }
            extreme_data=[];
          }
          if(pend_check==1){
            pending=pending.splice(1);
            pend_check=0;
          }
  pend();
             },16);
              if(check_2==1){
      newblock();
    }
  setTimeout(function(){
    document.getElementById("conn").innerHTML="";

  },300);
}

function moveLeft(){
  available=1;
  which=4;
  loop=n;
  loop_count=1;
  var check_2=0;
  for (var i =2; i<=loop; i++) {
    if(i>n*n){
      break;
    }
    var l=(i-1)%n;
    var t=(Math.ceil(i/n));

    var value=parseInt(document.getElementsByClassName("tiles")[i-1].getAttribute("tileValue"));

    if(value!=1){
      document.getElementsByClassName("tiles")[i -1].style.animationName="";
      var count=1;
      var check=0;
      while((l-count)>=0){
        if(parseInt(document.getElementsByClassName("tiles")[i - count-1].getAttribute("tileValue"))!=1){
          check=1;

          if(parseInt(document.getElementsByClassName("tiles")[i - count-1].getAttribute("tileValue"))==value){

            document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
            z++;
            check_2=1;

            var ggg=document.getElementsByClassName("tiles")[i -1];
            document.getElementsByClassName("tiles")[i -(count)-1].setAttribute("tileValue",value*2);
            score(value);
                  document.getElementsByClassName("tiles")[i - (count)-1].style.backgroundColor="rgb("+(50+(value*32)%155)+","+(50+(value*64)%155)+","+(50+(value*128)%155)+")";
            document.getElementsByClassName("tiles")[i - (count)-1].innerHTML=value*2;
            document.getElementsByClassName("tiles")[i - (count)-1].style.animationName="pulse";


    
            document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[i -(count)-1]);						
            a_new = document.createElement("span");
            a_new.style="height: calc(100%/"+n+" - 10px);width: calc(100%/"+n+" - 10px);top:calc("+(t-1)+"*100%/"+n+" - 0px);left:calc("+l+"*100%/"+n+" - 0px);font-size: calc(100vmin/"+(n+8)+" - 10px);";
            a_new.className="tiles";
            a_new.setAttribute("tileValue",1);
            document.getElementById("con").insertBefore(a_new,document.getElementById("con").children[i]);
            ggg.style.zIndex=z;
            z++;
            document.getElementById("conn").appendChild(ggg);
            merge_divs.push(ggg);
            merge_data.push("calc("+((i -(count)-1)%n)+"*100%/"+n+" - 0px)");
            break;
          }
          else{
            if(count==1){
              break;

            }
            else{
              check_2=1;
              document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
              z++;
              move_divs.push(document.getElementById("con").children[i-1]);
               move_data.push("calc("+(l-count+1)+"*100%/"+n+")");		
              document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[i - (count-1)]);
              document.getElementById("con").children[i - (count)].style.left="calc("+(l)+"*100%/"+n+")";

              document.getElementById("con").insertBefore(document.getElementById("con").children[i - (count)],document.getElementById("con").children[i]);				
              break;
            }
          }
        }
        count++;
      }	

      if(check==0){

        if(count!=1){
          check_2=1;
          document.getElementsByClassName("tiles")[i-1].style.zIndex=z;
          z++;

          extreme_data.push(document.getElementsByClassName("tiles")[i-1]);

          document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[i-1],document.getElementById("con").children[(t-1)*n]);

           document.getElementsByClassName("tiles")[(t-1)*n+1].style.top="calc("+(t-1)+"*100%/"+n+" - 0px)";
          document.getElementsByClassName("tiles")[(t-1)*n+1].style.left="calc("+(l)+"*100%/"+n+" - 0px)";
          document.getElementById("con").insertBefore(document.getElementsByClassName("tiles")[(t-1)*n+1],document.getElementById("con").children[i]);
        }	
      }
    }

    if(i==loop){

      loop_count++;
      i=n*(loop_count-1)+1;

      loop=i+n-1;
      if(i>=n*n){
        break;
      }

    }
  }
  setTimeout(function(){
    if(which==4){
                  for(var cg=0;cg<merge_divs.length;cg++){								
                  merge_divs[cg].style.left=merge_data[cg];
                  }
                merge_divs=[];
                merge_data=[];
          
                  for(var g=0;g<move_divs.length;g++){								
                    move_divs[g].style.left=move_data[g];
                  }
                  move_divs=[];
                  move_data=[];
          
            for(var cg=0;cg<extreme_data.length;cg++){		
              extreme_data[cg].style.left="calc("+0+"*100%)";
            }
            extreme_data=[];
      }
                    if(pend_check==1){
            pending=pending.splice(1);
            pend_check=0;
          }
      pend();
             },16);
      if(check_2==1){
          newblock();
          }
        setTimeout(function(){
          document.getElementById("conn").innerHTML="";
      
        },300);
        
      }	
  var countt=2;
    var empty=[];
  function newblock(){
    countt++;
    var empty=[];
    for (var i =1; i<=n*n; i++) {
      if(parseInt(document.getElementsByClassName("tiles")[i-1].getAttribute("tileValue"))==1){
        empty.push(i-1);
      }
    }
    var y=Math.floor(Math.random()*empty.length);

    document.getElementsByClassName("tiles")[empty[y]].setAttribute("tileValue",2);
    document.getElementsByClassName("tiles")[empty[y]].innerHTML=2;
    document.getElementsByClassName("tiles")[empty[y]].style.backgroundColor="#4286f4";
  document.getElementsByClassName("tiles")[empty[y]].style.width="calc(100%/"+n+" - 10px)";
}
var available=0;
function move(x){
  if(available==1){
    pending.push(x);
  }
  else{
    if(x==1){
      moveTop();
    }
    else if(x==2){
      moveBot();
    }
    else if(x==3){
      moveRight();
    }
    else if(x==4){
      moveLeft();
    }
  }
}

function identifier(d,j){
if(j==0){
ini_x=d.offsetX;
ini_y=d.offsetY;
}
if(j==1){
final_x=d.offsetX;
final_y=d.offsetY;
dist_x=final_x-ini_x;
dist_y=final_y-ini_y;
if(Math.abs(dist_x)>Math.abs(dist_y)){
  if(dist_x>40){
    move(3);
  }
  else if(dist_x<(-40)){
    move(4);
  }
}
else{
  if(dist_y>40){
    move(2);
  }
  else if(dist_y<(-40)){
    move(1);
  }
}
}
}

function identifier_touch_1(d){

ini_x=d.touches[0].clientX;
ini_y=d.touches[0].clientY;
}

function identifier_touch_2(d){
    final_x=d.changedTouches[0].clientX;
    final_y=d.changedTouches[0].clientY;
    dist_x=final_x-ini_x;
    dist_y=final_y-ini_y;
    if(Math.abs(dist_x)>Math.abs(dist_y)){
      if(dist_x>40){
        move(3);
      }
      else if(dist_x<(-40)){
        move(4);
      }
    }
    else{
      if(dist_y>40){
        move(2);
      }
      else if(dist_y<(-40)){
        move(1);
      }
    }
}

window.onload=function(){
  new_game();
  var min=Math.min(document.getElementById("gesture").offsetHeight,document.getElementById("gesture").offsetWidth)-70;
  document.getElementById("menu").style.width=min+"px";
  document.getElementById("menu").style.left="calc((100% - "+min+"px)/2)";
  document.getElementById("menu").style.top="calc((100% - "+(min)+"px)/2 - 35px)";
  document.getElementById("con").style.height=min+"px";
  document.getElementById("conn").style.height=min+"px";
  document.getElementById("con").style.width=min+"px";
  document.getElementById("conn").style.width=min+"px";
  document.getElementById("con").style.top="calc((100% - "+(min)+"px)/2 + 35px)";
  document.getElementById("conn").style.top="calc((100% - "+(min)+"px)/2 + 35px)";
  document.getElementById("con").style.left="calc((100% - "+min+"px)/2)";
  document.getElementById("conn").style.left="calc((100% - "+min+"px)/2)";
  document.getElementById("gesture").addEventListener('touchstart',identifier_touch_1,{passive : true});
  document.getElementById("gesture").addEventListener('touchend',identifier_touch_2,{passive : true});
};

window.onresize=function(){
  var min=Math.min(document.getElementById("gesture").offsetHeight,document.getElementById("gesture").offsetWidth)-70;			
  document.getElementById("menu").style.top="calc((100% - "+(min)+"px)/2 - 35px)";
  document.getElementById("menu").style.width=min+"px";
  document.getElementById("menu").style.left="calc((100% - "+min+"px)/2)";
  document.getElementById("con").style.height=min+"px";
  document.getElementById("conn").style.height=min+"px";
  document.getElementById("con").style.width=min+"px";
  document.getElementById("conn").style.width=min+"px";
  document.getElementById("con").style.top="calc((100% - "+(min)+"px)/2 + 35px)";
  document.getElementById("conn").style.top="calc((100% - "+(min)+"px)/2 + 35px)";
  document.getElementById("con").style.left="calc((100% - "+min+"px)/2)";
  document.getElementById("conn").style.left="calc((100% - "+min+"px)/2)";
};

window.onkeydown=function(event){
  if(event.keyCode==37){
    move(4);
  }
  else if(event.keyCode==38){
    move(1);
  }
  else if(event.keyCode==39){
    move(3);
  }
  if(event.keyCode==40){
    move(2);
  }

};