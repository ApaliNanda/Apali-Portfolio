const STORAGE_KEY = 'cc_api_keys';
const REPO_NAME = 'Apali-Portfolio';

const apiKeyForm = document.getElementById('apiKeyForm');
const submitBtn = document.getElementById('submitBtn');
const resetFormBtn = document.getElementById('resetFormBtn');
const newKeyBtn = document.getElementById('newKeyBtn');
const generateKeyBtn = document.getElementById('generateKeyBtn');
const copyKeyBtn = document.getElementById('copyKeyBtn');
const keyPreviewValue = document.getElementById('keyPreviewValue');
const stats = {
    total: document.getElementById('totalKeys'),
    active: document.getElementById('activeKeys'),
    revoked: document.getElementById('revokedKeys'),
};
const tableBody = document.getElementById('apiKeysTableBody');
const searchInput = document.getElementById('searchKeys');
const statusFilter = document.getElementById('statusFilter');
const backToSiteBtn = document.getElementById('backToSiteBtn');

let apiKeys = loadKeys();
let editingId = null;
let currentKeyValue = '';

render();

function loadKeys() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    const seedData = [
        {
            id: crypto.randomUUID(),
            label: 'Prod Payments Service',
            owner: 'Payments Team',
            environment: 'Production',
            permissions: ['Read', 'Write', 'Billing'],
            status: 'Active',
            rateLimit: 900,
            notes: 'Rotates every 30 days',
            keyValue: generateSecureKey(),
            lastUsed: new Date().toISOString(),
        },
        {
            id: crypto.randomUUID(),
            label: 'Webhook QA Runner',
            owner: 'QA Ops',
            environment: 'Staging',
            permissions: ['Read', 'Write'],
            status: 'Paused',
            rateLimit: 300,
            notes: 'Enable during regression tests only',
            keyValue: generateSecureKey(),
            lastUsed: new Date(Date.now() - 86400000 * 5).toISOString(),
        },
        {
            id: crypto.randomUUID(),
            label: 'Legacy Reporting',
            owner: 'Data Platform',
            environment: 'Production',
            permissions: ['Read'],
            status: 'Revoked',
            rateLimit: 100,
            notes: 'Deprecated integration',
            keyValue: generateSecureKey(),
            lastUsed: new Date(Date.now() - 86400000 * 40).toISOString(),
        },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
}

function saveKeys() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apiKeys));
}

function render() {
    renderStats();
    renderTable();
}

function renderStats() {
    stats.total.textContent = apiKeys.length;
    stats.active.textContent = apiKeys.filter(k => k.status === 'Active').length;
    stats.revoked.textContent = apiKeys.filter(k => k.status === 'Revoked').length;
}

function renderTable() {
    const filtered = filterKeys();
    tableBody.innerHTML = '';

    if (!filtered.length) {
        tableBody.innerHTML = `<tr><td colspan="7" class="empty-state">No API keys match your filters.</td></tr>`;
        return;
    }

    filtered.forEach(key => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="cell-title">${key.label}</div>
                <div class="cell-subtitle">${key.rateLimit} req/min</div>
            </td>
            <td>${key.owner}</td>
            <td>${key.environment}</td>
            <td>${key.permissions.join(', ')}</td>
            <td><span class="status-pill ${key.status}">${key.status}</span></td>
            <td>${formatLastUsed(key.lastUsed)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-button edit" data-id="${key.id}" data-action="edit">Edit</button>
                    <button class="action-button delete" data-id="${key.id}" data-action="delete">Delete</button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function filterKeys() {
    const query = searchInput.value.trim().toLowerCase();
    const status = statusFilter.value;

    return apiKeys.filter(key => {
        const matchesQuery =
            key.label.toLowerCase().includes(query) ||
            key.owner.toLowerCase().includes(query);
        const matchesStatus = status === 'all' || key.status === status;
        return matchesQuery && matchesStatus;
    });
}

function formatLastUsed(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function generateSecureKey() {
    const array = new Uint32Array(8);
    crypto.getRandomValues(array);
    return Array.from(array, val => val.toString(16).padStart(8, '0')).join('-');
}

function setPreview(value) {
    currentKeyValue = value;
    keyPreviewValue.textContent = value;
    copyKeyBtn.disabled = !value;
}

function resetForm() {
    apiKeyForm.reset();
    document.getElementById('keyId').value = '';
    editingId = null;
    submitBtn.textContent = 'Save API Key';
    setPreview('');
}

apiKeyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const keyData = {
        id: editingId || crypto.randomUUID(),
        label: document.getElementById('keyName').value.trim(),
        owner: document.getElementById('ownerName').value.trim(),
        environment: document.getElementById('environment').value,
        permissions: Array.from(document.querySelectorAll('#permissionGroup input:checked')).map(
            input => input.value
        ),
        status: document.getElementById('status').value,
        rateLimit: Number(document.getElementById('rateLimit').value),
        notes: document.getElementById('notes').value.trim(),
        keyValue: currentKeyValue || generateSecureKey(),
        lastUsed: editingId ? apiKeys.find(k => k.id === editingId)?.lastUsed : new Date().toISOString(),
    };

    if (editingId) {
        apiKeys = apiKeys.map(key => (key.id === editingId ? keyData : key));
    } else {
        apiKeys.unshift(keyData);
    }

    saveKeys();
    render();
    resetForm();
});

generateKeyBtn.addEventListener('click', () => {
    setPreview(generateSecureKey());
});

copyKeyBtn.addEventListener('click', async () => {
    if (!currentKeyValue) return;
    await navigator.clipboard.writeText(currentKeyValue);
    const originalText = copyKeyBtn.textContent;
    copyKeyBtn.textContent = 'Copied!';
    setTimeout(() => (copyKeyBtn.textContent = originalText), 1200);
});

resetFormBtn.addEventListener('click', resetForm);

tableBody.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const { action, id } = button.dataset;
    if (action === 'edit') {
        handleEdit(id);
    } else if (action === 'delete') {
        handleDelete(id);
    }
});

function handleEdit(id) {
    const key = apiKeys.find(k => k.id === id);
    if (!key) return;

    editingId = id;
    document.getElementById('keyId').value = id;
    document.getElementById('keyName').value = key.label;
    document.getElementById('ownerName').value = key.owner;
    document.getElementById('environment').value = key.environment;
    document.getElementById('status').value = key.status;
    document.getElementById('rateLimit').value = key.rateLimit;
    document.getElementById('notes').value = key.notes;

    document.querySelectorAll('#permissionGroup input').forEach(input => {
        input.checked = key.permissions.includes(input.value);
    });

    setPreview(key.keyValue);
    submitBtn.textContent = 'Update API Key';
    apiKeyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleDelete(id) {
    const key = apiKeys.find(k => k.id === id);
    if (!key) return;

    const confirmed = confirm(`Revoke and delete "${key.label}"?`);
    if (!confirmed) return;

    apiKeys = apiKeys.filter(k => k.id !== id);
    if (editingId === id) {
        resetForm();
    }
    saveKeys();
    render();
}

searchInput.addEventListener('input', renderTable);
statusFilter.addEventListener('change', renderTable);

newKeyBtn.addEventListener('click', () => {
    resetForm();
    apiKeyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

if (backToSiteBtn) {
    backToSiteBtn.addEventListener('click', () => {
        const basePath = window.location.pathname.includes(`/${REPO_NAME}`) ? `/${REPO_NAME}` : '';
        window.location.href = `${basePath}/`;
    });
}

