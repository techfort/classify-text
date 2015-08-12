var mimir = require('mimir'),
  brain = require('brain');

/* few utils for the example */
function vec_result(res, num_classes) {
  var i = 0,
    vec = [];
  for (i; i < num_classes; i += 1) {
    vec.push(0);
  }
  vec[res] = 1;
  return vec;
}

function maxarg(array) {
  return array.indexOf(Math.max.apply(Math, array));
}

// train data
var ANN_Classes = {
    HISTORY: 0,
    PROGRAMMING: 1,
    MUSIC: 2
  },
  classes_array = Object.keys(ANN_Classes), //['HISTORY', 'PROGRAMMING', 'MUSIC'],
  texts = [
    // history
    "The end of the Viking-era in Norway is marked by the Battle of Stiklestad in 1030",
    "The end of the Viking Age is traditionally marked in England by the failed invasion attempted by the Norwegian king Harald III ",
    "The earliest date given for a Viking raid is 787 AD when, according to the Anglo-Saxon Chronicle, a group of men from Norway sailed to the Isle of Portland in Dorset",
    // programming
    "A programming language is a formal constructed language designed to communicate instructions to a machine, particularly a computer. Programming languages can be used to create programs to control the behavior of a machine or to express algorithms.",
    "Thousands of different programming languages have been created, mainly in the computer field, and many more still are being created every year.",
    "The description of a programming language is usually split into the two components of syntax (form) and semantics (meaning). Some languages are defined by a specification document (for example, the C programming language is specified by an ISO Standard), while other languages (such as Perl) have a dominant implementation that is treated as a reference",
    // music
    "Classical music is art music produced or rooted in the traditions of Western music (both liturgical and secular)",
    "European music is largely distinguished from many other non-European and popular musical forms by its system of staff notation, in use since about the 16th century",
    "classical music has been noted for its development of highly sophisticated forms of instrumental music."
  ],
  dict = mimir.dict(texts),
  traindata = [
    [mimir.bow(texts[0], dict), ANN_Classes.HISTORY],
    [mimir.bow(texts[1], dict), ANN_Classes.HISTORY],
    [mimir.bow(texts[2], dict), ANN_Classes.HISTORY],
    [mimir.bow(texts[3], dict), ANN_Classes.PROGRAMMING],
    [mimir.bow(texts[4], dict), ANN_Classes.PROGRAMMING],
    [mimir.bow(texts[5], dict), ANN_Classes.PROGRAMMING],
    [mimir.bow(texts[6], dict), ANN_Classes.MUSIC],
    [mimir.bow(texts[7], dict), ANN_Classes.MUSIC],
    [mimir.bow(texts[8], dict), ANN_Classes.MUSIC]
  ],
  test_history = "The beginning of the Viking Age in the British Isles is, however, often given as 793.",
  test_music = "Baroque music is a style of Western art music composed from approximately 1600 to 1750",
  test_bow_history = mimir.bow(test_history, dict),
  test_bow_music = mimir.bow(test_music, dict);

var net = new brain.NeuralNetwork(),
  ann_train = traindata.map(function (pair) {
    return {
      input: pair[0],
      output: vec_result(pair[1], 3)
    };
  });

net.train(ann_train);
console.log('------------------- ANN (brain) ----------------------');
var predict = net.run(test_bow_history);
console.log(predict);
console.log(classes_array[maxarg(predict)]); // prints HISTORY
console.log(classes_array[maxarg(net.run(test_bow_music))]); // prints MUSIC
