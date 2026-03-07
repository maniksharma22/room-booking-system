import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function BookingForm({ roomId }) {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const navigate = useNavigate();

    const handleBooking = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {

            await API.post("/bookings", {
                room_id: roomId,
                start_date: startDate,
                end_date: endDate,
                adults: parseInt(adults),
                children: parseInt(children)
            });

            alert("Booking successful");

            setStartDate("");
            setEndDate("");
            setAdults(1);
            setChildren(0);

            navigate("/mybookings");

        } catch (err) {

            alert(err.response?.data?.message || "Booking failed");

        }

    };

    return (

        <form className="booking-form" onSubmit={handleBooking}>

            <div className="input-group">
                <label>Check In</label>
                <input
                    type="date"
                    value={startDate}
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Check Out</label>
                <input
                    type="date"
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
                    required
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                />
            </div>

            <div className="input-group">
                <label>Children</label>
                <input
                    type="number"
                    min="0"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                />
            </div>

            <button type="submit" className="book-btn">
                Book Room
            </button>

        </form>

    );

}

export default BookingForm;