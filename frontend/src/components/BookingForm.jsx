import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function BookingForm({ roomId }) {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    const handleBooking = async (e) => {

        e.preventDefault();

        if (!startDate || !endDate) {
            alert("Please select check-in and check-out dates");
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end <= start) {
            alert("Check-out date must be after check-in date");
            window.location.reload();
            return;
        }

        try {

            await API.post("/bookings", {
                room_id: roomId,
                start_date: startDate,
                end_date: endDate,
                adults,
                children
            });

            alert("Booking successful");

            window.location.reload();

        } catch (err) {

            alert(err.response?.data?.message || "Booking failed");

            window.location.reload();

        }

    };

    return (

        <form className="booking-form" onSubmit={handleBooking}>

            <div className="input-group">
                <label>Check In</label>
                <input
                    type="date"
                    min={today}
                    value={startDate}
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Check Out</label>
                <input
                    type="date"
                    min={startDate || today}
                    value={endDate}
                    required
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Adults</label>
                <input
                    type="number"
                    min="1"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Children</label>
                <input
                    type="number"
                    min="0"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                />
            </div>

            <button type="submit" className="book-btn">
                Book Room
            </button>

        </form>

    );

}

export default BookingForm;