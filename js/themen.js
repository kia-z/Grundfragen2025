fetch("https://script.google.com/macros/s/AKfycbzgIssrKZtHsuhTtXpedviwwxZcZE4r4kKZ6u3VVu1z7Vd0MgLPl6Rb4cMRjOEixMYf/exec?action=get", {
    method: "GET",
    redirect: "follow"
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        alert("Error" + data.error);
        console.error('Fetch error:', data.error); // Log any fetch errors
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

    // Filter topics by type 'Themen'
    topics = topics.filter(item => item.details.type === 'themen');

    // Sort topics alphabetically
    topics.sort((a, b) => a.topic.localeCompare(b.topic));

    var $cardGrid = $('#cardGrid');
    var $cards = $(document.createDocumentFragment());

    topics.forEach((item, index) => {
        var cardItem = `
            <div class="card" style="width: 18rem; margin: 10px;" id="heading${index}">
                <div class="card-body">
                    <h5 class="card-title">${item.topic}</h5>
                    <p class="card-text">${item.details.definition}</p>
                    <p><strong>References:</strong> ${item.details.references}</p>
                    <p><strong>Tags:</strong> ${item.details.tags}</p>
                    <p><i>Author:</i> ${item.details.author}</p>
                    <a href="${item.details.linkOne}" class="card-link" target="_blank">${item.details.linkOne}</a>
                    <a href="${item.details.linkTwo}" class="card-link" target="_blank">${item.details.linkTwo}</a>
                    <a href="${item.details.linkThree}" class="card-link" target="_blank">${item.details.linkThree}</a>
                </div>
            </div>
        `;
        $cards.append(cardItem);
    });

    $cardGrid.append($cards);
})
.catch(error => {
    console.error('Fetch error:', error);
    alert("Error fetching data.");
});

function displayDetails(details) {
    $('#topic').text(details.topic || "");
    $('#author').text(details.author || "");
    $('#definition').text(details.definition || "");
    $('#linkOne').text(details.linkOne || "");
    $('#linkTwo').text(details.linkTwo || "");
    $('#linkThree').text(details.linkThree || "");
    $('#references').text(details.references || "");
    $('#tags').text(details.tags || "");
}

function filterTopicsByLetter(letter, topics) {
    var $topicsList = $('ul#topics-list');
    $topicsList.empty();

    var filteredTopics = topics.filter(item => item.topic.startsWith(letter));
    var $filteredTopics = $(document.createDocumentFragment());
    var $cards = $(document.createDocumentFragment()); // Define $cards here

    filteredTopics.forEach((item, index) => {
        $('<li/>')
            .text(item.topic)
            .on('click', function() {
                displayDetails(item.details);
            })
            .appendTo($filteredTopics);

        var cardItem = `
            <div class="card" style="width: 18rem; margin: 10px;" id="heading${index}">
                <div class="card-body">
                    <h5 class="card-title">${item.topic}</h5>
                    <p class="card-text">${item.details.definition}</p>
                    <p><strong>References:</strong> ${item.details.references}</p>
                    <p><strong>Tags:</strong> ${item.details.tags}</p>
                    <p><i>Author:</i> ${item.details.author}</p>
                    <a href="${item.details.linkOne}" class="card-link" target="_blank">${item.details.linkOne}</a>
                    <a href="${item.details.linkTwo}" class="card-link" target="_blank">${item.details.linkTwo}</a>
                    <a href="${item.details.linkThree}" class="card-link" target="_blank">${item.details.linkThree}</a>
                </div>
            </div>
        `;
        $cards.append(cardItem);
    });

    $topicsList.append($filteredTopics);
    $('#cardGrid').empty().append($cards);
}