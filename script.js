const titles = {
    dashboard: "Dashboard",
    cari: "Cari Sertikom",
    berkas: "Isi Berkas",
    jadwal: "Jadwal",
    nilai: "Nilai & Sertifikat",
    profil: "Profil",
    assessor: "Dashboard Assessor",
    admin: "Dashboard Admin"
};

function showPage(id, button) {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    document.getElementById("pageTitle").textContent = titles[id] || "Dashboard";

    document.querySelectorAll(".menu").forEach(item => item.classList.remove("active"));
    if (button) {
        button.classList.add("active");
    } else {
        const menu = [...document.querySelectorAll(".menu")]
            .find(item => item.getAttribute("onclick")?.includes("'" + id + "'"));
        if (menu) menu.classList.add("active");
    }

    window.scrollTo(0, 0);
}

function searchCourse() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    document.querySelectorAll(".course-card").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(keyword) ? "" : "none";
    });
}

function logout() {
    alert("Kamu berhasil logout.");
    showPage("dashboard");
}


let selectedStudent = "";

function openScoreForm(student) {
    selectedStudent = student;
    document.getElementById("scoreStudent").textContent = "Input Nilai - " + student;
    document.getElementById("scorePanel").classList.add("show");
}

function closeScoreForm() {
    document.getElementById("scorePanel").classList.remove("show");
}

function saveScore() {
    const theory = document.getElementById("scoreTheory").value;
    const practice = document.getElementById("scorePractice").value;
    if (!theory || !practice) {
        alert("Nilai teori dan praktik harus diisi.");
        return;
    }
    alert("Nilai " + selectedStudent + " berhasil disimpan.");
    closeScoreForm();
}

function openCourseForm() {
    document.getElementById("coursePanel").classList.add("show");
}

function closeCourseForm() {
    document.getElementById("coursePanel").classList.remove("show");
}

function saveCourse() {
    const name = document.getElementById("courseName").value.trim();
    if (!name) {
        alert("Nama sertikom belum diisi.");
        return;
    }
    alert("Sertikom " + name + " berhasil ditambahkan.");
    closeCourseForm();
}
function openScoreForm(studentName) {
        document.getElementById('scoreStudent').innerText = 'Nilai: ' + studentName;
        document.getElementById('scorePanel').classList.add('active');
    }

    function closeScoreForm() {
        document.getElementById('scorePanel').classList.remove('active');
    }

    function saveScore() {
        alert('Nilai berhasil disimpan!');
        closeScoreForm();
    }

    function showPage(pageId, element) {
        document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
        document.getElementById(pageId).style.display = 'block';
    }

    function showAssessorTab(tab) {
        alert('Menampilkan halaman tab: ' + tab);
    }

