var em = ["🎮", "📼", "💾", "📀", "🕹️", "📟", "📺", "📻", "📹", "📼", "☎️", "💿", "🔋", "🔌", "🖥️", "🖨️", "🖱️", "⌨️", "🖲️", "💻", "📁", "📂", "📄", "🗂️", "🗃️", "🗄️", "🗳️", "🖇️", "📇", "📏", "📐", "✏️", "📝","🌈"];

var tmp, c, p = em.length;
if(p) while(--p) {
   c = Math.floor(Math.random() * (p + 1));
   tmp = em[c];
   em[c] = em[p];
   em[p] = tmp;
}

var pre="", pID, ppID=0, turn=0, t="transform", flip="rotateY(180deg)", flipBack="rotateY(0deg)", time, mode;

window.onresize = init;
function init() {
   W = innerWidth;
   H = innerHeight;
   $('body').height(H+"px");
   $('#ol').height(H+"px");
}

window.onload = function() {
    $("#ol").html(`
        <center>
            <div id="inst">
                <h3>Welcome!</h3>
                🕹️Greetings Gamer🎮<br/><br/>
                Objective: Match the twin blocks by flipping them over.<br/><br/>
                Read the following instructions<br/><br/>
                <ul>
                    <li>Flip: Click on any block to reveal its hidden side.</li>
                    <li>Match: Find the matching block to form a pair.</li>
                    <li>Mismatch: If the blocks don't match, they will flip back.</li>
                </ul>
                <p style="font-size:18px;">Game Modes: Select your challenge level below to begin your adventure!</p>
            </div>
            <button onclick="start(3, 4)">3 x 4</button>
            <button onclick="start(4, 4)">4 x 4</button>
            <button onclick="start(4, 5)">4 x 5</button>
            <button onclick="start(5, 6)">5 x 6</button>
            <button onclick="start(6, 6)">6 x 6</button>
        </center>
    `);
}

function start(rows, cols) {
    console.log(`Starting game with ${rows} rows and ${cols} columns`);
}

function start(r,l) {
    min=0, sec=0, moves=0;
    $("#time").html("Time: 00:00");
    $("#moves").html("Moves: 0");
    time = setInterval(function() {
      sec++;
      if(sec==60) {
          min++; sec=0;
      }
      if(sec<10) 
          $("#time").html("Time: 0"+min+":0"+sec);
      else 
        $("#time").html("Time: 0"+min+":"+sec);
    }, 1000);
    rem=r*l/2, noItems=rem;
    mode = r+"x"+l;
    var items = [];
    for (var i=0;i<noItems;i++)
        items.push(em[i]);
    for (var i=0;i<noItems;i++)
        items.push(em[i]);
    var tmp, c, p = items.length;
    if(p) while(--p) {
        c = Math.floor(Math.random() * (p + 1));
        tmp = items[c];
        items[c] = items[p];
        items[p] = tmp;
    }
    
    $("table").html("");
    var n=1;
    for (var i = 1;i<=r;i++) {
        $("table").append("<tr>");
        for (var j = 1;j<=l;j++) {
           $("table").append(`<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${items[n-1]}</p></div></div></td>`);
           n++;
         }
         $("table").append("</tr>");
    }
    $("#ol").fadeOut(500);
}
function change(x) {
  let i = "#"+x+" .inner";
  let f = "#"+x+" .inner .front";
  let b = "#"+x+" .inner .back";
  if (turn==2 || $(i).attr("flip")=="block" || ppID==x) {}
  
  else {
    $(i).css(t, flip);
    if (turn==1) {
      turn=2;
      if (pre!=$(b).text()) {
         setTimeout(function() {
            $(pID).css(t, flipBack);
            $(i).css(t, flipBack);
            ppID=0;
         },1000);
      }
      
      else {
          rem--;
          $(i).attr("flip", "block");
          $(pID).attr("flip", "block");
      }
      
      setTimeout(function() {
         turn=0;
         moves++;
         $("#moves").html("Moves: "+moves);
      },1150);
      
    }
    else {
      pre = $(b).text();
      ppID = x;
      pID = "#"+x+" .inner";
      turn=1;
    }
    if (rem==0) {
          clearInterval(time);
          if (min==0) {
              time = `${sec} seconds`;
          }
          else {
              time = `${min} minute(s) and ${sec} second(s)`;
          }
          setTimeout(function() {
              $("#ol").html(`<center><div id="iol"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p><p style="font-size:18px">Comment Your Score!<br/>Play Again ?</p><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button><button onclick="start(5, 6)">5 x 6</button><button onclick="start(6, 6)">6 x 6</button></div></center>`);
              $("#ol").fadeIn(750);
          }, 1500);
    }
  }
}