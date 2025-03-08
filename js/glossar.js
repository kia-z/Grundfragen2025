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

        // Filter topics by type 'Glossar'
        topics = topics.filter(item => item.details.type === 'Glossar');

        // Sort topics alphabetically
        topics.sort((a, b) => a.topic.localeCompare(b.topic));

        var $topicsList = $('ul#topics-list');
        var $topics = $(document.createDocumentFragment());

        var $accordion = $('#accordionExample');
        var $accordionItems = $(document.createDocumentFragment());

        topics.forEach((item, index) => {
            $('<li/>')
                .text(item.topic)
                .on('click', function() {
                    displayDetails(item.details);
                })
                .appendTo($topics);

            var accordionItem = `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                            ${item.topic}
                        </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                        <p>${item.details.definition}</p>
                        <p><strong>Links:</strong> 
                        <ul>
                        <li><a href="${item.details.linkOne}" target="_blank">${item.details.linkOne}</a></li>
                        <li>><a href="${item.details.linkTwo}" target="_blank">${item.details.linkTwo}</a></li>
                        <li><a href="${item.details.linkThree}" target="_blank">${item.details.linkThree}</a></li>
                        </ul></p>
                        <p><strong>References:</strong> ${item.details.references}</p>
                        <p><strong>Tags:</strong> ${item.details.tags}</p>
                        <p><i>Author:</i> ${item.details.author}</p>
                    </div>
                    </div>
                </div>
            `;
            $accordionItems.append(accordionItem);
        });

        $topicsList.append($topics);
        $accordion.append($accordionItems);

        // Create alphabet list
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        var $lettersList = $('#letters-list');
        var $letters = $(document.createDocumentFragment());

        letters.forEach(letter => {
            $('<li/>') 
                .text(letter)
                .css({
                    'padding-right': '7px',
                    'padding-left': '7px',
                    'cursor': 'pointer',
                    'display': 'inline-block',
                    'text-decoration': 'underline' 
                })
                .on('click', function() {
                    $(this).css('text-decoration', 'none');
                    filterTopicsByLetter(letter, topics);
                })
                .appendTo($letters);
        });

        $lettersList.append($letters);
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
    var $accordionItems = $(document.createDocumentFragment()); // Define $accordionItems here

    filteredTopics.forEach((item, index) => {
        $('<li/>')
            .text(item.topic)
            .on('click', function() {
                displayDetails(item.details);
            })
            .appendTo($filteredTopics);

        var accordionItem = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                        ${item.topic}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <p>${item.details.definition}</p>
                        <p><strong>Links:</strong> 
                        <ul>
                        <li><a href="${item.details.linkOne}" target="_blank">${item.details.linkOne}</a></li>
                        <li>><a href="${item.details.linkTwo}" target="_blank">${item.details.linkTwo}</a></li>
                        <li><a href="${item.details.linkThree}" target="_blank">${item.details.linkThree}</a></li>
                        </ul></p>
                        <p><strong>References:</strong> ${item.details.references}</p>
                        <p><strong>Tags:</strong> ${item.details.tags}</p>
                        <p><i>Author:</i> ${item.details.author}</p>
                    </div>
                </div>
            </div>
        `;
        $accordionItems.append(accordionItem);
    });

    $topicsList.append($filteredTopics);
    $('#accordionExample').empty().append($accordionItems);
}