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
                    console.log('Topic clicked:', item.topic); // Log the clicked topic
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
                            <h1>${item.details.topic}</h1>
                            <p><strong>Author:</strong> ${item.details.author}</p>
                            <p><strong>Definition:</strong> ${item.details.definition}</p>
                            <p><strong>Link One:</strong> <a href="${item.details.linkOne}" target="_blank">${item.details.linkOne}</a></p>
                            <p><strong>Link Two:</strong> <a href="${item.details.linkTwo}" target="_blank">${item.details.linkTwo}</a></p>
                            <p><strong>Link Three:</strong> <a href="${item.details.linkThree}" target="_blank">${item.details.linkThree}</a></p>
                            <p><strong>References:</strong> ${item.details.references}</p>
                            <p><strong>Tags:</strong> ${item.details.tags}</p>
                            <p><strong>Type:</strong> ${item.details.type}</p>
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
            $('<li/>') // Changed from <row/> to <li/>
                .text(letter)
                .css({
                    'padding-right': '7px',
                    'padding-left': '7px',
                    'font-weight': 'bold', // Make letters bold
                    'cursor': 'pointer',
                    'display': 'inline-block',
                    'text-decoration': 'underline' // Underline all letters initially
                })
                .on('click', function() {
                    console.log('Letter clicked:', letter); // Log the clicked letter
                    // Underline all letters
                    $('#letters-list li').css('text-decoration', 'underline');
                    // Remove underline from the clicked letter
                    $(this).css('text-decoration', 'none');
                    // Filter topics by the clicked letter
                    filterTopicsByLetter(letter, topics);
                })
                .appendTo($letters);
        });

        $lettersList.append($letters);
    })
    .catch(error => {
        console.error('Fetch error:', error); // Log any fetch errors
        alert("Error fetching data.");
    });

function displayDetails(details) {
    console.log('Displaying details:', details); // Log the details object to the console

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
    console.log('Filtering topics by letter:', letter); // Log the letter used for filtering
    var $topicsList = $('ul#topics-list');
    $topicsList.empty();

    var filteredTopics = topics.filter(item => item.topic.startsWith(letter));
    var $filteredTopics = $(document.createDocumentFragment());
    var $accordionItems = $(document.createDocumentFragment()); // Define $accordionItems here

    filteredTopics.forEach((item, index) => {
        $('<li/>')
            .text(item.topic)
            .on('click', function() {
                console.log('Filtered topic clicked:', item.topic); // Log the clicked filtered topic
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
                        <h1>${item.details.topic}</h1>
                        <p><strong>Author:</strong> ${item.details.author}</p>
                        <p><strong>Definition:</strong> ${item.details.definition}</p>
                        <p><strong>Link One:</strong> <a href="${item.details.linkOne}" target="_blank">${item.details.linkOne}</a></p>
                        <p><strong>Link Two:</strong> <a href="${item.details.linkTwo}" target="_blank">${item.details.linkTwo}</a></p>
                        <p><strong>Link Three:</strong> <a href="${item.details.linkThree}" target="_blank">${item.details.linkThree}</a></p>
                        <p><strong>References:</strong> ${item.details.references}</p>
                        <p><strong>Tags:</strong> ${item.details.tags}</p>
                        <p><strong>Type:</strong> ${item.details.type}</p>
                    </div>
                </div>
            </div>
        `;
        $accordionItems.append(accordionItem);
    });

    $topicsList.append($filteredTopics);
    $('#accordionExample').empty().append($accordionItems);
}