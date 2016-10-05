
$(function () {

  var html = $(document).ready('#hw').html();

  var yourAnswers = new Array;

  var test = {
    head: 'Тест по программированию',
    questions: 
      [
        {
         question: '1. Вопрос № 1',
         answers: ['Вариант ответа № 1',
                   'Вариант ответа № 2',
                   'Вариант ответа № 3'],
         correctAnswer: 0
        },
        {
         question: "2. Вопрос № 2",
         answers: ['Вариант ответа № 1',
                   'Вариант ответа № 2',
                   'Вариант ответа № 3'],
         correctAnswer: 1
        },
        {
         question: "3. Вопрос № 3",
         answers: ['Вариант ответа № 1',
                   'Вариант ответа № 2',
                   'Вариант ответа № 3'],
         correctAnswer: 2
        }
      ]
    }

  localStorage.setItem('testStorage', JSON.stringify(test));

  var myTest = JSON.parse(localStorage.getItem('testStorage'));

  var content = tmpl(html, myTest);
  $('body').append(content);





  var $inputs = $('.question__checkbox');

  $inputs.on('click', function() {
    var answer = this.value;
    var num = parseInt(this.name.replace(/\D+/g, ""));
    yourAnswers[num] = answer;
  });





  function clearForm(name) {

    var $elem = $('form[name] input');

    for(var i = 0; i < $elem.length; i++) {
      if($elem[i].checked)
         $elem[i].checked = false;
    }

  };



  function testResult(msg, itog) {

    var $parent = $('.modal-body');

    for (var i = 0; i < msg.length; i++) {
      var $modal = $('<p class="test-result">' + msg[i] + '</p>');
      $parent.append($modal);   
    }

    $parent = $('.modal-footer');
    var $modal = $('<p class="test-result"> Всего правильных ответов: ' + itog + '</p>');
    $parent.append($modal);   

  };



  $('#myModal').on('hide.bs.modal', function() { 
    $('.test-result').remove();
  });



  var score = 0;
  var answerText = new Array;

  var $button = $('.question__button');

  $button.on('click', function() {

    for (var i = 0; i < yourAnswers.length; i++) {
   
      var num = i + 1;

      if(yourAnswers[i] != myTest.questions[i].correctAnswer) {
         answerText[i] = 'Вопрос № ' + num + ': <br> Правильный ответ: ' + myTest.questions[i].answers[myTest.questions[i].correctAnswer];
      }
      else {
        answerText[i] = 'Вопрос № '+ num + ': Верно!';
        ++score;
      }
      }


    
    testResult(answerText, score);

    clearForm('ftest');
    yourAnswers = [];
    score = 0;
    answerText = [];

  });




});



var app = {
sayHello: function(name) {
return 'hello ' + name;
}
}



module.exports = app ; // имя переменной






