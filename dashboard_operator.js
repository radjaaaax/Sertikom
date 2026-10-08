function previewFile(filename) {
    alert("Membuka berkas: " + filename);
}

function verifyDoc(id, result) {
    const statusElement = document.getElementById('status-' + id);
    if (!statusElement) {
        throw new Error('Status berkas tidak ditemukan: ' + id);
    }

    if (result === 'Disetujui') {
        statusElement.className = 'badge-approved';
        statusElement.innerText = 'Disetujui';
        alert('Berkas peserta berhasil disetujui!');
    } else {
        statusElement.className = 'badge-rejected';
        statusElement.innerText = 'Ditolak';
        alert('Berkas peserta ditolak!');
    }
}

function exportDataData(format) {
    alert("Sistem mengunduh Rekap Data Peserta Sertikom dalam format " + format.toUpperCase() + "...");
}

function exportRekapRow(button) {
    const row = button.closest('.simple-row');
    const table = document.getElementById('table-rekap-pendaftaran');
    if (!row || !table) {
        throw new Error('Baris atau tabel rekapitulasi tidak ditemukan.');
    }

    const headings = Array.from(table.querySelector('.table-title').children);
    const cells = Array.from(row.children);
    const escapeHtml = function (value) {
        return value.replace(/[&<>"']/g, function (character) {
            const entities = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return entities[character];
        });
    };
    const printableCells = cells.slice(0, headings.length - 1).map(function (cell, index) {
        return '<tr><th>' + escapeHtml(headings[index].textContent.trim()) +
            '</th><td>' + escapeHtml(cell.textContent.trim()) + '</td></tr>';
    }).join('');
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (!printWindow) {
        alert('Jendela ekspor diblokir browser. Izinkan pop-up untuk menyimpan rekap sebagai PDF.');
        return;
    }

    printWindow.addEventListener('load', function () {
        printWindow.focus();
        printWindow.print();
    });
    printWindow.document.open();
    printWindow.document.write(
        '<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">' +
        '<title>Rekap Pendaftaran - ' + escapeHtml(cells[0].textContent.trim()) + '</title>' +
        '<style>' +
        'body{font-family:Arial,sans-serif;color:#0f172a;margin:40px}' +
        'h1{font-size:20px;margin:0 0 8px}p{font-size:12px;color:#64748b;margin:0 0 24px}' +
        'table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:12px 14px;border:1px solid #cbd5e1}' +
        'th{width:42%;background:#f1f5f9}' +
        '@media print{body{margin:20mm}}' +
        '</style></head><body><h1>Rekapitulasi Pendaftaran</h1>' +
        '<p>Data contoh — nantinya diisi dari database.</p><table>' + printableCells +
        '</table></body></html>'
    );
    printWindow.document.close();
}

function openCourseForm() {
    alert("Membuka formulir tambah Sertikom...");
}

function addDataRow(tableType) {
    const tableConfig = {
        sertifikasi: {
            id: 'table-sertifikasi',
            fields: [
                { label: 'Sertifikasi', type: 'text' },
                { label: 'Deskripsi', type: 'text' },
                { label: 'Persyaratan', type: 'text' },
                { label: 'Kuota', type: 'number', min: '0' }
            ]
        },
        jadwal: {
            id: 'table-jadwal',
            fields: [
                { label: 'Nama Jadwal', type: 'text' },
                { label: 'Waktu', type: 'time' },
                { label: 'Tempat', type: 'text' },
                { label: 'Tanggal', type: 'date' },
                { label: 'Asesor', type: 'text' }
            ]
        },
        sertifikat: {
            id: 'table-sertifikat',
            fields: [
                { label: 'File Sertifikat', type: 'file', accept: '.pdf,.jpg,.jpeg,.png' },
                { label: 'Nama Sertifikat', type: 'text' }
            ]
        }
    };
    const config = tableConfig[tableType];
    if (!config) {
        throw new Error('Jenis tabel tidak dikenal: ' + tableType);
    }

    const table = document.getElementById(config.id);
    if (!table) {
        throw new Error('Tabel tidak ditemukan: ' + config.id);
    }

    const row = document.createElement('div');
    row.className = 'simple-row';
    config.fields.forEach(function (field) {
        const cell = document.createElement('span');
        const input = document.createElement('input');
        input.type = field.type;
        input.setAttribute('aria-label', field.label);
        if (field.min !== undefined) {
            input.min = field.min;
        }
        if (field.accept) {
            input.accept = field.accept;
        }
        cell.appendChild(input);
        row.appendChild(cell);
    });
    const actionCell = document.createElement('span');
    const submitButton = document.createElement('button');
    submitButton.className = 'btn-secondary';
    submitButton.type = 'button';
    submitButton.textContent = 'Submit';
    submitButton.onclick = function () {
        submitDataRow(submitButton);
    };
    actionCell.appendChild(submitButton);
    row.appendChild(actionCell);
    table.appendChild(row);
}

