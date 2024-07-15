(()=>{"use strict";var e={664:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Field=void 0,t.Field=class{constructor(e,t,s){this.squares=[],this.fieldSize=5,this.fieldSize=e,t?this.setSquares(t):s?this.createSquares(e,!0):this.createSquares(e)}getSquares(){return this.squares.map((e=>e.slice()))}getFieldSize(){return this.fieldSize}setSquares(e){this.squares=e}createSquares(e,t){for(let s=0;s<e;s++){this.squares[s]=new Array;for(let i=0;i<e;i++)if(t){let e="",t=Math.random();e=t<.25?"000000":t<.5?"444444":t<.75?"aaaaaa":"ffffff",this.squares[s][i]=e}else{let e=Math.floor(16777215*Math.random()).toString(16);this.squares[s][i]=e}}return this.squares}swapSquares(e,t){const s=this.squares.map((e=>e.slice()));return this.squares[e.x][e.y]=this.squares[t.x][t.y].slice(),this.squares[t.x][t.y]=s[e.x][e.y].slice(),this.squares}chooseRandomSquare(){return{x:Math.floor(Math.random()*this.fieldSize),y:Math.floor(Math.random()*this.fieldSize)}}}},316:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Fitness=void 0,t.Fitness=class{calcFitness(e){let t=0,s=e.getSquares();for(let e=0;e<s.length;e++)for(let i=0;i<s[e].length-1;i++)t+=this.averageColorDistance(s,e,i);return t}hexToRGB(e){let t=parseInt(e,16);return[t>>16&255,t>>8&255,255&t]}calcColorDistance(e,t){const s=e[0]-t[0],i=e[1]-t[1],a=e[2]-t[2];return Math.sqrt(s*s+i*i+a*a)}averageColorDistance(e,t,s){const i=[[0,1],[1,0],[0,-1],[-1,0],[-1,-1],[-1,1],[1,-1],[1,1]];let a=this.hexToRGB(e[t][s]),n=0,r=0;for(let[l,o]of i){let i=t+l,u=s+o;if(i>=0&&i<e.length&&u>=0&&u<e[0].length){let t=this.hexToRGB(e[i][u]);n+=this.calcColorDistance(a,t),r++}}return 0===r?0:n/r}}},847:function(e,t,s){var i=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(a,n){function r(e){try{o(i.next(e))}catch(e){n(e)}}function l(e){try{o(i.throw(e))}catch(e){n(e)}}function o(e){var t;e.done?a(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(r,l)}o((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Genetic=void 0;const a=s(664),n=s(316),r=s(154);t.Genetic=class{constructor(){this.fitness=new n.Fitness,this.delay=e=>new Promise((t=>setTimeout(t,e)))}start(e,t,s,a){return i(this,void 0,void 0,(function*(){let i=0,n=this.generateCandidates(t,s,a).map((e=>({value:this.fitness.calcFitness(e),item:e})));n.sort(((e,t)=>e.value-t.value));let l=n.slice(0,2).map((e=>e.item));for(;i<e;){i++;let e=[];for(let s=0;s<t;s++){let t=this.crossover(l[0],l[1]);t=this.mutate(t);let s={value:this.fitness.calcFitness(t),item:t};e.push(s)}e.sort(((e,t)=>e.value-t.value)),l=e.slice(0,2).map((e=>e.item)),r.Visual.getInstance().update(l[0]),r.Visual.getInstance().updateCurGeneration(i),yield this.delay(1)}}))}generateCandidates(e,t,s){let i=new a.Field(t,void 0,s),n=[];for(let t=0;t<e;t++){let e=new a.Field(i.getSquares().length,i.getSquares());for(let t=0;t<5;t++){let t=e.chooseRandomSquare(),s=e.chooseRandomSquare();e.swapSquares(t,s)}n.push(e)}return n}crossover(e,t){let s=e.getSquares(),i=t.getSquares(),n=new Array(e.getFieldSize());for(let t=0;t<e.getFieldSize();t++)n[t]=new Array(e.getFieldSize()).fill(void 0);let[r,l]=[Math.floor(Math.random()*s.length),Math.floor(Math.random()*i.length)].sort(),o=Math.floor(Math.random()*s.length),u=new Set;for(let e=r;e<=l;e++)n[o][e]=s[o][e],u.add(s[o][e]);let c=0,h=0;for(let e=0;e<n.length;e++)for(let t=0;t<n[e].length;t++)if(void 0===n[e][t])for(;c<i.length;){for(;h<i[c].length;){let s=i[c][h];if(h++,!u.has(s)){n[e][t]=s,u.add(s);break}}if(h>=i[c].length&&(h=0,c++),void 0!==n[e][t])break}return new a.Field(s.length,n)}mutate(e){let t=new a.Field(e.getSquares().length,e.getSquares().map((e=>e.slice())));for(let e=0;e<5*Math.round(Math.random());e++){let e=t.chooseRandomSquare(),s=t.chooseRandomSquare();t.swapSquares(e,s)}return t}}},854:function(e,t,s){var i=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(a,n){function r(e){try{o(i.next(e))}catch(e){n(e)}}function l(e){try{o(i.throw(e))}catch(e){n(e)}}function o(e){var t;e.done?a(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(r,l)}o((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.OnePlusOne=void 0;const a=s(664),n=s(316),r=s(154);t.OnePlusOne=class{constructor(){this.curPopulations=[],this.fitness=new n.Fitness,this.delay=e=>new Promise((t=>setTimeout(t,e)))}start(e,t,s,a){return i(this,void 0,void 0,(function*(){let i=0,n=this.createInitialPopulation(s,a).map((e=>({value:this.fitness.calcFitness(e),item:e})));n.sort(((e,t)=>e.value-t.value));let l=n.slice(0,1).map((e=>e.item));for(;i<e;){i++;let e=[];for(let s=0;s<Math.floor(t);s++){let t=this.mutate(l[0]),s={value:this.fitness.calcFitness(t),item:t};e.push(s)}e.sort(((e,t)=>e.value-t.value));let s=e.slice(0,1).map((e=>e.item));this.fitness.calcFitness(s[0])<this.fitness.calcFitness(l[0])&&(l=s),r.Visual.getInstance().update(l[0]),r.Visual.getInstance().updateCurGeneration(i),yield this.delay(1)}}))}getPopulation(){return this.curPopulations}createInitialPopulation(e,t){let s=new a.Field(e,void 0,t),i=[];for(let e=0;e<10;e++){let e=new a.Field(s.getSquares().length,s.getSquares());for(let t=0;t<100;t++){let t=e.chooseRandomSquare(),s=e.chooseRandomSquare();e.swapSquares(t,s)}i.push(e)}return this.curPopulations=i,i}mutate(e){let t=new a.Field(e.getSquares().length,e.getSquares().map((e=>e.slice())));for(let e=0;e<20*Math.round(Math.random());e++){let e=t.chooseRandomSquare(),s=t.chooseRandomSquare();t.swapSquares(e,s)}return t}}},154:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Visual=void 0;const i=s(316);class a{constructor(){this.squaresDiv=this.getId("squares"),this.selectedTile={x:-1,y:-1},this.fitness=new i.Fitness,a.instance=this}static getInstance(){return a.instance}getId(e){return document.getElementById(e)}visualizeSquares(e){var t,s;let i=e.getSquares();this.squaresDiv.innerHTML="";const a=this;for(let n=0;n<i.length;n++){let r=document.createElement("div");null===(t=this.squaresDiv)||void 0===t||t.appendChild(r);for(let t=0;t<i[n].length;t++){let r=document.createElement("div");r.id=n+""+t,r.style.backgroundColor="#"+i[n][t],r.addEventListener("click",(function(){a.swapTiles(e,{x:Number(this.id.charAt(0)),y:Number(this.id.charAt(1))})})),null===(s=this.squaresDiv)||void 0===s||s.children[n].appendChild(r)}}}updateCurGeneration(e){this.getId("currentGeneration").innerHTML="Current Generation: "+e}swapTiles(e,t){if(-1==this.selectedTile.x&&-1==this.selectedTile.y)this.selectedTile=t,this.getId(this.selectedTile.x+""+this.selectedTile.y).className="selected";else{let s=t;this.getId(this.selectedTile.x+""+this.selectedTile.y).className="",this.getId(s.x+""+s.y).className="",e.swapSquares(this.selectedTile,s),this.selectedTile={x:-1,y:-1},this.update(e)}}update(e){this.visualizeSquares(e),this.getId("fitness").innerHTML="Fitness: "+this.fitness.calcFitness(e).toFixed(4)}}t.Visual=a,a.instance=new a,t.default=a.getInstance()},170:(e,t,s)=>{t.ZZ=void 0;const i=s(664),a=s(154),n=s(854),r=s(847),l=g("populationSize"),o=g("maxGenerations"),u=g("fieldSize"),c=g("bwCheckbox"),h=g("startAlgo"),d=g("opoRadio");h.addEventListener("click",(function(){d.checked?(console.log("Starting One-Plus-One-Algorithm"),f.start(Number(o.value),Number(l.value),Number(u.value),c.checked)):(c.checked&&alert("Genetic Algorithm is incompatible with the black and white option."),console.log("Starting Genetic Algorithm"),m.start(Number(o.value),Number(l.value),Number(u.value),c.checked))})),t.ZZ=new i.Field(10);let f=new n.OnePlusOne,m=new r.Genetic;function g(e){return document.getElementById(e)}a.Visual.getInstance().update(t.ZZ)}},t={};!function s(i){var a=t[i];if(void 0!==a)return a.exports;var n=t[i]={exports:{}};return e[i].call(n.exports,n,n.exports,s),n.exports}(170)})();