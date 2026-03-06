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

            try {

                const user = JSON.parse(localStorage.getItem("user"));

                await API.post("/bookings", {
                    user_id: user.id,
                    room_id: roomId,
                    start_date: startDate,
                    end_date: endDate,
                    adults,
                    children
                });

                alert("Booking successful");

                // clear form
                setStartDate("");
                setEndDate("");
                setAdults(1);
                setChildren(0);

                // redirect to MyBookings page
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
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Check Out</label>
                    <input
                        type="date"
                        value={endDate}
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