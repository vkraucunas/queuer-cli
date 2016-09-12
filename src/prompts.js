var prompt = require('prompt');
var colors = require('colors');

function poseQuestion(option1, option2) {
    var question = colors.magenta.underline('Which is more important?');
    var opt1 = colors.green('1) ' + option1);
    var opt2 = colors.white('2) ' + option2);
    console.log(question);
    console.log(opt1);
    console.log(opt2)
}

function answerQuestion() {
    return new Promise((resolve, reject) => {
        prompt.message = "";
        prompt.start();
        prompt.get('Answer', function(err, result){
            resolve(result.Answer);
        });
    })
}

function compare(opt1, opt2) {
    poseQuestion(opt1, opt2);
    return answerQuestion();
}

compare('fuck', 'off').then(answer => {
    console.log(answer);
}).catch(err => {
    console.log(err);
});
