
$(function () {

  var html = $('#hw').html();

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
    let answer = this.value;
    let num = parseInt(this.name.replace(/\D+/g, ""));
    yourAnswers[num] = answer;
  });





  function clearForm(name) {
    var $elem = $('form[name] input');

    for(let value of $elem) {
      if(value.checked)
         value.checked = false;
    }
  };




  function testResult(msg, itog) {
    var $parent = $('.modal-body');

    for (let value of msg) {
      let $modal = $(`<p class="test-result"> ${value} </p>`);
      $parent.append($modal);   
    }

    $parent = $('.modal-footer');
    let $modal = $(`<p class="test-result"> Всего правильных ответов:  ${itog} </p>`);
    $parent.append($modal);   
  };




  $('#myModal').on('hide.bs.modal', function() { 
    $('.test-result').remove();
  });





  var $button = $('.question__button');

  $button.on('click', function() {
    var score = 0;
    var i = 0;
    var answerText = new Array;

    for (let value of yourAnswers) {
      if(value != myTest.questions[i].correctAnswer) {
        answerText[i] = `Вопрос № ${i + 1}: <br> Правильный ответ: ${myTest.questions[i].answers[myTest.questions[i].correctAnswer]}`;
      }
      else {
        answerText[i] = `Вопрос № ${i + 1} : Верно!`;
        ++score;
      }
      ++i;
    }

    testResult(answerText, score);

    clearForm('ftest');
    yourAnswers = [];
    score = 0;
    i = 0;
    answerText = [];
  });




});






