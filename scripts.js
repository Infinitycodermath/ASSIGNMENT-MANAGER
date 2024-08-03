document.addEventListener("DOMContentLoaded", () => {
    displayAssignments();
});

function addAssignment() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        const assignment = {
            title: title,
            description: description,
            isCompleted: false
        };

        let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
        assignments.push(assignment);
        localStorage.setItem('assignments', JSON.stringify(assignments));
        displayAssignments();
        clearForm();
    } else {
        alert('Please enter both title and description.');
    }
}

function displayAssignments() {
    const assignmentsContainer = document.getElementById('assignments');
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    assignmentsContainer.innerHTML = '';

    assignments.forEach((assignment, index) => {
        const assignmentDiv = document.createElement('div');
        assignmentDiv.className = `assignment ${assignment.isCompleted ? 'completed' : ''}`;
        assignmentDiv.innerHTML = `
            <h3>${assignment.title}</h3>
            <p>${assignment.description}</p>
            <button onclick="markAsComplete(${index})">Mark as Complete</button>
        `;
        assignmentsContainer.appendChild(assignmentDiv);
    });
}

function markAsComplete(index) {
    let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    assignments[index].isCompleted = true;
    localStorage.setItem('assignments', JSON.stringify(assignments));
    displayAssignments();
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

