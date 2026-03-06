import { useEffect, useState } from "react";
import API from "../services/api";
import BookingForm from "../components/BookingForm";

function Dashboard() {

    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");

    useEffect(() => {

        const fetchRooms = async () => {

            const res = await API.get("/rooms");
            setRooms(res.data);

        };

        fetchRooms();

    }, []);


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


    const filteredRooms = rooms.filter(room => {

        const matchesSearch =
            room.name?.toLowerCase().includes(search.toLowerCase());

        const matchesPrice =
            priceFilter === "" || room.price_per_night <= priceFilter;

        const matchesLocation =
            locationFilter === "" || (room.location && room.location === locationFilter);

        return matchesSearch && matchesPrice && matchesLocation;

    });


    return (

        <div className="dashboard">

            <h1>Find Your Perfect Room</h1>

            {/* SEARCH + FILTER */}

            <div className="filters">

                <input
                    type="text"
                    placeholder="Search rooms..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                >

                    <option value="">All Prices</option>
                    <option value="2000">Under ₹2000</option>
                    <option value="3000">Under ₹3000</option>
                    <option value="5000">Under ₹5000</option>

                </select>

                {/* LOCATION FILTER */}

                <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                >

                    <option value="">All Locations</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Goa">Goa</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>

                </select>

            </div>


            <div className="rooms-grid">

                {filteredRooms.map(room => (

                    <div className="room-card" key={room.id}>

                        <img
                            src={roomImages[room.name]}
                            alt={room.name}
                        />

                        <div className="room-info">

                            <h3>{room.name}</h3>

                            <p className="location">
                               📍 {room.location || "Location not set"}
                            </p>

                            <p className="price">
                                ₹{room.price_per_night} / night
                            </p>

                            <BookingForm roomId={room.id} />

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Dashboard;