
var monster = {
	modules: {}
};

monster.modules.actions = (function(){

	var name = "George";
	var life = 70;
	var money = 200;
	var awake = true;

	return {

		showme: function(){

			if(awake === true){
				awake = "awake";
			}else{
				awake = "sleeping";
			}

			monster.modules.app.displayStatus(life, money, awake);

			monster.modules.app.log("Le monstre s'appelle "+name+", il a "+life+" de points de vie et "+money+" en argent. Il est actuellement "+awake);

		},

		init: function(n, l, m, a){
			name = n;
			life = l;
			money = m;
			awake = a;
		},

		run: function(){
			if(life >= 1 && awake === true){
				monster.modules.app.log("The monster is running.");
				life = life-1;
				monster.modules.app.displayStatus(life, money, awake);
			}
		},

		fight: function(){
			if(life >= 3 && awake === true){
				monster.modules.app.log("The monster is fighting.");
				life = life-3;
				monster.modules.app.displayStatus(life, money, awake);
			}
		},

		work: function(){
			if(life >= 1 && awake === true){
				monster.modules.app.log("The monster is working.");
				life = life-1;
				money = money+2;
				monster.modules.app.displayStatus(life, money, awake);
			}
		},

		eat: function(){
			if(money >= 3 && awake === true && life > 0){
				monster.modules.app.log("The monster is eating.");
				life = life+2;
				money = money-3;
				monster.modules.app.displayStatus(life, money, awake);
			}
		},

		sleep: function(){
			if(life > 0){
				monster.modules.app.log("The monster is sleeping.");
				awake = false;
				monster.modules.app.displayStatus(life, money, "sleeping");
				setTimeout(function(){
					monster.modules.app.log("The monster is awake.");
					awake = true;
					life = life+1;
					monster.modules.app.displayStatus(life, money, "awake");
				}, 10000);
			}
		},

		kill: function(){
			life = 0;
			monster.modules.app.log("The monster is died.");
			monster.modules.app.displayStatus(life, money, "died");
		}

	}

})();

monster.modules.app = (function(){

	return {

		run: function(){

			var run = document.getElementById("b2");
			var fight = document.getElementById("b3");
			var work = document.getElementById("b7");
			var sleep = document.getElementById("b4");
			var eat = document.getElementById("b5");
			var show = document.getElementById("b6");
			var kill = document.getElementById("k");

			monster.modules.actions.init("Fred", 80, 180, true);
			show.onclick = monster.modules.actions.showme;

			run.onclick = monster.modules.actions.run;
			fight.onclick = monster.modules.actions.fight;
			work.onclick = monster.modules.actions.work;
			eat.onclick = monster.modules.actions.eat;
			sleep.onclick = monster.modules.actions.sleep;
			kill.onclick = monster.modules.actions.kill;

			setInterval(function(){
				var action = Math.floor(Math.random() * 5 + 1);
				if(action = 1){
					monster.modules.actions.run;
				}else if(action = 2){
					monster.modules.actions.fight;
				}else if(action = 3){
					monster.modules.actions.work;
				}else if(action = 4){
					monster.modules.actions.eat;
				}else if(action = 5){
					monster.modules.actions.sleep;
				}
			}, 12000);

		},

		log: (function(message){

			var p = document.createElement("p");
			var p_content = document.createTextNode(message);

			p.appendChild(p_content);

			var box = document.querySelector("#actionbox p");
			var box_parent = box.parentNode;
			box_parent.insertBefore(p, box);

		}),

		displayStatus: (function(life, money, awake){

			var parent = document.getElementById("status");

			var li_1 = document.createElement("li");
			var li_1_content = document.createTextNode("life:"+life);
			li_1.appendChild(li_1_content);
			var li_1_init = document.querySelectorAll("#status li")[0];
			parent.replaceChild(li_1, li_1_init);

			var li_2 = document.createElement("li");
			var li_2_content = document.createTextNode("money:"+money);
			li_2.appendChild(li_2_content);
			var li_2_init = document.querySelectorAll("#status li")[1];
			parent.replaceChild(li_2, li_2_init);

			var li_3 = document.createElement("li");
			var li_3_content = document.createTextNode(awake);
			li_3.appendChild(li_3_content);
			var li_3_init = document.querySelectorAll("#status li")[2];
			parent.replaceChild(li_3, li_3_init);

		})

	}

})();

window.onload = monster.modules.app.run();