function submitDataRow(button) {
    const row = button.closest('.simple-row');
    if (!row) {
        throw new Error('Baris data yang akan disubmit tidak ditemukan.');
    }

    alert('Data belum tersimpan. Halaman ini belum terhubung ke database; data input akan hilang jika halaman di-refresh.');
}

const MAX_VISIBLE_ROWS = 5;
const rowScrollObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        const table = mutation.target;
        const dataRowCount = Array.from(table.children).filter(function (child) {
            return child.classList.contains('simple-row') && !child.classList.contains('table-title');
        }).length;
        table.classList.toggle('has-row-scroll', dataRowCount > MAX_VISIBLE_ROWS);
    });
});

document.querySelectorAll('#table-sertifikasi, #table-jadwal, #table-sertifikat').forEach(function (table) {
    const dataRowCount = Array.from(table.children).filter(function (child) {
        return child.classList.contains('simple-row') && !child.classList.contains('table-title');
    }).length;
    table.classList.toggle('has-row-scroll', dataRowCount > MAX_VISIBLE_ROWS);
    rowScrollObserver.observe(table, { childList: true });
});

function exportDataData(format) {
    alert("Sistem mengunduh Rekap Data Peserta Sertikom dalam format " + format.toUpperCase() + "...");
}

function exportDataData(format) {
    alert("Sistem mengunduh Rekap Data Peserta Sertikom dalam format " + format.toUpperCase() + "...");
}

function exportDataRow(button) {
    const row = button.closest('.simple-row');
    // Cari kontainer tabel terdekat (menggunakan class .table-verifikasi)
    const table = button.closest('.table-verifikasi');
    
    if (!row || !table) {
        alert('Baris atau tabel verifikasi tidak ditemukan.');
        return;
    }

    const headings = Array.from(table.querySelector('.table-title').children);
    const cells = Array.from(row.children);

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            const entities = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return entities[character];
        });
    };

    // Mengambil nilai teks yang bersih (menangani elemen <select> dan teks biasa)
    const getCleanValue = function (cell) {
        const select = cell.querySelector('select');
        if (select) {
            const selectedOption = select.options[select.selectedIndex];
            return selectedOption ? selectedOption.text : '-';
        }
        return cell.textContent.trim().replace(/\s+/g, ' ');
    };

    // Ambil hanya kolom data (mengabaikan kolom tombol Submit dan Ekspor PDF)
    const printableCells = [];
    const maxColumns = 5; // NIM & Nama, Skema, Berkas, Jadwal, Status

    for (let i = 0; i < maxColumns; i++) {
        if (headings[i] && cells[i]) {
            const headerText = escapeHtml(headings[i].textContent.trim());
            const cellValue = escapeHtml(getCleanValue(cells[i]));
            printableCells.push('<tr><th>' + headerText + '</th><td>' + cellValue + '</td></tr>');
        }
    }

    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (!printWindow) {
        alert('Jendela ekspor diblokir browser. Izinkan pop-up untuk menyimpan rekap sebagai PDF.');
        return;
    }

    const nameText = cells[0] ? getCleanValue(cells[0]) : 'Peserta';

    printWindow.document.open();
    printWindow.document.write(
        '<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">' +
        '<title>Rekap Pendaftaran - ' + escapeHtml(nameText) + '</title>' +
        '<style>' +
        'body{font-family:Arial,sans-serif;color:#0f172a;margin:40px}' +
        'h1{font-size:20px;margin:0 0 8px;color:#1e293b}' +
        'p{font-size:12px;color:#64748b;margin:0 0 24px}' +
        'table{width:100%;border-collapse:collapse;margin-top:10px}' +
        'th,td{text-align:left;padding:12px 14px;border:1px solid #cbd5e1;font-size:14px}' +
        'th{width:35%;background:#f1f5f9;color:#334155}' +
        '@media print{body{margin:15mm}}' +
        '</style></head><body>' +
        '<h1>Detail Pendaftaran Peserta Sertikom</h1>' +
        '<p>Ringkasan berkas dan status pendaftaran peserta.</p>' +
        '<table>' + printableCells.join('') + '</table>' +
        '</body></html>'
    );
    printWindow.document.close();

    // Trigger cetak setelah konten dokumen selesai dimuat
    printWindow.onload = function () {
        printWindow.focus();
        printWindow.print();
    };
}

