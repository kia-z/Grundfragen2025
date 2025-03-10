document.getElementById("dataForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
        action: "add", 
        topic: document.getElementById("topic").value,
        author: document.getElementById("author").value,
        definition: document.getElementById("definition").value,
        linkOne: document.getElementById("linkOne").value,
        linkTwo: document.getElementById("linkTwo").value,
        linkThree: document.getElementById("linkThree").value,
        references: document.getElementById("references").value,
        tags: document.getElementById("tags").value,
        type: document.getElementById("type").value,
    };

    fetch("https://script.google.com/macros/s/AKfycbzgIssrKZtHsuhTtXpedviwwxZcZE4r4kKZ6u3VVu1z7Vd0MgLPl6Rb4cMRjOEixMYf/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
    .then(() => {
        document.getElementById("responseMessageAdd").innerText = "Data submitted successfully!";
        document.getElementById("dataForm").reset();
    })
    .catch(() => {
        document.getElementById("responseMessageAdd").innerText = "Error submitting data.";
    });
});
