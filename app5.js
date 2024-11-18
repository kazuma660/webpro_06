const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 7 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num==3)luck ='吉';
  else if( num==4)luck ='小吉';
  else if( num==5)luck ='末吉';
  else if( num==6)luck ='凶';
  else if( num==7)luck ='大凶';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )|| 0;
  let total = Number( req.query.total )|| 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '';
  if (cpu == hand) {
    judgement = 'あいこ';
  }
  else if (cpu == 'グー'){
    if(hand == 'パー'){
      win += 1;
      judgement = '勝ち'
    }
    else {
      judgement = '負け'
    }
  }
  else if (cpu == 'チョキ'){
    if(hand == 'グー'){
      win += 1;
      judgement = '勝ち'
    }
    else {
      judgement = '負け'
    }
  }
  else if (cpu == 'パー'){
    if(hand == 'チョキ'){
      win += 1;
      judgement = '勝ち'
    }
    else {
      judgement = '負け'
    }
  }

  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});


app.get('/calculate', (req, res) => {
  const number1 = parseFloat(req.query.number1);
  const number2 = parseFloat(req.query.number2);
  const operator = req.query.operator;

  let result;
  if (operator === '+') {
      result = number1 + number2;
  } else if (operator === '-') {
      result = number1 - number2;
  } else if (operator === '*') {
      result = number1 * number2;
  } else if (operator === '/') {
      result = number2 !== 0 ? number1 / number2 : 'エラー: 0で割ることはできません';
  } else {
      result = '無効な演算子です';
  }
  

  res.render('result', { number1, number2, operator, result });
});

app.get("/kazu", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )|| 0;
  let total = Number( req.query.total )|| 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 10 + 1 );
  let judgement = '';
  let cpu = num;
  if (cpu == hand) {
    judgement = '一致した！';
    win += 1;
  }
  else{
    judgement = '一致しなかった！';
  }

  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'kazu', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));


