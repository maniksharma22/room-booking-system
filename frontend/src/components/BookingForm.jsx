import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function BookingForm({ roomId }) {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    const handleBooking = async (e) => {

        e.preventDefault();

        if (error) {
            setTimeout(() => {
                window.location.reload();
            }, 1500);
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

            window.location.reload();

        } catch (err) {

            setError("Booking failed");

            setTimeout(() => {
                window.location.reload();
            }, 1500);

        }

    };

    const handleStartDate = (value) => {

        setStartDate(value);

        if (endDate && new Date(endDate) <= new Date(value)) {
            setError("Check-out date must be after check-in date");
        } else {
            setError("");
        }

    };

    const handleEndDate = (value) => {

        setEndDate(value);

        if (startDate && new Date(value) <= new Date(startDate)) {
            setError("Check-out date must be after check-in date");
        } else {
            setError("");
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
                    onChange={(e) => handleStartDate(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Check Out</label>
                <input
                    type="date"
                    min={startDate || today}
                    value={endDate}
                    required
                    onChange={(e) => handleEndDate(e.target.value)}
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
            
            {error && (
                <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                    {error}
                </p>
            )}

            <button type="submit" className="book-btn">
                Book Room
            </button>

        </form>

    );

}

export default BookingForm;