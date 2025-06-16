// Function to add a new author entry
function addAuthor() {
    const authorsList = document.getElementById('authorsList');
    const newAuthor = document.createElement('div');
    newAuthor.className = 'author-entry mb-2';
    newAuthor.innerHTML = `
        <input type="text" class="form-control" placeholder="Author Name" required>
        <input type="text" class="form-control mt-2" placeholder="Affiliation">
        <input type="email" class="form-control mt-2" placeholder="Email">
        <button type="button" class="btn btn-danger btn-sm mt-2" onclick="removeAuthor(this)">Remove Author</button>
    `;
    authorsList.appendChild(newAuthor);
}

// Function to remove an author entry
function removeAuthor(button) {
    const authorEntry = button.parentElement;
    authorEntry.remove();
}

// Function to add a new reference entry
function addReference() {
    const referencesList = document.getElementById('referencesList');
    const newReference = document.createElement('div');
    newReference.className = 'reference-entry mb-2';
    newReference.innerHTML = `
        <textarea class="form-control" placeholder="Enter reference" required></textarea>
        <button type="button" class="btn btn-danger btn-sm mt-2" onclick="removeReference(this)">Remove Reference</button>
    `;
    referencesList.appendChild(newReference);
}

// Function to remove a reference entry
function removeReference(button) {
    const referenceEntry = button.parentElement;
    referenceEntry.remove();
}

// Function to collect form data
function collectFormData() {
    const formData = {
        title: document.getElementById('title').value,
        authors: Array.from(document.querySelectorAll('.author-entry')).map(entry => ({
            name: entry.querySelector('input[placeholder="Author Name"]').value,
            affiliation: entry.querySelector('input[placeholder="Affiliation"]').value,
            email: entry.querySelector('input[placeholder="Email"]').value
        })),
        abstract: document.getElementById('abstract').value,
        keywords: document.getElementById('keywords').value.split(',').map(k => k.trim()),
        introduction: document.getElementById('introduction').value,
        methods: document.getElementById('methods').value,
        results: document.getElementById('results').value,
        discussion: document.getElementById('discussion').value,
        conclusion: document.getElementById('conclusion').value,
        references: Array.from(document.querySelectorAll('.reference-entry textarea')).map(textarea => textarea.value),
        exportFormat: document.querySelector('input[name="exportFormat"]:checked').value
    };
    return formData;
}

// Function to generate document
async function generateDocument(formData) {
    try {
        // Here you would typically make an API call to your backend server
        // For now, we'll just show a success message
        alert('Document generation started! This is a placeholder for the actual document generation functionality.');
        
        // Example of how the backend API call might look:
        /*
        const response = await fetch('/api/generate-document', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Document generation failed');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `journal-article.${formData.exportFormat}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        */
    } catch (error) {
        console.error('Error generating document:', error);
        alert('Error generating document. Please try again.');
    }
}

// Form submission handler
document.getElementById('articleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!e.target.checkValidity()) {
        e.stopPropagation();
        e.target.classList.add('was-validated');
        return;
    }
    
    const formData = collectFormData();
    await generateDocument(formData);
}); 