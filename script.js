document.addEventListener('DOMContentLoaded', function () {
    const doctors = [
        { id: 1, name: 'Dr. Smith', totalSlots: 10, bookedSlots: 0, slots: [] },
        { id: 2, name: 'Dr. Johnson', totalSlots: 10, bookedSlots: 0, slots: [] },
        // Add more doctors as needed
    ];

    const appointments = [];

    const doctorSelect = document.getElementById('doctor-selection');
    const appointmentList = document.getElementById('appointments-list');
    const doctorsList = document.getElementById('doctors-list');

    // Populate doctor selection dropdown
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.name;
        doctorSelect.appendChild(option);
    });

    // Handle booking form submission
    document.getElementById('booking-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const patientName = document.getElementById('patient-name').value;
        const doctorId = parseInt(document.getElementById('doctor-selection').value);
        const appointmentDate = document.getElementById('appointment-date').value;
        const appointmentTime = document.getElementById('appointment-time').value;

        const doctor = doctors.find(d => d.id === doctorId);

        // Validate if time slot is available
        if (doctor.slots.includes(appointmentTime)) {
            alert('This time slot is already booked. Please choose another time.');
            return;
        }

        const appointmentId = `APT-${appointments.length + 1}`;
        const appointment = {
            id: appointmentId,
            patientName,
            doctorName: doctor.name,
            date: appointmentDate,
            time: appointmentTime,
        };

        appointments.push(appointment);
        doctor.slots.push(appointmentTime);
        doctor.bookedSlots += 1;

        displayAppointments();
        displayDoctors();

        alert('Appointment booked successfully!');
    });

    // Handle cancellation form submission
    document.getElementById('cancellation-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const appointmentId = document.getElementById('appointment-id').value;

        const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
        if (appointmentIndex === -1) {
            alert('Invalid Appointment ID');
            return;
        }

        const appointment = appointments[appointmentIndex];
        const doctor = doctors.find(d => d.name === appointment.doctorName);

        doctor.slots = doctor.slots.filter(slot => slot !== appointment.time);
        doctor.bookedSlots -= 1;

        appointments.splice(appointmentIndex, 1);

        displayAppointments();
        displayDoctors();

        alert('Appointment canceled successfully!');
    });

    // Handle view appointments button
    document.getElementById('view-appointments-button').addEventListener('click', displayAppointments);

    function displayAppointments() {
        appointmentList.innerHTML = '';
        appointments.forEach(appointment => {
            const appointmentDiv = document.createElement('div');
            appointmentDiv.classList.add('appointment');
            appointmentDiv.textContent = `ID: ${appointment.id}, Patient: ${appointment.patientName}, Doctor: ${appointment.doctorName}, Date: ${appointment.date}, Time: ${appointment.time}`;
            appointmentList.appendChild(appointmentDiv);
        });
    }

    function displayDoctors() {
        doctorsList.innerHTML = '';
        doctors.forEach(doctor => {
            const doctorDiv = document.createElement('div');
            doctorDiv.classList.add('doctor');
            doctorDiv.innerHTML = `
                <h3>${doctor.name}</h3>
                <p>Total Slots: ${doctor.totalSlots}</p>
                <p>Booked Slots: ${doctor.bookedSlots}</p>
                <p>Available Slots: ${doctor.totalSlots - doctor.bookedSlots}</p>
                <div>
                    ${doctor.slots.map(slot => `<span class="booked-slot">${slot}</span>`).join(', ')}
                </div>
            `;
            doctorsList
