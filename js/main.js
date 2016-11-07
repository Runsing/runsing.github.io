var offsetX = $("#loveHeart").width() / 2;
var offsetY = $("#loveHeart").height() / 2 - 55;

;({
	main: function(){

		var self = this;
		
		this.play();
		this.DB.conn();
		this.DB.getAll(function(list){
			var html = ''
			list.forEach(function (item) {
				html += '<li><span>'+ item +'</span></li>'
			})

			$('.msg-list').html(html);
			self.msg()
		})


	},

	msg: function(){
		var count = $('.msg-list li').length
		var index = 1;
		var that = this

		setInterval(function(){
			$('.msg-list').css({"transform": 'translateY(' + (-42 * index++) + 'px)'});

			if(index > count){
				index = 0;
				$('.msg-list').hide()
			}else{
				$('.msg-list').show()
			}

			that.index = index;
		}, 1000)
	},

	play: function(){
		var displayMode = -1;
		var together = new Date();
		together.setFullYear(2016, 1, 15);
		together.setHours(15);
		together.setMinutes(0);
		together.setSeconds(0);
		together.setMilliseconds(0);

		$("#loveHeart").click(function(){
			displayMode *= -1;
			timeElapse(together, displayMode);
		});

		if (!document.createElement('canvas').getContext) {
			var msg = document.createElement("div");
			msg.id = "errorMsg";
			msg.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+"; 
			document.body.appendChild(msg);
			$("#code").css("display", "none")
		    document.execCommand("stop");
		} else {
			setTimeout(function () {
				adjustWordsPosition();
				startHeartAnimation();
			}, 4000);

			setTimeout(function(){
				$('.img').fadeIn(1000);	
			},3000);

			timeElapse(together, displayMode);
			setInterval(function () {
				timeElapse(together, displayMode);
			}, 500);

			adjustCodePosition();
			$("#code").typewriter();
		}
	},

	DB:{
		conn:function(){
			var config = {
			  syncURL: "https://xingxingstudio.wilddogio.com"
			};
			wilddog.initializeApp(config);
			var ref = wilddog.sync().ref("/web/");
			this.postsRef = ref.child("messages");
			this.bind();	
			return this;
		},

		add: function(msg){
			this.postsRef.push(msg);
		},

		bind: function(){
			var that = this;

			this.postsRef.on('child_added', function(snapshot) {
				var text = snapshot.val();
				var html = '<li><span>'+ text +'</span></li>'
				$('.msg-list li').eq(that.index).append(html);
			});

			$('#msg-btn').click(function(){
				var val = $('#msg-text').val();

				val.trim() && that.add(val)
				$('#msg-text').val('')
			})
		},

		getAll: function(callback){
			this.postsRef.orderByKey().once("value", function(snapshot) {
			  	var ret = snapshot.val()
			  	var list = [];
			  	Object.keys(ret).forEach(function(key){
			  		list.push(ret[key]);
			  	})

			  	callback(list)
			});
		}
	}
}).main()
