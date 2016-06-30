/*
1.b表示宫，c表示列，r表示行
*/

//向页面添加9宫格
var gird = '';
for(var b=1; b<=9; b++){
  var html = '';
  //判断行的起始数值
  if(b<4){
    var rr = 1;
  }else if(b>6){
    var rr = 7;
  }else{
    var rr = 4;
  }

//判断列的起始数值
  if(b%3==1){
    var cc = 1;
  }else if(b%3==2){
    var cc = 4;
  }else{
    var cc = 7;
  }
  for(var r=rr; r<(rr+3); r++){
    for(var c=cc; c<(cc+3); c++){
      html += '<span class="c-'+c+' r-'+r+'"></span>';
    }
  }
  gird += '<div class="b-'+b+'">'+html+'</div>';
}
document.getElementsByTagName('section')[0].innerHTML = gird;


/* 
定义存放生成随机数的数组
bArr 为宫数组，包含9个子数组
cArr 为列数组，包含9个子数组
rArr 为行数组，包含9个子数组
*/
var bArr=[];
var cArr=[];
var rArr=[];
for(var i=0; i<=9; i++) {
  bArr[i]=[];
  cArr[i]=[];
  rArr[i]=[];
}

/*
写入数据
*/
var maxGr;
var mg=0;
function io(r,c,b) {
  var gr = generateRandom(r,c,b);
  //判断返回的数据是否是一个数字
  if((typeof gr)==='number'){
    $('.c-'+c+'.r-'+r).text(gr);
    if(c<9){ 
      c++;
    }else if(c===9 && r<9){
      c = 1;
      r++;
    }else{
      return false;
    }
    //获取当前宫的序号
    b=parseInt($('.c-'+c+'.r-'+r).parent('div').attr('class').substr(-1));
    io(r,c,b);

  //这里返回的是一个数组
  }else if((typeof gr)==='object') {
    if(gr[2]===maxGr){
      mg++;
      if(mg>20){
        alert("只能做到这了，剩下的自己补全吧！");
        return false;
      }
    }
    maxGr=gr[2];
    io(gr[0],gr[1],gr[2]);

  //返回false将继续执行io();
  }else{
    io(r,c,b);
  }
}

var cc,rr;
var ii=0;

// 生成随机数的方法
function generateRandom(r,c,b){
  var rand = Math.ceil(Math.random()*9);
  //当橫、纵、宫三个数组已有该数字时，返回false，重新生成
  if($.inArray(rand,bArr[b])!==-1 || $.inArray(rand,cArr[c])!==-1 || $.inArray(rand,rArr[r])!==-1){
    if(c===cc&&r===rr){
      ii++;
      //当卡在一个cell超过50次时，说明已经进入死胡同
      if(ii>50){
        console.log('出现一次死胡同'+rand); 
        console.log(r+','+c+','+b);
        var nth = $('.c-'+c+'.r-'+r).index();
        var className = $('.b-'+(b-1)+' span').eq(nth).attr('class');
        var rrr= parseInt(className.substr(-1));
        var ccc= parseInt(className.substr(2,1));
        var j=c;
        
        while(j>(c-3) && j>0) {
          j--;
          rArr[r].pop();
          cArr[j].pop();
          var bb= parseInt($('.c-'+j+'.r-'+r).parent('div').attr('class').substr(-1));
          bArr[bb].pop();
          //当j<=1时，下一次执行J的值为9，条件为J>=(c+6)
          if(j<=1){
            r--;
            j=9;
            c=c+8;
          }
        }
        //向前移一个宫，返回一个新的数组，试图来跳出死胡同
        return [rrr,ccc,b-1];    
      }
    }else{
      ii=0;
    }
    cc = c;
    rr = r;
    return false;
  }

  //将正确生成的随机数写入相应数组，并返回该随机数
  bArr[b].push(rand);
  cArr[c].push(rand);
  rArr[r].push(rand);
  return rand;
} 
