import React, { useState, useEffect } from 'react';
import './ProfileCard.scss';
import defaultCover from '../../assets/blossom_fallback.jpg';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const ProfileCard = () => {

    const [profileDetails, setProfileDetails] = useState([]);
    const { _id } = useAuth();

    // unique user details
    const fetchProfileDetails = async () => {
        const data = await axios.get(`http://localhost:5000/user/${_id}`)
            .catch((e) => {
                if (e.response) {
                    console.log(e.response.data);
                } else {
                    console.log(e.message);
                }
            });
        alert(data?.data?.message);
        console.log(data?.data?.result);
        setProfileDetails(data?.data?.result);
    }

    useEffect(() => {
        fetchProfileDetails();
    }, []);


    return (
        <div className="profile">
            <div className="cover">
                <img className='cover-pic' src={defaultCover} alt="cover" />
                <img className="profile-pic" src={profileDetails?.profileImage? profileDetails.profileImage : defaultCover} alt="pfp" />
            </div>
            <div className="details">
                <h3 className="name">{profileDetails.name}</h3>
                <p className="email">{profileDetails.email}</p>
                <div className="count">
                    <div className="count-slots">
                        Amount donated <span>{profileDetails?.amountDonated}</span>
                    </div>
                    <div className="count-slots">
                        Events held <span>{profileDetails?.eventsHeld.length}</span>
                    </div>
                    <div className="count-slots">
                        Followers <span>{profileDetails?.followers.length}</span>
                    </div>
                    <div className="count-slots">
                        Following <span>{profileDetails?.following.length}</span>
                    </div>
                </div>
                <button>
                    Show Profile
                </button>
            </div>
        </div>
    )
}

export default ProfileCard;