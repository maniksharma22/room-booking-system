import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const roomImages = {

        "Deluxe Room":
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",

        "Suite Room":
            "https://images.unsplash.com/photo-1590490360182-c33d57733427",

        "Standard Room":
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",

        "Luxury Room":
            "https://images.unsplash.com/photo-1582719508461-905c673771fd",

        "Family Room":
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",

        "Presidential Suite":
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",

        "Ocean View Room":
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39",

        "Business Class Room":
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d"

    };

    useEffect(() => {

        const fetchBookings = async () => {

            try {

                const user = JSON.parse(localStorage.getItem("user"));

                if (!user) {
                    navigate("/login");
                    return;
                }

                const res = await API.get("/bookings/my");

                setBookings(res.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchBookings();

    }, [navigate]);


    if (bookings.length === 0) {

        return (
            <div className="mybookings empty-bookings">

                <h2>No bookings yet</h2>

                <p>Looks like you haven't booked a room yet.</p>

                <button
                    className="explore-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    Explore Rooms
                </button>

            </div>
        );

    }


    return (

        <div className="mybookings">

            <h1>My Bookings</h1>

            {bookings.map((b) => {

                const start = new Date(b.start_date);
                const end = new Date(b.end_date);

                const nights = Math.max(
                    1,
                    Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24))
                );

                const total = nights * b.price_per_night;

                return (

                    <div className="booking-card" key={b.id}>

                        <img
                            src={roomImages[b.name]}
                            alt={b.name}
                        />

                        <div className="booking-info">

                            <h3>{b.name}</h3>

                            <p className="location">📍 {b.location || "Hotel Location"}</p>

                            <p>
                                Check-in: {start.toDateString()}
                            </p>

                            <p>
                                Check-out: {end.toDateString()}
                            </p>

                            <p>
                                Guests: {b.adults} Adults, {b.children} Children
                            </p>

                            <p>
                                Nights: {nights}
                            </p>

                            <h4>
                                Total Price: ₹{total}
                            </h4>

                            <span className="status">
                                Confirmed
                            </span>
                            <button
                                className="explore-btn1"
                                onClick={() => navigate("/dashboard")}
                            >
                                Explore more
                            </button>


                        </div>

                    </div>

                );


            })}

        </div>


    );

}

export default MyBookings;