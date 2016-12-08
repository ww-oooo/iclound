var app=angular.module("icloud",[]);
app.controller("icloudCtrl",["$scope",function($scope){
	$scope.color=['purple','green','blue','yellow','brown','red','orange'];
	$scope.cu=0;
	function maxId(){
		var max=-Infinity;
		for(var i=0;i<$scope.lists.length;i++){
			var v=$scope.lists[i];
			if(v.id>max){
				max=v.id;
			}
		}
		return (max===-Infinity)?1001:max;
	}
	$scope.v=function(){
		return v;
	}
	if(localStorage.reminder){
		$scope.lists=JSON.parse(localStorage.reminder)
	}else{
		$scope.lists=[
		];
	}
	$scope.save2local=function(){
		localStorage.reminder=JSON.stringify($scope.lists);
	}
	$scope.addList=function(){
		var len=$scope.lists.length;
		var index=len%7;
		var m=
		{
			id:maxId()+1,
			name:"新文件"+(len+1),
			theme:$scope.color[index],
			todos:[]
		}	
		$scope.lists.push(m);
	}
	$scope.remove=function(){		
			$scope.lists.splice($scope.cu,1);
			$scope.save2local();	
	}
//已完成数目
 	$scope.count=function(){
 		var r=0;
 		$scope.lists[$scope.cu].todos.forEach(function(v,i){
 			if(v.state===1){
 				r++;
 			}
 		})
 		return r;
 	}
//删除已完成事项
	$scope.clear=function(){
		var arr=[];
		$scope.lists[$scope.cu].todos.forEach(function(v,i){
			if (v.state===0) {
				arr.push(v);
			};
		})
		$scope.lists[$scope.cu].todos=arr;
	}
}])
app.directive("ngX",function(){
	return{
		restrict:"A",
		transclude:true,
		replace:true,
		template:'<div id="tj-list" class="sc-view sc">  <div ng-transclude></div> </div>',
		link:function($scope,el){
			$(el).on("click",".list",function(){
				$(el).on("keyup",false);
				$(".list").removeClass("active");
				$(".list").find(".border-tr").css("display","none");
				$(".list").find(".border-fr").css("display","none");
				$(".row-divider-bottom").css("display","block");
				$(this).addClass("active").find(".border-tr").css("display","block").end().find(".border-fr").css("display","block");
				$(this).find(".row-divider-bottom").css("display","none");
				$(this).prev().find(".row-divider-bottom").css("display","none");
				$("#planned").css("background","transparent");
				var that=this;
				$scope.$apply(function(){
					$scope.cu=$(that).index();
				})
				for(var i=0;i<7;i++){
					$(".row-divider-top1").removeClass($scope.lists[i].theme);
					$(".row-divider-bottom1").removeClass($scope.lists[i].theme);
					$(".selected-row-background1").removeClass($scope.lists[i].theme);
					$(".details-button").css("display","none")
				}
			})
			$("#planned").on("click",function(){
				$(this).css("background","rgb(45,45,43)");
				$(".list").removeClass("active");
				$(".list").find(".border-tr").css("display","none");
				$(".list").find(".border-fr").css("display","none");
				$(".row-divider-bottom").css("display","block");
			})
			$(document).on("keyup",function(e){
				if(e.keyCode===8){
					var index=$(".active").index();
					if(index===-1){
						return;
					}
					$scope.$apply(function(){
						$scope.lists.splice(index,1);
						$scope.save2local();
						$(".list").eq(index-1).find(".row-divider-bottom").css("display","block");
					})
				}
			})
		}
		
	}
})
app.directive("cLo",function(){
	return{
		restrict:"A",
		transclude:true,
		replace:true,
		template:'<div id="list-rx" lass="sc-view sc"><div ng-transclude></div></div>',
		link:function($scope,el){
			$(el).on("click",function(){
				$(".change-t").toggle();
				return false;
			})
			$(document).on("keyup",":input",false);
			$(document).on("click",function(){
				$(".change-t").hide();
				return false;
			})
			$(".change-t").on("click",false);
			var a=0;
			$("#over").on("click",".background-container",function(){
				if(a%2==0){
					$(".clean1").css("display","block");
					$(".disclosure-button-closed").css("background-position","-23px -526px");
				}
				else{
					$(".clean1").css("display","none");
					$(".disclosure-button-closed").css("background-position","-96px -497px");
				}
				a++;
				$(".overdo").toggle();
				$(".white").toggle();
				return false;
			})
			
			$("body").on("click",".sc-outline",function(){
				var index=$(".sc-outline").index($(this));
				$(".row-divider-top1").removeClass($scope.lists[$scope.cu].theme);
				$(".row-divider-bottom1").removeClass($scope.lists[$scope.cu].theme);
				$(".selected-row-background1").removeClass($scope.lists[$scope.cu].theme);
				$(".row-divider-top1").eq(index).addClass($scope.lists[$scope.cu].theme);
				$(".row-divider-bottom1").eq(index).addClass($scope.lists[$scope.cu].theme);
				$(".selected-row-background1").eq(index).addClass($scope.lists[$scope.cu].theme);
				$(".details-button").css("display","none").eq(index).css("display","block");
			})
			$(".clean").on("click",function(){
				$(".mask").css("display","block");
				$(".clear-k").css("display","block");k
			})
			$(".clear-m .left").on("click",function(){
				$(".mask").css("display","none");
				$(".clear-k").css("display","none");
			})
			$(".clear-m .right").on("click",function(){
				$(".mask").css("display","none");
				$(".clear-k").css("display","none");
			})
		}
	}
})
