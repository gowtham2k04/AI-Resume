document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const degree = document.getElementById('degree').value;
    const university = document.getElementById('university').value;
    const graduationYear = document.getElementById('graduationYear').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    const resumeContent = `
        <h3>${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>

        <h3>Education</h3>
        <p><strong>Degree:</strong> ${degree}</p>
        <p><strong>University:</strong> ${university}</p>
        <p><strong>Graduation Year:</strong> ${graduationYear}</p>

        <h3>Experience</h3>
        <p>${experience}</p>

        <h3>Skills</h3>
        <p>${skills}</p>
    `;

    document.getElementById('resume').innerHTML = resumeContent;
    document.getElementById('resumePreview').classList.remove('hidden');
    
    // Enable the download button after generating resume
    document.getElementById('downloadPDF').addEventListener('click', generatePDF);
});

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set font style and size
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Add Profile Picture to top-left corner
    const imageInput = document.getElementById('profilePhoto'); // Assuming an input field for photo upload
    if (imageInput.files.length > 0) {
        const photo = imageInput.files[0];
        const reader = new FileReader();
        
        reader.onloadend = function () {
            const imgData = reader.result;

            // Add image to top-left corner (10, 10) position, 30x30 size
            doc.addImage(imgData, 'JPEG', 10, 10, 30, 30); // Change size and position as needed

            addResumeContent(doc); // Proceed to add the rest of the content
        };

        reader.readAsDataURL(photo);
    } else {
        addResumeContent(doc); // If no photo, continue adding resume content
    }

    function addResumeContent(doc) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const degree = document.getElementById('degree').value;
        const university = document.getElementById('university').value;
        const graduationYear = document.getElementById('graduationYear').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;

        // Set header
        doc.setFontSize(16);
        doc.setTextColor(40, 40, 40);
        doc.text("Resume", 105, 10, null, null, "center");

        // Add Name
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(name, 10, 45); // Add offset for photo

        // Add contact info with bold headings
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Email: ${email}`, 10, 55);
        doc.text(`Phone: ${phone}`, 10, 65);
        doc.text(`Address: ${address}`, 10, 75);

        // Add a line separator
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 80, 200, 80);

        // Education section
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Education", 10, 90);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Degree: ${degree}`, 10, 100);
        doc.text(`University: ${university}`, 10, 110);
        doc.text(`Graduation Year: ${graduationYear}`, 10, 120);

        // Add a line separator
        doc.line(10, 125, 200, 125);

        // Experience section
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Experience", 10, 130);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(experience, 10, 140);

        // Add a line separator
        doc.line(10, 150, 200, 150);

        // Skills section
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Skills", 10, 160);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(skills, 10, 170);

        // Save PDF
        doc.save("resume.pdf");
    }
}
