'use strict';

$(function () {

  var html = $('#hw').html();

  var yourAnswers = new Array();

  var test = {
    head: 'Тест по программированию',
    questions: [{
      question: '1. Вопрос № 1',
      answers: ['Вариант ответа № 1', 'Вариант ответа № 2', 'Вариант ответа № 3'],
      correctAnswer: 0
    }, {
      question: "2. Вопрос № 2",
      answers: ['Вариант ответа № 1', 'Вариант ответа № 2', 'Вариант ответа № 3'],
      correctAnswer: 1
    }, {
      question: "3. Вопрос № 3",
      answers: ['Вариант ответа № 1', 'Вариант ответа № 2', 'Вариант ответа № 3'],
      correctAnswer: 2
    }]
  };

  localStorage.setItem('testStorage', JSON.stringify(test));

  var myTest = JSON.parse(localStorage.getItem('testStorage'));

  var content = tmpl(html, myTest);
  $('body').append(content);

  var $inputs = $('.question__checkbox');

  $inputs.on('click', function () {
    var answer = this.value;
    var num = parseInt(this.name.replace(/\D+/g, ""));
    yourAnswers[num] = answer;
  });

  function clearForm(name) {
    var $elem = $('form[name] input');

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = $elem[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        if (value.checked) value.checked = false;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  function testResult(msg, itog) {
    var $parent = $('.modal-body');

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = msg[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var value = _step2.value;

        var _$modal = $('<p class="test-result"> ' + value + ' </p>');
        $parent.append(_$modal);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    $parent = $('.modal-footer');
    var $modal = $('<p class="test-result"> \u0412\u0441\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432:  ' + itog + ' </p>');
    $parent.append($modal);
  };

  $('#myModal').on('hide.bs.modal', function () {
    $('.test-result').remove();
  });

  var $button = $('.question__button');

  $button.on('click', function () {
    var score = 0;
    var i = 0;
    var answerText = new Array();

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = yourAnswers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var value = _step3.value;

        if (value != myTest.questions[i].correctAnswer) {
          answerText[i] = '\u0412\u043E\u043F\u0440\u043E\u0441 \u2116 ' + (i + 1) + ': <br> \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442: ' + myTest.questions[i].answers[myTest.questions[i].correctAnswer];
        } else {
          answerText[i] = '\u0412\u043E\u043F\u0440\u043E\u0441 \u2116 ' + (i + 1) + ' : \u0412\u0435\u0440\u043D\u043E!';
          ++score;
        }
        ++i;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    testResult(answerText, score);

    clearForm('ftest');
    yourAnswers = [];
    score = 0;
    i = 0;
    answerText = [];
  });
});
