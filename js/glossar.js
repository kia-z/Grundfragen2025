fetch("https://script.google.com/macros/s/AKfycbzgIssrKZtHsuhTtXpedviwwxZcZE4r4kKZ6u3VVu1z7Vd0MgLPl6Rb4cMRjOEixMYf/exec?action=get", {
    method: "GET",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
})
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Error fetching data.");
            return;
        }

        var topics = data.map(record => ({
            topic: record.topic,
            details: {
                author: record.author,
                definition: record.definition,
                linkOne: record.linkOne,
                linkTwo: record.linkTwo,
                linkThree: record.linkThree,
                references: record.references,
                tags: record.tags,
                type: record.type
            }
        }));

        // Sort topics alphabetically
        topics.sort((a, b) => a.topic.localeCompare(b.topic));

        var $topicsList = $('ul#topics-list');
        var $topics = $(document.createDocumentFragment());

        topics.forEach(item => {
            $('<li/>')
                .text(item.topic)
                .on('click', displayDetails.bind(null, item.details))
                .appendTo($topics);
        });

        $topicsList.append($topics);

        // Create alphabet list
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        var $lettersList = $('ul#letters-list');
        var $letters = $(document.createDocumentFragment());

        letters.forEach(letter => {
            $('<li/>')
                .text(letter)
                .on('click', () => filterTopicsByLetter(letter, topics))
                .appendTo($letters);
        });

        $lettersList.append($letters);
    })
    .catch(() => alert("Error fetching data."));

function displayDetails(details) {
    $('#topic').text(details.topic || "");
    $('#author').text(details.author || "");
    $('#definition').text(details.definition || "");
    $('#linkOne').text(details.linkOne || "");
    $('#linkTwo').text(details.linkTwo || "");
    $('#linkThree').text(details.linkThree || "");
    $('#references').text(details.references || "");
    $('#tags').text(details.tags || "");
    $('#type').text(details.type || "");
}

function filterTopicsByLetter(letter, topics) {
    var $topicsList = $('ul#topics-list');
    $topicsList.empty();

    var filteredTopics = topics.filter(item => item.topic.startsWith(letter));
    var $filteredTopics = $(document.createDocumentFragment());

    filteredTopics.forEach(item => {
        $('<li/>')
            .text(item.topic)
            .on('click', displayDetails.bind(null, item.details))
            .appendTo($filteredTopics);
    });

    $topicsList.append($filteredTopics);
}

var definitions = {
    alpha: 'Alpha definition',
    beta: 'Beta definition'
  };
  
  var $definitionsList = $('ul#definition-list');
  var $definitions = $(document.createDocumentFragment());
  
  for (var key in definitions) {
    $('<li/>')
      .text(key)
      .on('click', displayDefinition.bind(null, key, definitions[key]))
      .appendTo($definitions);
  }
  
  $definitionsList.append($definitions);
  
  function displayDefinition(name, definition) {
    $('#definition-display h1').text(name);
    $('#definition-display p').text(definition);
  }

var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
var arr = letters.map(x => ({letter: x, messages: messages.filter(m=>m.title[0] === x)}))
var result = _.mapValues(_.keyBy(arr, 'letter'), 'messages')