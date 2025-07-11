const clients = [
    { name: "Client1", key: "Key1" },
];

function renderClients() {
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = '';
    clients.forEach((client, index) => {
        const clientItem = document.createElement('div');
        clientItem.classList.add('client-item');
        clientItem.innerHTML = `
            <span>${client.name} (Key: ${client.key})</span>
            <button onclick="deleteClient(${index})">Delete</button>
        `;
        clientList.appendChild(clientItem);
    });
}

function addClient() {
    const nameInput = document.getElementById('clientNameInput');
    const keyInput = document.getElementById('clientKeyInput');
    const name = nameInput.value.trim();
    const key = keyInput.value.trim();

    if (name && key) {
        clients.push({ name, key });
        nameInput.value = '';
        keyInput.value = '';
        renderClients();
    } else {
        alert('Client Name and Key cannot be empty.');
    }
}

function deleteClient(index) {
    clients.splice(index, 1);
    renderClients();
}

function hashSHA256(str) {
    const utf8 = new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-256', utf8).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hexHash;
    });
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.getElementById('addClientBtn').addEventListener('click', addClient);

document.getElementById('generateBtn').addEventListener('click', async () => {
    const requestBody = document.getElementById('genRequestBody').value;
    const clientName = document.getElementById('genClient').value;

    let parsedBody;
    try {
        parsedBody = JSON.parse(requestBody);
    } catch (e) {
        alert('Invalid JSON for Request Body.');
        return;
    }

    const client = clients.find(c => c.name === clientName);
    if (!client) {
        alert('Client not found.');
        return;
    }

    const requestString = JSON.stringify(parsedBody);
    const nonce = generateUUID();
    const clientKey = client.key;

    const signature = await hashSHA256(requestString + nonce + clientKey);

    document.getElementById('generatedNonce').textContent = nonce;
    document.getElementById('generatedSignature').textContent = signature;
});

document.getElementById('validateBtn').addEventListener('click', async () => {
    const requestBody = document.getElementById('valRequestBody').value;
    const nonce = document.getElementById('valNonce').value;
    const signature = document.getElementById('valSignature').value;
    const clientName = document.getElementById('valClient').value;

    let parsedBody;
    try {
        parsedBody = JSON.parse(requestBody);
    } catch (e) {
        alert('Invalid JSON for Request Body.');
        return;
    }

    const client = clients.find(c => c.name === clientName);
    if (!client) {
        alert('Client not found.');
        return;
    }

    const requestString = JSON.stringify(parsedBody);
    const clientKey = client.key;

    const expectedSignature = await hashSHA256(requestString + nonce + clientKey);
    const isValid = expectedSignature === signature;

    document.getElementById('validationResult').textContent = isValid ? 'Valid' : 'Invalid';
    document.getElementById('validationResult').style.color = isValid ? 'green' : 'red';
});

renderClients(); 